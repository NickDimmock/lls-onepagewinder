var classicsIndex, colors, newPrompt, newQuestions, newStarter, questions, setClassics, spin;

colors = ["#FB5607", "#FF006E", "#8338EC", "#3A86FF", "#8AC926"];

questions = ["What kind of story would it be?", "Could it be a poem?", "Who would it be about?", "How would it start?", "When would it take place?", "Where would it take place?", "Could it be a song?", "Could it be a rap?", "Could it be a film script?", "Would you be in the story?", "Can you draw a picture to go with it?"];

// Where to start drawing our classic quotes from:
classicsIndex = 0;

setClassics = function() {
  $("#quotes").empty();
  return _.times(3, function() {
    var classic;
    classic = data["classics"][classicsIndex];
    $("#quotes").append(`<figure>
    <blockquote>${classic["quote"]}</blockquote>
    <figcaption><a href="${classic['link']}">${classic["book"]}</a> (${classic["author"]})</figcaption>
</figure>`);
    // Increment classicsIndex to move to next item, reset if we've reached the end:
    classicsIndex += 1;
    if (classicsIndex === data["classics"].length) {
      return classicsIndex = 0;
    }
  });
};

newStarter = function() {
  var pb, seed, storyEnd, storyMiddle, storyStart;
  console.log("Creating starter...");
  $("#starter").empty();
  pb = new PlotBuilder();
  seed = _.sample(storyData["beginning"]);
  storyStart = pb.build(seed);
  storyStart = pb.setArticles(storyStart);
  seed = _.sample(storyData["middle"]);
  storyMiddle = pb.build(seed);
  storyMiddle = pb.setArticles(storyMiddle);
  seed = _.sample(storyData["end"]);
  storyEnd = pb.build(seed);
  storyEnd = pb.setArticles(storyEnd);
  return $("#starter").append(`${storyStart} ${storyMiddle} ${storyEnd}`);
};

newPrompt = function() {
  var adjColor, myAdj, myNoun, nounColor;
  myAdj = _.sample(data["adjectives"]);
  myNoun = _.sample(data["nouns"]);
  adjColor = _.sample(colors);
  while (true) {
    //nounColor = _.sample(colors)
    nounColor = _.sample(colors);
    if (adjColor !== nounColor) {
      break;
    }
  }
  $("#adjective").css({
    color: adjColor
  });
  $("#noun").css({
    color: nounColor
  });
  $("#adjective").text(myAdj);
  $("#noun").text(myNoun);
  return newQuestions();
};

newQuestions = function() {
  var myQuestions, myTitle;
  myQuestions = _.sampleSize(questions, 2);
  myTitle = $("#prompt").text();
  return $("#couldyou").html(`<p>Could you write a story called <strong>${myTitle}</strong>?</p><p>${myQuestions[0]}</p><p>${myQuestions[1]}</p><p>If you want to try again, press <strong>SPIN!</strong>`);
};

spin = function() {
  $("#prompt").removeClass("pulser");
  $("#postPrompt").hide();
  return _.times(10, function(i) {
    return window.setTimeout(function() {
      newPrompt();
      if (i === 9) {
        newPrompt();
        $("#prompt").addClass("pulser");
        return $("#postPrompt").show();
      }
    }, 100 * i);
  });
};

$(function() {
  // Menu page loaders
  $('.show').click(function() {
    var page;
    event.preventDefault();
    page = $(this).data("id");
    $(".screen").hide();
    $("#" + page).show();
    if (page === "prompts") {
      return $("#prompt").addClass("pulser");
    }
  });
  $("#spin").click(function() {
    return spin();
  });
  $("#newClassics").click(function() {
    event.preventDefault();
    return setClassics();
  });
  $("#newStarter").click(function() {
    event.preventDefault();
    return newStarter();
  });
  data["classics"] = _.shuffle(data["classics"]);
  console.log(storyData);
  setClassics();
  newPrompt();
  newStarter();
  return console.log(data["classics"].length);
});
