use thewarheads;

fn main() {
    if let Err(error) = thewarheads::generate_html("discography.yaml".as_ref()) {
        eprintln!("ERROR: {}", error);
    }
}
