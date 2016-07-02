# BugTik
![https://travis-ci.org/lbovet/bugtik](https://travis-ci.org/lbovet/bugtik.svg?branch=master)

Sample project using [Spring Data Rest](http://projects.spring.io/spring-data-rest/) and [hybind](https://github.com/lbovet/hybind).
This is a minimal simplistic ticket/bug tracking system.

![](https://cloud.githubusercontent.com/assets/692124/16541808/c784f8b8-408e-11e6-8f3e-c414b238c283.png)

## Demo

Try the app on https://bugtik.herokuapp.com/

## Model

**Project** `1--->n` **Ticket** `n--->1` **Severity** `n--->1` **Color**

## Build and Run

`mvn spring-boot:run`

Open [http://localhost:8080/](http://localhost:8080/)
