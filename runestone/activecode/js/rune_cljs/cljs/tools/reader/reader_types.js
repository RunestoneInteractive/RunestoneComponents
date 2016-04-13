// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
goog.provide('cljs.tools.reader.reader_types');
goog.require('cljs.core');
goog.require('cljs.tools.reader.impl.utils');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');

/**
 * @interface
 */
cljs.tools.reader.reader_types.Reader = function(){};

/**
 * Returns the next char from the Reader, nil if the end of stream has been reached
 */
cljs.tools.reader.reader_types.read_char = (function cljs$tools$reader$reader_types$read_char(reader){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1 == null)))){
return reader.cljs$tools$reader$reader_types$Reader$read_char$arity$1(reader);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.read_char[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto__.call(null,reader));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.read_char["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto____$1.call(null,reader));
} else {
throw cljs.core.missing_protocol("Reader.read-char",reader);
}
}
}
});

/**
 * Returns the next char from the Reader without removing it from the reader stream
 */
cljs.tools.reader.reader_types.peek_char = (function cljs$tools$reader$reader_types$peek_char(reader){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 == null)))){
return reader.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(reader);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.peek_char[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto__.call(null,reader));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.peek_char["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto____$1.call(null,reader));
} else {
throw cljs.core.missing_protocol("Reader.peek-char",reader);
}
}
}
});


/**
 * @interface
 */
cljs.tools.reader.reader_types.IPushbackReader = function(){};

/**
 * Pushes back a single character on to the stream
 */
cljs.tools.reader.reader_types.unread = (function cljs$tools$reader$reader_types$unread(reader,ch){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 == null)))){
return reader.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(reader,ch);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.unread[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$2 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$2(reader,ch) : m__6526__auto__.call(null,reader,ch));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.unread["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$2(reader,ch) : m__6526__auto____$1.call(null,reader,ch));
} else {
throw cljs.core.missing_protocol("IPushbackReader.unread",reader);
}
}
}
});


/**
 * @interface
 */
cljs.tools.reader.reader_types.IndexingReader = function(){};

/**
 * Returns the line number of the next character to be read from the stream
 */
cljs.tools.reader.reader_types.get_line_number = (function cljs$tools$reader$reader_types$get_line_number(reader){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 == null)))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1(reader);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.get_line_number[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto__.call(null,reader));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.get_line_number["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto____$1.call(null,reader));
} else {
throw cljs.core.missing_protocol("IndexingReader.get-line-number",reader);
}
}
}
});

/**
 * Returns the column number of the next character to be read from the stream
 */
cljs.tools.reader.reader_types.get_column_number = (function cljs$tools$reader$reader_types$get_column_number(reader){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 == null)))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(reader);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.get_column_number[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto__.call(null,reader));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.get_column_number["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto____$1.call(null,reader));
} else {
throw cljs.core.missing_protocol("IndexingReader.get-column-number",reader);
}
}
}
});

/**
 * Returns the file name the reader is reading from, or nil
 */
cljs.tools.reader.reader_types.get_file_name = (function cljs$tools$reader$reader_types$get_file_name(reader){
if((!((reader == null))) && (!((reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 == null)))){
return reader.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1(reader);
} else {
var x__6525__auto__ = (((reader == null))?null:reader);
var m__6526__auto__ = (cljs.tools.reader.reader_types.get_file_name[goog.typeOf(x__6525__auto__)]);
if(!((m__6526__auto__ == null))){
return (m__6526__auto__.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto__.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto__.call(null,reader));
} else {
var m__6526__auto____$1 = (cljs.tools.reader.reader_types.get_file_name["_"]);
if(!((m__6526__auto____$1 == null))){
return (m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__6526__auto____$1.cljs$core$IFn$_invoke$arity$1(reader) : m__6526__auto____$1.call(null,reader));
} else {
throw cljs.core.missing_protocol("IndexingReader.get-file-name",reader);
}
}
}
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
*/
cljs.tools.reader.reader_types.StringReader = (function (s,s_len,s_pos){
this.s = s;
this.s_len = s_len;
this.s_pos = s_pos;
})
cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$ = true;

cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if((self__.s_len > self__.s_pos)){
var r = self__.s.charAt(self__.s_pos);
self__.s_pos = (self__.s_pos + (1));

return r;
} else {
return null;
}
});

cljs.tools.reader.reader_types.StringReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if((self__.s_len > self__.s_pos)){
return self__.s.charAt(self__.s_pos);
} else {
return null;
}
});

cljs.tools.reader.reader_types.StringReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$s,cljs.core.cst$sym$s_DASH_len,cljs.core.with_meta(cljs.core.cst$sym$s_DASH_pos,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.tools.reader.reader_types.StringReader.cljs$lang$type = true;

cljs.tools.reader.reader_types.StringReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/StringReader";

cljs.tools.reader.reader_types.StringReader.cljs$lang$ctorPrWriter = (function (this__6468__auto__,writer__6469__auto__,opt__6470__auto__){
return cljs.core._write(writer__6469__auto__,"cljs.tools.reader.reader-types/StringReader");
});

cljs.tools.reader.reader_types.__GT_StringReader = (function cljs$tools$reader$reader_types$__GT_StringReader(s,s_len,s_pos){
return (new cljs.tools.reader.reader_types.StringReader(s,s_len,s_pos));
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
*/
cljs.tools.reader.reader_types.NodeReadableReader = (function (readable,buf){
this.readable = readable;
this.buf = buf;
})
cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$ = true;

cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.buf)){
var c = (self__.buf[(0)]);
self__.buf = null;

return cljs.tools.reader.impl.utils.char$(c);
} else {
var c = [cljs.core.str(self__.readable.read((1)))].join('');
if(cljs.core.truth_(c)){
return cljs.tools.reader.impl.utils.char$(c);
} else {
return null;
}
}
});

cljs.tools.reader.reader_types.NodeReadableReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.buf)){
} else {
self__.buf = [cljs.core.str(self__.readable.read((1)))].join('');
}

if(cljs.core.truth_(self__.buf)){
return cljs.tools.reader.impl.utils.char$((self__.buf[(0)]));
} else {
return null;
}
});

cljs.tools.reader.reader_types.NodeReadableReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$readable,cljs.core.with_meta(cljs.core.cst$sym$buf,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$type = true;

cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/NodeReadableReader";

cljs.tools.reader.reader_types.NodeReadableReader.cljs$lang$ctorPrWriter = (function (this__6468__auto__,writer__6469__auto__,opt__6470__auto__){
return cljs.core._write(writer__6469__auto__,"cljs.tools.reader.reader-types/NodeReadableReader");
});

cljs.tools.reader.reader_types.__GT_NodeReadableReader = (function cljs$tools$reader$reader_types$__GT_NodeReadableReader(readable,buf){
return (new cljs.tools.reader.reader_types.NodeReadableReader(readable,buf));
});


/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.PushbackReader = (function (rdr,buf,buf_len,buf_pos){
this.rdr = rdr;
this.buf = buf;
this.buf_len = buf_len;
this.buf_pos = buf_pos;
})
cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = true;

cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var c = (((self__.buf_pos < self__.buf_len))?(self__.buf[self__.buf_pos]):self__.rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null));
if((self__.buf_pos < self__.buf_len)){
self__.buf_pos = (self__.buf_pos + (1));
} else {
}

return cljs.tools.reader.impl.utils.char$(c);
});

cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var c = (((self__.buf_pos < self__.buf_len))?(self__.buf[self__.buf_pos]):self__.rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null));
return cljs.tools.reader.impl.utils.char$(c);
});

cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = true;

cljs.tools.reader.reader_types.PushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(ch)){
if((self__.buf_pos === (0))){
throw (new Error("Pushback buffer is full"));
} else {
}

self__.buf_pos = (self__.buf_pos - (1));

return (self__.buf[self__.buf_pos] = ch);
} else {
return null;
}
});

cljs.tools.reader.reader_types.PushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$rdr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$not_DASH_native], null)),cljs.core.cst$sym$buf,cljs.core.cst$sym$buf_DASH_len,cljs.core.with_meta(cljs.core.cst$sym$buf_DASH_pos,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.tools.reader.reader_types.PushbackReader.cljs$lang$type = true;

cljs.tools.reader.reader_types.PushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/PushbackReader";

cljs.tools.reader.reader_types.PushbackReader.cljs$lang$ctorPrWriter = (function (this__6468__auto__,writer__6469__auto__,opt__6470__auto__){
return cljs.core._write(writer__6469__auto__,"cljs.tools.reader.reader-types/PushbackReader");
});

cljs.tools.reader.reader_types.__GT_PushbackReader = (function cljs$tools$reader$reader_types$__GT_PushbackReader(rdr,buf,buf_len,buf_pos){
return (new cljs.tools.reader.reader_types.PushbackReader(rdr,buf,buf_len,buf_pos));
});

cljs.tools.reader.reader_types.normalize_newline = (function cljs$tools$reader$reader_types$normalize_newline(rdr,ch){
if(("\r" === ch)){
var c = rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
if((("\f" === c)) || (("\n" === c))){
rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
} else {
}

return "\n";
} else {
return ch;
}
});

/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.IndexingReader}
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.IndexingPushbackReader = (function (rdr,line,column,line_start_QMARK_,prev,prev_column,file_name){
this.rdr = rdr;
this.line = line;
this.column = column;
this.line_start_QMARK_ = line_start_QMARK_;
this.prev = prev;
this.prev_column = prev_column;
this.file_name = file_name;
})
cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = true;

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var temp__4657__auto__ = self__.rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ch = temp__4657__auto__;
var ch__$1 = cljs.tools.reader.reader_types.normalize_newline(self__.rdr,ch);
self__.prev = self__.line_start_QMARK_;

self__.line_start_QMARK_ = cljs.tools.reader.impl.utils.newline_QMARK_(ch__$1);

if(cljs.core.truth_(self__.line_start_QMARK_)){
self__.prev_column = self__.column;

self__.column = (0);

self__.line = (self__.line + (1));
} else {
}

self__.column = (self__.column + (1));

return ch__$1;
} else {
return null;
}
});

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
});

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = true;

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.line_start_QMARK_)){
self__.line = (self__.line - (1));

self__.column = self__.prev_column;
} else {
self__.column = (self__.column - (1));
}

self__.line_start_QMARK_ = self__.prev;

return self__.rdr.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(null,ch);
});

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$ = true;

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.line | (0));
});

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.column | (0));
});

cljs.tools.reader.reader_types.IndexingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.file_name;
});

cljs.tools.reader.reader_types.IndexingPushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$rdr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$not_DASH_native], null)),cljs.core.with_meta(cljs.core.cst$sym$line,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$column,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$line_DASH_start_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$prev,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$prev_DASH_column,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$file_DASH_name], null);
});

cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$type = true;

cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/IndexingPushbackReader";

cljs.tools.reader.reader_types.IndexingPushbackReader.cljs$lang$ctorPrWriter = (function (this__6468__auto__,writer__6469__auto__,opt__6470__auto__){
return cljs.core._write(writer__6469__auto__,"cljs.tools.reader.reader-types/IndexingPushbackReader");
});

cljs.tools.reader.reader_types.__GT_IndexingPushbackReader = (function cljs$tools$reader$reader_types$__GT_IndexingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name){
return (new cljs.tools.reader.reader_types.IndexingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name));
});

/**
 * Returns an object of the same type and value as `obj`, with its
 * metadata merged over `m`.
 */
cljs.tools.reader.reader_types.merge_meta = (function cljs$tools$reader$reader_types$merge_meta(obj,m){
var orig_meta = cljs.core.meta(obj);
return cljs.core.with_meta(obj,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([m,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(orig_meta,cljs.core.cst$kw$source)], 0)));
});
/**
 * Returns a string containing the contents of the top most source
 * logging frame.
 */
cljs.tools.reader.reader_types.peek_source_log = (function cljs$tools$reader$reader_types$peek_source_log(frames){
return cljs.core.subs.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.core.cst$kw$buffer.cljs$core$IFn$_invoke$arity$1(frames))].join(''),cljs.core.first(cljs.core.cst$kw$offset.cljs$core$IFn$_invoke$arity$1(frames)));
});
/**
 * Logs `char` to all currently active source logging frames.
 */
cljs.tools.reader.reader_types.log_source_char = (function cljs$tools$reader$reader_types$log_source_char(frames,char$){
var temp__4657__auto__ = cljs.core.cst$kw$buffer.cljs$core$IFn$_invoke$arity$1(frames);
if(cljs.core.truth_(temp__4657__auto__)){
var buffer = temp__4657__auto__;
return buffer.append(char$);
} else {
return null;
}
});
/**
 * Removes the last logged character from all currently active source
 * logging frames. Called when pushing a character back.
 */
cljs.tools.reader.reader_types.drop_last_logged_char = (function cljs$tools$reader$reader_types$drop_last_logged_char(frames){
var temp__4657__auto__ = cljs.core.cst$kw$buffer.cljs$core$IFn$_invoke$arity$1(frames);
if(cljs.core.truth_(temp__4657__auto__)){
var buffer = temp__4657__auto__;
return buffer.set(cljs.core.subs.cljs$core$IFn$_invoke$arity$3([cljs.core.str(buffer)].join(''),(0),(buffer.getLength() - (1))));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.tools.reader.reader_types.IndexingReader}
 * @implements {cljs.tools.reader.reader_types.Reader}
 * @implements {cljs.tools.reader.reader_types.IPushbackReader}
*/
cljs.tools.reader.reader_types.SourceLoggingPushbackReader = (function (rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames){
this.rdr = rdr;
this.line = line;
this.column = column;
this.line_start_QMARK_ = line_start_QMARK_;
this.prev = prev;
this.prev_column = prev_column;
this.file_name = file_name;
this.frames = frames;
})
cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$ = true;

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$read_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
var temp__4657__auto__ = self__.rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
if(cljs.core.truth_(temp__4657__auto__)){
var ch = temp__4657__auto__;
var ch__$1 = cljs.tools.reader.reader_types.normalize_newline(self__.rdr,ch);
self__.prev = self__.line_start_QMARK_;

self__.line_start_QMARK_ = cljs.tools.reader.impl.utils.newline_QMARK_(ch__$1);

if(cljs.core.truth_(self__.line_start_QMARK_)){
self__.prev_column = self__.column;

self__.column = (0);

self__.line = (self__.line + (1));
} else {
}

self__.column = (self__.column + (1));

cljs.tools.reader.reader_types.log_source_char((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.frames) : cljs.core.deref.call(null,self__.frames)),ch__$1);

return ch__$1;
} else {
return null;
}
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$Reader$peek_char$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.rdr.cljs$tools$reader$reader_types$Reader$peek_char$arity$1(null);
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$ = true;

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2 = (function (reader,ch){
var self__ = this;
var reader__$1 = this;
if(cljs.core.truth_(self__.line_start_QMARK_)){
self__.line = (self__.line - (1));

self__.column = self__.prev_column;
} else {
self__.column = (self__.column - (1));
}

self__.line_start_QMARK_ = self__.prev;

if(cljs.core.truth_(ch)){
cljs.tools.reader.reader_types.drop_last_logged_char((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(self__.frames) : cljs.core.deref.call(null,self__.frames)));
} else {
}

return self__.rdr.cljs$tools$reader$reader_types$IPushbackReader$unread$arity$2(null,ch);
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$ = true;

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_line_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.line | (0));
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return (self__.column | (0));
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.prototype.cljs$tools$reader$reader_types$IndexingReader$get_file_name$arity$1 = (function (reader){
var self__ = this;
var reader__$1 = this;
return self__.file_name;
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$rdr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$not_DASH_native], null)),cljs.core.with_meta(cljs.core.cst$sym$line,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$column,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$line_DASH_start_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$prev,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.with_meta(cljs.core.cst$sym$prev_DASH_column,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$file_DASH_name,cljs.core.cst$sym$frames], null);
});

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$type = true;

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$ctorStr = "cljs.tools.reader.reader-types/SourceLoggingPushbackReader";

cljs.tools.reader.reader_types.SourceLoggingPushbackReader.cljs$lang$ctorPrWriter = (function (this__6468__auto__,writer__6469__auto__,opt__6470__auto__){
return cljs.core._write(writer__6469__auto__,"cljs.tools.reader.reader-types/SourceLoggingPushbackReader");
});

cljs.tools.reader.reader_types.__GT_SourceLoggingPushbackReader = (function cljs$tools$reader$reader_types$__GT_SourceLoggingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames){
return (new cljs.tools.reader.reader_types.SourceLoggingPushbackReader(rdr,line,column,line_start_QMARK_,prev,prev_column,file_name,frames));
});

/**
 * Returns true if the reader satisfies IndexingReader
 */
cljs.tools.reader.reader_types.indexing_reader_QMARK_ = (function cljs$tools$reader$reader_types$indexing_reader_QMARK_(rdr){
if(!((rdr == null))){
if((false) || (rdr.cljs$tools$reader$reader_types$IndexingReader$)){
return true;
} else {
return false;
}
} else {
return false;
}
});
/**
 * Creates a StringReader from a given string
 */
cljs.tools.reader.reader_types.string_reader = (function cljs$tools$reader$reader_types$string_reader(s){
return (new cljs.tools.reader.reader_types.StringReader(s,cljs.core.count(s),(0)));
});
/**
 * Creates a PushbackReader from a given string
 */
cljs.tools.reader.reader_types.string_push_back_reader = (function cljs$tools$reader$reader_types$string_push_back_reader(var_args){
var args11586 = [];
var len__6931__auto___11589 = arguments.length;
var i__6932__auto___11590 = (0);
while(true){
if((i__6932__auto___11590 < len__6931__auto___11589)){
args11586.push((arguments[i__6932__auto___11590]));

var G__11591 = (i__6932__auto___11590 + (1));
i__6932__auto___11590 = G__11591;
continue;
} else {
}
break;
}

var G__11588 = args11586.length;
switch (G__11588) {
case 1:
return cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11586.length)].join('')));

}
});

cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2(s,(1));
});

cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s,buf_len){
return (new cljs.tools.reader.reader_types.PushbackReader(cljs.tools.reader.reader_types.string_reader(s),cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(buf_len),buf_len,buf_len));
});

cljs.tools.reader.reader_types.string_push_back_reader.cljs$lang$maxFixedArity = 2;
cljs.tools.reader.reader_types.node_readable_push_back_reader = (function cljs$tools$reader$reader_types$node_readable_push_back_reader(readable){
return (new cljs.tools.reader.reader_types.PushbackReader((new cljs.tools.reader.reader_types.NodeReadableReader(readable,null)),cljs.core.object_array.cljs$core$IFn$_invoke$arity$1((1)),(1),(1)));
});
/**
 * Creates an IndexingPushbackReader from a given string or PushbackReader
 */
cljs.tools.reader.reader_types.indexing_push_back_reader = (function cljs$tools$reader$reader_types$indexing_push_back_reader(var_args){
var args11593 = [];
var len__6931__auto___11596 = arguments.length;
var i__6932__auto___11597 = (0);
while(true){
if((i__6932__auto___11597 < len__6931__auto___11596)){
args11593.push((arguments[i__6932__auto___11597]));

var G__11598 = (i__6932__auto___11597 + (1));
i__6932__auto___11597 = G__11598;
continue;
} else {
}
break;
}

var G__11595 = args11593.length;
switch (G__11595) {
case 1:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11593.length)].join('')));

}
});

cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s_or_rdr){
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$2(s_or_rdr,(1));
});

cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s_or_rdr,buf_len){
return cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$3(s_or_rdr,buf_len,null);
});

cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$core$IFn$_invoke$arity$3 = (function (s_or_rdr,buf_len,file_name){
return (new cljs.tools.reader.reader_types.IndexingPushbackReader(((typeof s_or_rdr === 'string')?cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2(s_or_rdr,buf_len):s_or_rdr),(1),(1),true,null,(0),file_name));
});

cljs.tools.reader.reader_types.indexing_push_back_reader.cljs$lang$maxFixedArity = 3;
/**
 * Creates a SourceLoggingPushbackReader from a given string or PushbackReader
 */
cljs.tools.reader.reader_types.source_logging_push_back_reader = (function cljs$tools$reader$reader_types$source_logging_push_back_reader(var_args){
var args11600 = [];
var len__6931__auto___11604 = arguments.length;
var i__6932__auto___11605 = (0);
while(true){
if((i__6932__auto___11605 < len__6931__auto___11604)){
args11600.push((arguments[i__6932__auto___11605]));

var G__11606 = (i__6932__auto___11605 + (1));
i__6932__auto___11605 = G__11606;
continue;
} else {
}
break;
}

var G__11602 = args11600.length;
switch (G__11602) {
case 1:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11600.length)].join('')));

}
});

cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$1 = (function (s_or_rdr){
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$2(s_or_rdr,(1));
});

cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$2 = (function (s_or_rdr,buf_len){
return cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$3(s_or_rdr,buf_len,null);
});

cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$3 = (function (s_or_rdr,buf_len,file_name){
return (new cljs.tools.reader.reader_types.SourceLoggingPushbackReader(((typeof s_or_rdr === 'string')?cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$2(s_or_rdr,buf_len):s_or_rdr),(1),(1),true,null,(0),file_name,(function (){var G__11603 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$buffer,(new goog.string.StringBuffer()),cljs.core.cst$kw$offset,cljs.core.list((0))], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__11603) : cljs.core.atom.call(null,G__11603));
})()));
});

cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$lang$maxFixedArity = 3;
/**
 * Reads a line from the reader or from *in* if no reader is specified
 */
cljs.tools.reader.reader_types.read_line = (function cljs$tools$reader$reader_types$read_line(rdr){
var c = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
var s = (new goog.string.StringBuffer());
while(true){
if(cljs.tools.reader.impl.utils.newline_QMARK_(c)){
return [cljs.core.str(s)].join('');
} else {
var G__11608 = rdr.cljs$tools$reader$reader_types$Reader$read_char$arity$1(null);
var G__11609 = s.append(c);
c = G__11608;
s = G__11609;
continue;
}
break;
}
});
/**
 * Throws an ExceptionInfo with the given message.
 * If rdr is an IndexingReader, additional information about column and line number is provided
 */
cljs.tools.reader.reader_types.reader_error = (function cljs$tools$reader$reader_types$reader_error(var_args){
var args__6938__auto__ = [];
var len__6931__auto___11612 = arguments.length;
var i__6932__auto___11613 = (0);
while(true){
if((i__6932__auto___11613 < len__6931__auto___11612)){
args__6938__auto__.push((arguments[i__6932__auto___11613]));

var G__11614 = (i__6932__auto___11613 + (1));
i__6932__auto___11613 = G__11614;
continue;
} else {
}
break;
}

var argseq__6939__auto__ = ((((1) < args__6938__auto__.length))?(new cljs.core.IndexedSeq(args__6938__auto__.slice((1)),(0),null)):null);
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__6939__auto__);
});

cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic = (function (rdr,msg){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,msg),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,cljs.core.cst$kw$reader_DASH_exception], null),(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(rdr))?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$line,cljs.tools.reader.reader_types.get_line_number(rdr),cljs.core.cst$kw$column,cljs.tools.reader.reader_types.get_column_number(rdr)], null),(function (){var temp__4657__auto__ = cljs.tools.reader.reader_types.get_file_name(rdr);
if(cljs.core.truth_(temp__4657__auto__)){
var file_name = temp__4657__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$file,file_name], null);
} else {
return null;
}
})()], 0)):null)], 0)));
});

cljs.tools.reader.reader_types.reader_error.cljs$lang$maxFixedArity = (1);

cljs.tools.reader.reader_types.reader_error.cljs$lang$applyTo = (function (seq11610){
var G__11611 = cljs.core.first(seq11610);
var seq11610__$1 = cljs.core.next(seq11610);
return cljs.tools.reader.reader_types.reader_error.cljs$core$IFn$_invoke$arity$variadic(G__11611,seq11610__$1);
});
cljs.tools.reader.reader_types.source_logging_reader_QMARK_ = (function cljs$tools$reader$reader_types$source_logging_reader_QMARK_(rdr){
return (rdr instanceof cljs.tools.reader.reader_types.SourceLoggingPushbackReader);
});
/**
 * Returns true if rdr is an IndexingReader and the current char starts a new line
 */
cljs.tools.reader.reader_types.line_start_QMARK_ = (function cljs$tools$reader$reader_types$line_start_QMARK_(rdr){
if(cljs.core.truth_(cljs.tools.reader.reader_types.indexing_reader_QMARK_(rdr))){
return ((1) === rdr.cljs$tools$reader$reader_types$IndexingReader$get_column_number$arity$1(null));
} else {
return null;
}
});
cljs.tools.reader.reader_types.log_source_STAR_ = (function cljs$tools$reader$reader_types$log_source_STAR_(reader,f){
var buffer = cljs.core.cst$kw$buffer.cljs$core$IFn$_invoke$arity$1((function (){var G__11618 = reader.frames;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__11618) : cljs.core.deref.call(null,G__11618));
})());
try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(reader.frames,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$offset], null),cljs.core.conj,cljs.core.array_seq([buffer.getLength()], 0));

var ret = (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
if(((!((ret == null)))?((((ret.cljs$lang$protocol_mask$partition0$ & (131072))) || (ret.cljs$core$IMeta$))?true:false):false)){
return cljs.tools.reader.reader_types.merge_meta(ret,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$source,cljs.tools.reader.reader_types.peek_source_log((function (){var G__11620 = reader.frames;
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__11620) : cljs.core.deref.call(null,G__11620));
})())], null));
} else {
return ret;
}
}finally {cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(reader.frames,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$offset], null),cljs.core.rest);
}});
