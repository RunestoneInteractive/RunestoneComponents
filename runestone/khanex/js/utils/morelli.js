jQuery.extend(KhanUtil, {

	toBitString: function( num ) {
	    return num.toString(2);
	},

	// Adds leading zeroes to a form a 4-bit binary number string
	to4BitString: function( num ) {
            if (num <= 1) {
		return "000" + num.toString(2);
	    } else if (num <= 3) {
		return "00" + num.toString(2) ;
	    } else if (num <= 7) {
		return "0" + num.toString(2);
	    } else {
		return num.toString(2);
	    }
	},

	// Adds leading zeroes to a form a 8-bit binary number string
	to8BitString: function( num ) {
            bitstr = "";
            if (num <= 1) {
		bitstr = "0000000" + num.toString(2);
	    } else if (num <= 3) {
		bitstr =  "000000" + num.toString(2) ;
	    } else if (num <= 7) {
		bitstr = "00000" + num.toString(2);
	    } else if (num <= 15) {
		bitstr = "0000" + num.toString(2);
	    } else if (num <= 31) {
		bitstr = "000" + num.toString(2);
	    } else if (num <= 63) {
		bitstr = "00" + num.toString(2);
	    } else if (num <= 127) {
		bitstr = "0" + num.toString(2);
	    } else {
		bitstr =  num.toString(2);
	    } 
	    return bitstr.substring(0,4) + " " + bitstr.substring(4);
	},

	// Adds leading zeroes to a form a 6-bit binary number string
	to6BitString: function( num ) {
            bitstr = "";
            if (num <= 1) {
		bitstr = "00000" + num.toString(2);
	    } else if (num <= 3) {
		bitstr =  "0000" + num.toString(2) ;
	    } else if (num <= 7) {
		bitstr = "000" + num.toString(2);
	    } else if (num <= 15) {
		bitstr = "00" + num.toString(2);
	    } else if (num <= 31) {
		bitstr = "0" + num.toString(2);
	    }  else {
		bitstr =  num.toString(2);
	    }
	    return bitstr.substring(0,2) + " " + bitstr.substring(2);
	},

        // Returns the largest value of 2 starting at start that evenly divides num
	getLargestPower2: function ( num,start ) {
	    while (start > num ) {
		start = start / 2;
	    }
	    return start;
	},

        to7BitString: function( num ) {
            bitstr = "";
            if (num <= 1) {
		bitstr = "000000" + num.toString(2);
	    } else if (num <= 3) {
		bitstr =  "00000" + num.toString(2) ;
	    } else if (num <= 7) {
		bitstr = "0000" + num.toString(2);
	    } else if (num <= 15) {
		bitstr = "000" + num.toString(2);
	    } else if (num <= 31) {
		bitstr = "00" + num.toString(2);
	    } else if (num <= 63) {
		bitstr = "0" + num.toString(2);
	    } else {
		bitstr =  num.toString(2);
	    } 
	    return bitstr.substring(0,3) + " " + bitstr.substring(3);
	},

       // Counts the number of one bits in a bitstring
       countOnes: function ( bits ) {
	    numOnes = 0;
	    for (k = 0; k < bits.length; k++) {
		if (bits.charAt(k) == '1')
		    ++numOnes;
	    } 
	    return numOnes;
	},

        // Returns true if bits has the correct parity
        checkParity: function ( bits, parity ) {
	    n = 0;
	    for (k = 0; k < bits.length; k++) {
		if (bits.charAt(k) == '1')
		    ++n;
	    } 
	    if ( parity == "even" && n % 2 == 0 ) {
		return true;
	    } else if ( parity == "odd" && n % 2 == 1 ) {
                return true;
	    } else {
		return false;
	    }
	},

        // Returns true if bits has the correct parity
        getParityBit: function ( bits, parity ) {
	    n = 0;
	    for (k = 0; k < bits.length; k++) {
		if (bits.charAt(k) == '1')
		    ++n;
	    } 
	    if ( (parity == "even" && n % 2 == 0) || (parity == "odd" && n % 2 == 1)) {
		return "0";
	    } else {
		return "1";
	    }
	},

        jsBoolToPythonBool: function (b) {
	    if (b)
		return "True";
	    else
		return "False";
	},

        evalPythonRelation: function (v1, r, v2) {
	    if (r === "==")
		return v1 == v2;
	    else if (r == "!=")
		return v1 != v2;
	    else if (r == "<")
		return v1 < v2;
	    else if (r == ">")
		return v1 > v2;
	    else if (r == "<=")
		return v1 <= v2;
	    else if (r == ">=")
		return v1 >= v2;
	    else
		return false;
	},

        mapBooleanToHint: function (op) {
	    if (op == "&&")
                return " is true only when both operands are true";
	    else if (op == "||")
                return " is false only when both operands are false";
	    else if (op == "^")
                return " is true when either one or the other but not both operands are true";
	    else 
		return "";
	}, 

        // Evaluate a java boolean expression
        // v1 is variable1 (true/false), vn1 is variable name 1 (A/!A), op is the operator
        //   v2 is variable2 (true/false), and vn2 is variable name 2 (B/!B)
        evalJavaBoolean: function (v1, vn1, op, v2, vn2) {
            if (vn1 == "A") {
   	      if (v1 == "true")
		op1 = true;
               else
		op1 = false;
	    } else if (vn1 == "!A") {
   	      if (v1 == "true")
		op1 = false;
               else
		op1 = true;
	    }

            if (vn2 == "B") {
	      if (v2 == "true")
		op2 = true;
              else
		op2 = false;
	    } else if (vn2 == "!B") {
	      if (v2 == "true")
		op2 = false;
              else
		op2 = true;
	    }

	    if (op == "&&")
		return op1 && op2;
	    else if (op == "||")
		return op1 || op2;
	    else if (op == "^")
		return (op1 || op2) && !(op1 && op2);
	    else
		return false;
	},

        evalPythonLogical: function (v1, r, v2) {
	    if (r === "and")
		return v1 && v2;
	    else if (r == "or")
		return v1 || v2;
	    else
		return false;
	},

        symbolToText: function (r) {
	    if (r === "==")
		return "equal to";
	    else if (r == "!=")
		return "not equal to";
	    else if (r == "<")
		return "less than";
	    else if (r == ">")
		return "greater than";
	    else if (r == "<=")
		return "less than or equal to";
	    else if (r == ">=")
		return "greater than or equal to";
	    else
		return "error";
	},

       // Some Python functions for particular if/else statements
       // For python-ifelse.html

        evalIfElse1: function(x) {
            if (x < 14) {
		if (x < 5) 
		    return "A";
	    } else {
		return "B"
		    }
           return "Nothing"
	},

        evalIfElse2: function(x) {
            if (x < 14) {
		if (x < 5) {
		    return "A";
		} else {
		    return "B"
		}
	    }
           return "Nothing"
	},

        evalIfElse3: function(x) {
            if (x < 10) 
                return "AB";
	    else
                return "CD"
        },

        evalIfElse4: function(x) {
            s = "";
            if (x < 10) 
                s = s + "AB";
	    else
                s = s + "C";
	    s = s + "D";
	    return s;
        },

        evalFunctionCalls: function(x,y) {
	    return x % y;
        },

        evalDivCall: function(x,y) {
	    return Math.floor(x / y);
        },

        isLeapYear: function(x) {
	    if (x % 4 == 0) 
		if (x % 100 == 0)
		    if (x % 400 == 0)
			return true;
		    else
			return false;
		else 
		    return true;
	    else
		return false;
	}
});
