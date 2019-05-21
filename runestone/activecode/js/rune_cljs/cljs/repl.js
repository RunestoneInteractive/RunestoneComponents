// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str((function (){var temp__4657__auto__ = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m))){
var seq__19065_19079 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__19066_19080 = null;
var count__19067_19081 = (0);
var i__19068_19082 = (0);
while(true){
if((i__19068_19082 < count__19067_19081)){
var f_19083 = chunk__19066_19080.cljs$core$IIndexed$_nth$arity$2(null,i__19068_19082);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_19083], 0));

var G__19084 = seq__19065_19079;
var G__19085 = chunk__19066_19080;
var G__19086 = count__19067_19081;
var G__19087 = (i__19068_19082 + (1));
seq__19065_19079 = G__19084;
chunk__19066_19080 = G__19085;
count__19067_19081 = G__19086;
i__19068_19082 = G__19087;
continue;
} else {
var temp__4657__auto___19088 = cljs.core.seq(seq__19065_19079);
if(temp__4657__auto___19088){
var seq__19065_19089__$1 = temp__4657__auto___19088;
if(cljs.core.chunked_seq_QMARK_(seq__19065_19089__$1)){
var c__6673__auto___19090 = cljs.core.chunk_first(seq__19065_19089__$1);
var G__19091 = cljs.core.chunk_rest(seq__19065_19089__$1);
var G__19092 = c__6673__auto___19090;
var G__19093 = cljs.core.count(c__6673__auto___19090);
var G__19094 = (0);
seq__19065_19079 = G__19091;
chunk__19066_19080 = G__19092;
count__19067_19081 = G__19093;
i__19068_19082 = G__19094;
continue;
} else {
var f_19095 = cljs.core.first(seq__19065_19089__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_19095], 0));

var G__19096 = cljs.core.next(seq__19065_19089__$1);
var G__19097 = null;
var G__19098 = (0);
var G__19099 = (0);
seq__19065_19079 = G__19096;
chunk__19066_19080 = G__19097;
count__19067_19081 = G__19098;
i__19068_19082 = G__19099;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_19100 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_19100], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_19100)))?cljs.core.second(arglists_19100):arglists_19100)], 0));
}
} else {
}
}

if(cljs.core.truth_(cljs.core.cst$kw$special_DASH_form.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,cljs.core.cst$kw$url)){
if(cljs.core.truth_(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
var seq__19069 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__19070 = null;
var count__19071 = (0);
var i__19072 = (0);
while(true){
if((i__19072 < count__19071)){
var vec__19073 = chunk__19070.cljs$core$IIndexed$_nth$arity$2(null,i__19072);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19073,(0),null);
var map__19074 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19073,(1),null);
var map__19074__$1 = ((((!((map__19074 == null)))?((((map__19074.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19074.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19074):map__19074);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19074__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19074__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__19101 = seq__19069;
var G__19102 = chunk__19070;
var G__19103 = count__19071;
var G__19104 = (i__19072 + (1));
seq__19069 = G__19101;
chunk__19070 = G__19102;
count__19071 = G__19103;
i__19072 = G__19104;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__19069);
if(temp__4657__auto__){
var seq__19069__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19069__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__19069__$1);
var G__19105 = cljs.core.chunk_rest(seq__19069__$1);
var G__19106 = c__6673__auto__;
var G__19107 = cljs.core.count(c__6673__auto__);
var G__19108 = (0);
seq__19069 = G__19105;
chunk__19070 = G__19106;
count__19071 = G__19107;
i__19072 = G__19108;
continue;
} else {
var vec__19076 = cljs.core.first(seq__19069__$1);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19076,(0),null);
var map__19077 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19076,(1),null);
var map__19077__$1 = ((((!((map__19077 == null)))?((((map__19077.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19077.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19077):map__19077);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19077__$1,cljs.core.cst$kw$doc);
var arglists = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19077__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists], 0));

if(cljs.core.truth_(doc)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc], 0));
} else {
}

var G__19109 = cljs.core.next(seq__19069__$1);
var G__19110 = null;
var G__19111 = (0);
var G__19112 = (0);
seq__19069 = G__19109;
chunk__19070 = G__19110;
count__19071 = G__19111;
i__19072 = G__19112;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});
