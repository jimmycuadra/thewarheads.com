# frozen_string_literal: true

require "date"
require "erb"
require "yaml"

DATA = YAML.load_file("discography.yaml")
ALBUM_TEMPLATE = ERB.new(File.read("templates/album.html.erb"), trim_mode: "-")
INDEX_TEMPLATE = ERB.new(File.read("templates/index.html.erb"), trim_mode: "-")

class Album
  attr_reader :album

  def initialize(album)
    @album = album
  end

  def date
    @date ||= Date.parse(album.fetch("date"))
  end

  def slug
    @slug ||= title.downcase.gsub(/\s+/, "-").gsub(/[^\w-]+/, "")
  end

  def title
    @title ||= album.fetch("title")
  end

  def to_html
    ALBUM_TEMPLATE.result(binding)
  end

  def year
    @year ||= date.year
  end
end

class Index
  def initialize(albums)
    @albums = albums
  end

  def to_html
    INDEX_TEMPLATE.result(binding)
  end
end

albums = DATA["albums"].map { |album| Album.new(album) }.sort_by(&:date)

File.open("html/index.html", "w") do |f|
  index = Index.new(albums)
  f.write(index.to_html)
end

albums.each do |album|
  File.open("html/#{album.slug}.html", "w") do |f|
    f.write(album.to_html)
  end
end
