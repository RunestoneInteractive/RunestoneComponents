// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
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
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (m,p__12983){
var vec__12984 = p__12983;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12984,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12984,(1),null);
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
var vec__12986 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12986,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12986,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12986,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12986,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12986,(4),null);
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
var vec__12989 = seg;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12989,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12989,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12989,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12989,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12989,(4),null);
var vec__12990 = relseg;
var rgcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12990,(0),null);
var rsource = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12990,(1),null);
var rline = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12990,(2),null);
var rcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12990,(3),null);
var rname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12990,(4),null);
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
var map__12993 = segmap;
var map__12993__$1 = ((((!((map__12993 == null)))?((((map__12993.cljs$lang$protocol_mask$partition0$ & (64))) || (map__12993.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__12993):map__12993);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12993__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12993__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12993__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12993__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__12993__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gline,gline,cljs.core.cst$kw$gcol,gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,d__$1);
});})(map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});})(map__12993,map__12993__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args12995 = [];
var len__6931__auto___12999 = arguments.length;
var i__6932__auto___13000 = (0);
while(true){
if((i__6932__auto___13000 < len__6931__auto___12999)){
args12995.push((arguments[i__6932__auto___13000]));

var G__13001 = (i__6932__auto___13000 + (1));
i__6932__auto___13000 = G__13001;
continue;
} else {
}
break;
}

var G__12997 = args12995.length;
switch (G__12997) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12995.length)].join('')));

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
var vec__12998 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__13003 = cljs.core.next(segs__$1);
var G__13004 = nrelseg;
var G__13005 = cljs.source_map.update_reverse_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__13003;
relseg__$1 = G__13004;
result__$1 = G__13005;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12998,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__12998,(1),null);
var G__13006 = (gline + (1));
var G__13007 = cljs.core.next(lines__$1);
var G__13008 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__13009 = result__$1;
gline = G__13006;
lines__$1 = G__13007;
relseg = G__13008;
result = G__13009;
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
var map__13013 = segmap;
var map__13013__$1 = ((((!((map__13013 == null)))?((((map__13013.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13013.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13013):map__13013);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13013__$1,cljs.core.cst$kw$gcol);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13013__$1,cljs.core.cst$kw$source);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13013__$1,cljs.core.cst$kw$line);
var col = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13013__$1,cljs.core.cst$kw$col);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13013__$1,cljs.core.cst$kw$name);
var d = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line,cljs.core.cst$kw$col,col,cljs.core.cst$kw$source,source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d,cljs.core.cst$kw$name,name):d);
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13013,map__13013__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (map__13013,map__13013__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__13010_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__13010_SHARP_,d__$1);
});})(map__13013,map__13013__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13013,map__13013__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map()));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args13015 = [];
var len__6931__auto___13019 = arguments.length;
var i__6932__auto___13020 = (0);
while(true){
if((i__6932__auto___13020 < len__6931__auto___13019)){
args13015.push((arguments[i__6932__auto___13020]));

var G__13021 = (i__6932__auto___13020 + (1));
i__6932__auto___13020 = G__13021;
continue;
} else {
}
break;
}

var G__13017 = args13015.length;
switch (G__13017) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13015.length)].join('')));

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
var vec__13018 = ((clojure.string.blank_QMARK_(line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq(clojure.string.split.cljs$core$IFn$_invoke$arity$2(line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first(segs__$1);
var nrelseg = cljs.source_map.seg_combine(cljs.source_map.base64_vlq.decode(seg),relseg__$1);
var G__13023 = cljs.core.next(segs__$1);
var G__13024 = nrelseg;
var G__13025 = cljs.source_map.update_result(result__$1,cljs.source_map.seg__GT_map(nrelseg,source_map),gline);
segs__$1 = G__13023;
relseg__$1 = G__13024;
result__$1 = G__13025;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13018,(0),null);
var relseg__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13018,(1),null);
var G__13026 = (gline + (1));
var G__13027 = cljs.core.next(lines__$1);
var G__13028 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(relseg__$1,(0),(0));
var G__13029 = result__$1;
gline = G__13026;
lines__$1 = G__13027;
relseg = G__13028;
result = G__13029;
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
var relseg = (function (){var G__13037 = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13037) : cljs.core.atom.call(null,G__13037));
})();
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (relseg){
return (function (p__13038){
var vec__13039 = p__13038;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13039,(0),null);
var source = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13039,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13039,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13039,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13039,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (relseg){
return (function (cols__$1,p__13040){
var vec__13041 = p__13040;
var gcol = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13041,(0),null);
var sidx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13041,(1),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13041,(2),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13041,(3),null);
var name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13041,(4),null);
var seg = vec__13041;
var offset = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._,seg,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(relseg) : cljs.core.deref.call(null,relseg)));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(relseg,((function (offset,vec__13041,gcol,sidx,line,col,name,seg,relseg){
return (function (p__13042){
var vec__13043 = p__13042;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13043,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13043,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13043,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13043,(3),null);
var lname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13043,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__13041,gcol,sidx,line,col,name,seg,relseg))
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
var lines = (function (){var G__13102 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13102) : cljs.core.atom.call(null,G__13102));
})();
var names__GT_idx = (function (){var G__13103 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13103) : cljs.core.atom.call(null,G__13103));
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
var seq__13104 = cljs.core.seq(infos);
var chunk__13105 = null;
var count__13106 = (0);
var i__13107 = (0);
while(true){
if((i__13107 < count__13106)){
var info = chunk__13105.cljs$core$IIndexed$_nth$arity$2(null,i__13107);
var segv_13157 = info__GT_segv(info,source_idx,line,col);
var gline_13158 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_13159 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_13158 > (lc_13159 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13104,chunk__13105,count__13106,i__13107,segv_13157,gline_13158,lc_13159,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_13158 - (lc_13159 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13157], null));
});})(seq__13104,chunk__13105,count__13106,i__13107,segv_13157,gline_13158,lc_13159,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13104,chunk__13105,count__13106,i__13107,segv_13157,gline_13158,lc_13159,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13158], null),cljs.core.conj,segv_13157);
});})(seq__13104,chunk__13105,count__13106,i__13107,segv_13157,gline_13158,lc_13159,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__13160 = seq__13104;
var G__13161 = chunk__13105;
var G__13162 = count__13106;
var G__13163 = (i__13107 + (1));
seq__13104 = G__13160;
chunk__13105 = G__13161;
count__13106 = G__13162;
i__13107 = G__13163;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__13104);
if(temp__4657__auto__){
var seq__13104__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__13104__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__13104__$1);
var G__13164 = cljs.core.chunk_rest(seq__13104__$1);
var G__13165 = c__6673__auto__;
var G__13166 = cljs.core.count(c__6673__auto__);
var G__13167 = (0);
seq__13104 = G__13164;
chunk__13105 = G__13165;
count__13106 = G__13166;
i__13107 = G__13167;
continue;
} else {
var info = cljs.core.first(seq__13104__$1);
var segv_13168 = info__GT_segv(info,source_idx,line,col);
var gline_13169 = cljs.core.cst$kw$gline.cljs$core$IFn$_invoke$arity$1(info);
var lc_13170 = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)));
if((gline_13169 > (lc_13170 - (1)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13104,chunk__13105,count__13106,i__13107,segv_13168,gline_13169,lc_13170,info,seq__13104__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(lines__$1,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(((gline_13169 - (lc_13170 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13168], null));
});})(seq__13104,chunk__13105,count__13106,i__13107,segv_13168,gline_13169,lc_13170,info,seq__13104__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(lines,((function (seq__13104,chunk__13105,count__13106,i__13107,segv_13168,gline_13169,lc_13170,info,seq__13104__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13169], null),cljs.core.conj,segv_13168);
});})(seq__13104,chunk__13105,count__13106,i__13107,segv_13168,gline_13169,lc_13170,info,seq__13104__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__13171 = cljs.core.next(seq__13104__$1);
var G__13172 = null;
var G__13173 = (0);
var G__13174 = (0);
seq__13104 = G__13171;
chunk__13105 = G__13172;
count__13106 = G__13173;
i__13107 = G__13174;
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
var seq__13108_13175 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__13109_13176 = null;
var count__13110_13177 = (0);
var i__13111_13178 = (0);
while(true){
if((i__13111_13178 < count__13110_13177)){
var vec__13112_13179 = chunk__13109_13176.cljs$core$IIndexed$_nth$arity$2(null,i__13111_13178);
var source_idx_13180 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13112_13179,(0),null);
var vec__13113_13181 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13112_13179,(1),null);
var __13182 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13113_13181,(0),null);
var lines_13183__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13113_13181,(1),null);
var seq__13114_13184 = cljs.core.seq(lines_13183__$1);
var chunk__13115_13185 = null;
var count__13116_13186 = (0);
var i__13117_13187 = (0);
while(true){
if((i__13117_13187 < count__13116_13186)){
var vec__13118_13188 = chunk__13115_13185.cljs$core$IIndexed$_nth$arity$2(null,i__13117_13187);
var line_13189 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13118_13188,(0),null);
var cols_13190 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13118_13188,(1),null);
var seq__13119_13191 = cljs.core.seq(cols_13190);
var chunk__13120_13192 = null;
var count__13121_13193 = (0);
var i__13122_13194 = (0);
while(true){
if((i__13122_13194 < count__13121_13193)){
var vec__13123_13195 = chunk__13120_13192.cljs$core$IIndexed$_nth$arity$2(null,i__13122_13194);
var col_13196 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13123_13195,(0),null);
var infos_13197 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13123_13195,(1),null);
encode_cols(infos_13197,source_idx_13180,line_13189,col_13196);

var G__13198 = seq__13119_13191;
var G__13199 = chunk__13120_13192;
var G__13200 = count__13121_13193;
var G__13201 = (i__13122_13194 + (1));
seq__13119_13191 = G__13198;
chunk__13120_13192 = G__13199;
count__13121_13193 = G__13200;
i__13122_13194 = G__13201;
continue;
} else {
var temp__4657__auto___13202 = cljs.core.seq(seq__13119_13191);
if(temp__4657__auto___13202){
var seq__13119_13203__$1 = temp__4657__auto___13202;
if(cljs.core.chunked_seq_QMARK_(seq__13119_13203__$1)){
var c__6673__auto___13204 = cljs.core.chunk_first(seq__13119_13203__$1);
var G__13205 = cljs.core.chunk_rest(seq__13119_13203__$1);
var G__13206 = c__6673__auto___13204;
var G__13207 = cljs.core.count(c__6673__auto___13204);
var G__13208 = (0);
seq__13119_13191 = G__13205;
chunk__13120_13192 = G__13206;
count__13121_13193 = G__13207;
i__13122_13194 = G__13208;
continue;
} else {
var vec__13124_13209 = cljs.core.first(seq__13119_13203__$1);
var col_13210 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13124_13209,(0),null);
var infos_13211 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13124_13209,(1),null);
encode_cols(infos_13211,source_idx_13180,line_13189,col_13210);

var G__13212 = cljs.core.next(seq__13119_13203__$1);
var G__13213 = null;
var G__13214 = (0);
var G__13215 = (0);
seq__13119_13191 = G__13212;
chunk__13120_13192 = G__13213;
count__13121_13193 = G__13214;
i__13122_13194 = G__13215;
continue;
}
} else {
}
}
break;
}

var G__13216 = seq__13114_13184;
var G__13217 = chunk__13115_13185;
var G__13218 = count__13116_13186;
var G__13219 = (i__13117_13187 + (1));
seq__13114_13184 = G__13216;
chunk__13115_13185 = G__13217;
count__13116_13186 = G__13218;
i__13117_13187 = G__13219;
continue;
} else {
var temp__4657__auto___13220 = cljs.core.seq(seq__13114_13184);
if(temp__4657__auto___13220){
var seq__13114_13221__$1 = temp__4657__auto___13220;
if(cljs.core.chunked_seq_QMARK_(seq__13114_13221__$1)){
var c__6673__auto___13222 = cljs.core.chunk_first(seq__13114_13221__$1);
var G__13223 = cljs.core.chunk_rest(seq__13114_13221__$1);
var G__13224 = c__6673__auto___13222;
var G__13225 = cljs.core.count(c__6673__auto___13222);
var G__13226 = (0);
seq__13114_13184 = G__13223;
chunk__13115_13185 = G__13224;
count__13116_13186 = G__13225;
i__13117_13187 = G__13226;
continue;
} else {
var vec__13125_13227 = cljs.core.first(seq__13114_13221__$1);
var line_13228 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13125_13227,(0),null);
var cols_13229 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13125_13227,(1),null);
var seq__13126_13230 = cljs.core.seq(cols_13229);
var chunk__13127_13231 = null;
var count__13128_13232 = (0);
var i__13129_13233 = (0);
while(true){
if((i__13129_13233 < count__13128_13232)){
var vec__13130_13234 = chunk__13127_13231.cljs$core$IIndexed$_nth$arity$2(null,i__13129_13233);
var col_13235 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13130_13234,(0),null);
var infos_13236 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13130_13234,(1),null);
encode_cols(infos_13236,source_idx_13180,line_13228,col_13235);

var G__13237 = seq__13126_13230;
var G__13238 = chunk__13127_13231;
var G__13239 = count__13128_13232;
var G__13240 = (i__13129_13233 + (1));
seq__13126_13230 = G__13237;
chunk__13127_13231 = G__13238;
count__13128_13232 = G__13239;
i__13129_13233 = G__13240;
continue;
} else {
var temp__4657__auto___13241__$1 = cljs.core.seq(seq__13126_13230);
if(temp__4657__auto___13241__$1){
var seq__13126_13242__$1 = temp__4657__auto___13241__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13126_13242__$1)){
var c__6673__auto___13243 = cljs.core.chunk_first(seq__13126_13242__$1);
var G__13244 = cljs.core.chunk_rest(seq__13126_13242__$1);
var G__13245 = c__6673__auto___13243;
var G__13246 = cljs.core.count(c__6673__auto___13243);
var G__13247 = (0);
seq__13126_13230 = G__13244;
chunk__13127_13231 = G__13245;
count__13128_13232 = G__13246;
i__13129_13233 = G__13247;
continue;
} else {
var vec__13131_13248 = cljs.core.first(seq__13126_13242__$1);
var col_13249 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13131_13248,(0),null);
var infos_13250 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13131_13248,(1),null);
encode_cols(infos_13250,source_idx_13180,line_13228,col_13249);

var G__13251 = cljs.core.next(seq__13126_13242__$1);
var G__13252 = null;
var G__13253 = (0);
var G__13254 = (0);
seq__13126_13230 = G__13251;
chunk__13127_13231 = G__13252;
count__13128_13232 = G__13253;
i__13129_13233 = G__13254;
continue;
}
} else {
}
}
break;
}

var G__13255 = cljs.core.next(seq__13114_13221__$1);
var G__13256 = null;
var G__13257 = (0);
var G__13258 = (0);
seq__13114_13184 = G__13255;
chunk__13115_13185 = G__13256;
count__13116_13186 = G__13257;
i__13117_13187 = G__13258;
continue;
}
} else {
}
}
break;
}

var G__13259 = seq__13108_13175;
var G__13260 = chunk__13109_13176;
var G__13261 = count__13110_13177;
var G__13262 = (i__13111_13178 + (1));
seq__13108_13175 = G__13259;
chunk__13109_13176 = G__13260;
count__13110_13177 = G__13261;
i__13111_13178 = G__13262;
continue;
} else {
var temp__4657__auto___13263 = cljs.core.seq(seq__13108_13175);
if(temp__4657__auto___13263){
var seq__13108_13264__$1 = temp__4657__auto___13263;
if(cljs.core.chunked_seq_QMARK_(seq__13108_13264__$1)){
var c__6673__auto___13265 = cljs.core.chunk_first(seq__13108_13264__$1);
var G__13266 = cljs.core.chunk_rest(seq__13108_13264__$1);
var G__13267 = c__6673__auto___13265;
var G__13268 = cljs.core.count(c__6673__auto___13265);
var G__13269 = (0);
seq__13108_13175 = G__13266;
chunk__13109_13176 = G__13267;
count__13110_13177 = G__13268;
i__13111_13178 = G__13269;
continue;
} else {
var vec__13132_13270 = cljs.core.first(seq__13108_13264__$1);
var source_idx_13271 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13132_13270,(0),null);
var vec__13133_13272 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13132_13270,(1),null);
var __13273 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133_13272,(0),null);
var lines_13274__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13133_13272,(1),null);
var seq__13134_13275 = cljs.core.seq(lines_13274__$1);
var chunk__13135_13276 = null;
var count__13136_13277 = (0);
var i__13137_13278 = (0);
while(true){
if((i__13137_13278 < count__13136_13277)){
var vec__13138_13279 = chunk__13135_13276.cljs$core$IIndexed$_nth$arity$2(null,i__13137_13278);
var line_13280 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13138_13279,(0),null);
var cols_13281 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13138_13279,(1),null);
var seq__13139_13282 = cljs.core.seq(cols_13281);
var chunk__13140_13283 = null;
var count__13141_13284 = (0);
var i__13142_13285 = (0);
while(true){
if((i__13142_13285 < count__13141_13284)){
var vec__13143_13286 = chunk__13140_13283.cljs$core$IIndexed$_nth$arity$2(null,i__13142_13285);
var col_13287 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13143_13286,(0),null);
var infos_13288 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13143_13286,(1),null);
encode_cols(infos_13288,source_idx_13271,line_13280,col_13287);

var G__13289 = seq__13139_13282;
var G__13290 = chunk__13140_13283;
var G__13291 = count__13141_13284;
var G__13292 = (i__13142_13285 + (1));
seq__13139_13282 = G__13289;
chunk__13140_13283 = G__13290;
count__13141_13284 = G__13291;
i__13142_13285 = G__13292;
continue;
} else {
var temp__4657__auto___13293__$1 = cljs.core.seq(seq__13139_13282);
if(temp__4657__auto___13293__$1){
var seq__13139_13294__$1 = temp__4657__auto___13293__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13139_13294__$1)){
var c__6673__auto___13295 = cljs.core.chunk_first(seq__13139_13294__$1);
var G__13296 = cljs.core.chunk_rest(seq__13139_13294__$1);
var G__13297 = c__6673__auto___13295;
var G__13298 = cljs.core.count(c__6673__auto___13295);
var G__13299 = (0);
seq__13139_13282 = G__13296;
chunk__13140_13283 = G__13297;
count__13141_13284 = G__13298;
i__13142_13285 = G__13299;
continue;
} else {
var vec__13144_13300 = cljs.core.first(seq__13139_13294__$1);
var col_13301 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13144_13300,(0),null);
var infos_13302 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13144_13300,(1),null);
encode_cols(infos_13302,source_idx_13271,line_13280,col_13301);

var G__13303 = cljs.core.next(seq__13139_13294__$1);
var G__13304 = null;
var G__13305 = (0);
var G__13306 = (0);
seq__13139_13282 = G__13303;
chunk__13140_13283 = G__13304;
count__13141_13284 = G__13305;
i__13142_13285 = G__13306;
continue;
}
} else {
}
}
break;
}

var G__13307 = seq__13134_13275;
var G__13308 = chunk__13135_13276;
var G__13309 = count__13136_13277;
var G__13310 = (i__13137_13278 + (1));
seq__13134_13275 = G__13307;
chunk__13135_13276 = G__13308;
count__13136_13277 = G__13309;
i__13137_13278 = G__13310;
continue;
} else {
var temp__4657__auto___13311__$1 = cljs.core.seq(seq__13134_13275);
if(temp__4657__auto___13311__$1){
var seq__13134_13312__$1 = temp__4657__auto___13311__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13134_13312__$1)){
var c__6673__auto___13313 = cljs.core.chunk_first(seq__13134_13312__$1);
var G__13314 = cljs.core.chunk_rest(seq__13134_13312__$1);
var G__13315 = c__6673__auto___13313;
var G__13316 = cljs.core.count(c__6673__auto___13313);
var G__13317 = (0);
seq__13134_13275 = G__13314;
chunk__13135_13276 = G__13315;
count__13136_13277 = G__13316;
i__13137_13278 = G__13317;
continue;
} else {
var vec__13145_13318 = cljs.core.first(seq__13134_13312__$1);
var line_13319 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13145_13318,(0),null);
var cols_13320 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13145_13318,(1),null);
var seq__13146_13321 = cljs.core.seq(cols_13320);
var chunk__13147_13322 = null;
var count__13148_13323 = (0);
var i__13149_13324 = (0);
while(true){
if((i__13149_13324 < count__13148_13323)){
var vec__13150_13325 = chunk__13147_13322.cljs$core$IIndexed$_nth$arity$2(null,i__13149_13324);
var col_13326 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13150_13325,(0),null);
var infos_13327 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13150_13325,(1),null);
encode_cols(infos_13327,source_idx_13271,line_13319,col_13326);

var G__13328 = seq__13146_13321;
var G__13329 = chunk__13147_13322;
var G__13330 = count__13148_13323;
var G__13331 = (i__13149_13324 + (1));
seq__13146_13321 = G__13328;
chunk__13147_13322 = G__13329;
count__13148_13323 = G__13330;
i__13149_13324 = G__13331;
continue;
} else {
var temp__4657__auto___13332__$2 = cljs.core.seq(seq__13146_13321);
if(temp__4657__auto___13332__$2){
var seq__13146_13333__$1 = temp__4657__auto___13332__$2;
if(cljs.core.chunked_seq_QMARK_(seq__13146_13333__$1)){
var c__6673__auto___13334 = cljs.core.chunk_first(seq__13146_13333__$1);
var G__13335 = cljs.core.chunk_rest(seq__13146_13333__$1);
var G__13336 = c__6673__auto___13334;
var G__13337 = cljs.core.count(c__6673__auto___13334);
var G__13338 = (0);
seq__13146_13321 = G__13335;
chunk__13147_13322 = G__13336;
count__13148_13323 = G__13337;
i__13149_13324 = G__13338;
continue;
} else {
var vec__13151_13339 = cljs.core.first(seq__13146_13333__$1);
var col_13340 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13151_13339,(0),null);
var infos_13341 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13151_13339,(1),null);
encode_cols(infos_13341,source_idx_13271,line_13319,col_13340);

var G__13342 = cljs.core.next(seq__13146_13333__$1);
var G__13343 = null;
var G__13344 = (0);
var G__13345 = (0);
seq__13146_13321 = G__13342;
chunk__13147_13322 = G__13343;
count__13148_13323 = G__13344;
i__13149_13324 = G__13345;
continue;
}
} else {
}
}
break;
}

var G__13346 = cljs.core.next(seq__13134_13312__$1);
var G__13347 = null;
var G__13348 = (0);
var G__13349 = (0);
seq__13134_13275 = G__13346;
chunk__13135_13276 = G__13347;
count__13136_13277 = G__13348;
i__13137_13278 = G__13349;
continue;
}
} else {
}
}
break;
}

var G__13350 = cljs.core.next(seq__13108_13264__$1);
var G__13351 = null;
var G__13352 = (0);
var G__13353 = (0);
seq__13108_13175 = G__13350;
chunk__13109_13176 = G__13351;
count__13110_13177 = G__13352;
i__13111_13178 = G__13353;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__13152 = {"version": (3), "file": cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys(m);
var f = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((cljs.core.cst$kw$source_DASH_map_DASH_timestamp.cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13044_SHARP_){
return [cljs.core.str(p1__13044_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13045_SHARP_){
return cljs.core.last(clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__13045_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(f,paths));
})(), "lineCount": cljs.core.cst$kw$lines.cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.cljs$core$IFn$_invoke$arity$2(";",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13046_SHARP_){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",p1__13046_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(preamble_lines,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(lines) : cljs.core.deref.call(null,lines)))))), "names": cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.set.map_invert((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(names__GT_idx) : cljs.core.deref.call(null,names__GT_idx))))))};
if(cljs.core.truth_(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts))){
var G__13153 = G__13152;
var G__13154_13354 = G__13153;
var G__13155_13355 = "sourcesContent";
var G__13156_13356 = cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$sources_DASH_content.cljs$core$IFn$_invoke$arity$1(opts));
goog.object.set(G__13154_13354,G__13155_13355,G__13156_13356);

return G__13153;
} else {
return G__13152;
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
var vec__13362 = cljs.core.first(line_map_seq);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13362,(0),null);
var col_map = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13362,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq(col_map);
var new_cols = cljs.core.sorted_map();
while(true){
if(col_map_seq){
var vec__13363 = cljs.core.first(col_map_seq);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13363,(0),null);
var infos = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13363,(1),null);
var G__13367 = cljs.core.next(col_map_seq);
var G__13368 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_cols,col,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__13363,col,infos,vec__13362,line,col_map){
return (function (v,p__13364){
var map__13365 = p__13364;
var map__13365__$1 = ((((!((map__13365 == null)))?((((map__13365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13365):map__13365);
var gline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13365__$1,cljs.core.cst$kw$gline);
var gcol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13365__$1,cljs.core.cst$kw$gcol);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__13363,col,infos,vec__13362,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__13367;
new_cols = G__13368;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__13369 = cljs.core.next(line_map_seq);
var G__13370 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_lines,line,new_cols);
line_map_seq = G__13369;
new_lines = G__13370;
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
var inverted = (function (){var G__13422 = cljs.core.sorted_map();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13422) : cljs.core.atom.call(null,G__13422));
})();
var seq__13423_13473 = cljs.core.seq(reverse_map);
var chunk__13424_13474 = null;
var count__13425_13475 = (0);
var i__13426_13476 = (0);
while(true){
if((i__13426_13476 < count__13425_13475)){
var vec__13427_13477 = chunk__13424_13474.cljs$core$IIndexed$_nth$arity$2(null,i__13426_13476);
var line_13478 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13427_13477,(0),null);
var columns_13479 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13427_13477,(1),null);
var seq__13428_13480 = cljs.core.seq(columns_13479);
var chunk__13429_13481 = null;
var count__13430_13482 = (0);
var i__13431_13483 = (0);
while(true){
if((i__13431_13483 < count__13430_13482)){
var vec__13432_13484 = chunk__13429_13481.cljs$core$IIndexed$_nth$arity$2(null,i__13431_13483);
var column_13485 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13432_13484,(0),null);
var column_info_13486 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13432_13484,(1),null);
var seq__13433_13487 = cljs.core.seq(column_info_13486);
var chunk__13434_13488 = null;
var count__13435_13489 = (0);
var i__13436_13490 = (0);
while(true){
if((i__13436_13490 < count__13435_13489)){
var map__13437_13491 = chunk__13434_13488.cljs$core$IIndexed$_nth$arity$2(null,i__13436_13490);
var map__13437_13492__$1 = ((((!((map__13437_13491 == null)))?((((map__13437_13491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13437_13491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13437_13491):map__13437_13491);
var gline_13493 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13437_13492__$1,cljs.core.cst$kw$gline);
var gcol_13494 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13437_13492__$1,cljs.core.cst$kw$gcol);
var name_13495 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13437_13492__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13493], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13433_13487,chunk__13434_13488,count__13435_13489,i__13436_13490,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13437_13491,map__13437_13492__$1,gline_13493,gcol_13494,name_13495,vec__13432_13484,column_13485,column_info_13486,vec__13427_13477,line_13478,columns_13479,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13494], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13478,cljs.core.cst$kw$col,column_13485,cljs.core.cst$kw$name,name_13495], null));
});})(seq__13433_13487,chunk__13434_13488,count__13435_13489,i__13436_13490,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13437_13491,map__13437_13492__$1,gline_13493,gcol_13494,name_13495,vec__13432_13484,column_13485,column_info_13486,vec__13427_13477,line_13478,columns_13479,inverted))
,cljs.core.sorted_map()));

var G__13496 = seq__13433_13487;
var G__13497 = chunk__13434_13488;
var G__13498 = count__13435_13489;
var G__13499 = (i__13436_13490 + (1));
seq__13433_13487 = G__13496;
chunk__13434_13488 = G__13497;
count__13435_13489 = G__13498;
i__13436_13490 = G__13499;
continue;
} else {
var temp__4657__auto___13500 = cljs.core.seq(seq__13433_13487);
if(temp__4657__auto___13500){
var seq__13433_13501__$1 = temp__4657__auto___13500;
if(cljs.core.chunked_seq_QMARK_(seq__13433_13501__$1)){
var c__6673__auto___13502 = cljs.core.chunk_first(seq__13433_13501__$1);
var G__13503 = cljs.core.chunk_rest(seq__13433_13501__$1);
var G__13504 = c__6673__auto___13502;
var G__13505 = cljs.core.count(c__6673__auto___13502);
var G__13506 = (0);
seq__13433_13487 = G__13503;
chunk__13434_13488 = G__13504;
count__13435_13489 = G__13505;
i__13436_13490 = G__13506;
continue;
} else {
var map__13439_13507 = cljs.core.first(seq__13433_13501__$1);
var map__13439_13508__$1 = ((((!((map__13439_13507 == null)))?((((map__13439_13507.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13439_13507.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13439_13507):map__13439_13507);
var gline_13509 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13439_13508__$1,cljs.core.cst$kw$gline);
var gcol_13510 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13439_13508__$1,cljs.core.cst$kw$gcol);
var name_13511 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13439_13508__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13509], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13433_13487,chunk__13434_13488,count__13435_13489,i__13436_13490,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13439_13507,map__13439_13508__$1,gline_13509,gcol_13510,name_13511,seq__13433_13501__$1,temp__4657__auto___13500,vec__13432_13484,column_13485,column_info_13486,vec__13427_13477,line_13478,columns_13479,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13510], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13478,cljs.core.cst$kw$col,column_13485,cljs.core.cst$kw$name,name_13511], null));
});})(seq__13433_13487,chunk__13434_13488,count__13435_13489,i__13436_13490,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13439_13507,map__13439_13508__$1,gline_13509,gcol_13510,name_13511,seq__13433_13501__$1,temp__4657__auto___13500,vec__13432_13484,column_13485,column_info_13486,vec__13427_13477,line_13478,columns_13479,inverted))
,cljs.core.sorted_map()));

var G__13512 = cljs.core.next(seq__13433_13501__$1);
var G__13513 = null;
var G__13514 = (0);
var G__13515 = (0);
seq__13433_13487 = G__13512;
chunk__13434_13488 = G__13513;
count__13435_13489 = G__13514;
i__13436_13490 = G__13515;
continue;
}
} else {
}
}
break;
}

var G__13516 = seq__13428_13480;
var G__13517 = chunk__13429_13481;
var G__13518 = count__13430_13482;
var G__13519 = (i__13431_13483 + (1));
seq__13428_13480 = G__13516;
chunk__13429_13481 = G__13517;
count__13430_13482 = G__13518;
i__13431_13483 = G__13519;
continue;
} else {
var temp__4657__auto___13520 = cljs.core.seq(seq__13428_13480);
if(temp__4657__auto___13520){
var seq__13428_13521__$1 = temp__4657__auto___13520;
if(cljs.core.chunked_seq_QMARK_(seq__13428_13521__$1)){
var c__6673__auto___13522 = cljs.core.chunk_first(seq__13428_13521__$1);
var G__13523 = cljs.core.chunk_rest(seq__13428_13521__$1);
var G__13524 = c__6673__auto___13522;
var G__13525 = cljs.core.count(c__6673__auto___13522);
var G__13526 = (0);
seq__13428_13480 = G__13523;
chunk__13429_13481 = G__13524;
count__13430_13482 = G__13525;
i__13431_13483 = G__13526;
continue;
} else {
var vec__13441_13527 = cljs.core.first(seq__13428_13521__$1);
var column_13528 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13441_13527,(0),null);
var column_info_13529 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13441_13527,(1),null);
var seq__13442_13530 = cljs.core.seq(column_info_13529);
var chunk__13443_13531 = null;
var count__13444_13532 = (0);
var i__13445_13533 = (0);
while(true){
if((i__13445_13533 < count__13444_13532)){
var map__13446_13534 = chunk__13443_13531.cljs$core$IIndexed$_nth$arity$2(null,i__13445_13533);
var map__13446_13535__$1 = ((((!((map__13446_13534 == null)))?((((map__13446_13534.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13446_13534.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13446_13534):map__13446_13534);
var gline_13536 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13446_13535__$1,cljs.core.cst$kw$gline);
var gcol_13537 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13446_13535__$1,cljs.core.cst$kw$gcol);
var name_13538 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13446_13535__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13536], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13442_13530,chunk__13443_13531,count__13444_13532,i__13445_13533,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13446_13534,map__13446_13535__$1,gline_13536,gcol_13537,name_13538,vec__13441_13527,column_13528,column_info_13529,seq__13428_13521__$1,temp__4657__auto___13520,vec__13427_13477,line_13478,columns_13479,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13537], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13478,cljs.core.cst$kw$col,column_13528,cljs.core.cst$kw$name,name_13538], null));
});})(seq__13442_13530,chunk__13443_13531,count__13444_13532,i__13445_13533,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13446_13534,map__13446_13535__$1,gline_13536,gcol_13537,name_13538,vec__13441_13527,column_13528,column_info_13529,seq__13428_13521__$1,temp__4657__auto___13520,vec__13427_13477,line_13478,columns_13479,inverted))
,cljs.core.sorted_map()));

var G__13539 = seq__13442_13530;
var G__13540 = chunk__13443_13531;
var G__13541 = count__13444_13532;
var G__13542 = (i__13445_13533 + (1));
seq__13442_13530 = G__13539;
chunk__13443_13531 = G__13540;
count__13444_13532 = G__13541;
i__13445_13533 = G__13542;
continue;
} else {
var temp__4657__auto___13543__$1 = cljs.core.seq(seq__13442_13530);
if(temp__4657__auto___13543__$1){
var seq__13442_13544__$1 = temp__4657__auto___13543__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13442_13544__$1)){
var c__6673__auto___13545 = cljs.core.chunk_first(seq__13442_13544__$1);
var G__13546 = cljs.core.chunk_rest(seq__13442_13544__$1);
var G__13547 = c__6673__auto___13545;
var G__13548 = cljs.core.count(c__6673__auto___13545);
var G__13549 = (0);
seq__13442_13530 = G__13546;
chunk__13443_13531 = G__13547;
count__13444_13532 = G__13548;
i__13445_13533 = G__13549;
continue;
} else {
var map__13448_13550 = cljs.core.first(seq__13442_13544__$1);
var map__13448_13551__$1 = ((((!((map__13448_13550 == null)))?((((map__13448_13550.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13448_13550.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13448_13550):map__13448_13550);
var gline_13552 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13448_13551__$1,cljs.core.cst$kw$gline);
var gcol_13553 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13448_13551__$1,cljs.core.cst$kw$gcol);
var name_13554 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13448_13551__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13552], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13442_13530,chunk__13443_13531,count__13444_13532,i__13445_13533,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13448_13550,map__13448_13551__$1,gline_13552,gcol_13553,name_13554,seq__13442_13544__$1,temp__4657__auto___13543__$1,vec__13441_13527,column_13528,column_info_13529,seq__13428_13521__$1,temp__4657__auto___13520,vec__13427_13477,line_13478,columns_13479,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13553], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13478,cljs.core.cst$kw$col,column_13528,cljs.core.cst$kw$name,name_13554], null));
});})(seq__13442_13530,chunk__13443_13531,count__13444_13532,i__13445_13533,seq__13428_13480,chunk__13429_13481,count__13430_13482,i__13431_13483,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13448_13550,map__13448_13551__$1,gline_13552,gcol_13553,name_13554,seq__13442_13544__$1,temp__4657__auto___13543__$1,vec__13441_13527,column_13528,column_info_13529,seq__13428_13521__$1,temp__4657__auto___13520,vec__13427_13477,line_13478,columns_13479,inverted))
,cljs.core.sorted_map()));

var G__13555 = cljs.core.next(seq__13442_13544__$1);
var G__13556 = null;
var G__13557 = (0);
var G__13558 = (0);
seq__13442_13530 = G__13555;
chunk__13443_13531 = G__13556;
count__13444_13532 = G__13557;
i__13445_13533 = G__13558;
continue;
}
} else {
}
}
break;
}

var G__13559 = cljs.core.next(seq__13428_13521__$1);
var G__13560 = null;
var G__13561 = (0);
var G__13562 = (0);
seq__13428_13480 = G__13559;
chunk__13429_13481 = G__13560;
count__13430_13482 = G__13561;
i__13431_13483 = G__13562;
continue;
}
} else {
}
}
break;
}

var G__13563 = seq__13423_13473;
var G__13564 = chunk__13424_13474;
var G__13565 = count__13425_13475;
var G__13566 = (i__13426_13476 + (1));
seq__13423_13473 = G__13563;
chunk__13424_13474 = G__13564;
count__13425_13475 = G__13565;
i__13426_13476 = G__13566;
continue;
} else {
var temp__4657__auto___13567 = cljs.core.seq(seq__13423_13473);
if(temp__4657__auto___13567){
var seq__13423_13568__$1 = temp__4657__auto___13567;
if(cljs.core.chunked_seq_QMARK_(seq__13423_13568__$1)){
var c__6673__auto___13569 = cljs.core.chunk_first(seq__13423_13568__$1);
var G__13570 = cljs.core.chunk_rest(seq__13423_13568__$1);
var G__13571 = c__6673__auto___13569;
var G__13572 = cljs.core.count(c__6673__auto___13569);
var G__13573 = (0);
seq__13423_13473 = G__13570;
chunk__13424_13474 = G__13571;
count__13425_13475 = G__13572;
i__13426_13476 = G__13573;
continue;
} else {
var vec__13450_13574 = cljs.core.first(seq__13423_13568__$1);
var line_13575 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13450_13574,(0),null);
var columns_13576 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13450_13574,(1),null);
var seq__13451_13577 = cljs.core.seq(columns_13576);
var chunk__13452_13578 = null;
var count__13453_13579 = (0);
var i__13454_13580 = (0);
while(true){
if((i__13454_13580 < count__13453_13579)){
var vec__13455_13581 = chunk__13452_13578.cljs$core$IIndexed$_nth$arity$2(null,i__13454_13580);
var column_13582 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13455_13581,(0),null);
var column_info_13583 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13455_13581,(1),null);
var seq__13456_13584 = cljs.core.seq(column_info_13583);
var chunk__13457_13585 = null;
var count__13458_13586 = (0);
var i__13459_13587 = (0);
while(true){
if((i__13459_13587 < count__13458_13586)){
var map__13460_13588 = chunk__13457_13585.cljs$core$IIndexed$_nth$arity$2(null,i__13459_13587);
var map__13460_13589__$1 = ((((!((map__13460_13588 == null)))?((((map__13460_13588.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13460_13588.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13460_13588):map__13460_13588);
var gline_13590 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13460_13589__$1,cljs.core.cst$kw$gline);
var gcol_13591 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13460_13589__$1,cljs.core.cst$kw$gcol);
var name_13592 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13460_13589__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13590], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13456_13584,chunk__13457_13585,count__13458_13586,i__13459_13587,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13460_13588,map__13460_13589__$1,gline_13590,gcol_13591,name_13592,vec__13455_13581,column_13582,column_info_13583,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13591], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13575,cljs.core.cst$kw$col,column_13582,cljs.core.cst$kw$name,name_13592], null));
});})(seq__13456_13584,chunk__13457_13585,count__13458_13586,i__13459_13587,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13460_13588,map__13460_13589__$1,gline_13590,gcol_13591,name_13592,vec__13455_13581,column_13582,column_info_13583,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted))
,cljs.core.sorted_map()));

var G__13593 = seq__13456_13584;
var G__13594 = chunk__13457_13585;
var G__13595 = count__13458_13586;
var G__13596 = (i__13459_13587 + (1));
seq__13456_13584 = G__13593;
chunk__13457_13585 = G__13594;
count__13458_13586 = G__13595;
i__13459_13587 = G__13596;
continue;
} else {
var temp__4657__auto___13597__$1 = cljs.core.seq(seq__13456_13584);
if(temp__4657__auto___13597__$1){
var seq__13456_13598__$1 = temp__4657__auto___13597__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13456_13598__$1)){
var c__6673__auto___13599 = cljs.core.chunk_first(seq__13456_13598__$1);
var G__13600 = cljs.core.chunk_rest(seq__13456_13598__$1);
var G__13601 = c__6673__auto___13599;
var G__13602 = cljs.core.count(c__6673__auto___13599);
var G__13603 = (0);
seq__13456_13584 = G__13600;
chunk__13457_13585 = G__13601;
count__13458_13586 = G__13602;
i__13459_13587 = G__13603;
continue;
} else {
var map__13462_13604 = cljs.core.first(seq__13456_13598__$1);
var map__13462_13605__$1 = ((((!((map__13462_13604 == null)))?((((map__13462_13604.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13462_13604.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13462_13604):map__13462_13604);
var gline_13606 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13462_13605__$1,cljs.core.cst$kw$gline);
var gcol_13607 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13462_13605__$1,cljs.core.cst$kw$gcol);
var name_13608 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13462_13605__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13606], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13456_13584,chunk__13457_13585,count__13458_13586,i__13459_13587,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13462_13604,map__13462_13605__$1,gline_13606,gcol_13607,name_13608,seq__13456_13598__$1,temp__4657__auto___13597__$1,vec__13455_13581,column_13582,column_info_13583,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13607], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13575,cljs.core.cst$kw$col,column_13582,cljs.core.cst$kw$name,name_13608], null));
});})(seq__13456_13584,chunk__13457_13585,count__13458_13586,i__13459_13587,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13462_13604,map__13462_13605__$1,gline_13606,gcol_13607,name_13608,seq__13456_13598__$1,temp__4657__auto___13597__$1,vec__13455_13581,column_13582,column_info_13583,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted))
,cljs.core.sorted_map()));

var G__13609 = cljs.core.next(seq__13456_13598__$1);
var G__13610 = null;
var G__13611 = (0);
var G__13612 = (0);
seq__13456_13584 = G__13609;
chunk__13457_13585 = G__13610;
count__13458_13586 = G__13611;
i__13459_13587 = G__13612;
continue;
}
} else {
}
}
break;
}

var G__13613 = seq__13451_13577;
var G__13614 = chunk__13452_13578;
var G__13615 = count__13453_13579;
var G__13616 = (i__13454_13580 + (1));
seq__13451_13577 = G__13613;
chunk__13452_13578 = G__13614;
count__13453_13579 = G__13615;
i__13454_13580 = G__13616;
continue;
} else {
var temp__4657__auto___13617__$1 = cljs.core.seq(seq__13451_13577);
if(temp__4657__auto___13617__$1){
var seq__13451_13618__$1 = temp__4657__auto___13617__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13451_13618__$1)){
var c__6673__auto___13619 = cljs.core.chunk_first(seq__13451_13618__$1);
var G__13620 = cljs.core.chunk_rest(seq__13451_13618__$1);
var G__13621 = c__6673__auto___13619;
var G__13622 = cljs.core.count(c__6673__auto___13619);
var G__13623 = (0);
seq__13451_13577 = G__13620;
chunk__13452_13578 = G__13621;
count__13453_13579 = G__13622;
i__13454_13580 = G__13623;
continue;
} else {
var vec__13464_13624 = cljs.core.first(seq__13451_13618__$1);
var column_13625 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13464_13624,(0),null);
var column_info_13626 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13464_13624,(1),null);
var seq__13465_13627 = cljs.core.seq(column_info_13626);
var chunk__13466_13628 = null;
var count__13467_13629 = (0);
var i__13468_13630 = (0);
while(true){
if((i__13468_13630 < count__13467_13629)){
var map__13469_13631 = chunk__13466_13628.cljs$core$IIndexed$_nth$arity$2(null,i__13468_13630);
var map__13469_13632__$1 = ((((!((map__13469_13631 == null)))?((((map__13469_13631.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13469_13631.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13469_13631):map__13469_13631);
var gline_13633 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13469_13632__$1,cljs.core.cst$kw$gline);
var gcol_13634 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13469_13632__$1,cljs.core.cst$kw$gcol);
var name_13635 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13469_13632__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13633], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13465_13627,chunk__13466_13628,count__13467_13629,i__13468_13630,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13469_13631,map__13469_13632__$1,gline_13633,gcol_13634,name_13635,vec__13464_13624,column_13625,column_info_13626,seq__13451_13618__$1,temp__4657__auto___13617__$1,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13634], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13575,cljs.core.cst$kw$col,column_13625,cljs.core.cst$kw$name,name_13635], null));
});})(seq__13465_13627,chunk__13466_13628,count__13467_13629,i__13468_13630,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13469_13631,map__13469_13632__$1,gline_13633,gcol_13634,name_13635,vec__13464_13624,column_13625,column_info_13626,seq__13451_13618__$1,temp__4657__auto___13617__$1,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted))
,cljs.core.sorted_map()));

var G__13636 = seq__13465_13627;
var G__13637 = chunk__13466_13628;
var G__13638 = count__13467_13629;
var G__13639 = (i__13468_13630 + (1));
seq__13465_13627 = G__13636;
chunk__13466_13628 = G__13637;
count__13467_13629 = G__13638;
i__13468_13630 = G__13639;
continue;
} else {
var temp__4657__auto___13640__$2 = cljs.core.seq(seq__13465_13627);
if(temp__4657__auto___13640__$2){
var seq__13465_13641__$1 = temp__4657__auto___13640__$2;
if(cljs.core.chunked_seq_QMARK_(seq__13465_13641__$1)){
var c__6673__auto___13642 = cljs.core.chunk_first(seq__13465_13641__$1);
var G__13643 = cljs.core.chunk_rest(seq__13465_13641__$1);
var G__13644 = c__6673__auto___13642;
var G__13645 = cljs.core.count(c__6673__auto___13642);
var G__13646 = (0);
seq__13465_13627 = G__13643;
chunk__13466_13628 = G__13644;
count__13467_13629 = G__13645;
i__13468_13630 = G__13646;
continue;
} else {
var map__13471_13647 = cljs.core.first(seq__13465_13641__$1);
var map__13471_13648__$1 = ((((!((map__13471_13647 == null)))?((((map__13471_13647.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13471_13647.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13471_13647):map__13471_13647);
var gline_13649 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13471_13648__$1,cljs.core.cst$kw$gline);
var gcol_13650 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13471_13648__$1,cljs.core.cst$kw$gcol);
var name_13651 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13471_13648__$1,cljs.core.cst$kw$name);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13649], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (seq__13465_13627,chunk__13466_13628,count__13467_13629,i__13468_13630,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13471_13647,map__13471_13648__$1,gline_13649,gcol_13650,name_13651,seq__13465_13641__$1,temp__4657__auto___13640__$2,vec__13464_13624,column_13625,column_info_13626,seq__13451_13618__$1,temp__4657__auto___13617__$1,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted){
return (function (columns__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13650], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$line,line_13575,cljs.core.cst$kw$col,column_13625,cljs.core.cst$kw$name,name_13651], null));
});})(seq__13465_13627,chunk__13466_13628,count__13467_13629,i__13468_13630,seq__13451_13577,chunk__13452_13578,count__13453_13579,i__13454_13580,seq__13423_13473,chunk__13424_13474,count__13425_13475,i__13426_13476,map__13471_13647,map__13471_13648__$1,gline_13649,gcol_13650,name_13651,seq__13465_13641__$1,temp__4657__auto___13640__$2,vec__13464_13624,column_13625,column_info_13626,seq__13451_13618__$1,temp__4657__auto___13617__$1,vec__13450_13574,line_13575,columns_13576,seq__13423_13568__$1,temp__4657__auto___13567,inverted))
,cljs.core.sorted_map()));

var G__13652 = cljs.core.next(seq__13465_13641__$1);
var G__13653 = null;
var G__13654 = (0);
var G__13655 = (0);
seq__13465_13627 = G__13652;
chunk__13466_13628 = G__13653;
count__13467_13629 = G__13654;
i__13468_13630 = G__13655;
continue;
}
} else {
}
}
break;
}

var G__13656 = cljs.core.next(seq__13451_13618__$1);
var G__13657 = null;
var G__13658 = (0);
var G__13659 = (0);
seq__13451_13577 = G__13656;
chunk__13452_13578 = G__13657;
count__13453_13579 = G__13658;
i__13454_13580 = G__13659;
continue;
}
} else {
}
}
break;
}

var G__13660 = cljs.core.next(seq__13423_13568__$1);
var G__13661 = null;
var G__13662 = (0);
var G__13663 = (0);
seq__13423_13473 = G__13660;
chunk__13424_13474 = G__13661;
count__13425_13475 = G__13662;
i__13426_13476 = G__13663;
continue;
}
} else {
}
}
break;
}

return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inverted) : cljs.core.deref.call(null,inverted));
});
