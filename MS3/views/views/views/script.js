var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var textbox = $("#textbox");
var instructions = $("#instructions");
var content = '';

recognition.onstart = function() {
    instructions.text("Voice recognition is on");
};
recognition.onspeechend = function()
{
    instructions.text(" No Activity")
}
recognition.onerror = function ()
{
    instructions.text("try again")
}
recognition.onresult = function(event)
{
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript

    content += transcript 
    textbox.val(content)
}

recognition.continuous = true;

$("#start-btn").click(function(event) {
    if (content.length) {
        content += '';
    }
    recognition.start();
});
