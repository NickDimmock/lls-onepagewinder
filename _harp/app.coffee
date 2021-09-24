colors = [
    "#FB5607",
    "#FF006E",
    "#8338EC",
    "#3A86FF",
    "#8AC926"
]

questions = [
    "What kind of story would it be?",
    "Could it be a poem?",
    "Who would it be about?",
    "How would it start?",
    "When would it take place?",
    "Where would it take place?",
    "Could it be a song?",
    "Could it be a rap?",
    "Could it be a film script?",
    "Would you be in the story?",
    "Can you draw a picture to go with it?"
]

# Where to start drawing our classic quotes from:
classicsIndex = 0

setClassics = () ->
    $("#quotes").empty()
    _.times(3, ->
        classic = data["classics"][classicsIndex]
        $("#quotes").append """
            <figure>
                <blockquote>#{classic["quote"]}</blockquote>
                <figcaption><a href="#{classic['link']}">#{classic["book"]}</a> (#{classic["author"]})</figcaption>
            </figure>
        """
        # Increment classicsIndex to move to next item, reset if we've reached the end:
        classicsIndex+=1
        if classicsIndex == data["classics"].length
            classicsIndex = 0
    )

newStarter = () ->
    console.log "Creating starter..."
    $("#starter").empty()
    pb = new PlotBuilder();
    #seedNo = Math.floor(Math.random()*storyData["beginning"].length);
    #seed = storyData["beginning"][seedNo];
    seed = _.sample(storyData["beginning"])
    
    storyStart = pb.build(seed);
    storyStart = pb.setArticles(storyStart);
    seed = _.sample(storyData["middle"])
    storyMiddle = pb.build(seed);
    storyMiddle = pb.setArticles(storyMiddle);
    seed = _.sample(storyData["end"])
    storyEnd = pb.build(seed);
    storyEnd = pb.setArticles(storyEnd);
    $("#starter").append """
        #{storyStart} #{storyMiddle} #{storyEnd}
    """

newPrompt = () ->
    myAdj = _.sample(data["adjectives"])
    myNoun = _.sample(data["nouns"])
    adjColor = _.sample(colors)
    #nounColor = _.sample(colors)
    loop
        nounColor = _.sample(colors)
        break unless adjColor == nounColor
    $("#adjective").css color: adjColor
    $("#noun").css color: nounColor
    $("#adjective").text myAdj
    $("#noun").text myNoun
    newQuestions()

newQuestions = () ->
    myQuestions = _.sampleSize(questions,2)
    myTitle = $("#prompt").text()
    $("#couldyou").html "<p>Could you write a story called <strong>#{myTitle}</strong>?</p><p>#{myQuestions[0]}</p><p>#{myQuestions[1]}</p><p>If you want to try again, press <strong>SPIN!</strong>"

spin = () ->
    $("#prompt").removeClass "pulser"
    $("#postPrompt").hide()
    _.times(10, (i) ->
        window.setTimeout ->
            newPrompt()
            if i==9
                newPrompt()
                $("#prompt").addClass "pulser"
                $("#postPrompt").show()
        , 100*i
    )

$ ->

    # Menu page loaders
    $('.show').click ->
        event.preventDefault()
        page = $(this).data("id")
        $(".screen").hide();
        $("#"+page).show()
        if page == "prompts"
            $("#prompt").addClass "pulser"

    $("#spin").click ->
        spin()   

    $("#newClassics").click ->
        event.preventDefault();
        setClassics()
    
    $("#newStarter").click ->
        event.preventDefault();
        newStarter()

    data["classics"] = _.shuffle(data["classics"])

    console.log(storyData);

    setClassics()

    newPrompt()

    newStarter()

    console.log(data["classics"].length)

    
