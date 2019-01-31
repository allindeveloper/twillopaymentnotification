/**
* Toggle fullscreen
* @param object elem
* @return void
*/
function toggleFullScreen (elem)
{
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement)
    {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/**
* Store a value in the browser
* @param string name
* @param string value
* @return void
*/
function store (name, value)
{
	if (validateTypeOf(Storage)) localStorage.setItem(name, value);
}

/**
* Get a prestored value
* @param string name
* @return string
*/
function get (name)
{
	if (validateTypeOf(Storage)) return localStorage.getItem(name);
}

/**
* Delete a prestored value
* @param string name
* @return void
*/
function deleteItem (name)
{
	if (validateTypeOf(Storage)) localStorage.removeItem(name);
}

/**
* Store a value in the browser for a paticular session
* @param string name
* @param string value
* @return void
*/
function sessionStore (name, value)
{
	if (validateTypeOf(Storage)) sessionStorage.setItem(name, value);
}

/**
* Get a prestored value from the browser for a paticular session
* @param string name
* @return string
*/
function sessionGet (name)
{
	if (validateTypeOf(Storage)) return  sessionStorage.getItem(name);
}

/**
* Delete a prestored value
* @param string name
* @return void
*/
function sessionDelete (name)
{
	if (validateTypeOf(Storage)) sessionStorage.removeItem(name);
}

/**
* Validates if storage is available for the browser
* @param mixed typeOF
* @return bool
*/
function validateTypeOf (typeOF)
{
	if (typeof (typeOF) !== "undefined") return true;
	alert('Please use a modern browser to use this application properly!');
	return false;
}

function disable (objects) 
{
	objects.each(function (i)
	{ 
		$(this).attr("disabled", "disabled"); 
	});
}

function enable (objects) 
{
	objects.each(function (i) 
	{
		$(this).removeAttr("disabled"); 
	});
}

function bytesToSize (bytes) 
{
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Bytes';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024, i), 2) +' '+ sizes[i];
}

function timer ()
{
    var myVar = setInterval(function ()
    {
        var d = new Date();
        var t = d.toLocaleTimeString();
        document.getElementById("timer").innerHTML = t;
    }, 1000);
}

function redirectTo (location)
{
    window.location = location;
}

function randomString (length)
{
    var text        = "",
        possible    = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function validateOnChange (element, rules, successMessage, errorMessage)
{
    $(document).on('focus', element, function (e)
    {
        e.preventDefault();
        resetMessages(element);
        return false;
    });

    $(document).on('blur', element, function (e)
    {
        e.preventDefault();
        validateElement(element, rules, successMessage, errorMessage);
        return false;
    })
}

function validateElement (element, rules, successMessage, errorMessage)
{
    var result = approve.value($(element).val(), rules);
    if (result.approved)
        isSuccess(element, successMessage);
    else
        isError(element, errorMessage);
}

function isError (element, message)
{
    var el = $(element);
    el.parent().removeClass('has-success').addClass('has-danger')
    el.removeClass('form-control-success').addClass('form-control-danger')
    el.next().text(message).removeClass('text-success').addClass('text-danger');
    el.attr('data-valid', false);
}

function isSuccess (element, message)
{
    var el = $(element);
    el.parent().removeClass('has-danger').addClass('has-success')
    el.removeClass('form-control-danger').addClass('form-control-success')
    el.next().text(message).removeClass('text-danger').addClass('text-success');
    el.attr('data-valid', true);
}

function resetMessages (element)
{
    var el = $(element);
    el.parent().removeClass('has-danger').removeClass('has-success')
    el.removeClass('form-control-danger').removeClass('form-control-success')
    el.next().text('');
}

function allowNumbers (input)
{
    return input.replace(/\D/g, '');
}

function validateEmail (email)
{
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}