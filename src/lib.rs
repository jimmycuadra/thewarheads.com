use std::{
    error::Error,
    fs::File,
    path::Path,
};

use chrono::NaiveDate;
use serde_yaml;

#[derive(serde::Deserialize)]
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

#[derive(serde::Deserialize)]
pub struct Track {
    pub title: String,
    pub time: String,
}

pub fn generate_html(path: &Path) -> Result<(), Box<dyn Error>> {
    let file = File::open(path)?;
    let discography: Vec<Album> = serde_yaml::from_reader(file)?;

    Ok(())
}
