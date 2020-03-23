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

  def amazon
    @amazon ||= album["amazon"]
  end

  def apple
    @apple ||= album["apple"]
  end

  def credits
    @credits ||= if album["credits"]
      album["credits"].join("<br />")
    end
  end

  def date
    @date ||= Date.parse(album.fetch("date"))
  end

  def day
    @day ||= date.day
  end

  def description
    @description || album["description"]
  end

  def month
    @month ||= date.month
  end

  def month_name
    @month_name ||= Date::MONTHNAMES[month]
  end

  def musicians
    @musicians ||= if album["musicians"]
      album["musicians"].join("<br />")
    end
  end

  def slug
    @slug ||= title.downcase.gsub(/\s+/, "-").gsub(/[^\w-]+/, "")
  end

  def title
    @title ||= album.fetch("title")
  end

  def tracks
    @tracks ||= album.fetch("tracks")
  end

  def year
    @year ||= date.year
  end
end

class AlbumBinding
  def initialize(album)
    @album = album
  end

  def to_html
    ALBUM_TEMPLATE.result(binding)
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
    f.write(AlbumBinding.new(album).to_html)
  end
end
