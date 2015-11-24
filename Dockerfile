FROM ruby:2.0.0-onbuild

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "80"]