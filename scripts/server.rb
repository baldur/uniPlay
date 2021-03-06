#! /usr/bin/env ruby

require 'rubygems'
require 'sinatra'

get '/' do
  file = File.dirname(__FILE__) + "/../index.html"
  send_file file, :type => 'text/html'
end

get '/src/uniPlay/Modules/:name' do
  file = File.dirname(__FILE__) + "/../src/uniPlay/Modules/#{params[:name]}"
  send_file file, :type => 'text/javascript'
end

get '/screw-unit/lib/:name' do
  file = File.dirname(__FILE__) + "/../screw-unit/lib/#{params[:name]}"
  send_file file, :type => 'text/javascript'
end

get '/screw-unit/example/spec/:name' do
  file = File.dirname(__FILE__) + "/../screw-unit/example/spec/#{params[:name]}"
  send_file file, :type => 'text/javascript'
end

get '/:type/:asset' do
  types = {'javascripts' => 'text/javascript',
           'src' => 'text/javascript',
           'stylesheets' => 'text/css'}
  file = File.dirname(__FILE__) + "/../#{params[:type]}/#{params[:asset]}"
  send_file file, :type => types[params[:type]] 
end


