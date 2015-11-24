FROM ruby:2.0.0-onbuild

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "9292"]

# docker build -t jformica/eat-week .
# docker run -p 80:9292 --name eat-week jformica/eat-week