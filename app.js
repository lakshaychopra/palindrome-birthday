var dateInput = document.querySelector("#birth-date")
var button = document.querySelector("#check")
var output = document.querySelector("#output")

function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reveStr = reverseListOfChars.join('');

    return reveStr
}

function isPalindrome(str) {
    var reverse = reverseStr(str)

    return str === reverse;
}

function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    }
    else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    }
    else {
        dateStr.month = date.day.toString();
    }


    dateStr.year = date.year.toString();

    return dateStr
}

function getDateFormat(date) {
    var dateStr = convertDateToStr(date)

    var ddmmyy = dateStr.day + dateStr.month + dateStr.year;
    return [ddmmyy];
}


function checkPalindromeForDateFormat(date) {
    var listOfPalindromes = getDateFormat(date);

    var flag = false;

    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag
}


function isLeapYear(year) {

    if (year % 400 === 0) return true;

    if (year % 100 === 0) return false;

    if (year % 4 === 0) return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    // Check for february
    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }

        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }

    }

    //Check for other months
    else {

        //Check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++; //increment the month
        }
    }

    // increment the year if month is greater than 12
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}


function getNextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForDateFormat(nextDate);
        if (isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;


        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        }

        else if (month === 2) {

            if (isLeapYear(year)) {
                day = 29;
            }

            else {
                day = 28;
            }
        }

        else {
            day = daysInMonth[month - 1]
        }

    }

    return {
        day: day,
        month: month,
        year: year,
    };
}


function getPreviousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForDateFormat(previousDate);
        if (isPalindrome) {
            break;
        }

        previousDate = getPreviousDate(previousDate);
    }

    return [ctr, previousDate];


}

function clickHandler(e) {

    var bdayStr = dateInput.value;

    if (bdayStr !== '') {
        bdayStr.year = bdayStr.year;
        var listOfDate = bdayStr.split('-');

        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        var isPalindrome = checkPalindromeForDateFormat(date);


        if (isPalindrome) {
            output.innerHTML = `Congratulations! Your bday is a palindrome`
        }

        else {
            var [ctr1, nextDate] = getNextPalindromeDate(date);
            var [ctr2, previousDate] = getPreviousPalindromeDate(date);


            if (ctr1 > ctr2) {
                output.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${ctr2} days.`;

            } else {
                output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
            }
        }


    }
}



button.addEventListener("click", clickHandler);