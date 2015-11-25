FROM ruby:2.0.0-onbuild

RUN mkdir /eatweek
WORKDIR /eatweek

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "80"]