# regexp-matcher

    c    matches any literal character c
    .    matches any single character
    ^    matches the beginning of the input string
    $    matches the end of the input string
    *    matches zero or more occurrences of the previous character

A Regular Expression Matcher, C code & Algorithm Description
http://www.cs.princeton.edu/courses/archive/spr09/cos333/beautiful.html

# todo
(1) Add other metacharacters, like + for one or more occurrences of the previous character, or ? for zero or one matches. Add some way to quote metacharacters, like \$ to stand for a literal occurrence of $.

(2) Separate regular expression processing into a "compilation" phase and an "execution" phase. Compilation converts the regular expression into an internal form that makes the matching code simpler or such that subsequent matching runs faster. This separation is not necessary for the simple class of regular expressions in the original design, but it makes sense in grep-like applications where the class is richer and the same regular expression is used for a large number of input lines.

(3) Add character classes like [abc] and [0-9], which in conventional grep notation match a or b or c and a digit respectively. This can be done in several ways, the most natural of which seems to be replacing the char*'s of the original code with a structure:

    typedef struct RE {
            int     type;   /* CHAR, STAR, etc. */
            char    ch;     /* the character itself */
            char    *ccl;   /* for [...] instead */
            int     nccl;   /* true if class is negated [^...] */
    } RE;
and modifying the basic code to handle an array of these instead of an array of characters. It's not strictly necessary to separate compilation from execution for this situation, but it turns out to be a lot easier. Students who follow the advice to pre-compile into such a structure invariably do better than those who try to interpret some complicated pattern data structure on the fly.
Writing clear and unambiguous specifications for character classes is tough, and implementing them perfectly is worse, requiring a lot of tedious and uninstructive coding. I have simplified this assignment over time, and today most often ask for Perl-like shorthands such as \d for digit and \D for non-digit instead of the original bracketed ranges.

(4) Use an opaque type to hide the RE structure and all the implementation details. This is a good way to show object-oriented programming in C, which doesn't support much beyond this. In effect, one makes a regular expression class but with function names like RE_new() and RE_match() for the methods instead of the syntactic sugar of an object-oriented language.

(5) Modify the class of regular expressions to be like the wild cards in various shells: matches are implicitly anchored at both ends, * matches any number of characters, and ? matches any single character. One can modify the algorithm or map the input into the existing algorithm.

(6) Convert the code to Java. The original code uses C pointers very well, and it's good practice to figure out the alternatives in a different language. Java versions use either String.charAt (indexing instead of pointers) or String.substring (closer to the pointer version). Neither seems as clear as the C code, and neither is as compact. Although performance isn't really part of this exercise, it is interesting to see that the Java implementation runs roughly six or seven times slower than the C versions.

(7) Write a wrapper class that converts from regular expressions of this class to Java's Pattern and Matcher classes, which separate the compilation and matching in a quite different way. This is a good example of the Adapter or Facade pattern, which puts a different face on an existing class or set of functions.