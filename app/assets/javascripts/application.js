// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function registerSession(){
  session = new Date().getTime()
}

Templater = T = {
  dup: function(id){
    return $(id).clone().attr('id', null)
  }
}

function displayQuizList(data){
  $(".container").html(buildQuestionList(data))
}

function buildQuestionList(data){
  var builtDomElement = T.dup('#quizzes')
  builtDomElement.append(T.dup('#title').text("quizzes"))

  $.each(data.quizzes, function(i, quiz){
    builtDomElement.append(buildLinkTo(quiz))
    builtDomElement.append("<br>")
  })

  return builtDomElement
}

function buildLinkTo(quiz){
  var link = T.dup('#link').text(quiz.name)
  link.click(function(e){
    e.preventDefault()
    Reclap.pushState(quiz.id)
  })
  // link.click(function(e){
  //   // Reclap.pushState(quiz.)
  //   e.preventDefault()

  //   makeNextQuestionAjaxCall(quiz.id)

  // })
  return link
}

// wait for user....
function displayNextQuestion(data){
  $(".container").html(buildQuestionWithChoicesList(data))
}

function buildQuestionWithChoicesList(data){
  var questionDomElement = T.dup('#question')
  questionDomElement.append(T.dup('#question-title').text(data.question))

  $.each(data.choices, function(i, choice){
    questionDomElement.append(buildAnotherLinkTo(choice, data.id))
    questionDomElement.append("<br>")
  })

  return questionDomElement
}

function makeNextQuestionAjaxCall(quiz_id) {
  $.ajax(RequestBuilder.nextQuestion(quiz_id))
  .done(displayNextQuestion)
  .fail(function(response){
      $(".container").html("<h3>No more questions. Shut up Rao.</h3>");
  });
}

function buildAnotherLinkTo(choice, question_id) {
  var link = T.dup('#link').text(choice.choice)
  link.click(function(e){
    e.preventDefault()
    $.ajax(RequestBuilder.postChoice(question_id, choice.id))
    .success(function(response,status,b,d){
      makeNextQuestionAjaxCall(response.quiz_id)
      reportProgress(response)
    })

  })
  return link
}

function reportProgress(response){
  //debugger
  var msg = "Your last response was "
  msg += response.correct ? "correct!" : "incorrect!"
  var elem = $("#correct").html(msg)
  $(".main").append(elem)

  var tally = "Number correct: " + response.num_correct + "<br>Number incorrect: " + response.num_incorrect
  var tally_elem = $("#tally").html(tally)
  $(".main").append(tally_elem)
}

function respond_to_hash_state(url_hash){
  if(url_hash == ""){
    console.log(url_hash)
    $.ajax(RequestBuilder.listQuizzes()).done(displayQuizList)
  }
  else{
    makeNextQuestionAjaxCall(url_hash)
  }
}

registerSession()
Reclap.setResponder(respond_to_hash_state)
$(document).ready()