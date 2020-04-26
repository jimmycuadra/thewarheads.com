use std::{
    error::Error,
    fs::{self, File},
    path::Path,
};

use askama::Template;
use chrono::NaiveDate;
use lazy_static::lazy_static;
use regex::Regex;
use serde_yaml;

lazy_static! {
    static ref WHITESPACE: Regex = Regex::new(r"\s+").unwrap();
    static ref NON_WORDS: Regex = Regex::new(r"[^\w-]+").unwrap();
    static ref MULTIPLE_DASHES: Regex = Regex::new(r"-+").unwrap();
}

#[derive(serde::Deserialize, Template)]
#[template(path = "album.html")]
pub struct Album {
    pub title: String,
    pub date: NaiveDate,
    pub description: Option<String>,
    pub amazon: Option<String>,
    pub apple: Option<String>,
    pub credits: Option<Vec<String>>,
    pub musicians: Option<Vec<String>>,
    pub tracks: Vec<Track>,
}

impl Album {
    pub fn day(&self) -> String {
        self.date.format("%e").to_string().trim().to_string()
    }

    pub fn month_name(&self) -> String {
        self.date.format("%B").to_string()
    }

    pub fn year(&self) -> String {
        self.date.format("%Y").to_string()
    }

    pub fn slug(&self) -> String {
        MULTIPLE_DASHES
            .replace_all(
                &NON_WORDS.replace_all(
                    &WHITESPACE.replace_all(&self.title.to_ascii_lowercase(), "-"),
                    "",
                ),
                "-",
            )
            .to_string()
    }
}

#[derive(serde::Deserialize)]
pub struct Track {
    pub title: String,
    pub time: String,
}

#[derive(Template)]
#[template(path = "index.html")]
pub struct Collection {
    pub albums: Vec<Album>,
}

pub fn generate_html(path: &Path) -> Result<(), Box<dyn Error>> {
    let file = File::open(path)?;
    let mut discography: Vec<Album> = serde_yaml::from_reader(file)?;
    discography.sort_by(|a, b| a.title.partial_cmp(&b.title).unwrap());

    for album in discography.iter() {
        fs::write(format!("html/{}.html", album.slug()), album.render()?)?;
    }

    let collection = Collection { albums: discography };
    fs::write("html/index.html", collection.render()?)?;

    Ok(())
}
