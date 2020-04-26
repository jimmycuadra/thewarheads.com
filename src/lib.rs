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

pub fn generate_html(path: &Path) -> Result<(), Box<dyn Error>> {
    let file = File::open(path)?;
    let discography: Vec<Album> = serde_yaml::from_reader(file)?;

    for album in discography {
        fs::write(format!("html/{}.html", album.slug()), album.render()?)?;
    }

    Ok(())
}
