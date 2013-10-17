var RequestBuilder = {
  listQuizzes: function(){
    return {
      url: '/quizzes.json',
      type:"get",
      data:{session_key:session}
    }
  },
  nextQuestion: function(id){
    return {
      url: "quizzes/"+id+"/questions/next.json",
      type:'get',
      data:{session_key:session}
    }
  },
  postChoice: function(question_id, choice_id){
    return {
      url: "/questions/"+question_id+"/answers.json",
      type: 'post',
      data:{choice_id:choice_id, session_key:session}
    }
  }
}
