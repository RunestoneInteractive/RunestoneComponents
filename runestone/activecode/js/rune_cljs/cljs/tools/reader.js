// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('cljs.tools.reader');
goog.require('cljs.core');
goog.require('cljs.tools.reader.impl.commons');
goog.require('goog.string');
goog.require('goog.array');
goog.require('cljs.tools.reader.reader_types');
goog.require('goog.string.StringBuffer');
goog.require('cljs.tools.reader.impl.utils');
goog.require('clojure.string');






cljs.tools.reader.macro_terminating_QMARK_ = (function cljs$tools$reader$macro_terminating_QMARK_(ch){
var G__11660 = ch;
switch (G__11660) {
case "\"":
case ";":
case "@":
case "^":
case "`":
case "~":
case "(":
case ")":
case "[":
case "]":
case "{":
case "}":
case "\\":
return true;

break;
default:
return false;

}
});
cljs.tools.reader.sb = (new goog.string.StringBuffer());
/**
 * Read in a single logical token from the reader
 */
cljs.tools.reader.read_token = (function cljs$tools$reader$read_token(rdr,initch){
if((initch == null)){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading"], 0));
} else {
cljs.tools.reader.sb.clear();

var ch = initch;
while(true){
if((cljs.tools.reader.impl.utils.whitespace_QMARK_(ch)) || (cljs.tools.reader.macro_terminating_QMARK_(ch)) || ((ch == null))){
if((ch == null)){
} else {
rdr.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(null,ch);
}

return cljs.tools.reader.sb.toString();
} else {
cljs.tools.reader.sb.append(ch);

var G__11662 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
ch = G__11662;
continue;
}
break;
}
}
});
cljs.tools.reader.read_dispatch = (function cljs$tools$reader$read_dispatch(rdr,_,opts,pending_forms){
var temp__4655__auto__ = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.core.truth_(temp__4655__auto__)){
var ch = temp__4655__auto__;
var temp__4655__auto____$1 = (cljs.tools.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.tools.reader.dispatch_macros.call(null,ch));
if(cljs.core.truth_(temp__4655__auto____$1)){
var dm = temp__4655__auto____$1;
return (dm.cljs$core$IFn$_invoke$arity$4 ? dm.cljs$core$IFn$_invoke$arity$4(rdr,ch,opts,pending_forms) : dm.call(null,rdr,ch,opts,pending_forms));
} else {
var G__11670 = (function (){var G__11674 = rdr;
G__11674.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(null,ch);

return G__11674;
})();
var G__11671 = ch;
var G__11672 = opts;
var G__11673 = pending_forms;
return (cljs.tools.reader.read_tagged.cljs$core$IFn$_invoke$arity$4 ? cljs.tools.reader.read_tagged.cljs$core$IFn$_invoke$arity$4(G__11670,G__11671,G__11672,G__11673) : cljs.tools.reader.read_tagged.call(null,G__11670,G__11671,G__11672,G__11673));
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading character"], 0));
}
});
cljs.tools.reader.read_unmatched_delimiter = (function cljs$tools$reader$read_unmatched_delimiter(rdr,ch,opts,pending_forms){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Unmatched delimiter ",ch], 0));
});
cljs.tools.reader.read_regex = (function cljs$tools$reader$read_regex(rdr,ch,opts,pending_forms){
var sb = (new goog.string.StringBuffer());
var ch__$1 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
while(true){
if(("\"" === ch__$1)){
return cljs.core.re_pattern([cljs.core.str(sb)].join(''));
} else {
if((ch__$1 == null)){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading regex"], 0));
} else {
sb.append(ch__$1);

if(("\\" === ch__$1)){
var ch_11675__$2 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if((ch_11675__$2 == null)){
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading regex"], 0));
} else {
}

sb.append(ch_11675__$2);
} else {
}

var G__11676 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
ch__$1 = G__11676;
continue;
}
}
break;
}
});
cljs.tools.reader.char_code = (function cljs$tools$reader$char_code(ch,base){
var code = parseInt(ch,base);
if(cljs.core.truth_(isNaN(code))){
return (-1);
} else {
return code;
}
});
cljs.tools.reader.read_unicode_char = (function cljs$tools$reader$read_unicode_char(var_args){
var args11677 = [];
var len__6931__auto___11680 = arguments.length;
var i__6932__auto___11681 = (0);
while(true){
if((i__6932__auto___11681 < len__6931__auto___11680)){
args11677.push((arguments[i__6932__auto___11681]));

var G__11682 = (i__6932__auto___11681 + (1));
i__6932__auto___11681 = G__11682;
continue;
} else {
}
break;
}

var G__11679 = args11677.length;
switch (G__11679) {
case 4:
return cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11677.length)].join('')));

}
});

cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4 = (function (token,offset,length,base){
var l = (offset + length);
if((cljs.core.count(token) === l)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid unicode character: \\"),cljs.core.str(token)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_argument], null));
}

var i = offset;
var uc = (0);
while(true){
if((i === l)){
return String.fromCharCode(uc);
} else {
var d = cljs.tools.reader.char_code(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(token,i),base);
if((d === (-1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid digit: "),cljs.core.str(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(token,i))].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_argument], null));
} else {
var G__11684 = (i + (1));
var G__11685 = (d + (uc * base));
i = G__11684;
uc = G__11685;
continue;
}
}
break;
}
});

cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5 = (function (rdr,initch,base,length,exact_QMARK_){
var i = (1);
var uc = cljs.tools.reader.char_code(initch,base);
while(true){
if((uc === (-1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid digit: "),cljs.core.str(initch)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_argument], null));
} else {
if(!((i === length))){
var ch = rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.tools.reader.impl.utils.whitespace_QMARK_(ch);
if(or__5862__auto__){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = (cljs.tools.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.tools.reader.macros.call(null,ch));
if(cljs.core.truth_(or__5862__auto____$1)){
return or__5862__auto____$1;
} else {
return (ch == null);
}
}
})())){
if(cljs.core.truth_(exact_QMARK_)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid character length: "),cljs.core.str(i),cljs.core.str(", should be: "),cljs.core.str(length)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_argument], null));
} else {
return String.fromCharCode(uc);
}
} else {
var d = cljs.tools.reader.char_code(ch,base);
rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);

if((d === (-1))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Invalid digit: "),cljs.core.str(ch)].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_argument], null));
} else {
var G__11686 = (i + (1));
var G__11687 = (d + (uc * base));
i = G__11686;
uc = G__11687;
continue;
}
}
} else {
return String.fromCharCode(uc);
}
}
break;
}
});

cljs.tools.reader.read_unicode_char.cljs$lang$maxFixedArity = 5;
cljs.tools.reader.upper_limit = "\uD7FF".charCodeAt((0));
cljs.tools.reader.lower_limit = "\uE000".charCodeAt((0));
cljs.tools.reader.valid_octal_QMARK_ = (function cljs$tools$reader$valid_octal_QMARK_(token,base){
return (parseInt(token,base) <= (255));
});
/**
 * Read in a character literal
 */
cljs.tools.reader.read_char_STAR_ = (function cljs$tools$reader$read_char_STAR_(rdr,backslash,opts,pending_forms){
var ch = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(!((ch == null))){
var token = (((cljs.tools.reader.macro_terminating_QMARK_(ch)) || (cljs.tools.reader.impl.utils.whitespace_QMARK_(ch)))?[cljs.core.str(ch)].join(''):cljs.tools.reader.read_token(rdr,ch));
var token_len = token.length;
if(((1) === token_len)){
return token.charAt((0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"newline")){
return "\n";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"space")){
return " ";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"tab")){
return "\t";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"backspace")){
return "\b";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"formfeed")){
return "\f";
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(token,"return")){
return "\r";
} else {
if(cljs.core.truth_(goog.string.startsWith(token,"u"))){
var c = cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4(token,(1),(4),(16));
var ic = c.charCodeAt((0));
if(((ic > cljs.tools.reader.upper_limit)) && ((ic < cljs.tools.reader.lower_limit))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Invalid character constant: \\u",c], 0));
} else {
return c;
}
} else {
if(cljs.core.truth_(goog.string.startsWith(token,"o"))){
var len = (token_len - (1));
if((len > (3))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Invalid octal escape sequence length: ",len], 0));
} else {
var offset = (1);
var base = (8);
var uc = cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$4(token,offset,len,base);
if(cljs.core.not(cljs.tools.reader.valid_octal_QMARK_(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(token,offset),base))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Octal escape sequence must be in range [0, 377]"], 0));
} else {
return uc;
}
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Unsupported character: \\",token], 0));

}
}
}
}
}
}
}
}
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading character"], 0));
}
});
cljs.tools.reader.starting_line_col_info = (function cljs$tools$reader$starting_line_col_info(rdr){
if(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(rdr))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rdr.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(null),((rdr.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(null) - (1)) | (0))], null);
} else {
return null;
}
});
cljs.tools.reader.ending_line_col_info = (function cljs$tools$reader$ending_line_col_info(rdr){
if(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(rdr))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [rdr.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(null),rdr.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(null)], null);
} else {
return null;
}
});
if(typeof cljs.tools.reader.READ_EOF !== 'undefined'){
} else {
cljs.tools.reader.READ_EOF = (new Object());
}
if(typeof cljs.tools.reader.READ_FINISHED !== 'undefined'){
} else {
cljs.tools.reader.READ_FINISHED = (new Object());
}
cljs.tools.reader._STAR_read_delim_STAR_ = false;
cljs.tools.reader.read_delimited_internal = (function cljs$tools$reader$read_delimited_internal(delim,rdr,opts,pending_forms){
var vec__11689 = cljs.tools.reader.starting_line_col_info(rdr);
var start_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11689,(0),null);
var start_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11689,(1),null);
var delim__$1 = cljs.tools.reader.impl.utils.char$(delim);
var a = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
var form = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(rdr,false,cljs.tools.reader.READ_EOF,delim__$1,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,delim__$1,opts,pending_forms));
if((form === cljs.tools.reader.READ_FINISHED)){
return cljs.core.persistent_BANG_(a);
} else {
if((form === cljs.tools.reader.READ_EOF)){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading",(cljs.core.truth_(start_line)?[cljs.core.str(", starting at line "),cljs.core.str(start_line),cljs.core.str(" and column "),cljs.core.str(start_column)].join(''):null)], 0));
} else {
var G__11690 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(a,form);
a = G__11690;
continue;
}
}
break;
}
});
/**
 * Reads and returns a collection ended with delim
 */
cljs.tools.reader.read_delimited = (function cljs$tools$reader$read_delimited(delim,rdr,opts,pending_forms){
var _STAR_read_delim_STAR_11692 = cljs.tools.reader._STAR_read_delim_STAR_;
cljs.tools.reader._STAR_read_delim_STAR_ = true;

try{return cljs.tools.reader.read_delimited_internal(delim,rdr,opts,pending_forms);
}finally {cljs.tools.reader._STAR_read_delim_STAR_ = _STAR_read_delim_STAR_11692;
}});
/**
 * Read in a list, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_list = (function cljs$tools$reader$read_list(rdr,_,opts,pending_forms){
var vec__11695 = cljs.tools.reader.starting_line_col_info(rdr);
var start_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11695,(0),null);
var start_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11695,(1),null);
var the_list = cljs.tools.reader.read_delimited(")",rdr,opts,pending_forms);
var vec__11696 = cljs.tools.reader.ending_line_col_info(rdr);
var end_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11696,(0),null);
var end_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11696,(1),null);
return cljs.core.with_meta(((cljs.core.empty_QMARK_(the_list))?cljs.core.List.EMPTY:cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,the_list)),(cljs.core.truth_(start_line)?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var temp__4657__auto__ = cljs.tools.reader.reader_types.get_file_name(rdr);
if(cljs.core.truth_(temp__4657__auto__)){
var file = temp__4657__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$line,start_line,cljs.core.cst$kw$column,start_column,cljs.core.cst$kw$end_DASH_line,end_line,cljs.core.cst$kw$end_DASH_column,end_column], null)], 0)):null));
});
/**
 * Read in a vector, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_vector = (function cljs$tools$reader$read_vector(rdr,_,opts,pending_forms){
var vec__11699 = cljs.tools.reader.starting_line_col_info(rdr);
var start_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11699,(0),null);
var start_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11699,(1),null);
var the_vector = cljs.tools.reader.read_delimited("]",rdr,opts,pending_forms);
var vec__11700 = cljs.tools.reader.ending_line_col_info(rdr);
var end_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11700,(0),null);
var end_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11700,(1),null);
return cljs.core.with_meta(the_vector,(cljs.core.truth_(start_line)?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var temp__4657__auto__ = cljs.tools.reader.reader_types.get_file_name(rdr);
if(cljs.core.truth_(temp__4657__auto__)){
var file = temp__4657__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$line,start_line,cljs.core.cst$kw$column,start_column,cljs.core.cst$kw$end_DASH_line,end_line,cljs.core.cst$kw$end_DASH_column,end_column], null)], 0)):null));
});
/**
 * Read in a map, including its location if the reader is an indexing reader
 */
cljs.tools.reader.read_map = (function cljs$tools$reader$read_map(rdr,_,opts,pending_forms){
var vec__11703 = cljs.tools.reader.starting_line_col_info(rdr);
var start_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11703,(0),null);
var start_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11703,(1),null);
var the_map = cljs.tools.reader.read_delimited("}",rdr,opts,pending_forms);
var map_count = cljs.core.count(the_map);
var vec__11704 = cljs.tools.reader.ending_line_col_info(rdr);
var end_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11704,(0),null);
var end_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11704,(1),null);
if(cljs.core.odd_QMARK_(map_count)){
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Map literal must contain an even number of forms"], 0));
} else {
}

return cljs.core.with_meta((((map_count === (0)))?cljs.core.PersistentArrayMap.EMPTY:cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,cljs.core.to_array(the_map))),(cljs.core.truth_(start_line)?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var temp__4657__auto__ = cljs.tools.reader.reader_types.get_file_name(rdr);
if(cljs.core.truth_(temp__4657__auto__)){
var file = temp__4657__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$line,start_line,cljs.core.cst$kw$column,start_column,cljs.core.cst$kw$end_DASH_line,end_line,cljs.core.cst$kw$end_DASH_column,end_column], null)], 0)):null));
});
cljs.tools.reader.read_number = (function cljs$tools$reader$read_number(rdr,initch){
var sb = (function (){var G__11707 = (new goog.string.StringBuffer());
G__11707.append(initch);

return G__11707;
})();
var ch = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
while(true){
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.tools.reader.impl.utils.whitespace_QMARK_(ch);
if(or__5862__auto__){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = (cljs.tools.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.macros.cljs$core$IFn$_invoke$arity$1(ch) : cljs.tools.reader.macros.call(null,ch));
if(cljs.core.truth_(or__5862__auto____$1)){
return or__5862__auto____$1;
} else {
return (ch == null);
}
}
})())){
var s = [cljs.core.str(sb)].join('');
rdr.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(null,ch);

var or__5862__auto__ = cljs.tools.reader.impl.commons.match_number(s);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Invalid number format [",s,"]"], 0));
}
} else {
var G__11709 = (function (){var G__11708 = sb;
G__11708.append(ch);

return G__11708;
})();
var G__11710 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
sb = G__11709;
ch = G__11710;
continue;
}
break;
}
});
cljs.tools.reader.escape_char = (function cljs$tools$reader$escape_char(sb,rdr){
var ch = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
var G__11714 = ch;
switch (G__11714) {
case "t":
return "\t";

break;
case "r":
return "\r";

break;
case "n":
return "\n";

break;
case "\\":
return "\\";

break;
case "\"":
return "\"";

break;
case "b":
return "\b";

break;
case "f":
return "\f";

break;
case "u":
var ch__$1 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(((-1) === (function (){var G__11715 = (ch__$1 | (0));
var G__11716 = (16);
return parseInt(G__11715,G__11716);
})())){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Invalid unicode escape: \\u",ch__$1], 0));
} else {
return cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5(rdr,ch__$1,(16),(4),true);
}

break;
default:
if(cljs.tools.reader.impl.utils.numeric_QMARK_(ch)){
var ch__$1 = cljs.tools.reader.read_unicode_char.cljs$core$IFn$_invoke$arity$5(rdr,ch,(8),(3),false);
if(((ch__$1 | (0)) > (223))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Octal escape sequence must be in range [0, 377]"], 0));
} else {
return ch__$1;
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Unsupported escape character: \\",ch], 0));
}

}
});
cljs.tools.reader.read_string_STAR_ = (function cljs$tools$reader$read_string_STAR_(reader,_,opts,pending_forms){
var sb = (new goog.string.StringBuffer());
var ch = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
while(true){
if((ch == null)){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["EOF while reading string"], 0));
} else {
var G__11721 = ch;
switch (G__11721) {
case "\\":
var G__11725 = (function (){var G__11722 = sb;
G__11722.append(cljs.tools.reader.escape_char(sb,reader));

return G__11722;
})();
var G__11726 = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
sb = G__11725;
ch = G__11726;
continue;

break;
case "\"":
return [cljs.core.str(sb)].join('');

break;
default:
var G__11727 = (function (){var G__11723 = sb;
G__11723.append(ch);

return G__11723;
})();
var G__11728 = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
sb = G__11727;
ch = G__11728;
continue;

}
}
break;
}
});
cljs.tools.reader.loc_info = (function cljs$tools$reader$loc_info(rdr,line,column){
if((line == null)){
return null;
} else {
var file = cljs.tools.reader.reader_types.get_file_name(rdr);
var filem = (((file == null))?null:new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file], null));
var vec__11730 = cljs.tools.reader.ending_line_col_info(rdr);
var end_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11730,(0),null);
var end_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11730,(1),null);
var lcm = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$column,column,cljs.core.cst$kw$end_DASH_line,end_line,cljs.core.cst$kw$end_DASH_column,end_column], null);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([filem,lcm], 0));
}
});
cljs.tools.reader.read_symbol = (function cljs$tools$reader$read_symbol(rdr,initch){
var vec__11733 = cljs.tools.reader.starting_line_col_info(rdr);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11733,(0),null);
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11733,(1),null);
var token = cljs.tools.reader.read_token(rdr,initch);
if((token == null)){
return null;
} else {
var G__11734 = token;
switch (G__11734) {
case "nil":
return null;

break;
case "true":
return true;

break;
case "false":
return false;

break;
case "/":
return cljs.core.cst$sym$_SLASH_;

break;
case "NaN":
return Number.NaN;

break;
case "-Infinity":
return Number.NEGATIVE_INFINITY;

break;
case "Infinity":
case "+Infinity":
return Number.POSITIVE_INFINITY;

break;
default:
var p = cljs.tools.reader.impl.commons.parse_symbol(token);
if(!((p == null))){
var sym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(p.cljs$core$IIndexed$_nth$arity$2(null,(0)),p.cljs$core$IIndexed$_nth$arity$2(null,(1)));
return sym.cljs$core$IWithMeta$_with_meta$arity$2(null,cljs.tools.reader.loc_info(rdr,line,column));
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Invalid token: ",token], 0));
}

}
}
});
/**
 * Map from ns alias to ns, if non-nil, it will be used to resolve read-time
 * ns aliases.
 * 
 * Defaults to nil
 */
cljs.tools.reader._STAR_alias_map_STAR_ = null;
cljs.tools.reader.resolve_ns = (function cljs$tools$reader$resolve_ns(sym){
var or__5862__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.tools.reader._STAR_alias_map_STAR_,sym);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var temp__4657__auto__ = cljs.core.find_ns(sym);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(ns));
} else {
return null;
}
}
});
cljs.tools.reader.read_keyword = (function cljs$tools$reader$read_keyword(reader,initch,opts,pending_forms){
var ch = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(!(cljs.tools.reader.impl.utils.whitespace_QMARK_(ch))){
var token = cljs.tools.reader.read_token(reader,ch);
var s = cljs.tools.reader.impl.commons.parse_symbol(token);
if(!((s == null))){
var ns = s.cljs$core$IIndexed$_nth$arity$2(null,(0));
var name = s.cljs$core$IIndexed$_nth$arity$2(null,(1));
if((":" === token.charAt((0)))){
if(!((ns == null))){
var ns__$1 = cljs.tools.reader.resolve_ns(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(ns,(1))));
if(!((ns__$1 == null))){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2([cljs.core.str(ns__$1)].join(''),name);
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Invalid token: :",token], 0));
}
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.core._STAR_ns_STAR_)].join(''),cljs.core.subs.cljs$core$IFn$_invoke$arity$2(name,(1)));
}
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(ns,name);
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Invalid token: :",token], 0));
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["Invalid token: :"], 0));
}
});
/**
 * Returns a function which wraps a reader in a call to sym
 */
cljs.tools.reader.wrapping_reader = (function cljs$tools$reader$wrapping_reader(sym){
return (function (rdr,_,opts,pending_forms){
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,(cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms))),sym);
});
});
/**
 * Read metadata and return the following object with the metadata applied
 */
cljs.tools.reader.read_meta = (function cljs$tools$reader$read_meta(rdr,_,opts,pending_forms){
if((cljs.tools.reader.reader_types.source_logging_reader_QMARK_(rdr)) && (!(cljs.tools.reader.impl.utils.whitespace_QMARK_(cljs.tools.reader.reader_types.peek_char(rdr))))){
return cljs.tools.reader.reader_types.log_source_STAR_(rdr,(function (){
var vec__11742 = cljs.tools.reader.starting_line_col_info(rdr);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11742,(0),null);
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11742,(1),null);
var m = cljs.tools.reader.impl.utils.desugar_meta((cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms)));
if(cljs.core.map_QMARK_(m)){
} else {
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata must be Symbol, Keyword, String or Map"], 0));
}

var o = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(((!((o == null)))?((((o.cljs$lang$protocol_mask$partition0$ & (131072))) || (o.cljs$core$IMeta$))?true:false):false)){
var m__$1 = (cljs.core.truth_((function (){var and__5850__auto__ = line;
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core.seq_QMARK_(o);
} else {
return and__5850__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$line,line,cljs.core.array_seq([cljs.core.cst$kw$column,column], 0)):m);
if(((!((o == null)))?((((o.cljs$lang$protocol_mask$partition0$ & (262144))) || (o.cljs$core$IWithMeta$))?true:false):false)){
return cljs.core.with_meta(o,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.meta(o),m__$1], 0)));
} else {
return cljs.core.reset_meta_BANG_(o,m__$1);
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata can only be applied to IMetas"], 0));
}
}));
} else {
var vec__11745 = cljs.tools.reader.starting_line_col_info(rdr);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11745,(0),null);
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11745,(1),null);
var m = cljs.tools.reader.impl.utils.desugar_meta((cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms)));
if(cljs.core.map_QMARK_(m)){
} else {
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata must be Symbol, Keyword, String or Map"], 0));
}

var o = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(((!((o == null)))?((((o.cljs$lang$protocol_mask$partition0$ & (131072))) || (o.cljs$core$IMeta$))?true:false):false)){
var m__$1 = (cljs.core.truth_((function (){var and__5850__auto__ = line;
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core.seq_QMARK_(o);
} else {
return and__5850__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$line,line,cljs.core.array_seq([cljs.core.cst$kw$column,column], 0)):m);
if(((!((o == null)))?((((o.cljs$lang$protocol_mask$partition0$ & (262144))) || (o.cljs$core$IWithMeta$))?true:false):false)){
return cljs.core.with_meta(o,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.meta(o),m__$1], 0)));
} else {
return cljs.core.reset_meta_BANG_(o,m__$1);
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Metadata can only be applied to IMetas"], 0));
}
}
});
cljs.tools.reader.read_set = (function cljs$tools$reader$read_set(rdr,_,opts,pending_forms){
var vec__11750 = cljs.tools.reader.starting_line_col_info(rdr);
var start_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11750,(0),null);
var start_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11750,(1),null);
var start_column__$1 = (cljs.core.truth_(start_column)?((start_column - (1)) | (0)):null);
var the_set = cljs.core.set(cljs.tools.reader.read_delimited("}",rdr,opts,pending_forms));
var vec__11751 = cljs.tools.reader.ending_line_col_info(rdr);
var end_line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11751,(0),null);
var end_column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__11751,(1),null);
return cljs.core.with_meta(the_set,(cljs.core.truth_(start_line)?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var temp__4657__auto__ = cljs.tools.reader.reader_types.get_file_name(rdr);
if(cljs.core.truth_(temp__4657__auto__)){
var file = temp__4657__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file], null);
} else {
return null;
}
})(),new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$line,start_line,cljs.core.cst$kw$column,start_column__$1,cljs.core.cst$kw$end_DASH_line,end_line,cljs.core.cst$kw$end_DASH_column,end_column], null)], 0)):null));
});
/**
 * Read and discard the first object from rdr
 */
cljs.tools.reader.read_discard = (function cljs$tools$reader$read_discard(rdr,_,opts,pending_forms){
var G__11753 = rdr;
(cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(G__11753,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,G__11753,true,null,opts,pending_forms));

return G__11753;
});
cljs.tools.reader.RESERVED_FEATURES = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$else,null,cljs.core.cst$kw$none,null], null), null);
cljs.tools.reader.has_feature_QMARK_ = (function cljs$tools$reader$has_feature_QMARK_(rdr,feature,opts){
if((feature instanceof cljs.core.Keyword)){
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$default,feature)) || (cljs.core.contains_QMARK_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(opts,cljs.core.cst$kw$features),feature));
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq([[cljs.core.str("Feature should be a keyword: "),cljs.core.str(feature)].join('')], 0));
}
});
cljs.tools.reader.check_eof_error = (function cljs$tools$reader$check_eof_error(form,rdr,first_line){
if((form === cljs.tools.reader.READ_EOF)){
if((first_line < (0))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading"], 0));
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading, starting at line ",first_line], 0));
}
} else {
return null;
}
});
cljs.tools.reader.check_reserved_features = (function cljs$tools$reader$check_reserved_features(rdr,form){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.tools.reader.RESERVED_FEATURES,form))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq([[cljs.core.str("Feature name "),cljs.core.str(form),cljs.core.str(" is reserved")].join('')], 0));
} else {
return null;
}
});
cljs.tools.reader.check_invalid_read_cond = (function cljs$tools$reader$check_invalid_read_cond(form,rdr,first_line){
if((form === cljs.tools.reader.READ_FINISHED)){
if((first_line < (0))){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["read-cond requires an even number of forms"], 0));
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq([[cljs.core.str("read-cond starting on line "),cljs.core.str(first_line),cljs.core.str(" requires an even number of forms")].join('')], 0));
}
} else {
return null;
}
});
/**
 * Read next form and suppress. Return nil or READ_FINISHED.
 */
cljs.tools.reader.read_suppress = (function cljs$tools$reader$read_suppress(first_line,rdr,opts,pending_forms){
var _STAR_suppress_read_STAR_11755 = cljs.tools.reader._STAR_suppress_read_STAR_;
cljs.tools.reader._STAR_suppress_read_STAR_ = true;

try{var form = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms));
cljs.tools.reader.check_eof_error(form,rdr,first_line);

if((form === cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
return null;
}
}finally {cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR_11755;
}});
if(typeof cljs.tools.reader.NO_MATCH !== 'undefined'){
} else {
cljs.tools.reader.NO_MATCH = (new Object());
}
/**
 * Read next feature. If matched, read next form and return.
 * Otherwise, read and skip next form, returning READ_FINISHED or nil.
 */
cljs.tools.reader.match_feature = (function cljs$tools$reader$match_feature(first_line,rdr,opts,pending_forms){
var feature = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms));
cljs.tools.reader.check_eof_error(feature,rdr,first_line);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(feature,cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
cljs.tools.reader.check_reserved_features(rdr,feature);

if(cljs.core.truth_(cljs.tools.reader.has_feature_QMARK_(rdr,feature,opts))){
var G__11757 = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,false,cljs.tools.reader.READ_EOF,")",opts,pending_forms));
cljs.tools.reader.check_eof_error(G__11757,rdr,first_line);

cljs.tools.reader.check_invalid_read_cond(G__11757,rdr,first_line);

return G__11757;
} else {
var or__5862__auto__ = cljs.tools.reader.read_suppress(first_line,rdr,opts,pending_forms);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.tools.reader.NO_MATCH;
}
}
}
});
cljs.tools.reader.read_cond_delimited = (function cljs$tools$reader$read_cond_delimited(rdr,splicing,opts,pending_forms){
var first_line = (cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(rdr))?cljs.tools.reader.reader_types.get_line_number(rdr):(-1));
var result = (function (){var matched = cljs.tools.reader.NO_MATCH;
var finished = null;
while(true){
if((matched === cljs.tools.reader.NO_MATCH)){
var match = cljs.tools.reader.match_feature(first_line,rdr,opts,pending_forms);
if((match === cljs.tools.reader.READ_FINISHED)){
return cljs.tools.reader.READ_FINISHED;
} else {
var G__11766 = match;
var G__11767 = null;
matched = G__11766;
finished = G__11767;
continue;
}
} else {
if(!((finished === cljs.tools.reader.READ_FINISHED))){
var G__11768 = matched;
var G__11769 = cljs.tools.reader.read_suppress(first_line,rdr,opts,pending_forms);
matched = G__11768;
finished = G__11769;
continue;
} else {
return matched;

}
}
break;
}
})();
if((result === cljs.tools.reader.READ_FINISHED)){
return rdr;
} else {
if(cljs.core.truth_(splicing)){
if(((!((result == null)))?((((result.cljs$lang$protocol_mask$partition0$ & (16777216))) || (result.cljs$core$ISequential$))?true:false):false)){
var G__11763_11770 = pending_forms;
var G__11764_11771 = cljs.core.to_array(result);
var G__11765_11772 = (0);
goog.array.insertArrayAt(G__11763_11770,G__11764_11771,G__11765_11772);

return rdr;
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Spliced form list in read-cond-splicing must implement java.util.List."], 0));
}
} else {
return result;
}
}
});
cljs.tools.reader.read_cond = (function cljs$tools$reader$read_cond(rdr,_,opts,pending_forms){
if(cljs.core.not((function (){var and__5850__auto__ = opts;
if(cljs.core.truth_(and__5850__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$preserve,null,cljs.core.cst$kw$allow,null], null), null).call(null,cljs.core.cst$kw$read_DASH_cond.cljs$core$IFn$_invoke$arity$1(opts));
} else {
return and__5850__auto__;
}
})())){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Conditional read not allowed",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$runtime_DASH_exception], null));
} else {
}

var temp__4655__auto__ = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.core.truth_(temp__4655__auto__)){
var ch = temp__4655__auto__;
var splicing = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ch,"@");
var ch__$1 = ((splicing)?rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null):ch);
if(splicing){
if(cljs.core.truth_(cljs.tools.reader._STAR_read_delim_STAR_)){
} else {
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["cond-splice not in list"], 0));
}
} else {
}

var temp__4655__auto____$1 = ((cljs.tools.reader.impl.utils.whitespace_QMARK_(ch__$1))?cljs.tools.reader.impl.commons.read_past(cljs.tools.reader.impl.utils.whitespace_QMARK_,rdr):ch__$1);
if(cljs.core.truth_(temp__4655__auto____$1)){
var ch__$2 = temp__4655__auto____$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(ch__$2,"(")){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("read-cond body must be a list",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$runtime_DASH_exception], null));
} else {
var _STAR_suppress_read_STAR_11774 = cljs.tools.reader._STAR_suppress_read_STAR_;
cljs.tools.reader._STAR_suppress_read_STAR_ = (function (){var or__5862__auto__ = cljs.tools.reader._STAR_suppress_read_STAR_;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$preserve,cljs.core.cst$kw$read_DASH_cond.cljs$core$IFn$_invoke$arity$1(opts));
}
})();

try{if(cljs.core.truth_(cljs.tools.reader._STAR_suppress_read_STAR_)){
return cljs.tools.reader.impl.utils.reader_conditional(cljs.tools.reader.read_list(rdr,ch__$2,opts,pending_forms),splicing);
} else {
return cljs.tools.reader.read_cond_delimited(rdr,splicing,opts,pending_forms);
}
}finally {cljs.tools.reader._STAR_suppress_read_STAR_ = _STAR_suppress_read_STAR_11774;
}}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading character"], 0));
}
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["EOF while reading character"], 0));
}
});
cljs.tools.reader.arg_env = null;
/**
 * Get a symbol for an anonymous ?argument?
 */
cljs.tools.reader.garg = (function cljs$tools$reader$garg(n){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(((((-1) === n))?"rest":[cljs.core.str("p"),cljs.core.str(n)].join(''))),cljs.core.str("__"),cljs.core.str(cljs.tools.reader.impl.utils.next_id()),cljs.core.str("#")].join(''));
});
cljs.tools.reader.read_fn = (function cljs$tools$reader$read_fn(rdr,_,opts,pending_forms){
if(cljs.core.truth_(cljs.tools.reader.arg_env)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Nested #()s are not allowed",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_state], null));
} else {
}

var arg_env11783 = cljs.tools.reader.arg_env;
cljs.tools.reader.arg_env = cljs.core.sorted_map();

try{var form = (function (){var G__11785 = (function (){var G__11790 = rdr;
cljs.tools.reader.reader_types.unread(G__11790,"(");

return G__11790;
})();
var G__11786 = true;
var G__11787 = null;
var G__11788 = opts;
var G__11789 = pending_forms;
return (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(G__11785,G__11786,G__11787,G__11788,G__11789) : cljs.tools.reader.read_STAR_.call(null,G__11785,G__11786,G__11787,G__11788,G__11789));
})();
var rargs = cljs.core.rseq(cljs.tools.reader.arg_env);
var args = ((rargs)?(function (){var higharg = cljs.core.key(cljs.core.first(rargs));
var args = (function (){var i = (1);
var args = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if((i > higharg)){
return cljs.core.persistent_BANG_(args);
} else {
var G__11791 = (i + (1));
var G__11792 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(args,(function (){var or__5862__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.tools.reader.arg_env,i);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.tools.reader.garg(i);
}
})());
i = G__11791;
args = G__11792;
continue;
}
break;
}
})();
var args__$1 = (cljs.core.truth_((cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1((-1)) : cljs.tools.reader.arg_env.call(null,(-1))))?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(args,cljs.core.cst$sym$_AMPERSAND_,cljs.core.array_seq([(cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1((-1)) : cljs.tools.reader.arg_env.call(null,(-1)))], 0)):args);
return args__$1;
})():cljs.core.PersistentVector.EMPTY);
return cljs.core._conj(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,form),args),cljs.core.cst$sym$fn_STAR_);
}finally {cljs.tools.reader.arg_env = arg_env11783;
}});
/**
 * Registers an argument to the arg-env
 */
cljs.tools.reader.register_arg = (function cljs$tools$reader$register_arg(n){
if(cljs.core.truth_(cljs.tools.reader.arg_env)){
var temp__4655__auto__ = (cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.arg_env.cljs$core$IFn$_invoke$arity$1(n) : cljs.tools.reader.arg_env.call(null,n));
if(cljs.core.truth_(temp__4655__auto__)){
var ret = temp__4655__auto__;
return ret;
} else {
var g = cljs.tools.reader.garg(n);
cljs.tools.reader.arg_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.tools.reader.arg_env,n,g);

return g;
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Arg literal not in #()",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_state], null));
}
});
cljs.tools.reader.read_arg = (function cljs$tools$reader$read_arg(rdr,pct,opts,pending_forms){
if((cljs.tools.reader.arg_env == null)){
return (cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2 ? cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2(rdr,pct) : cljs.tools.reader.read_symbol.call(null,rdr,pct));
} else {
var ch = rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
if((cljs.tools.reader.impl.utils.whitespace_QMARK_(ch)) || (cljs.tools.reader.macro_terminating_QMARK_(ch)) || ((ch == null))){
return cljs.tools.reader.register_arg((1));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ch,"&")){
rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);

return cljs.tools.reader.register_arg((-1));
} else {
var n = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(!(cljs.core.integer_QMARK_(n))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Arg literal must be %, %& or %integer",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_state], null));
} else {
return cljs.tools.reader.register_arg(n);
}

}
}
}
});
cljs.tools.reader.gensym_env = null;
cljs.tools.reader.read_unquote = (function cljs$tools$reader$read_unquote(rdr,comma,opts,pending_forms){
var temp__4655__auto__ = rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
if(cljs.core.truth_(temp__4655__auto__)){
var ch = temp__4655__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@",ch)){
return cljs.tools.reader.wrapping_reader(cljs.core.cst$sym$clojure$core_SLASH_unquote_DASH_splicing).call(null,(function (){var G__11794 = rdr;
G__11794.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);

return G__11794;
})(),"@",opts,pending_forms);
} else {
return cljs.tools.reader.wrapping_reader(cljs.core.cst$sym$clojure$core_SLASH_unquote).call(null,rdr,"~",opts,pending_forms);
}
} else {
return null;
}
});
cljs.tools.reader.unquote_splicing_QMARK_ = (function cljs$tools$reader$unquote_splicing_QMARK_(form){
return (cljs.core.seq_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(form),cljs.core.cst$sym$clojure$core_SLASH_unquote_DASH_splicing));
});
cljs.tools.reader.unquote_QMARK_ = (function cljs$tools$reader$unquote_QMARK_(form){
return (cljs.core.seq_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(form),cljs.core.cst$sym$clojure$core_SLASH_unquote));
});
/**
 * Expand a list by resolving its syntax quotes and unquotes
 */
cljs.tools.reader.expand_list = (function cljs$tools$reader$expand_list(s){
var s__$1 = cljs.core.seq(s);
var r = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if(s__$1){
var item = cljs.core.first(s__$1);
var ret = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(r,(cljs.core.truth_(cljs.tools.reader.unquote_QMARK_(item))?cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.second(item)),cljs.core.cst$sym$clojure$core_SLASH_list):(cljs.core.truth_(cljs.tools.reader.unquote_splicing_QMARK_(item))?cljs.core.second(item):cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,(cljs.tools.reader.syntax_quote_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.syntax_quote_STAR_.cljs$core$IFn$_invoke$arity$1(item) : cljs.tools.reader.syntax_quote_STAR_.call(null,item))),cljs.core.cst$sym$clojure$core_SLASH_list)
)));
var G__11795 = cljs.core.next(s__$1);
var G__11796 = ret;
s__$1 = G__11795;
r = G__11796;
continue;
} else {
return cljs.core.seq(cljs.core.persistent_BANG_(r));
}
break;
}
});
/**
 * Flatten a map into a seq of alternate keys and values
 */
cljs.tools.reader.flatten_map = (function cljs$tools$reader$flatten_map(form){
var s = cljs.core.seq(form);
var key_vals = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);
while(true){
if(s){
var e = cljs.core.first(s);
var G__11797 = cljs.core.next(s);
var G__11798 = cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(key_vals,cljs.core.key(e)),cljs.core.val(e));
s = G__11797;
key_vals = G__11798;
continue;
} else {
return cljs.core.seq(cljs.core.persistent_BANG_(key_vals));
}
break;
}
});
cljs.tools.reader.register_gensym = (function cljs$tools$reader$register_gensym(sym){
if(cljs.core.not(cljs.tools.reader.gensym_env)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Gensym literal not in syntax-quote",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_state], null));
} else {
}

var or__5862__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.tools.reader.gensym_env,sym);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var gs = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(cljs.core.name(sym),(0),(cljs.core.count(cljs.core.name(sym)) - (1)))),cljs.core.str("__"),cljs.core.str(cljs.tools.reader.impl.utils.next_id()),cljs.core.str("__auto__")].join(''));
cljs.tools.reader.gensym_env = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.tools.reader.gensym_env,sym,gs);

return gs;
}
});
cljs.tools.reader.add_meta = (function cljs$tools$reader$add_meta(form,ret){
if((function (){var and__5850__auto__ = ((!((form == null)))?((((form.cljs$lang$protocol_mask$partition0$ & (262144))) || (form.cljs$core$IWithMeta$))?true:false):false);
if(and__5850__auto__){
return cljs.core.seq(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.meta(form),cljs.core.cst$kw$line,cljs.core.array_seq([cljs.core.cst$kw$column,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$file,cljs.core.cst$kw$source], 0)));
} else {
return and__5850__auto__;
}
})()){
return cljs.core._conj(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,(function (){var G__11804 = cljs.core.meta(form);
return (cljs.tools.reader.syntax_quote_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.syntax_quote_STAR_.cljs$core$IFn$_invoke$arity$1(G__11804) : cljs.tools.reader.syntax_quote_STAR_.call(null,G__11804));
})()),ret),cljs.core.cst$sym$cljs$core_SLASH_with_DASH_meta);
} else {
return ret;
}
});
cljs.tools.reader.syntax_quote_coll = (function cljs$tools$reader$syntax_quote_coll(type,coll){
var res = cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cons(cljs.core.cst$sym$cljs$core_SLASH_concat,cljs.tools.reader.expand_list(coll))),cljs.core.cst$sym$cljs$core_SLASH_sequence);
if(cljs.core.truth_(type)){
return cljs.core._conj(cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,res),type),cljs.core.cst$sym$cljs$core_SLASH_apply);
} else {
return res;
}
});
/**
 * Decide which map type to use, array-map if less than 16 elements
 */
cljs.tools.reader.map_func = (function cljs$tools$reader$map_func(coll){
if((cljs.core.count(coll) >= (16))){
return cljs.core.cst$sym$cljs$core_SLASH_hash_DASH_map;
} else {
return cljs.core.cst$sym$cljs$core_SLASH_array_DASH_map;
}
});
cljs.tools.reader.bool_QMARK_ = (function cljs$tools$reader$bool_QMARK_(x){
return ((x instanceof Boolean)) || (x === true) || (x === false);
});
/**
 * Resolve a symbol s into its fully qualified namespace version
 */
cljs.tools.reader.resolve_symbol = (function cljs$tools$reader$resolve_symbol(s){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("resolve-symbol is not implemented",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$sym,s], null));
});
cljs.tools.reader.syntax_quote_STAR_ = (function cljs$tools$reader$syntax_quote_STAR_(form){
return cljs.tools.reader.add_meta(form,((cljs.core.special_symbol_QMARK_(form))?cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,form),cljs.core.cst$sym$quote):(((form instanceof cljs.core.Symbol))?cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.not(cljs.core.namespace(form));
if(and__5850__auto__){
var G__11812 = cljs.core.name(form);
var G__11813 = "#";
return goog.string.endsWith(G__11812,G__11813);
} else {
return and__5850__auto__;
}
})())?cljs.tools.reader.register_gensym(form):(cljs.tools.reader.resolve_symbol.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.resolve_symbol.cljs$core$IFn$_invoke$arity$1(form) : cljs.tools.reader.resolve_symbol.call(null,form)))),cljs.core.cst$sym$quote):(cljs.core.truth_(cljs.tools.reader.unquote_QMARK_(form))?cljs.core.second(form):(cljs.core.truth_(cljs.tools.reader.unquote_splicing_QMARK_(form))?(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("unquote-splice not in list",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$illegal_DASH_state], null))})():((cljs.core.coll_QMARK_(form))?((((!((form == null)))?((((form.cljs$lang$protocol_mask$partition0$ & (67108864))) || (form.cljs$core$IRecord$))?true:false):false))?form:((cljs.core.map_QMARK_(form))?cljs.tools.reader.syntax_quote_coll(cljs.tools.reader.map_func(form),cljs.tools.reader.flatten_map(form)):((cljs.core.vector_QMARK_(form))?cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.tools.reader.syntax_quote_coll(null,form)),cljs.core.cst$sym$cljs$core_SLASH_vec):((cljs.core.set_QMARK_(form))?cljs.tools.reader.syntax_quote_coll(cljs.core.cst$sym$cljs$core_SLASH_hash_DASH_set,form):(((cljs.core.seq_QMARK_(form)) || (cljs.core.list_QMARK_(form)))?(function (){var seq = cljs.core.seq(form);
if(seq){
return cljs.tools.reader.syntax_quote_coll(null,seq);
} else {
return cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_list);
}
})():(function(){throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("Unknown Collection type",new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$unsupported_DASH_operation], null))})()
))))):(cljs.core.truth_((function (){var or__5862__auto__ = (form instanceof cljs.core.Keyword);
if(or__5862__auto__){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = typeof form === 'number';
if(or__5862__auto____$1){
return or__5862__auto____$1;
} else {
var or__5862__auto____$2 = typeof form === 'string';
if(or__5862__auto____$2){
return or__5862__auto____$2;
} else {
var or__5862__auto____$3 = (form == null);
if(or__5862__auto____$3){
return or__5862__auto____$3;
} else {
var or__5862__auto____$4 = cljs.tools.reader.bool_QMARK_(form);
if(cljs.core.truth_(or__5862__auto____$4)){
return or__5862__auto____$4;
} else {
return (form instanceof RegExp);
}
}
}
}
}
})())?form:cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,form),cljs.core.cst$sym$quote)
)))))));
});
cljs.tools.reader.read_syntax_quote = (function cljs$tools$reader$read_syntax_quote(rdr,backquote,opts,pending_forms){
var gensym_env11816 = cljs.tools.reader.gensym_env;
cljs.tools.reader.gensym_env = cljs.core.PersistentArrayMap.EMPTY;

try{return cljs.tools.reader.syntax_quote_STAR_((cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms)));
}finally {cljs.tools.reader.gensym_env = gensym_env11816;
}});
cljs.tools.reader.macros = (function cljs$tools$reader$macros(ch){
var G__11818 = ch;
switch (G__11818) {
case "\"":
return cljs.tools.reader.read_string_STAR_;

break;
case ":":
return cljs.tools.reader.read_keyword;

break;
case ";":
return cljs.tools.reader.impl.commons.read_comment;

break;
case "'":
return cljs.tools.reader.wrapping_reader(cljs.core.cst$sym$quote);

break;
case "@":
return cljs.tools.reader.wrapping_reader(cljs.core.cst$sym$clojure$core_SLASH_deref);

break;
case "^":
return cljs.tools.reader.read_meta;

break;
case "`":
return cljs.tools.reader.read_syntax_quote;

break;
case "~":
return cljs.tools.reader.read_unquote;

break;
case "(":
return cljs.tools.reader.read_list;

break;
case ")":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "[":
return cljs.tools.reader.read_vector;

break;
case "]":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "{":
return cljs.tools.reader.read_map;

break;
case "}":
return cljs.tools.reader.read_unmatched_delimiter;

break;
case "\\":
return cljs.tools.reader.read_char_STAR_;

break;
case "%":
return cljs.tools.reader.read_arg;

break;
case "#":
return cljs.tools.reader.read_dispatch;

break;
default:
return null;

}
});
cljs.tools.reader.dispatch_macros = (function cljs$tools$reader$dispatch_macros(ch){
var G__11821 = ch;
switch (G__11821) {
case "^":
return cljs.tools.reader.read_meta;

break;
case "'":
return cljs.tools.reader.wrapping_reader(cljs.core.cst$sym$var);

break;
case "(":
return cljs.tools.reader.read_fn;

break;
case "{":
return cljs.tools.reader.read_set;

break;
case "<":
return cljs.tools.reader.impl.commons.throwing_reader("Unreadable form");

break;
case "=":
return cljs.tools.reader.impl.commons.throwing_reader("read-eval not supported");

break;
case "\"":
return cljs.tools.reader.read_regex;

break;
case "!":
return cljs.tools.reader.impl.commons.read_comment;

break;
case "_":
return cljs.tools.reader.read_discard;

break;
case "?":
return cljs.tools.reader.read_cond;

break;
default:
return null;

}
});
cljs.tools.reader.read_tagged = (function cljs$tools$reader$read_tagged(rdr,initch,opts,pending_forms){
var tag = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
if(!((tag instanceof cljs.core.Symbol))){
cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["Reader tag must be a symbol"], 0));
} else {
}

if(cljs.core.truth_(cljs.tools.reader._STAR_suppress_read_STAR_)){
return cljs.core.tagged_literal(tag,(cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms)));
} else {
var temp__4655__auto__ = (function (){var or__5862__auto__ = (cljs.tools.reader._STAR_data_readers_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader._STAR_data_readers_STAR_.cljs$core$IFn$_invoke$arity$1(tag) : cljs.tools.reader._STAR_data_readers_STAR_.call(null,tag));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (cljs.tools.reader.default_data_readers.cljs$core$IFn$_invoke$arity$1 ? cljs.tools.reader.default_data_readers.cljs$core$IFn$_invoke$arity$1(tag) : cljs.tools.reader.default_data_readers.call(null,tag));
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var f = temp__4655__auto__;
var G__11826 = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__11826) : f.call(null,G__11826));
} else {
var temp__4655__auto____$1 = cljs.tools.reader._STAR_default_data_reader_fn_STAR_;
if(cljs.core.truth_(temp__4655__auto____$1)){
var f = temp__4655__auto____$1;
var G__11827 = tag;
var G__11828 = (cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 ? cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5(rdr,true,null,opts,pending_forms) : cljs.tools.reader.read_STAR_.call(null,rdr,true,null,opts,pending_forms));
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__11827,G__11828) : f.call(null,G__11827,G__11828));
} else {
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(rdr,cljs.core.array_seq(["No reader function for tag ",cljs.core.name(tag)], 0));
}
}
}
});
/**
 * Map from reader tag symbols to data reader Vars.
 *   Reader tags without namespace qualifiers are reserved for Clojure.
 *   This light version of tools.reader has no implementation for default
 *   reader tags such as #inst and #uuid.
 */
cljs.tools.reader._STAR_data_readers_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
/**
 * When no data reader is found for a tag and *default-data-reader-fn*
 *   is non-nil, it will be called with two arguments, the tag and the value.
 *   If *default-data-reader-fn* is nil (the default value), an exception
 *   will be thrown for the unknown tag.
 */
cljs.tools.reader._STAR_default_data_reader_fn_STAR_ = null;
cljs.tools.reader._STAR_suppress_read_STAR_ = false;
/**
 * Default map of data reader functions provided by Clojure.
 *   May be overridden by binding *data-readers*
 */
cljs.tools.reader.default_data_readers = cljs.core.PersistentArrayMap.EMPTY;
cljs.tools.reader.read_STAR__internal = (function cljs$tools$reader$read_STAR__internal(reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms){
while(true){
if((cljs.tools.reader.reader_types.source_logging_reader_QMARK_(reader)) && (!(cljs.tools.reader.impl.utils.whitespace_QMARK_(reader.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null))))){
return cljs.tools.reader.reader_types.log_source_STAR_(reader,(function (){
while(true){
if(!(goog.array.isEmpty(pending_forms))){
var form = (pending_forms[(0)]);
goog.array.removeAt(pending_forms,(0));

return form;
} else {
var ch = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.tools.reader.impl.utils.whitespace_QMARK_(ch)){
continue;
} else {
if((ch == null)){
if(eof_error_QMARK_){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["EOF"], 0));
} else {
return sentinel;
}
} else {
if((ch === return_on)){
return cljs.tools.reader.READ_FINISHED;
} else {
if(cljs.tools.reader.impl.commons.number_literal_QMARK_(reader,ch)){
return cljs.tools.reader.read_number(reader,ch);
} else {
var f = cljs.tools.reader.macros(ch);
if(!((f == null))){
var res = (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(reader,ch,opts,pending_forms) : f.call(null,reader,ch,opts,pending_forms));
if((res === reader)){
continue;
} else {
return res;
}
} else {
return (cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2 ? cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2(reader,ch) : cljs.tools.reader.read_symbol.call(null,reader,ch));
}

}
}
}
}
}
break;
}
}));
} else {
if(!(goog.array.isEmpty(pending_forms))){
var form = (pending_forms[(0)]);
goog.array.removeAt(pending_forms,(0));

return form;
} else {
var ch = reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.tools.reader.impl.utils.whitespace_QMARK_(ch)){
continue;
} else {
if((ch == null)){
if(eof_error_QMARK_){
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(reader,cljs.core.array_seq(["EOF"], 0));
} else {
return sentinel;
}
} else {
if((ch === return_on)){
return cljs.tools.reader.READ_FINISHED;
} else {
if(cljs.tools.reader.impl.commons.number_literal_QMARK_(reader,ch)){
return cljs.tools.reader.read_number(reader,ch);
} else {
var f = cljs.tools.reader.macros(ch);
if(!((f == null))){
var res = (f.cljs$core$IFn$_invoke$arity$4 ? f.cljs$core$IFn$_invoke$arity$4(reader,ch,opts,pending_forms) : f.call(null,reader,ch,opts,pending_forms));
if((res === reader)){
continue;
} else {
return res;
}
} else {
return (cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2 ? cljs.tools.reader.read_symbol.cljs$core$IFn$_invoke$arity$2(reader,ch) : cljs.tools.reader.read_symbol.call(null,reader,ch));
}

}
}
}
}
}
}
break;
}
});
cljs.tools.reader.read_STAR_ = (function cljs$tools$reader$read_STAR_(var_args){
var args11829 = [];
var len__6931__auto___11833 = arguments.length;
var i__6932__auto___11834 = (0);
while(true){
if((i__6932__auto___11834 < len__6931__auto___11833)){
args11829.push((arguments[i__6932__auto___11834]));

var G__11835 = (i__6932__auto___11834 + (1));
i__6932__auto___11834 = G__11835;
continue;
} else {
}
break;
}

var G__11831 = args11829.length;
switch (G__11831) {
case 5:
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11829.length)].join('')));

}
});

cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$5 = (function (reader,eof_error_QMARK_,sentinel,opts,pending_forms){
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(reader,eof_error_QMARK_,sentinel,null,opts,pending_forms);
});

cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6 = (function (reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms){
try{return cljs.tools.reader.read_STAR__internal(reader,eof_error_QMARK_,sentinel,return_on,opts,pending_forms);
}catch (e11832){if((e11832 instanceof Error)){
var e = e11832;
if(cljs.tools.reader.impl.utils.ex_info_QMARK_(e)){
var d = cljs.core.ex_data(e);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$reader_DASH_exception,cljs.core.cst$kw$type.cljs$core$IFn$_invoke$arity$1(d))){
throw e;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(e.message,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$reader_DASH_exception], null),d,(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(reader))?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(null),cljs.core.cst$kw$column,reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(null),cljs.core.cst$kw$file,reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1(null)], null):null)], 0)),e);
}
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$3(e.message,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$reader_DASH_exception], null),(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(reader))?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(null),cljs.core.cst$kw$column,reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(null),cljs.core.cst$kw$file,reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1(null)], null):null)], 0)),e);
}
} else {
throw e11832;

}
}});

cljs.tools.reader.read_STAR_.cljs$lang$maxFixedArity = 6;
/**
 * Reads the first object from an IPushbackReader or a java.io.PushbackReader.
 * Returns the object read. If EOF, throws if eof-error? is true.
 * Otherwise returns sentinel. If no stream is providen, *in* will be used.
 * 
 * Opts is a persistent map with valid keys:
 *  :read-cond - :allow to process reader conditionals, or
 *               :preserve to keep all branches
 *  :features - persistent set of feature keywords for reader conditionals
 *  :eof - on eof, return value unless :eofthrow, then throw.
 *         if not specified, will throw
 * 
 * To read data structures only, use clojure.tools.reader.edn/read
 * 
 * Note that the function signature of clojure.tools.reader/read and
 * clojure.tools.reader.edn/read is not the same for eof-handling
 */
cljs.tools.reader.read = (function cljs$tools$reader$read(var_args){
var args11837 = [];
var len__6931__auto___11843 = arguments.length;
var i__6932__auto___11844 = (0);
while(true){
if((i__6932__auto___11844 < len__6931__auto___11843)){
args11837.push((arguments[i__6932__auto___11844]));

var G__11845 = (i__6932__auto___11844 + (1));
i__6932__auto___11844 = G__11845;
continue;
} else {
}
break;
}

var G__11839 = args11837.length;
switch (G__11839) {
case 1:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11837.length)].join('')));

}
});

cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$1 = (function (reader){
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$3(reader,true,null);
});

cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2 = (function (p__11840,reader){
var map__11841 = p__11840;
var map__11841__$1 = ((((!((map__11841 == null)))?((((map__11841.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11841.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__11841):map__11841);
var opts = map__11841__$1;
var eof = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__11841__$1,cljs.core.cst$kw$eof,cljs.core.cst$kw$eofthrow);
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(reader,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(eof,cljs.core.cst$kw$eofthrow),eof,null,opts,cljs.core.to_array(cljs.core.PersistentVector.EMPTY));
});

cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$3 = (function (reader,eof_error_QMARK_,sentinel){
return cljs.tools.reader.read_STAR_.cljs$core$IFn$_invoke$arity$6(reader,eof_error_QMARK_,sentinel,null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.to_array(cljs.core.PersistentVector.EMPTY));
});

cljs.tools.reader.read.cljs$lang$maxFixedArity = 3;
/**
 * Reads one object from the string s.
 * Returns nil when s is nil or empty.
 * 
 * To read data structures only, use clojure.tools.reader.edn/read-string
 * 
 * Note that the function signature of clojure.tools.reader/read-string and
 * clojure.tools.reader.edn/read-string is not the same for eof-handling
 */
cljs.tools.reader.read_string = (function cljs$tools$reader$read_string(var_args){
var args11847 = [];
var len__6931__auto___11850 = arguments.length;
var i__6932__auto___11851 = (0);
while(true){
if((i__6932__auto___11851 < len__6931__auto___11850)){
args11847.push((arguments[i__6932__auto___11851]));

var G__11852 = (i__6932__auto___11851 + (1));
i__6932__auto___11851 = G__11852;
continue;
} else {
}
break;
}

var G__11849 = args11847.length;
switch (G__11849) {
case 1:
return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11847.length)].join('')));

}
});

cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,s);
});

cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2 = (function (opts,s){
if(cljs.core.truth_((function (){var and__5850__auto__ = s;
if(cljs.core.truth_(and__5850__auto__)){
return !((s === ""));
} else {
return and__5850__auto__;
}
})())){
return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2(opts,cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1(s));
} else {
return null;
}
});

cljs.tools.reader.read_string.cljs$lang$maxFixedArity = 2;
