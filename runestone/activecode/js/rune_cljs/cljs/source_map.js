// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__13077){
var vec__13078 = p__13077;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13078,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13078,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2((function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources(sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare((sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(a) : sources__$1.call(null,a)),(sources__$1.cljs$core$IFn$_invoke$arity$1 ? sources__$1.cljs$core$IFn$_invoke$arity$1(b) : sources__$1.call(null,b)));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__13080 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13080,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13080,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13080,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13080,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13080,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$gcol,gcol,cljs.core.cst$kw$source,(goog.object.get(source_map,"sources")[source]),cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$name,(function (){var temp__4657__auto__ = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(seg));
if(cljs.core.truth_(temp__4657__auto__)){
var name__$1 = temp__4657__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__13083 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13083,(4),null);
var vec__13084 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13084,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13084,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13084,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13084,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13084,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__5862__auto__ = source;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__5862__auto__ = line;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__5862__auto__ = col;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta(nseg,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$name,(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__13087 = segmap;
var map__13087__$1 = ((((!((map__13087 == null)))?((((map__13087.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13087.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13087):map__13087);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13087__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gline,gline,cljs.core.cst$kw$gcol,gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
});})(map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});})(map__13087,map__13087__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args13089 = [];
var len__6932__auto___13093 = arguments.length;
var i__6933__auto___13094 = (0);
while(true){
if((i__6933__auto___13094 < len__6932__auto___13093)){
args13089.push((arguments[i__6933__auto___13094]));

var G__13095 = (i__6933__auto___13094 + (1));
i__6933__auto___13094 = G__13095;
continue;
} else {
}
break;
}

var G__13091 = args13089.length;
switch (G__13091) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13089.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by(cljs.source_map.source_compare(sources));
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__13092 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__13097 = cljs.core.next(segs__$1);
var G__13098 = nrelseg;
var G__13099 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__13097;
relseg__$1 = G__13098;
result__$1 = G__13099;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13092,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13092,(1),null);
var G__13100 = (gline + (1));
var G__13101 = cljs.core.next(lines__$1);
var G__13102 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__13103 = result__$1;
gline = G__13100;
lines__$1 = G__13101;
relseg = G__13102;
result = G__13103;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;
/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__13107 = segmap;
var map__13107__$1 = ((((!((map__13107 == null)))?((((map__13107.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13107.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13107):map__13107);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13107__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13107__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13107__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13107__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13107__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$source,source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13107,map__13107__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13107,map__13107__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__13104_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__13104_SHARP_,d__$1);
});})(map__13107,map__13107__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13107,map__13107__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args13109 = [];
var len__6932__auto___13113 = arguments.length;
var i__6933__auto___13114 = (0);
while(true){
if((i__6933__auto___13114 < len__6932__auto___13113)){
args13109.push((arguments[i__6933__auto___13114]));

var G__13115 = (i__6933__auto___13114 + (1));
i__6933__auto___13114 = G__13115;
continue;
} else {
}
break;
}

var G__13111 = args13109.length;
switch (G__13111) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13109.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2(goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first(lines__$1);
var vec__13112 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__13117 = cljs.core.next(segs__$1);
var G__13118 = nrelseg;
var G__13119 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__13117;
relseg__$1 = G__13118;
result__$1 = G__13119;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13112,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13112,(1),null);
var G__13120 = (gline + (1));
var G__13121 = cljs.core.next(lines__$1);
var G__13122 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__13123 = result__$1;
gline = G__13120;
lines__$1 = G__13121;
relseg = G__13122;
result = G__13123;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;
/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = (function (){var G__13131 = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13131) : cljs.core.atom.call(null,G__13131));
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (relseg){
return (function (p__13132){
var vec__13133 = p__13132;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (cols__$1,p__13134){
var vec__13135 = p__13134;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13135,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13135,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13135,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13135,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13135,(4),null);
var seg = vec__13135;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(relseg) : cljs.core.deref.call(null,relseg)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (offset,vec__13135,gcol,sidx,line,col,name,seg,relseg){
return (function (p__13136){
var vec__13137 = p__13136;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13137,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13137,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13137,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13137,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13137,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__13135,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cols__$1,cljs.source_map.base64_vlq.encode(offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = (function (){var G__13196 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13196) : cljs.core.atom.call(null,G__13196));
})();
var names__GT_idx = (function (){var G__13197 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13197) : cljs.core.atom.call(null,G__13197));
})();
var name_idx = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
var preamble_lines = cljs.core.take.cljs$core$IFn$_invoke$arity$2((function (){var or__5862__auto__ = cljs.core.cst$kw$preamble_DASH_line_DASH_count.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gcol.cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__4655__auto__ = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__4655__auto__)){
var name = temp__4655__auto__;
var idx = (function (){var temp__4655__auto____$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx)),name);
if(cljs.core.truth_(temp__4655__auto____$1)){
var idx = temp__4655__auto____$1;
return idx;
} else {
var cidx = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(name_idx) : cljs.core.deref.call(null,name_idx));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__13198 = cljs.core.seq(infos);
var chunk__13199 = null;
var count__13200 = (0);
var i__13201 = (0);
while(true){
if((i__13201 < count__13200)){
var info = chunk__13199.cljs$core$IIndexed$_nth$arity$2(null,i__13201);
var segv_13251 = info__GT_segv(info,source_idx,line,col);
var gline_13252 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_13253 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_13252 > (lc_13253 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13198,chunk__13199,count__13200,i__13201,segv_13251,gline_13252,lc_13253,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_13252 - (lc_13253 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13251], null));
});})(seq__13198,chunk__13199,count__13200,i__13201,segv_13251,gline_13252,lc_13253,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13198,chunk__13199,count__13200,i__13201,segv_13251,gline_13252,lc_13253,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13252], null),cljs.core.conj,segv_13251);
});})(seq__13198,chunk__13199,count__13200,i__13201,segv_13251,gline_13252,lc_13253,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__13254 = seq__13198;
var G__13255 = chunk__13199;
var G__13256 = count__13200;
var G__13257 = (i__13201 + (1));
seq__13198 = G__13254;
chunk__13199 = G__13255;
count__13200 = G__13256;
i__13201 = G__13257;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__13198);
if(temp__4657__auto__){
var seq__13198__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__13198__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__13198__$1);
var G__13258 = cljs.core.chunk_rest(seq__13198__$1);
var G__13259 = c__6673__auto__;
var G__13260 = cljs.core.count(c__6673__auto__);
var G__13261 = (0);
seq__13198 = G__13258;
chunk__13199 = G__13259;
count__13200 = G__13260;
i__13201 = G__13261;
continue;
} else {
var info = cljs.core.first(seq__13198__$1);
var segv_13262 = info__GT_segv(info,source_idx,line,col);
var gline_13263 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_13264 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_13263 > (lc_13264 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13198,chunk__13199,count__13200,i__13201,segv_13262,gline_13263,lc_13264,info,seq__13198__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_13263 - (lc_13264 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13262], null));
});})(seq__13198,chunk__13199,count__13200,i__13201,segv_13262,gline_13263,lc_13264,info,seq__13198__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13198,chunk__13199,count__13200,i__13201,segv_13262,gline_13263,lc_13264,info,seq__13198__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13263], null),cljs.core.conj,segv_13262);
});})(seq__13198,chunk__13199,count__13200,i__13201,segv_13262,gline_13263,lc_13264,info,seq__13198__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__13265 = cljs.core.next(seq__13198__$1);
var G__13266 = null;
var G__13267 = (0);
var G__13268 = (0);
seq__13198 = G__13265;
chunk__13199 = G__13266;
count__13200 = G__13267;
i__13201 = G__13268;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__13202_13269 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__13203_13270 = null;
var count__13204_13271 = (0);
var i__13205_13272 = (0);
while(true){
if((i__13205_13272 < count__13204_13271)){
var vec__13206_13273 = chunk__13203_13270.cljs$core$IIndexed$_nth$arity$2(null,i__13205_13272);
var source_idx_13274 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13206_13273,(0),null);
var vec__13207_13275 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13206_13273,(1),null);
var __13276 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13207_13275,(0),null);
var lines_13277__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13207_13275,(1),null);
var seq__13208_13278 = cljs.core.seq(lines_13277__$1);
var chunk__13209_13279 = null;
var count__13210_13280 = (0);
var i__13211_13281 = (0);
while(true){
if((i__13211_13281 < count__13210_13280)){
var vec__13212_13282 = chunk__13209_13279.cljs$core$IIndexed$_nth$arity$2(null,i__13211_13281);
var line_13283 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13212_13282,(0),null);
var cols_13284 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13212_13282,(1),null);
var seq__13213_13285 = cljs.core.seq(cols_13284);
var chunk__13214_13286 = null;
var count__13215_13287 = (0);
var i__13216_13288 = (0);
while(true){
if((i__13216_13288 < count__13215_13287)){
var vec__13217_13289 = chunk__13214_13286.cljs$core$IIndexed$_nth$arity$2(null,i__13216_13288);
var col_13290 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13217_13289,(0),null);
var infos_13291 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13217_13289,(1),null);
encode_cols(infos_13291,source_idx_13274,line_13283,col_13290);

var G__13292 = seq__13213_13285;
var G__13293 = chunk__13214_13286;
var G__13294 = count__13215_13287;
var G__13295 = (i__13216_13288 + (1));
seq__13213_13285 = G__13292;
chunk__13214_13286 = G__13293;
count__13215_13287 = G__13294;
i__13216_13288 = G__13295;
continue;
} else {
var temp__4657__auto___13296 = cljs.core.seq(seq__13213_13285);
if(temp__4657__auto___13296){
var seq__13213_13297__$1 = temp__4657__auto___13296;
if(cljs.core.chunked_seq_QMARK_(seq__13213_13297__$1)){
var c__6673__auto___13298 = cljs.core.chunk_first(seq__13213_13297__$1);
var G__13299 = cljs.core.chunk_rest(seq__13213_13297__$1);
var G__13300 = c__6673__auto___13298;
var G__13301 = cljs.core.count(c__6673__auto___13298);
var G__13302 = (0);
seq__13213_13285 = G__13299;
chunk__13214_13286 = G__13300;
count__13215_13287 = G__13301;
i__13216_13288 = G__13302;
continue;
} else {
var vec__13218_13303 = cljs.core.first(seq__13213_13297__$1);
var col_13304 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13218_13303,(0),null);
var infos_13305 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13218_13303,(1),null);
encode_cols(infos_13305,source_idx_13274,line_13283,col_13304);

var G__13306 = cljs.core.next(seq__13213_13297__$1);
var G__13307 = null;
var G__13308 = (0);
var G__13309 = (0);
seq__13213_13285 = G__13306;
chunk__13214_13286 = G__13307;
count__13215_13287 = G__13308;
i__13216_13288 = G__13309;
continue;
}
} else {
}
}
break;
}

var G__13310 = seq__13208_13278;
var G__13311 = chunk__13209_13279;
var G__13312 = count__13210_13280;
var G__13313 = (i__13211_13281 + (1));
seq__13208_13278 = G__13310;
chunk__13209_13279 = G__13311;
count__13210_13280 = G__13312;
i__13211_13281 = G__13313;
continue;
} else {
var temp__4657__auto___13314 = cljs.core.seq(seq__13208_13278);
if(temp__4657__auto___13314){
var seq__13208_13315__$1 = temp__4657__auto___13314;
if(cljs.core.chunked_seq_QMARK_(seq__13208_13315__$1)){
var c__6673__auto___13316 = cljs.core.chunk_first(seq__13208_13315__$1);
var G__13317 = cljs.core.chunk_rest(seq__13208_13315__$1);
var G__13318 = c__6673__auto___13316;
var G__13319 = cljs.core.count(c__6673__auto___13316);
var G__13320 = (0);
seq__13208_13278 = G__13317;
chunk__13209_13279 = G__13318;
count__13210_13280 = G__13319;
i__13211_13281 = G__13320;
continue;
} else {
var vec__13219_13321 = cljs.core.first(seq__13208_13315__$1);
var line_13322 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13219_13321,(0),null);
var cols_13323 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13219_13321,(1),null);
var seq__13220_13324 = cljs.core.seq(cols_13323);
var chunk__13221_13325 = null;
var count__13222_13326 = (0);
var i__13223_13327 = (0);
while(true){
if((i__13223_13327 < count__13222_13326)){
var vec__13224_13328 = chunk__13221_13325.cljs$core$IIndexed$_nth$arity$2(null,i__13223_13327);
var col_13329 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13224_13328,(0),null);
var infos_13330 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13224_13328,(1),null);
encode_cols(infos_13330,source_idx_13274,line_13322,col_13329);

var G__13331 = seq__13220_13324;
var G__13332 = chunk__13221_13325;
var G__13333 = count__13222_13326;
var G__13334 = (i__13223_13327 + (1));
seq__13220_13324 = G__13331;
chunk__13221_13325 = G__13332;
count__13222_13326 = G__13333;
i__13223_13327 = G__13334;
continue;
} else {
var temp__4657__auto___13335__$1 = cljs.core.seq(seq__13220_13324);
if(temp__4657__auto___13335__$1){
var seq__13220_13336__$1 = temp__4657__auto___13335__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13220_13336__$1)){
var c__6673__auto___13337 = cljs.core.chunk_first(seq__13220_13336__$1);
var G__13338 = cljs.core.chunk_rest(seq__13220_13336__$1);
var G__13339 = c__6673__auto___13337;
var G__13340 = cljs.core.count(c__6673__auto___13337);
var G__13341 = (0);
seq__13220_13324 = G__13338;
chunk__13221_13325 = G__13339;
count__13222_13326 = G__13340;
i__13223_13327 = G__13341;
continue;
} else {
var vec__13225_13342 = cljs.core.first(seq__13220_13336__$1);
var col_13343 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13225_13342,(0),null);
var infos_13344 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13225_13342,(1),null);
encode_cols(infos_13344,source_idx_13274,line_13322,col_13343);

var G__13345 = cljs.core.next(seq__13220_13336__$1);
var G__13346 = null;
var G__13347 = (0);
var G__13348 = (0);
seq__13220_13324 = G__13345;
chunk__13221_13325 = G__13346;
count__13222_13326 = G__13347;
i__13223_13327 = G__13348;
continue;
}
} else {
}
}
break;
}

var G__13349 = cljs.core.next(seq__13208_13315__$1);
var G__13350 = null;
var G__13351 = (0);
var G__13352 = (0);
seq__13208_13278 = G__13349;
chunk__13209_13279 = G__13350;
count__13210_13280 = G__13351;
i__13211_13281 = G__13352;
continue;
}
} else {
}
}
break;
}

var G__13353 = seq__13202_13269;
var G__13354 = chunk__13203_13270;
var G__13355 = count__13204_13271;
var G__13356 = (i__13205_13272 + (1));
seq__13202_13269 = G__13353;
chunk__13203_13270 = G__13354;
count__13204_13271 = G__13355;
i__13205_13272 = G__13356;
continue;
} else {
var temp__4657__auto___13357 = cljs.core.seq(seq__13202_13269);
if(temp__4657__auto___13357){
var seq__13202_13358__$1 = temp__4657__auto___13357;
if(cljs.core.chunked_seq_QMARK_(seq__13202_13358__$1)){
var c__6673__auto___13359 = cljs.core.chunk_first(seq__13202_13358__$1);
var G__13360 = cljs.core.chunk_rest(seq__13202_13358__$1);
var G__13361 = c__6673__auto___13359;
var G__13362 = cljs.core.count(c__6673__auto___13359);
var G__13363 = (0);
seq__13202_13269 = G__13360;
chunk__13203_13270 = G__13361;
count__13204_13271 = G__13362;
i__13205_13272 = G__13363;
continue;
} else {
var vec__13226_13364 = cljs.core.first(seq__13202_13358__$1);
var source_idx_13365 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13226_13364,(0),null);
var vec__13227_13366 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13226_13364,(1),null);
var __13367 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13227_13366,(0),null);
var lines_13368__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13227_13366,(1),null);
var seq__13228_13369 = cljs.core.seq(lines_13368__$1);
var chunk__13229_13370 = null;
var count__13230_13371 = (0);
var i__13231_13372 = (0);
while(true){
if((i__13231_13372 < count__13230_13371)){
var vec__13232_13373 = chunk__13229_13370.cljs$core$IIndexed$_nth$arity$2(null,i__13231_13372);
var line_13374 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13232_13373,(0),null);
var cols_13375 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13232_13373,(1),null);
var seq__13233_13376 = cljs.core.seq(cols_13375);
var chunk__13234_13377 = null;
var count__13235_13378 = (0);
var i__13236_13379 = (0);
while(true){
if((i__13236_13379 < count__13235_13378)){
var vec__13237_13380 = chunk__13234_13377.cljs$core$IIndexed$_nth$arity$2(null,i__13236_13379);
var col_13381 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13237_13380,(0),null);
var infos_13382 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13237_13380,(1),null);
encode_cols(infos_13382,source_idx_13365,line_13374,col_13381);

var G__13383 = seq__13233_13376;
var G__13384 = chunk__13234_13377;
var G__13385 = count__13235_13378;
var G__13386 = (i__13236_13379 + (1));
seq__13233_13376 = G__13383;
chunk__13234_13377 = G__13384;
count__13235_13378 = G__13385;
i__13236_13379 = G__13386;
continue;
} else {
var temp__4657__auto___13387__$1 = cljs.core.seq(seq__13233_13376);
if(temp__4657__auto___13387__$1){
var seq__13233_13388__$1 = temp__4657__auto___13387__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13233_13388__$1)){
var c__6673__auto___13389 = cljs.core.chunk_first(seq__13233_13388__$1);
var G__13390 = cljs.core.chunk_rest(seq__13233_13388__$1);
var G__13391 = c__6673__auto___13389;
var G__13392 = cljs.core.count(c__6673__auto___13389);
var G__13393 = (0);
seq__13233_13376 = G__13390;
chunk__13234_13377 = G__13391;
count__13235_13378 = G__13392;
i__13236_13379 = G__13393;
continue;
} else {
var vec__13238_13394 = cljs.core.first(seq__13233_13388__$1);
var col_13395 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13238_13394,(0),null);
var infos_13396 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13238_13394,(1),null);
encode_cols(infos_13396,source_idx_13365,line_13374,col_13395);

var G__13397 = cljs.core.next(seq__13233_13388__$1);
var G__13398 = null;
var G__13399 = (0);
var G__13400 = (0);
seq__13233_13376 = G__13397;
chunk__13234_13377 = G__13398;
count__13235_13378 = G__13399;
i__13236_13379 = G__13400;
continue;
}
} else {
}
}
break;
}

var G__13401 = seq__13228_13369;
var G__13402 = chunk__13229_13370;
var G__13403 = count__13230_13371;
var G__13404 = (i__13231_13372 + (1));
seq__13228_13369 = G__13401;
chunk__13229_13370 = G__13402;
count__13230_13371 = G__13403;
i__13231_13372 = G__13404;
continue;
} else {
var temp__4657__auto___13405__$1 = cljs.core.seq(seq__13228_13369);
if(temp__4657__auto___13405__$1){
var seq__13228_13406__$1 = temp__4657__auto___13405__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13228_13406__$1)){
var c__6673__auto___13407 = cljs.core.chunk_first(seq__13228_13406__$1);
var G__13408 = cljs.core.chunk_rest(seq__13228_13406__$1);
var G__13409 = c__6673__auto___13407;
var G__13410 = cljs.core.count(c__6673__auto___13407);
var G__13411 = (0);
seq__13228_13369 = G__13408;
chunk__13229_13370 = G__13409;
count__13230_13371 = G__13410;
i__13231_13372 = G__13411;
continue;
} else {
var vec__13239_13412 = cljs.core.first(seq__13228_13406__$1);
var line_13413 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13239_13412,(0),null);
var cols_13414 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13239_13412,(1),null);
var seq__13240_13415 = cljs.core.seq(cols_13414);
var chunk__13241_13416 = null;
var count__13242_13417 = (0);
var i__13243_13418 = (0);
while(true){
if((i__13243_13418 < count__13242_13417)){
var vec__13244_13419 = chunk__13241_13416.cljs$core$IIndexed$_nth$arity$2(null,i__13243_13418);
var col_13420 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13244_13419,(0),null);
var infos_13421 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13244_13419,(1),null);
encode_cols(infos_13421,source_idx_13365,line_13413,col_13420);

var G__13422 = seq__13240_13415;
var G__13423 = chunk__13241_13416;
var G__13424 = count__13242_13417;
var G__13425 = (i__13243_13418 + (1));
seq__13240_13415 = G__13422;
chunk__13241_13416 = G__13423;
count__13242_13417 = G__13424;
i__13243_13418 = G__13425;
continue;
} else {
var temp__4657__auto___13426__$2 = cljs.core.seq(seq__13240_13415);
if(temp__4657__auto___13426__$2){
var seq__13240_13427__$1 = temp__4657__auto___13426__$2;
if(cljs.core.chunked_seq_QMARK_(seq__13240_13427__$1)){
var c__6673__auto___13428 = cljs.core.chunk_first(seq__13240_13427__$1);
var G__13429 = cljs.core.chunk_rest(seq__13240_13427__$1);
var G__13430 = c__6673__auto___13428;
var G__13431 = cljs.core.count(c__6673__auto___13428);
var G__13432 = (0);
seq__13240_13415 = G__13429;
chunk__13241_13416 = G__13430;
count__13242_13417 = G__13431;
i__13243_13418 = G__13432;
continue;
} else {
var vec__13245_13433 = cljs.core.first(seq__13240_13427__$1);
var col_13434 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13245_13433,(0),null);
var infos_13435 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13245_13433,(1),null);
encode_cols(infos_13435,source_idx_13365,line_13413,col_13434);

var G__13436 = cljs.core.next(seq__13240_13427__$1);
var G__13437 = null;
var G__13438 = (0);
var G__13439 = (0);
seq__13240_13415 = G__13436;
chunk__13241_13416 = G__13437;
count__13242_13417 = G__13438;
i__13243_13418 = G__13439;
continue;
}
} else {
}
}
break;
}

var G__13440 = cljs.core.next(seq__13228_13406__$1);
var G__13441 = null;
var G__13442 = (0);
var G__13443 = (0);
seq__13228_13369 = G__13440;
chunk__13229_13370 = G__13441;
count__13230_13371 = G__13442;
i__13231_13372 = G__13443;
continue;
}
} else {
}
}
break;
}

var G__13444 = cljs.core.next(seq__13202_13358__$1);
var G__13445 = null;
var G__13446 = (0);
var G__13447 = (0);
seq__13202_13269 = G__13444;
chunk__13203_13270 = G__13445;
count__13204_13271 = G__13446;
i__13205_13272 = G__13447;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__13246 = {"version": (3), "file": cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((cljs.core.cst$kw$source_DASH_map_DASH_timestamp.cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13138_SHARP_){
return [cljs.core.str(p1__13138_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13139_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__13139_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": cljs.core.cst$kw$lines.cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13140_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__13140_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))))))};
if(cljs.core.truth_(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts))){
var G__13247 = G__13246;
var G__13248_13448 = G__13247;
var G__13249_13449 = "sourcesContent";
var G__13250_13450 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__13248_13448,G__13249_13449,G__13250_13450);

return G__13247;
} else {
return G__13246;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq(cljs_map);
var new_lines = cljs.core.sorted_map();
while(true){
if(line_map_seq){
var vec__13456 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13456,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13456,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__13457 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13457,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13457,(1),null);
var G__13461 = cljs.core.next(col_map_seq);
var G__13462 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__13457,col,infos,vec__13456,line,col_map){
return (function (v,p__13458){
var map__13459 = p__13458;
var map__13459__$1 = ((((!((map__13459 == null)))?((((map__13459.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13459.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13459):map__13459);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13459__$1,cljs.core.cst$kw$gline);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13459__$1,cljs.core.cst$kw$gcol);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__13457,col,infos,vec__13456,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__13461;
new_cols = G__13462;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__13463 = cljs.core.next(line_map_seq);
var G__13464 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__13463;
new_lines = G__13464;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = (function (){var G__13516 = cljs.core.sorted_map();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13516) : cljs.core.atom.call(null,G__13516));
})();
var seq__13517_13567 = cljs.core.seq(reverse_map);
var chunk__13518_13568 = null;
var count__13519_13569 = (0);
var i__13520_13570 = (0);
while(true){
if((i__13520_13570 < count__13519_13569)){
var vec__13521_13571 = chunk__13518_13568.cljs$core$IIndexed$_nth$arity$2(null,i__13520_13570);
var line_13572 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13521_13571,(0),null);
var columns_13573 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13521_13571,(1),null);
var seq__13522_13574 = cljs.core.seq(columns_13573);
var chunk__13523_13575 = null;
var count__13524_13576 = (0);
var i__13525_13577 = (0);
while(true){
if((i__13525_13577 < count__13524_13576)){
var vec__13526_13578 = chunk__13523_13575.cljs$core$IIndexed$_nth$arity$2(null,i__13525_13577);
var column_13579 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13526_13578,(0),null);
var column_info_13580 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13526_13578,(1),null);
var seq__13527_13581 = cljs.core.seq(column_info_13580);
var chunk__13528_13582 = null;
var count__13529_13583 = (0);
var i__13530_13584 = (0);
while(true){
if((i__13530_13584 < count__13529_13583)){
var map__13531_13585 = chunk__13528_13582.cljs$core$IIndexed$_nth$arity$2(null,i__13530_13584);
var map__13531_13586__$1 = ((((!((map__13531_13585 == null)))?((((map__13531_13585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13531_13585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13531_13585):map__13531_13585);
var gline_13587 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13531_13586__$1,cljs.core.cst$kw$gline);
var gcol_13588 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13531_13586__$1,cljs.core.cst$kw$gcol);
var name_13589 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13531_13586__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13587], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13527_13581,chunk__13528_13582,count__13529_13583,i__13530_13584,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13531_13585,map__13531_13586__$1,gline_13587,gcol_13588,name_13589,vec__13526_13578,column_13579,column_info_13580,vec__13521_13571,line_13572,columns_13573,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13588], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13572,cljs.core.cst$kw$col,column_13579,cljs.core.cst$kw$name,name_13589], null));
});})(seq__13527_13581,chunk__13528_13582,count__13529_13583,i__13530_13584,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13531_13585,map__13531_13586__$1,gline_13587,gcol_13588,name_13589,vec__13526_13578,column_13579,column_info_13580,vec__13521_13571,line_13572,columns_13573,inverted))
,cljs.core.sorted_map()));

var G__13590 = seq__13527_13581;
var G__13591 = chunk__13528_13582;
var G__13592 = count__13529_13583;
var G__13593 = (i__13530_13584 + (1));
seq__13527_13581 = G__13590;
chunk__13528_13582 = G__13591;
count__13529_13583 = G__13592;
i__13530_13584 = G__13593;
continue;
} else {
var temp__4657__auto___13594 = cljs.core.seq(seq__13527_13581);
if(temp__4657__auto___13594){
var seq__13527_13595__$1 = temp__4657__auto___13594;
if(cljs.core.chunked_seq_QMARK_(seq__13527_13595__$1)){
var c__6673__auto___13596 = cljs.core.chunk_first(seq__13527_13595__$1);
var G__13597 = cljs.core.chunk_rest(seq__13527_13595__$1);
var G__13598 = c__6673__auto___13596;
var G__13599 = cljs.core.count(c__6673__auto___13596);
var G__13600 = (0);
seq__13527_13581 = G__13597;
chunk__13528_13582 = G__13598;
count__13529_13583 = G__13599;
i__13530_13584 = G__13600;
continue;
} else {
var map__13533_13601 = cljs.core.first(seq__13527_13595__$1);
var map__13533_13602__$1 = ((((!((map__13533_13601 == null)))?((((map__13533_13601.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13533_13601.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13533_13601):map__13533_13601);
var gline_13603 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13533_13602__$1,cljs.core.cst$kw$gline);
var gcol_13604 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13533_13602__$1,cljs.core.cst$kw$gcol);
var name_13605 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13533_13602__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13603], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13527_13581,chunk__13528_13582,count__13529_13583,i__13530_13584,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13533_13601,map__13533_13602__$1,gline_13603,gcol_13604,name_13605,seq__13527_13595__$1,temp__4657__auto___13594,vec__13526_13578,column_13579,column_info_13580,vec__13521_13571,line_13572,columns_13573,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13604], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13572,cljs.core.cst$kw$col,column_13579,cljs.core.cst$kw$name,name_13605], null));
});})(seq__13527_13581,chunk__13528_13582,count__13529_13583,i__13530_13584,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13533_13601,map__13533_13602__$1,gline_13603,gcol_13604,name_13605,seq__13527_13595__$1,temp__4657__auto___13594,vec__13526_13578,column_13579,column_info_13580,vec__13521_13571,line_13572,columns_13573,inverted))
,cljs.core.sorted_map()));

var G__13606 = cljs.core.next(seq__13527_13595__$1);
var G__13607 = null;
var G__13608 = (0);
var G__13609 = (0);
seq__13527_13581 = G__13606;
chunk__13528_13582 = G__13607;
count__13529_13583 = G__13608;
i__13530_13584 = G__13609;
continue;
}
} else {
}
}
break;
}

var G__13610 = seq__13522_13574;
var G__13611 = chunk__13523_13575;
var G__13612 = count__13524_13576;
var G__13613 = (i__13525_13577 + (1));
seq__13522_13574 = G__13610;
chunk__13523_13575 = G__13611;
count__13524_13576 = G__13612;
i__13525_13577 = G__13613;
continue;
} else {
var temp__4657__auto___13614 = cljs.core.seq(seq__13522_13574);
if(temp__4657__auto___13614){
var seq__13522_13615__$1 = temp__4657__auto___13614;
if(cljs.core.chunked_seq_QMARK_(seq__13522_13615__$1)){
var c__6673__auto___13616 = cljs.core.chunk_first(seq__13522_13615__$1);
var G__13617 = cljs.core.chunk_rest(seq__13522_13615__$1);
var G__13618 = c__6673__auto___13616;
var G__13619 = cljs.core.count(c__6673__auto___13616);
var G__13620 = (0);
seq__13522_13574 = G__13617;
chunk__13523_13575 = G__13618;
count__13524_13576 = G__13619;
i__13525_13577 = G__13620;
continue;
} else {
var vec__13535_13621 = cljs.core.first(seq__13522_13615__$1);
var column_13622 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13535_13621,(0),null);
var column_info_13623 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13535_13621,(1),null);
var seq__13536_13624 = cljs.core.seq(column_info_13623);
var chunk__13537_13625 = null;
var count__13538_13626 = (0);
var i__13539_13627 = (0);
while(true){
if((i__13539_13627 < count__13538_13626)){
var map__13540_13628 = chunk__13537_13625.cljs$core$IIndexed$_nth$arity$2(null,i__13539_13627);
var map__13540_13629__$1 = ((((!((map__13540_13628 == null)))?((((map__13540_13628.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13540_13628.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13540_13628):map__13540_13628);
var gline_13630 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13540_13629__$1,cljs.core.cst$kw$gline);
var gcol_13631 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13540_13629__$1,cljs.core.cst$kw$gcol);
var name_13632 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13540_13629__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13630], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13536_13624,chunk__13537_13625,count__13538_13626,i__13539_13627,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13540_13628,map__13540_13629__$1,gline_13630,gcol_13631,name_13632,vec__13535_13621,column_13622,column_info_13623,seq__13522_13615__$1,temp__4657__auto___13614,vec__13521_13571,line_13572,columns_13573,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13631], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13572,cljs.core.cst$kw$col,column_13622,cljs.core.cst$kw$name,name_13632], null));
});})(seq__13536_13624,chunk__13537_13625,count__13538_13626,i__13539_13627,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13540_13628,map__13540_13629__$1,gline_13630,gcol_13631,name_13632,vec__13535_13621,column_13622,column_info_13623,seq__13522_13615__$1,temp__4657__auto___13614,vec__13521_13571,line_13572,columns_13573,inverted))
,cljs.core.sorted_map()));

var G__13633 = seq__13536_13624;
var G__13634 = chunk__13537_13625;
var G__13635 = count__13538_13626;
var G__13636 = (i__13539_13627 + (1));
seq__13536_13624 = G__13633;
chunk__13537_13625 = G__13634;
count__13538_13626 = G__13635;
i__13539_13627 = G__13636;
continue;
} else {
var temp__4657__auto___13637__$1 = cljs.core.seq(seq__13536_13624);
if(temp__4657__auto___13637__$1){
var seq__13536_13638__$1 = temp__4657__auto___13637__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13536_13638__$1)){
var c__6673__auto___13639 = cljs.core.chunk_first(seq__13536_13638__$1);
var G__13640 = cljs.core.chunk_rest(seq__13536_13638__$1);
var G__13641 = c__6673__auto___13639;
var G__13642 = cljs.core.count(c__6673__auto___13639);
var G__13643 = (0);
seq__13536_13624 = G__13640;
chunk__13537_13625 = G__13641;
count__13538_13626 = G__13642;
i__13539_13627 = G__13643;
continue;
} else {
var map__13542_13644 = cljs.core.first(seq__13536_13638__$1);
var map__13542_13645__$1 = ((((!((map__13542_13644 == null)))?((((map__13542_13644.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13542_13644.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13542_13644):map__13542_13644);
var gline_13646 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13542_13645__$1,cljs.core.cst$kw$gline);
var gcol_13647 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13542_13645__$1,cljs.core.cst$kw$gcol);
var name_13648 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13542_13645__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13646], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13536_13624,chunk__13537_13625,count__13538_13626,i__13539_13627,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13542_13644,map__13542_13645__$1,gline_13646,gcol_13647,name_13648,seq__13536_13638__$1,temp__4657__auto___13637__$1,vec__13535_13621,column_13622,column_info_13623,seq__13522_13615__$1,temp__4657__auto___13614,vec__13521_13571,line_13572,columns_13573,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13647], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13572,cljs.core.cst$kw$col,column_13622,cljs.core.cst$kw$name,name_13648], null));
});})(seq__13536_13624,chunk__13537_13625,count__13538_13626,i__13539_13627,seq__13522_13574,chunk__13523_13575,count__13524_13576,i__13525_13577,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13542_13644,map__13542_13645__$1,gline_13646,gcol_13647,name_13648,seq__13536_13638__$1,temp__4657__auto___13637__$1,vec__13535_13621,column_13622,column_info_13623,seq__13522_13615__$1,temp__4657__auto___13614,vec__13521_13571,line_13572,columns_13573,inverted))
,cljs.core.sorted_map()));

var G__13649 = cljs.core.next(seq__13536_13638__$1);
var G__13650 = null;
var G__13651 = (0);
var G__13652 = (0);
seq__13536_13624 = G__13649;
chunk__13537_13625 = G__13650;
count__13538_13626 = G__13651;
i__13539_13627 = G__13652;
continue;
}
} else {
}
}
break;
}

var G__13653 = cljs.core.next(seq__13522_13615__$1);
var G__13654 = null;
var G__13655 = (0);
var G__13656 = (0);
seq__13522_13574 = G__13653;
chunk__13523_13575 = G__13654;
count__13524_13576 = G__13655;
i__13525_13577 = G__13656;
continue;
}
} else {
}
}
break;
}

var G__13657 = seq__13517_13567;
var G__13658 = chunk__13518_13568;
var G__13659 = count__13519_13569;
var G__13660 = (i__13520_13570 + (1));
seq__13517_13567 = G__13657;
chunk__13518_13568 = G__13658;
count__13519_13569 = G__13659;
i__13520_13570 = G__13660;
continue;
} else {
var temp__4657__auto___13661 = cljs.core.seq(seq__13517_13567);
if(temp__4657__auto___13661){
var seq__13517_13662__$1 = temp__4657__auto___13661;
if(cljs.core.chunked_seq_QMARK_(seq__13517_13662__$1)){
var c__6673__auto___13663 = cljs.core.chunk_first(seq__13517_13662__$1);
var G__13664 = cljs.core.chunk_rest(seq__13517_13662__$1);
var G__13665 = c__6673__auto___13663;
var G__13666 = cljs.core.count(c__6673__auto___13663);
var G__13667 = (0);
seq__13517_13567 = G__13664;
chunk__13518_13568 = G__13665;
count__13519_13569 = G__13666;
i__13520_13570 = G__13667;
continue;
} else {
var vec__13544_13668 = cljs.core.first(seq__13517_13662__$1);
var line_13669 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13544_13668,(0),null);
var columns_13670 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13544_13668,(1),null);
var seq__13545_13671 = cljs.core.seq(columns_13670);
var chunk__13546_13672 = null;
var count__13547_13673 = (0);
var i__13548_13674 = (0);
while(true){
if((i__13548_13674 < count__13547_13673)){
var vec__13549_13675 = chunk__13546_13672.cljs$core$IIndexed$_nth$arity$2(null,i__13548_13674);
var column_13676 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13549_13675,(0),null);
var column_info_13677 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13549_13675,(1),null);
var seq__13550_13678 = cljs.core.seq(column_info_13677);
var chunk__13551_13679 = null;
var count__13552_13680 = (0);
var i__13553_13681 = (0);
while(true){
if((i__13553_13681 < count__13552_13680)){
var map__13554_13682 = chunk__13551_13679.cljs$core$IIndexed$_nth$arity$2(null,i__13553_13681);
var map__13554_13683__$1 = ((((!((map__13554_13682 == null)))?((((map__13554_13682.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13554_13682.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13554_13682):map__13554_13682);
var gline_13684 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13554_13683__$1,cljs.core.cst$kw$gline);
var gcol_13685 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13554_13683__$1,cljs.core.cst$kw$gcol);
var name_13686 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13554_13683__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13684], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13550_13678,chunk__13551_13679,count__13552_13680,i__13553_13681,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13554_13682,map__13554_13683__$1,gline_13684,gcol_13685,name_13686,vec__13549_13675,column_13676,column_info_13677,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13685], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13669,cljs.core.cst$kw$col,column_13676,cljs.core.cst$kw$name,name_13686], null));
});})(seq__13550_13678,chunk__13551_13679,count__13552_13680,i__13553_13681,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13554_13682,map__13554_13683__$1,gline_13684,gcol_13685,name_13686,vec__13549_13675,column_13676,column_info_13677,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted))
,cljs.core.sorted_map()));

var G__13687 = seq__13550_13678;
var G__13688 = chunk__13551_13679;
var G__13689 = count__13552_13680;
var G__13690 = (i__13553_13681 + (1));
seq__13550_13678 = G__13687;
chunk__13551_13679 = G__13688;
count__13552_13680 = G__13689;
i__13553_13681 = G__13690;
continue;
} else {
var temp__4657__auto___13691__$1 = cljs.core.seq(seq__13550_13678);
if(temp__4657__auto___13691__$1){
var seq__13550_13692__$1 = temp__4657__auto___13691__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13550_13692__$1)){
var c__6673__auto___13693 = cljs.core.chunk_first(seq__13550_13692__$1);
var G__13694 = cljs.core.chunk_rest(seq__13550_13692__$1);
var G__13695 = c__6673__auto___13693;
var G__13696 = cljs.core.count(c__6673__auto___13693);
var G__13697 = (0);
seq__13550_13678 = G__13694;
chunk__13551_13679 = G__13695;
count__13552_13680 = G__13696;
i__13553_13681 = G__13697;
continue;
} else {
var map__13556_13698 = cljs.core.first(seq__13550_13692__$1);
var map__13556_13699__$1 = ((((!((map__13556_13698 == null)))?((((map__13556_13698.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13556_13698.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13556_13698):map__13556_13698);
var gline_13700 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13556_13699__$1,cljs.core.cst$kw$gline);
var gcol_13701 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13556_13699__$1,cljs.core.cst$kw$gcol);
var name_13702 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13556_13699__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13700], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13550_13678,chunk__13551_13679,count__13552_13680,i__13553_13681,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13556_13698,map__13556_13699__$1,gline_13700,gcol_13701,name_13702,seq__13550_13692__$1,temp__4657__auto___13691__$1,vec__13549_13675,column_13676,column_info_13677,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13701], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13669,cljs.core.cst$kw$col,column_13676,cljs.core.cst$kw$name,name_13702], null));
});})(seq__13550_13678,chunk__13551_13679,count__13552_13680,i__13553_13681,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13556_13698,map__13556_13699__$1,gline_13700,gcol_13701,name_13702,seq__13550_13692__$1,temp__4657__auto___13691__$1,vec__13549_13675,column_13676,column_info_13677,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted))
,cljs.core.sorted_map()));

var G__13703 = cljs.core.next(seq__13550_13692__$1);
var G__13704 = null;
var G__13705 = (0);
var G__13706 = (0);
seq__13550_13678 = G__13703;
chunk__13551_13679 = G__13704;
count__13552_13680 = G__13705;
i__13553_13681 = G__13706;
continue;
}
} else {
}
}
break;
}

var G__13707 = seq__13545_13671;
var G__13708 = chunk__13546_13672;
var G__13709 = count__13547_13673;
var G__13710 = (i__13548_13674 + (1));
seq__13545_13671 = G__13707;
chunk__13546_13672 = G__13708;
count__13547_13673 = G__13709;
i__13548_13674 = G__13710;
continue;
} else {
var temp__4657__auto___13711__$1 = cljs.core.seq(seq__13545_13671);
if(temp__4657__auto___13711__$1){
var seq__13545_13712__$1 = temp__4657__auto___13711__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13545_13712__$1)){
var c__6673__auto___13713 = cljs.core.chunk_first(seq__13545_13712__$1);
var G__13714 = cljs.core.chunk_rest(seq__13545_13712__$1);
var G__13715 = c__6673__auto___13713;
var G__13716 = cljs.core.count(c__6673__auto___13713);
var G__13717 = (0);
seq__13545_13671 = G__13714;
chunk__13546_13672 = G__13715;
count__13547_13673 = G__13716;
i__13548_13674 = G__13717;
continue;
} else {
var vec__13558_13718 = cljs.core.first(seq__13545_13712__$1);
var column_13719 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13558_13718,(0),null);
var column_info_13720 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13558_13718,(1),null);
var seq__13559_13721 = cljs.core.seq(column_info_13720);
var chunk__13560_13722 = null;
var count__13561_13723 = (0);
var i__13562_13724 = (0);
while(true){
if((i__13562_13724 < count__13561_13723)){
var map__13563_13725 = chunk__13560_13722.cljs$core$IIndexed$_nth$arity$2(null,i__13562_13724);
var map__13563_13726__$1 = ((((!((map__13563_13725 == null)))?((((map__13563_13725.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13563_13725.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13563_13725):map__13563_13725);
var gline_13727 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13563_13726__$1,cljs.core.cst$kw$gline);
var gcol_13728 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13563_13726__$1,cljs.core.cst$kw$gcol);
var name_13729 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13563_13726__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13727], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13559_13721,chunk__13560_13722,count__13561_13723,i__13562_13724,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13563_13725,map__13563_13726__$1,gline_13727,gcol_13728,name_13729,vec__13558_13718,column_13719,column_info_13720,seq__13545_13712__$1,temp__4657__auto___13711__$1,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13728], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13669,cljs.core.cst$kw$col,column_13719,cljs.core.cst$kw$name,name_13729], null));
});})(seq__13559_13721,chunk__13560_13722,count__13561_13723,i__13562_13724,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13563_13725,map__13563_13726__$1,gline_13727,gcol_13728,name_13729,vec__13558_13718,column_13719,column_info_13720,seq__13545_13712__$1,temp__4657__auto___13711__$1,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted))
,cljs.core.sorted_map()));

var G__13730 = seq__13559_13721;
var G__13731 = chunk__13560_13722;
var G__13732 = count__13561_13723;
var G__13733 = (i__13562_13724 + (1));
seq__13559_13721 = G__13730;
chunk__13560_13722 = G__13731;
count__13561_13723 = G__13732;
i__13562_13724 = G__13733;
continue;
} else {
var temp__4657__auto___13734__$2 = cljs.core.seq(seq__13559_13721);
if(temp__4657__auto___13734__$2){
var seq__13559_13735__$1 = temp__4657__auto___13734__$2;
if(cljs.core.chunked_seq_QMARK_(seq__13559_13735__$1)){
var c__6673__auto___13736 = cljs.core.chunk_first(seq__13559_13735__$1);
var G__13737 = cljs.core.chunk_rest(seq__13559_13735__$1);
var G__13738 = c__6673__auto___13736;
var G__13739 = cljs.core.count(c__6673__auto___13736);
var G__13740 = (0);
seq__13559_13721 = G__13737;
chunk__13560_13722 = G__13738;
count__13561_13723 = G__13739;
i__13562_13724 = G__13740;
continue;
} else {
var map__13565_13741 = cljs.core.first(seq__13559_13735__$1);
var map__13565_13742__$1 = ((((!((map__13565_13741 == null)))?((((map__13565_13741.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13565_13741.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13565_13741):map__13565_13741);
var gline_13743 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13565_13742__$1,cljs.core.cst$kw$gline);
var gcol_13744 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13565_13742__$1,cljs.core.cst$kw$gcol);
var name_13745 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13565_13742__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13743], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13559_13721,chunk__13560_13722,count__13561_13723,i__13562_13724,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13565_13741,map__13565_13742__$1,gline_13743,gcol_13744,name_13745,seq__13559_13735__$1,temp__4657__auto___13734__$2,vec__13558_13718,column_13719,column_info_13720,seq__13545_13712__$1,temp__4657__auto___13711__$1,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13744], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13669,cljs.core.cst$kw$col,column_13719,cljs.core.cst$kw$name,name_13745], null));
});})(seq__13559_13721,chunk__13560_13722,count__13561_13723,i__13562_13724,seq__13545_13671,chunk__13546_13672,count__13547_13673,i__13548_13674,seq__13517_13567,chunk__13518_13568,count__13519_13569,i__13520_13570,map__13565_13741,map__13565_13742__$1,gline_13743,gcol_13744,name_13745,seq__13559_13735__$1,temp__4657__auto___13734__$2,vec__13558_13718,column_13719,column_info_13720,seq__13545_13712__$1,temp__4657__auto___13711__$1,vec__13544_13668,line_13669,columns_13670,seq__13517_13662__$1,temp__4657__auto___13661,inverted))
,cljs.core.sorted_map()));

var G__13746 = cljs.core.next(seq__13559_13735__$1);
var G__13747 = null;
var G__13748 = (0);
var G__13749 = (0);
seq__13559_13721 = G__13746;
chunk__13560_13722 = G__13747;
count__13561_13723 = G__13748;
i__13562_13724 = G__13749;
continue;
}
} else {
}
}
break;
}

var G__13750 = cljs.core.next(seq__13545_13712__$1);
var G__13751 = null;
var G__13752 = (0);
var G__13753 = (0);
seq__13545_13671 = G__13750;
chunk__13546_13672 = G__13751;
count__13547_13673 = G__13752;
i__13548_13674 = G__13753;
continue;
}
} else {
}
}
break;
}

var G__13754 = cljs.core.next(seq__13517_13662__$1);
var G__13755 = null;
var G__13756 = (0);
var G__13757 = (0);
seq__13517_13567 = G__13754;
chunk__13518_13568 = G__13755;
count__13519_13569 = G__13756;
i__13520_13570 = G__13757;
continue;
}
} else {
}
}
break;
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inverted) : cljs.core.deref.call(null,inverted));
});
