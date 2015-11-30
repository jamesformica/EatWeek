FROM ruby:2.0.0

RUN mkdir /eatweek
WORKDIR /eatweek

ADD Gemfile /eatweek/Gemfile
ADD Gemfile.lock /eatweek/Gemfile.lock
RUN bundle install

ADD . /eatweek

RUN rake db:migrate

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "80"]