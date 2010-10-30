desc "make one file"
task :compile do
  files = %w( src/uniPlay.js
              src/uniPlay/Modules/JWPlayer.js
              src/uniPlay/Modules/Vimeo.js
              src/uniPlay/Modules/YouTube.js )
     
  compiled_file = ""
  files.each do |file|
    compiled_file << File.read(file)
  end
  File.open("uniPlay.js", 'w') { |f| f.write(compiled_file) }
end
