// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
cljs.compiler.ns_first_segments = (function cljs$compiler$ns_first_segments(){
var get_first_ns_segment = (function cljs$compiler$ns_first_segments_$_get_first_ns_segment(ns){
return cljs.core.first(clojure.string.split.cljs$core$IFn$_invoke$arity$2([cljs.core.str(ns)].join(''),/\./));
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(get_first_ns_segment,cljs.core.keys(cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__13784 = s;
var map__13784__$1 = ((((!((map__13784 == null)))?((((map__13784.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13784.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13784):map__13784);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13784__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13784__$1,cljs.core.cst$kw$info);
var d = (0);
var G__13787 = info;
var map__13788 = G__13787;
var map__13788__$1 = ((((!((map__13788 == null)))?((((map__13788.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13788.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13788):map__13788);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13788__$1,cljs.core.cst$kw$shadow);
var d__$1 = d;
var G__13787__$1 = G__13787;
while(true){
var d__$2 = d__$1;
var map__13790 = G__13787__$1;
var map__13790__$1 = ((((!((map__13790 == null)))?((((map__13790.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13790.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13790):map__13790);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13790__$1,cljs.core.cst$kw$shadow);
if(cljs.core.truth_(shadow__$1)){
var G__13792 = (d__$2 + (1));
var G__13793 = shadow__$1;
d__$1 = G__13792;
G__13787__$1 = G__13793;
continue;
} else {
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([[cljs.core.str(name)].join('')], true),cljs.compiler.ns_first_segments()))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(s).cljs$core$IHash$_hash$arity$1(null),cljs.compiler.shadow_depth(s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__13794){
var map__13800 = p__13794;
var map__13800__$1 = ((((!((map__13800 == null)))?((((map__13800.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13800.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13800):map__13800);
var name_var = map__13800__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13800__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13800__$1,cljs.core.cst$kw$info);
var name__$1 = clojure.string.replace([cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__13802 = info;
var map__13802__$1 = ((((!((map__13802 == null)))?((((map__13802.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13802.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13802):map__13802);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13802__$1,cljs.core.cst$kw$ns);
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13802__$1,cljs.core.cst$kw$fn_DASH_scope);
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.cst$kw$name),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__13804 = [cljs.core.str(clojure.string.replace([cljs.core.str(ns)].join(''),".","$")),cljs.core.str("$"),cljs.core.str(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__13804) : cljs.compiler.munge.call(null,G__13804));
})());
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if(!((cljs.core.get.cljs$core$IFn$_invoke$arity$2(reserved,s) == null))){
return [cljs.core.str(s),cljs.core.str("$")].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var args13805 = [];
var len__6932__auto___13808 = arguments.length;
var i__6933__auto___13809 = (0);
while(true){
if((i__6933__auto___13809 < len__6932__auto___13808)){
args13805.push((arguments[i__6933__auto___13809]));

var G__13810 = (i__6933__auto___13809 + (1));
i__6933__auto___13809 = G__13810;
continue;
} else {
}
break;
}

var G__13807 = args13805.length;
switch (G__13807) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13805.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_(s)){
var name_var = s;
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(name_var);
var field = cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1(name_var);
var info = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(name_var);
if(!((cljs.core.cst$kw$fn_DASH_self_DASH_name.cljs$core$IFn$_invoke$arity$1(info) == null))){
return cljs.compiler.fn_self_name(s);
} else {
var depth = cljs.compiler.shadow_depth(s);
var code = cljs.compiler.hash_scope(s);
var renamed = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):((!((renamed == null)))?renamed:name
));
var munged_name = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(name__$1,reserved);
if((field === true) || ((depth === (0)))){
return munged_name;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace([cljs.core.str(s)].join(''),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace(ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved(reserved);
var ss__$2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(rf,clojure.string.split.cljs$core$IFn$_invoke$arity$2(ss__$1,/\./));
var ss__$3 = clojure.string.join.cljs$core$IFn$_invoke$arity$2(".",ss__$2);
var ms = cljs.core.munge(ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;
cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__13813 = cp;
switch (G__13813) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if((((31) < cp)) && ((cp < (127)))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.cljs$core$IFn$_invoke$arity$2("0000",unpadded.length);
return [cljs.core.str("\\u"),cljs.core.str(pad),cljs.core.str(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__13819_13823 = cljs.core.seq(s);
var chunk__13820_13824 = null;
var count__13821_13825 = (0);
var i__13822_13826 = (0);
while(true){
if((i__13822_13826 < count__13821_13825)){
var c_13827 = chunk__13820_13824.cljs$core$IIndexed$_nth$arity$2(null,i__13822_13826);
sb.append(cljs.compiler.escape_char(c_13827));

var G__13828 = seq__13819_13823;
var G__13829 = chunk__13820_13824;
var G__13830 = count__13821_13825;
var G__13831 = (i__13822_13826 + (1));
seq__13819_13823 = G__13828;
chunk__13820_13824 = G__13829;
count__13821_13825 = G__13830;
i__13822_13826 = G__13831;
continue;
} else {
var temp__4657__auto___13832 = cljs.core.seq(seq__13819_13823);
if(temp__4657__auto___13832){
var seq__13819_13833__$1 = temp__4657__auto___13832;
if(cljs.core.chunked_seq_QMARK_(seq__13819_13833__$1)){
var c__6673__auto___13834 = cljs.core.chunk_first(seq__13819_13833__$1);
var G__13835 = cljs.core.chunk_rest(seq__13819_13833__$1);
var G__13836 = c__6673__auto___13834;
var G__13837 = cljs.core.count(c__6673__auto___13834);
var G__13838 = (0);
seq__13819_13823 = G__13835;
chunk__13820_13824 = G__13836;
count__13821_13825 = G__13837;
i__13822_13826 = G__13838;
continue;
} else {
var c_13839 = cljs.core.first(seq__13819_13833__$1);
sb.append(cljs.compiler.escape_char(c_13839));

var G__13840 = cljs.core.next(seq__13819_13833__$1);
var G__13841 = null;
var G__13842 = (0);
var G__13843 = (0);
seq__13819_13823 = G__13840;
chunk__13820_13824 = G__13841;
count__13821_13825 = G__13842;
i__13822_13826 = G__13843;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
if(typeof cljs.compiler.emit_STAR_ !== 'undefined'){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__6787__auto__ = (function (){var G__13844 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13844) : cljs.core.atom.call(null,G__13844));
})();
var prefer_table__6788__auto__ = (function (){var G__13845 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13845) : cljs.core.atom.call(null,G__13845));
})();
var method_cache__6789__auto__ = (function (){var G__13846 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13846) : cljs.core.atom.call(null,G__13846));
})();
var cached_hierarchy__6790__auto__ = (function (){var G__13847 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13847) : cljs.core.atom.call(null,G__13847));
})();
var hierarchy__6791__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),cljs.core.cst$kw$op,cljs.core.cst$kw$default,hierarchy__6791__auto__,method_table__6787__auto__,prefer_table__6788__auto__,method_cache__6789__auto__,cached_hierarchy__6790__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__12175__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__12175__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__13853_13858 = ast;
var map__13853_13859__$1 = ((((!((map__13853_13858 == null)))?((((map__13853_13858.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13853_13858.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13853_13858):map__13853_13858);
var env_13860 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13853_13859__$1,cljs.core.cst$kw$env);
if(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env_13860))){
var map__13855_13861 = env_13860;
var map__13855_13862__$1 = ((((!((map__13855_13861 == null)))?((((map__13855_13861.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13855_13861.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13855_13861):map__13855_13861);
var line_13863 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13855_13862__$1,cljs.core.cst$kw$line);
var column_13864 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13855_13862__$1,cljs.core.cst$kw$column);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,((function (map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__){
return (function (m){
var minfo = (function (){var G__13857 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gcol,cljs.core.cst$kw$gen_DASH_col.cljs$core$IFn$_invoke$arity$1(m),cljs.core.cst$kw$gline,cljs.core.cst$kw$gen_DASH_line.cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast),cljs.core.cst$kw$var)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13857,cljs.core.cst$kw$name,[cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(ast)))].join(''));
} else {
return G__13857;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$source_DASH_map,(line_13863 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__){
return (function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_13864)?(column_13864 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__){
return (function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
});})(minfo,map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__))
,cljs.core.sorted_map()));
});})(map__13855_13861,map__13855_13862__$1,line_13863,column_13864,map__13853_13858,map__13853_13859__$1,env_13860,val__12175__auto__))
);
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_.call(null,ast));
}finally {if((val__12175__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__6939__auto__ = [];
var len__6932__auto___13871 = arguments.length;
var i__6933__auto___13872 = (0);
while(true){
if((i__6933__auto___13872 < len__6932__auto___13871)){
args__6939__auto__.push((arguments[i__6933__auto___13872]));

var G__13873 = (i__6933__auto___13872 + (1));
i__6933__auto___13872 = G__13873;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((0) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__6940__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__13867_13874 = cljs.core.seq(xs);
var chunk__13868_13875 = null;
var count__13869_13876 = (0);
var i__13870_13877 = (0);
while(true){
if((i__13870_13877 < count__13869_13876)){
var x_13878 = chunk__13868_13875.cljs$core$IIndexed$_nth$arity$2(null,i__13870_13877);
if((x_13878 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_13878)){
cljs.compiler.emit(x_13878);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_13878)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_13878);
} else {
if(goog.isFunction(x_13878)){
(x_13878.cljs$core$IFn$_invoke$arity$0 ? x_13878.cljs$core$IFn$_invoke$arity$0() : x_13878.call(null));
} else {
var s_13879 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_13878], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gen_DASH_col], null),((function (seq__13867_13874,chunk__13868_13875,count__13869_13876,i__13870_13877,s_13879,x_13878){
return (function (p1__13865_SHARP_){
return (p1__13865_SHARP_ + cljs.core.count(s_13879));
});})(seq__13867_13874,chunk__13868_13875,count__13869_13876,i__13870_13877,s_13879,x_13878))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_13879], 0));

}
}
}
}

var G__13880 = seq__13867_13874;
var G__13881 = chunk__13868_13875;
var G__13882 = count__13869_13876;
var G__13883 = (i__13870_13877 + (1));
seq__13867_13874 = G__13880;
chunk__13868_13875 = G__13881;
count__13869_13876 = G__13882;
i__13870_13877 = G__13883;
continue;
} else {
var temp__4657__auto___13884 = cljs.core.seq(seq__13867_13874);
if(temp__4657__auto___13884){
var seq__13867_13885__$1 = temp__4657__auto___13884;
if(cljs.core.chunked_seq_QMARK_(seq__13867_13885__$1)){
var c__6673__auto___13886 = cljs.core.chunk_first(seq__13867_13885__$1);
var G__13887 = cljs.core.chunk_rest(seq__13867_13885__$1);
var G__13888 = c__6673__auto___13886;
var G__13889 = cljs.core.count(c__6673__auto___13886);
var G__13890 = (0);
seq__13867_13874 = G__13887;
chunk__13868_13875 = G__13888;
count__13869_13876 = G__13889;
i__13870_13877 = G__13890;
continue;
} else {
var x_13891 = cljs.core.first(seq__13867_13885__$1);
if((x_13891 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_13891)){
cljs.compiler.emit(x_13891);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_13891)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_13891);
} else {
if(goog.isFunction(x_13891)){
(x_13891.cljs$core$IFn$_invoke$arity$0 ? x_13891.cljs$core$IFn$_invoke$arity$0() : x_13891.call(null));
} else {
var s_13892 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_13891], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gen_DASH_col], null),((function (seq__13867_13874,chunk__13868_13875,count__13869_13876,i__13870_13877,s_13892,x_13891,seq__13867_13885__$1,temp__4657__auto___13884){
return (function (p1__13865_SHARP_){
return (p1__13865_SHARP_ + cljs.core.count(s_13892));
});})(seq__13867_13874,chunk__13868_13875,count__13869_13876,i__13870_13877,s_13892,x_13891,seq__13867_13885__$1,temp__4657__auto___13884))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_13892], 0));

}
}
}
}

var G__13893 = cljs.core.next(seq__13867_13885__$1);
var G__13894 = null;
var G__13895 = (0);
var G__13896 = (0);
seq__13867_13874 = G__13893;
chunk__13868_13875 = G__13894;
count__13869_13876 = G__13895;
i__13870_13877 = G__13896;
continue;
}
} else {
}
}
break;
}

return null;
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (0);

cljs.compiler.emits.cljs$lang$applyTo = (function (seq13866){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13866));
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__6939__auto__ = [];
var len__6932__auto___13901 = arguments.length;
var i__6933__auto___13902 = (0);
while(true){
if((i__6933__auto___13902 < len__6932__auto___13901)){
args__6939__auto__.push((arguments[i__6933__auto___13902]));

var G__13903 = (i__6933__auto___13902 + (1));
i__6933__auto___13902 = G__13903;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((0) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__6940__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,xs);

cljs.core.println();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__13898){
var map__13899 = p__13898;
var map__13899__$1 = ((((!((map__13899 == null)))?((((map__13899.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13899.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13899):map__13899);
var m = map__13899__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13899__$1,cljs.core.cst$kw$gen_DASH_line);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$gen_DASH_line,(gen_line + (1)),cljs.core.array_seq([cljs.core.cst$kw$gen_DASH_col,(0)], 0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq13897){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13897));
});
cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13906_13908 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13907_13909 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13906_13908,_STAR_print_fn_STAR_13907_13909,sb__6848__auto__){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_13906_13908,_STAR_print_fn_STAR_13907_13909,sb__6848__auto__))
;

try{cljs.compiler.emit(expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13907_13909;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13906_13908;
}
return [cljs.core.str(sb__6848__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__6787__auto__ = (function (){var G__13910 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13910) : cljs.core.atom.call(null,G__13910));
})();
var prefer_table__6788__auto__ = (function (){var G__13911 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13911) : cljs.core.atom.call(null,G__13911));
})();
var method_cache__6789__auto__ = (function (){var G__13912 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13912) : cljs.core.atom.call(null,G__13912));
})();
var cached_hierarchy__6790__auto__ = (function (){var G__13913 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13913) : cljs.core.atom.call(null,G__13913));
})();
var hierarchy__6791__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__6791__auto__,method_table__6787__auto__,prefer_table__6788__auto__,method_cache__6789__auto__,cached_hierarchy__6790__auto__));
})();
}
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,null,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["null"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Number,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",x,")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,String,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.wrap_in_double_quotes(cljs.compiler.escape_string(x))], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Boolean,(function (x){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(cljs.core.truth_(x)?"true":"false")], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,RegExp,(function (x){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("",[cljs.core.str(x)].join(''))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new RegExp(\"\"))"], 0));
} else {
var vec__13914 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13914,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13914,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13914,(2),null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pattern], 0));
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace(kw);
var name = cljs.core.name(kw);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Keyword("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__13917_13919 = (cljs.core.truth_(ns)?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13917_13919) : cljs.compiler.emit_constant.call(null,G__13917_13919));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__13918_13920 = cljs.core.hash(kw);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13918_13920) : cljs.compiler.emit_constant.call(null,G__13918_13920));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace(sym);
var name = cljs.core.name(sym);
var symstr = ((!((ns == null)))?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Symbol("], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(ns) : cljs.compiler.emit_constant.call(null,ns));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(name) : cljs.compiler.emit_constant.call(null,name));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(symstr) : cljs.compiler.emit_constant.call(null,symstr));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__13922_13923 = cljs.core.hash(sym);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13922_13923) : cljs.compiler.emit_constant.call(null,G__13922_13923));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(null) : cljs.compiler.emit_constant.call(null,null));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__13924 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__13924) : x.call(null,G__13924));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__13925 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__13925) : x.call(null,G__13925));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_symbol(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,Date,(function (date){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new Date(",date.getTime(),")"], 0));
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash(uuid_str),")"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$no_DASH_op,(function (m){
return null;
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$var,(function (p__13927){
var map__13928 = p__13927;
var map__13928__$1 = ((((!((map__13928 == null)))?((((map__13928.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13928.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13928):map__13928);
var arg = map__13928__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13928__$1,cljs.core.cst$kw$info);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13928__$1,cljs.core.cst$kw$env);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13928__$1,cljs.core.cst$kw$form);
var var_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$js_DASH_module_DASH_index,cljs.core.name(var_name)], null));
var or__5862__auto__ = js_module_name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.name(var_name);
}
})():info);
if(cljs.core.truth_(cljs.core.cst$kw$binding_DASH_form_QMARK_.cljs$core$IFn$_invoke$arity$1(arg))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(arg)], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__13930 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,cljs.core.cst$sym$js_SLASH__DASH_Infinity)){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__13930);
} else {
return G__13930;
}
})()], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$var_DASH_special,(function (p__13931){
var map__13932 = p__13931;
var map__13932__$1 = ((((!((map__13932 == null)))?((((map__13932.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13932.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13932):map__13932);
var arg = map__13932__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13932__$1,cljs.core.cst$kw$env);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13932__$1,cljs.core.cst$kw$var);
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13932__$1,cljs.core.cst$kw$sym);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13932__$1,cljs.core.cst$kw$meta);
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__13934 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(var$);
var map__13934__$1 = ((((!((map__13934 == null)))?((((map__13934.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13934.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13934):map__13934);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13934__$1,cljs.core.cst$kw$name);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$meta,(function (p__13936){
var map__13937 = p__13936;
var map__13937__$1 = ((((!((map__13937 == null)))?((((map__13937.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13937.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13937):map__13937);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13937__$1,cljs.core.cst$kw$expr);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13937__$1,cljs.core.cst$kw$meta);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13937__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.with_meta(",expr,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_((function (p1__13939_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__13939_SHARP_),cljs.core.cst$kw$constant);
}),keys)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count(keys)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$map,(function (p__13940){
var map__13941 = p__13940;
var map__13941__$1 = ((((!((map__13941 == null)))?((((map__13941.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13941.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13941):map__13941);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13941__$1,cljs.core.cst$kw$env);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13941__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13941__$1,cljs.core.cst$kw$vals);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if((cljs.core.count(keys) === (0))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.EMPTY"], 0));
} else {
if((cljs.core.count(keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(cljs.compiler.distinct_keys_QMARK_(keys))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentArrayMap(null, ",cljs.core.count(keys),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentArrayMap.fromArray([",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(keys,vals)),"], true, false)"], 0));
}
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep(keys),"],[",cljs.compiler.comma_sep(vals),"])"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__13943){
var map__13944 = p__13943;
var map__13944__$1 = ((((!((map__13944 == null)))?((((map__13944.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13944.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13944):map__13944);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13944__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13944__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.List.EMPTY"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.list(",cljs.compiler.comma_sep(items),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$vector,(function (p__13946){
var map__13947 = p__13946;
var map__13947__$1 = ((((!((map__13947 == null)))?((((map__13947.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13947.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13947):map__13947);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13947__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13947__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.EMPTY"], 0));
} else {
var cnt_13949 = cljs.core.count(items);
if((cnt_13949 < (32))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentVector(null, ",cnt_13949,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep(items),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_((function (p1__13950_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__13950_SHARP_),cljs.core.cst$kw$constant);
}),items)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count(items)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set,(function (p__13951){
var map__13952 = p__13951;
var map__13952__$1 = ((((!((map__13952 == null)))?((((map__13952.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13952.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13952):map__13952);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13952__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13952__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.EMPTY"], 0));
} else {
if(cljs.core.truth_(cljs.compiler.distinct_constants_QMARK_(items))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count(items),", [",cljs.compiler.comma_sep(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(items,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("null"))),"], null), null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));

}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_value,(function (p__13954){
var map__13955 = p__13954;
var map__13955__$1 = ((((!((map__13955 == null)))?((((map__13955.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13955.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13955):map__13955);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13955__$1,cljs.core.cst$kw$items);
var js_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13955__$1,cljs.core.cst$kw$js_DASH_type);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13955__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(js_type,cljs.core.cst$kw$object)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["{"], 0));

var temp__4657__auto___13965 = cljs.core.seq(items);
if(temp__4657__auto___13965){
var items_13966__$1 = temp__4657__auto___13965;
var vec__13957_13967 = items_13966__$1;
var vec__13958_13968 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13957_13967,(0),null);
var k_13969 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13958_13968,(0),null);
var v_13970 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13958_13968,(1),null);
var r_13971 = cljs.core.nthnext(vec__13957_13967,(1));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\"",cljs.core.name(k_13969),"\": ",v_13970], 0));

var seq__13959_13972 = cljs.core.seq(r_13971);
var chunk__13960_13973 = null;
var count__13961_13974 = (0);
var i__13962_13975 = (0);
while(true){
if((i__13962_13975 < count__13961_13974)){
var vec__13963_13976 = chunk__13960_13973.cljs$core$IIndexed$_nth$arity$2(null,i__13962_13975);
var k_13977__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13963_13976,(0),null);
var v_13978__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13963_13976,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_13977__$1),"\": ",v_13978__$1], 0));

var G__13979 = seq__13959_13972;
var G__13980 = chunk__13960_13973;
var G__13981 = count__13961_13974;
var G__13982 = (i__13962_13975 + (1));
seq__13959_13972 = G__13979;
chunk__13960_13973 = G__13980;
count__13961_13974 = G__13981;
i__13962_13975 = G__13982;
continue;
} else {
var temp__4657__auto___13983__$1 = cljs.core.seq(seq__13959_13972);
if(temp__4657__auto___13983__$1){
var seq__13959_13984__$1 = temp__4657__auto___13983__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13959_13984__$1)){
var c__6673__auto___13985 = cljs.core.chunk_first(seq__13959_13984__$1);
var G__13986 = cljs.core.chunk_rest(seq__13959_13984__$1);
var G__13987 = c__6673__auto___13985;
var G__13988 = cljs.core.count(c__6673__auto___13985);
var G__13989 = (0);
seq__13959_13972 = G__13986;
chunk__13960_13973 = G__13987;
count__13961_13974 = G__13988;
i__13962_13975 = G__13989;
continue;
} else {
var vec__13964_13990 = cljs.core.first(seq__13959_13984__$1);
var k_13991__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13964_13990,(0),null);
var v_13992__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13964_13990,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_13991__$1),"\": ",v_13992__$1], 0));

var G__13993 = cljs.core.next(seq__13959_13984__$1);
var G__13994 = null;
var G__13995 = (0);
var G__13996 = (0);
seq__13959_13972 = G__13993;
chunk__13960_13973 = G__13994;
count__13961_13974 = G__13995;
i__13962_13975 = G__13996;
continue;
}
} else {
}
}
break;
}
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["[",cljs.compiler.comma_sep(items),"]"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$constant,(function (p__13997){
var map__13998 = p__13997;
var map__13998__$1 = ((((!((map__13998 == null)))?((((map__13998.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13998.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13998):map__13998);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13998__$1,cljs.core.cst$kw$form);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13998__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(form) : cljs.compiler.emit_constant.call(null,form));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__14000){
var map__14003 = p__14000;
var map__14003__$1 = ((((!((map__14003 == null)))?((((map__14003.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14003.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14003):map__14003);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14003__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14003__$1,cljs.core.cst$kw$form);
var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$constant);
if(and__5850__auto__){
var and__5850__auto____$1 = form;
if(cljs.core.truth_(and__5850__auto____$1)){
return !(((typeof form === 'string') && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(form,""))) || ((typeof form === 'number') && ((form === (0)))));
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__14005){
var map__14008 = p__14005;
var map__14008__$1 = ((((!((map__14008 == null)))?((((map__14008.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14008.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14008):map__14008);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14008__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14008__$1,cljs.core.cst$kw$form);
return (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op,cljs.core.cst$kw$constant)) && ((form === false) || ((form == null)));
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag(env,e);
var or__5862__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$seq,null,cljs.core.cst$sym$boolean,null], null), null).call(null,tag);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_(e);
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$if,(function (p__14010){
var map__14011 = p__14010;
var map__14011__$1 = ((((!((map__14011 == null)))?((((map__14011.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14011.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14011):map__14011);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14011__$1,cljs.core.cst$kw$test);
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14011__$1,cljs.core.cst$kw$then);
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14011__$1,cljs.core.cst$kw$else);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14011__$1,cljs.core.cst$kw$env);
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14011__$1,cljs.core.cst$kw$unchecked);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not((function (){var or__5862__auto__ = unchecked;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.compiler.safe_test_QMARK_(env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then], 0));
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_(test))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$], 0));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")"], 0));
} else {
if(checked){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(cljs.core.truth_(",test,")){"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(",test,"){"], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then,"} else {"], 0));

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([else$,"}"], 0));
}

}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$case_STAR_,(function (p__14013){
var map__14014 = p__14013;
var map__14014__$1 = ((((!((map__14014 == null)))?((((map__14014.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14014.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14014):map__14014);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14014__$1,cljs.core.cst$kw$v);
var tests = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14014__$1,cljs.core.cst$kw$tests);
var thens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14014__$1,cljs.core.cst$kw$thens);
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14014__$1,cljs.core.cst$kw$default);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14014__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env),cljs.core.cst$kw$expr)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){"], 0));
} else {
}

var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("caseval__");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",gs,";"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch (",v,") {"], 0));

var seq__14016_14030 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(tests,thens)));
var chunk__14017_14031 = null;
var count__14018_14032 = (0);
var i__14019_14033 = (0);
while(true){
if((i__14019_14033 < count__14018_14032)){
var vec__14020_14034 = chunk__14017_14031.cljs$core$IIndexed$_nth$arity$2(null,i__14019_14033);
var ts_14035 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14020_14034,(0),null);
var then_14036 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14020_14034,(1),null);
var seq__14021_14037 = cljs.core.seq(ts_14035);
var chunk__14022_14038 = null;
var count__14023_14039 = (0);
var i__14024_14040 = (0);
while(true){
if((i__14024_14040 < count__14023_14039)){
var test_14041 = chunk__14022_14038.cljs$core$IIndexed$_nth$arity$2(null,i__14024_14040);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_14041,":"], 0));

var G__14042 = seq__14021_14037;
var G__14043 = chunk__14022_14038;
var G__14044 = count__14023_14039;
var G__14045 = (i__14024_14040 + (1));
seq__14021_14037 = G__14042;
chunk__14022_14038 = G__14043;
count__14023_14039 = G__14044;
i__14024_14040 = G__14045;
continue;
} else {
var temp__4657__auto___14046 = cljs.core.seq(seq__14021_14037);
if(temp__4657__auto___14046){
var seq__14021_14047__$1 = temp__4657__auto___14046;
if(cljs.core.chunked_seq_QMARK_(seq__14021_14047__$1)){
var c__6673__auto___14048 = cljs.core.chunk_first(seq__14021_14047__$1);
var G__14049 = cljs.core.chunk_rest(seq__14021_14047__$1);
var G__14050 = c__6673__auto___14048;
var G__14051 = cljs.core.count(c__6673__auto___14048);
var G__14052 = (0);
seq__14021_14037 = G__14049;
chunk__14022_14038 = G__14050;
count__14023_14039 = G__14051;
i__14024_14040 = G__14052;
continue;
} else {
var test_14053 = cljs.core.first(seq__14021_14047__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_14053,":"], 0));

var G__14054 = cljs.core.next(seq__14021_14047__$1);
var G__14055 = null;
var G__14056 = (0);
var G__14057 = (0);
seq__14021_14037 = G__14054;
chunk__14022_14038 = G__14055;
count__14023_14039 = G__14056;
i__14024_14040 = G__14057;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_14036], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_14036], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__14058 = seq__14016_14030;
var G__14059 = chunk__14017_14031;
var G__14060 = count__14018_14032;
var G__14061 = (i__14019_14033 + (1));
seq__14016_14030 = G__14058;
chunk__14017_14031 = G__14059;
count__14018_14032 = G__14060;
i__14019_14033 = G__14061;
continue;
} else {
var temp__4657__auto___14062 = cljs.core.seq(seq__14016_14030);
if(temp__4657__auto___14062){
var seq__14016_14063__$1 = temp__4657__auto___14062;
if(cljs.core.chunked_seq_QMARK_(seq__14016_14063__$1)){
var c__6673__auto___14064 = cljs.core.chunk_first(seq__14016_14063__$1);
var G__14065 = cljs.core.chunk_rest(seq__14016_14063__$1);
var G__14066 = c__6673__auto___14064;
var G__14067 = cljs.core.count(c__6673__auto___14064);
var G__14068 = (0);
seq__14016_14030 = G__14065;
chunk__14017_14031 = G__14066;
count__14018_14032 = G__14067;
i__14019_14033 = G__14068;
continue;
} else {
var vec__14025_14069 = cljs.core.first(seq__14016_14063__$1);
var ts_14070 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14025_14069,(0),null);
var then_14071 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14025_14069,(1),null);
var seq__14026_14072 = cljs.core.seq(ts_14070);
var chunk__14027_14073 = null;
var count__14028_14074 = (0);
var i__14029_14075 = (0);
while(true){
if((i__14029_14075 < count__14028_14074)){
var test_14076 = chunk__14027_14073.cljs$core$IIndexed$_nth$arity$2(null,i__14029_14075);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_14076,":"], 0));

var G__14077 = seq__14026_14072;
var G__14078 = chunk__14027_14073;
var G__14079 = count__14028_14074;
var G__14080 = (i__14029_14075 + (1));
seq__14026_14072 = G__14077;
chunk__14027_14073 = G__14078;
count__14028_14074 = G__14079;
i__14029_14075 = G__14080;
continue;
} else {
var temp__4657__auto___14081__$1 = cljs.core.seq(seq__14026_14072);
if(temp__4657__auto___14081__$1){
var seq__14026_14082__$1 = temp__4657__auto___14081__$1;
if(cljs.core.chunked_seq_QMARK_(seq__14026_14082__$1)){
var c__6673__auto___14083 = cljs.core.chunk_first(seq__14026_14082__$1);
var G__14084 = cljs.core.chunk_rest(seq__14026_14082__$1);
var G__14085 = c__6673__auto___14083;
var G__14086 = cljs.core.count(c__6673__auto___14083);
var G__14087 = (0);
seq__14026_14072 = G__14084;
chunk__14027_14073 = G__14085;
count__14028_14074 = G__14086;
i__14029_14075 = G__14087;
continue;
} else {
var test_14088 = cljs.core.first(seq__14026_14082__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_14088,":"], 0));

var G__14089 = cljs.core.next(seq__14026_14082__$1);
var G__14090 = null;
var G__14091 = (0);
var G__14092 = (0);
seq__14026_14072 = G__14089;
chunk__14027_14073 = G__14090;
count__14028_14074 = G__14091;
i__14029_14075 = G__14092;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_14071], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_14071], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__14093 = cljs.core.next(seq__14016_14063__$1);
var G__14094 = null;
var G__14095 = (0);
var G__14096 = (0);
seq__14016_14030 = G__14093;
chunk__14017_14031 = G__14094;
count__14018_14032 = G__14095;
i__14019_14033 = G__14096;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",default$], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default$], 0));
}
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",gs,";})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$throw,(function (p__14097){
var map__14098 = p__14097;
var map__14098__$1 = ((((!((map__14098 == null)))?((((map__14098.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14098.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14098):map__14098);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14098__$1,cljs.core.cst$kw$throw);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14098__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function(){throw ",throw$,"})()"], 0));
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw ",throw$,";"], 0));
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t))){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return [cljs.core.str("!"),cljs.core.str(cljs$compiler$resolve_type(env,cljs.core.subs.cljs$core$IFn$_invoke$arity$2(t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__14107 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14107,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14107,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs$compiler$resolve_type(env,rstr):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (idx,vec__14107,fstr,rstr,ret_t,axstr){
return (function (p1__14100_SHARP_){
return cljs$compiler$resolve_type(env,p1__14100_SHARP_);
});})(idx,vec__14107,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__14108 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts)),cljs.core.str(")")].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str(G__14108),cljs.core.str(":"),cljs.core.str(ret_t)].join('');
} else {
return G__14108;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str(cljs$compiler$resolve_type(env,cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),(cljs.core.count(t) - (1))))),cljs.core.str("=")].join('');
} else {
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(t))))].join(''));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(clojure.string.trim(ts),(1),(cljs.core.count(ts) - (1)));
var xs = clojure.string.split.cljs$core$IFn$_invoke$arity$2(ts__$1,/\|/);
return [cljs.core.str("{"),cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2("|",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (ts__$1,xs){
return (function (p1__14109_SHARP_){
return cljs.compiler.resolve_type(env,p1__14109_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__14112 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14112,(0),null);
var ts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14112,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14112,(2),null);
var xs = cljs.core.nthnext(vec__14112,(3));
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@param",p);
if(and__5850__auto__){
var and__5850__auto____$1 = ts;
if(cljs.core.truth_(and__5850__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts),cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find(/@return/,line))){
var vec__14113 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113,(0),null);
var ts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113,(1),null);
var xs = cljs.core.nthnext(vec__14113,(2));
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("@return",p);
if(and__5850__auto__){
var and__5850__auto____$1 = ts;
if(cljs.core.truth_(and__5850__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})())){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types(env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$warn,null,cljs.core.cst$kw$error,null], null), null).call(null,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$options,cljs.core.cst$kw$closure_DASH_warnings,cljs.core.cst$kw$check_DASH_types], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var args14115 = [];
var len__6932__auto___14142 = arguments.length;
var i__6933__auto___14143 = (0);
while(true){
if((i__6933__auto___14143 < len__6932__auto___14142)){
args14115.push((arguments[i__6933__auto___14143]));

var G__14144 = (i__6933__auto___14143 + (1));
i__6933__auto___14143 = G__14144;
continue;
} else {
}
break;
}

var G__14117 = args14115.length;
switch (G__14117) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14115.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__14133 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docs,docs__$1,docs__$2){
return (function (p1__14114_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__14114_SHARP_);
} else {
return p1__14114_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines(e));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14133,(0),null);
var ys = cljs.core.nthnext(vec__14133,(1));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(x,"*/","* /")], 0));

var seq__14134 = cljs.core.seq(ys);
var chunk__14135 = null;
var count__14136 = (0);
var i__14137 = (0);
while(true){
if((i__14137 < count__14136)){
var next_line = chunk__14135.cljs$core$IIndexed$_nth$arity$2(null,i__14137);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__14146 = seq__14134;
var G__14147 = chunk__14135;
var G__14148 = count__14136;
var G__14149 = (i__14137 + (1));
seq__14134 = G__14146;
chunk__14135 = G__14147;
count__14136 = G__14148;
i__14137 = G__14149;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14134);
if(temp__4657__auto__){
var seq__14134__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14134__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14134__$1);
var G__14150 = cljs.core.chunk_rest(seq__14134__$1);
var G__14151 = c__6673__auto__;
var G__14152 = cljs.core.count(c__6673__auto__);
var G__14153 = (0);
seq__14134 = G__14150;
chunk__14135 = G__14151;
count__14136 = G__14152;
i__14137 = G__14153;
continue;
} else {
var next_line = cljs.core.first(seq__14134__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__14154 = cljs.core.next(seq__14134__$1);
var G__14155 = null;
var G__14156 = (0);
var G__14157 = (0);
seq__14134 = G__14154;
chunk__14135 = G__14155;
count__14136 = G__14156;
i__14137 = G__14157;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq(docs__$2)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

var seq__14138_14158 = cljs.core.seq(docs__$2);
var chunk__14139_14159 = null;
var count__14140_14160 = (0);
var i__14141_14161 = (0);
while(true){
if((i__14141_14161 < count__14140_14160)){
var e_14162 = chunk__14139_14159.cljs$core$IIndexed$_nth$arity$2(null,i__14141_14161);
if(cljs.core.truth_(e_14162)){
print_comment_lines(e_14162);
} else {
}

var G__14163 = seq__14138_14158;
var G__14164 = chunk__14139_14159;
var G__14165 = count__14140_14160;
var G__14166 = (i__14141_14161 + (1));
seq__14138_14158 = G__14163;
chunk__14139_14159 = G__14164;
count__14140_14160 = G__14165;
i__14141_14161 = G__14166;
continue;
} else {
var temp__4657__auto___14167 = cljs.core.seq(seq__14138_14158);
if(temp__4657__auto___14167){
var seq__14138_14168__$1 = temp__4657__auto___14167;
if(cljs.core.chunked_seq_QMARK_(seq__14138_14168__$1)){
var c__6673__auto___14169 = cljs.core.chunk_first(seq__14138_14168__$1);
var G__14170 = cljs.core.chunk_rest(seq__14138_14168__$1);
var G__14171 = c__6673__auto___14169;
var G__14172 = cljs.core.count(c__6673__auto___14169);
var G__14173 = (0);
seq__14138_14158 = G__14170;
chunk__14139_14159 = G__14171;
count__14140_14160 = G__14172;
i__14141_14161 = G__14173;
continue;
} else {
var e_14174 = cljs.core.first(seq__14138_14168__$1);
if(cljs.core.truth_(e_14174)){
print_comment_lines(e_14174);
} else {
}

var G__14175 = cljs.core.next(seq__14138_14168__$1);
var G__14176 = null;
var G__14177 = (0);
var G__14178 = (0);
seq__14138_14158 = G__14175;
chunk__14139_14159 = G__14176;
count__14140_14160 = G__14177;
i__14141_14161 = G__14178;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" */"], 0));
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;
cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return (typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number');
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),cljs.core.cst$kw$options);
var and__5850__auto__ = cljs.core.some(((function (opts){
return (function (p1__14180_SHARP_){
return goog.string.startsWith(p1__14180_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__5850__auto__)){
var and__5850__auto____$1 = opts;
if(cljs.core.truth_(and__5850__auto____$1)){
var and__5850__auto____$2 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$optimizations.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$none);
if(and__5850__auto____$2){
var define = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$closure_DASH_defines,[cljs.core.str(mname)].join('')], null));
if(cljs.core.truth_(cljs.compiler.valid_define_value_QMARK_(define))){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([define], 0));
} else {
return null;
}
} else {
return and__5850__auto____$2;
}
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$def,(function (p__14181){
var map__14182 = p__14181;
var map__14182__$1 = ((((!((map__14182 == null)))?((((map__14182.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14182.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14182):map__14182);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$name);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$var);
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$init);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$env);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$doc);
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$jsdoc);
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$export);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$test);
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14182__$1,cljs.core.cst$kw$var_DASH_ast);
if(cljs.core.truth_((function (){var or__5862__auto__ = init;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name);
cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3(env,doc,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(jsdoc,cljs.core.cst$kw$jsdoc.cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core.truth_(cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ("], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$], 0));

if(cljs.core.truth_(init)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",(function (){var temp__4655__auto__ = cljs.compiler.get_define(mname,jsdoc);
if(cljs.core.truth_(temp__4655__auto__)){
var define = temp__4655__auto__;
return define;
} else {
return init;
}
})()], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$def_DASH_emits_DASH_var.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["; return ("], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$op,cljs.core.cst$kw$var_DASH_special,cljs.core.cst$kw$env,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(env,cljs.core.cst$kw$context,cljs.core.cst$kw$expr)], null),var_ast], 0))], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");})()"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
} else {
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.exportSymbol('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(export$),"', ",mname,");"], 0));
} else {
}

if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__5850__auto__)){
return test;
} else {
return and__5850__auto__;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
} else {
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([var$,".cljs$lang$test = ",test,";"], 0));
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__14184){
var map__14201 = p__14184;
var map__14201__$1 = ((((!((map__14201 == null)))?((((map__14201.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14201.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14201):map__14201);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14201__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14201__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14201__$1,cljs.core.cst$kw$env);
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (",arglist,"){"], 0));

var seq__14203_14217 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__14204_14218 = null;
var count__14205_14219 = (0);
var i__14206_14220 = (0);
while(true){
if((i__14206_14220 < count__14205_14219)){
var vec__14207_14221 = chunk__14204_14218.cljs$core$IIndexed$_nth$arity$2(null,i__14206_14220);
var i_14222 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14207_14221,(0),null);
var param_14223 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14207_14221,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_14223);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__14224 = seq__14203_14217;
var G__14225 = chunk__14204_14218;
var G__14226 = count__14205_14219;
var G__14227 = (i__14206_14220 + (1));
seq__14203_14217 = G__14224;
chunk__14204_14218 = G__14225;
count__14205_14219 = G__14226;
i__14206_14220 = G__14227;
continue;
} else {
var temp__4657__auto___14228 = cljs.core.seq(seq__14203_14217);
if(temp__4657__auto___14228){
var seq__14203_14229__$1 = temp__4657__auto___14228;
if(cljs.core.chunked_seq_QMARK_(seq__14203_14229__$1)){
var c__6673__auto___14230 = cljs.core.chunk_first(seq__14203_14229__$1);
var G__14231 = cljs.core.chunk_rest(seq__14203_14229__$1);
var G__14232 = c__6673__auto___14230;
var G__14233 = cljs.core.count(c__6673__auto___14230);
var G__14234 = (0);
seq__14203_14217 = G__14231;
chunk__14204_14218 = G__14232;
count__14205_14219 = G__14233;
i__14206_14220 = G__14234;
continue;
} else {
var vec__14208_14235 = cljs.core.first(seq__14203_14229__$1);
var i_14236 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14208_14235,(0),null);
var param_14237 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14208_14235,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_14237);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__14238 = cljs.core.next(seq__14203_14229__$1);
var G__14239 = null;
var G__14240 = (0);
var G__14241 = (0);
seq__14203_14217 = G__14238;
chunk__14204_14218 = G__14239;
count__14205_14219 = G__14240;
i__14206_14220 = G__14241;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count(params))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(cljs.core.butlast(params)));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.rest(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__14209_14242 = cljs.core.seq(params);
var chunk__14210_14243 = null;
var count__14211_14244 = (0);
var i__14212_14245 = (0);
while(true){
if((i__14212_14245 < count__14211_14244)){
var param_14246 = chunk__14210_14243.cljs$core$IIndexed$_nth$arity$2(null,i__14212_14245);
cljs.compiler.emit(param_14246);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14246,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14247 = seq__14209_14242;
var G__14248 = chunk__14210_14243;
var G__14249 = count__14211_14244;
var G__14250 = (i__14212_14245 + (1));
seq__14209_14242 = G__14247;
chunk__14210_14243 = G__14248;
count__14211_14244 = G__14249;
i__14212_14245 = G__14250;
continue;
} else {
var temp__4657__auto___14251 = cljs.core.seq(seq__14209_14242);
if(temp__4657__auto___14251){
var seq__14209_14252__$1 = temp__4657__auto___14251;
if(cljs.core.chunked_seq_QMARK_(seq__14209_14252__$1)){
var c__6673__auto___14253 = cljs.core.chunk_first(seq__14209_14252__$1);
var G__14254 = cljs.core.chunk_rest(seq__14209_14252__$1);
var G__14255 = c__6673__auto___14253;
var G__14256 = cljs.core.count(c__6673__auto___14253);
var G__14257 = (0);
seq__14209_14242 = G__14254;
chunk__14210_14243 = G__14255;
count__14211_14244 = G__14256;
i__14212_14245 = G__14257;
continue;
} else {
var param_14258 = cljs.core.first(seq__14209_14252__$1);
cljs.compiler.emit(param_14258);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14258,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14259 = cljs.core.next(seq__14209_14252__$1);
var G__14260 = null;
var G__14261 = (0);
var G__14262 = (0);
seq__14209_14242 = G__14259;
chunk__14210_14243 = G__14260;
count__14211_14244 = G__14261;
i__14212_14245 = G__14262;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.seq(",arglist,");"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name,"("], 0));

var seq__14213_14263 = cljs.core.seq(params);
var chunk__14214_14264 = null;
var count__14215_14265 = (0);
var i__14216_14266 = (0);
while(true){
if((i__14216_14266 < count__14215_14265)){
var param_14267 = chunk__14214_14264.cljs$core$IIndexed$_nth$arity$2(null,i__14216_14266);
cljs.compiler.emit(param_14267);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14267,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14268 = seq__14213_14263;
var G__14269 = chunk__14214_14264;
var G__14270 = count__14215_14265;
var G__14271 = (i__14216_14266 + (1));
seq__14213_14263 = G__14268;
chunk__14214_14264 = G__14269;
count__14215_14265 = G__14270;
i__14216_14266 = G__14271;
continue;
} else {
var temp__4657__auto___14272 = cljs.core.seq(seq__14213_14263);
if(temp__4657__auto___14272){
var seq__14213_14273__$1 = temp__4657__auto___14272;
if(cljs.core.chunked_seq_QMARK_(seq__14213_14273__$1)){
var c__6673__auto___14274 = cljs.core.chunk_first(seq__14213_14273__$1);
var G__14275 = cljs.core.chunk_rest(seq__14213_14273__$1);
var G__14276 = c__6673__auto___14274;
var G__14277 = cljs.core.count(c__6673__auto___14274);
var G__14278 = (0);
seq__14213_14263 = G__14275;
chunk__14214_14264 = G__14276;
count__14215_14265 = G__14277;
i__14216_14266 = G__14278;
continue;
} else {
var param_14279 = cljs.core.first(seq__14213_14273__$1);
cljs.compiler.emit(param_14279);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14279,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14280 = cljs.core.next(seq__14213_14273__$1);
var G__14281 = null;
var G__14282 = (0);
var G__14283 = (0);
seq__14213_14263 = G__14280;
chunk__14214_14264 = G__14281;
count__14215_14265 = G__14282;
i__14216_14266 = G__14283;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));
}

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__14288 = cljs.core.seq(params);
var chunk__14289 = null;
var count__14290 = (0);
var i__14291 = (0);
while(true){
if((i__14291 < count__14290)){
var param = chunk__14289.cljs$core$IIndexed$_nth$arity$2(null,i__14291);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14292 = seq__14288;
var G__14293 = chunk__14289;
var G__14294 = count__14290;
var G__14295 = (i__14291 + (1));
seq__14288 = G__14292;
chunk__14289 = G__14293;
count__14290 = G__14294;
i__14291 = G__14295;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14288);
if(temp__4657__auto__){
var seq__14288__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14288__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14288__$1);
var G__14296 = cljs.core.chunk_rest(seq__14288__$1);
var G__14297 = c__6673__auto__;
var G__14298 = cljs.core.count(c__6673__auto__);
var G__14299 = (0);
seq__14288 = G__14296;
chunk__14289 = G__14297;
count__14290 = G__14298;
i__14291 = G__14299;
continue;
} else {
var param = cljs.core.first(seq__14288__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14300 = cljs.core.next(seq__14288__$1);
var G__14301 = null;
var G__14302 = (0);
var G__14303 = (0);
seq__14288 = G__14300;
chunk__14289 = G__14301;
count__14290 = G__14302;
i__14291 = G__14303;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__14304){
var map__14307 = p__14304;
var map__14307__$1 = ((((!((map__14307 == null)))?((((map__14307.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14307.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14307):map__14307);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$name);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$variadic);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$params);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$recurs);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14307__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"("], 0));

cljs.compiler.emit_fn_params(params);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if(((startslice >= (0))) && (cljs.core.integer_QMARK_(startslice))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var i = [cljs.core.str(mname),cljs.core.str("__i")].join('');
var a = [cljs.core.str(mname),cljs.core.str("__a")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}"], 0));

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__14309){
var map__14320 = p__14309;
var map__14320__$1 = ((((!((map__14320 == null)))?((((map__14320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14320):map__14320);
var f = map__14320__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$name);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$variadic);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$params);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$recurs);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14320__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

var name_14330__$1 = (function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_14331 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_14330__$1);
var delegate_name_14332 = [cljs.core.str(mname_14331),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() { "], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",delegate_name_14332," = function ("], 0));

var seq__14322_14333 = cljs.core.seq(params);
var chunk__14323_14334 = null;
var count__14324_14335 = (0);
var i__14325_14336 = (0);
while(true){
if((i__14325_14336 < count__14324_14335)){
var param_14337 = chunk__14323_14334.cljs$core$IIndexed$_nth$arity$2(null,i__14325_14336);
cljs.compiler.emit(param_14337);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14337,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14338 = seq__14322_14333;
var G__14339 = chunk__14323_14334;
var G__14340 = count__14324_14335;
var G__14341 = (i__14325_14336 + (1));
seq__14322_14333 = G__14338;
chunk__14323_14334 = G__14339;
count__14324_14335 = G__14340;
i__14325_14336 = G__14341;
continue;
} else {
var temp__4657__auto___14342 = cljs.core.seq(seq__14322_14333);
if(temp__4657__auto___14342){
var seq__14322_14343__$1 = temp__4657__auto___14342;
if(cljs.core.chunked_seq_QMARK_(seq__14322_14343__$1)){
var c__6673__auto___14344 = cljs.core.chunk_first(seq__14322_14343__$1);
var G__14345 = cljs.core.chunk_rest(seq__14322_14343__$1);
var G__14346 = c__6673__auto___14344;
var G__14347 = cljs.core.count(c__6673__auto___14344);
var G__14348 = (0);
seq__14322_14333 = G__14345;
chunk__14323_14334 = G__14346;
count__14324_14335 = G__14347;
i__14325_14336 = G__14348;
continue;
} else {
var param_14349 = cljs.core.first(seq__14322_14343__$1);
cljs.compiler.emit(param_14349);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14349,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14350 = cljs.core.next(seq__14322_14343__$1);
var G__14351 = null;
var G__14352 = (0);
var G__14353 = (0);
seq__14322_14333 = G__14350;
chunk__14323_14334 = G__14351;
count__14324_14335 = G__14352;
i__14325_14336 = G__14353;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["){"], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_14331," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):params)),"){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",(cljs.core.count(params) - (1)),") {"], 0));

var a_14354 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_14354,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["} "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name_14332,".call(this,"], 0));

var seq__14326_14355 = cljs.core.seq(params);
var chunk__14327_14356 = null;
var count__14328_14357 = (0);
var i__14329_14358 = (0);
while(true){
if((i__14329_14358 < count__14328_14357)){
var param_14359 = chunk__14327_14356.cljs$core$IIndexed$_nth$arity$2(null,i__14329_14358);
cljs.compiler.emit(param_14359);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14359,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14360 = seq__14326_14355;
var G__14361 = chunk__14327_14356;
var G__14362 = count__14328_14357;
var G__14363 = (i__14329_14358 + (1));
seq__14326_14355 = G__14360;
chunk__14327_14356 = G__14361;
count__14328_14357 = G__14362;
i__14329_14358 = G__14363;
continue;
} else {
var temp__4657__auto___14364 = cljs.core.seq(seq__14326_14355);
if(temp__4657__auto___14364){
var seq__14326_14365__$1 = temp__4657__auto___14364;
if(cljs.core.chunked_seq_QMARK_(seq__14326_14365__$1)){
var c__6673__auto___14366 = cljs.core.chunk_first(seq__14326_14365__$1);
var G__14367 = cljs.core.chunk_rest(seq__14326_14365__$1);
var G__14368 = c__6673__auto___14366;
var G__14369 = cljs.core.count(c__6673__auto___14366);
var G__14370 = (0);
seq__14326_14355 = G__14367;
chunk__14327_14356 = G__14368;
count__14328_14357 = G__14369;
i__14329_14358 = G__14370;
continue;
} else {
var param_14371 = cljs.core.first(seq__14326_14365__$1);
cljs.compiler.emit(param_14371);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14371,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14372 = cljs.core.next(seq__14326_14365__$1);
var G__14373 = null;
var G__14374 = (0);
var G__14375 = (0);
seq__14326_14355 = G__14372;
chunk__14327_14356 = G__14373;
count__14328_14357 = G__14374;
i__14329_14358 = G__14375;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14331,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14331,".cljs$lang$applyTo = "], 0));

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,cljs.core.cst$kw$name,name_14330__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14331,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_14332,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_14331,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn,(function (p__14379){
var map__14380 = p__14379;
var map__14380__$1 = ((((!((map__14380 == null)))?((((map__14380.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14380.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14380):map__14380);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$env);
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$methods);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$variadic);
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$recur_DASH_frames);
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14380__$1,cljs.core.cst$kw$loop_DASH_lets);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.array_seq([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14376_SHARP_){
var and__5850__auto__ = p1__14376_SHARP_;
if(cljs.core.truth_(and__5850__auto__)){
var G__14382 = cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(p1__14376_SHARP_);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__14382) : cljs.core.deref.call(null,G__14382));
} else {
return and__5850__auto__;
}
});})(map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,recur_frames)], 0)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.array_seq([loop_lets], 0)))));
if(loop_locals){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["((function (",cljs.compiler.comma_sep(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,loop_locals)),"){"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
}
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),cljs.core.cst$kw$name,name));
} else {
cljs.compiler.emit_fn_method(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.first(methods$),cljs.core.cst$kw$name,name));
}
} else {
var name_14402__$1 = (function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_14403 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_14402__$1);
var maxparams_14404 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,methods$));
var mmap_14405 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (name_14402__$1,mname_14403,maxparams_14404,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(mname_14403),cljs.core.str("__"),cljs.core.str(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_14402__$1,mname_14403,maxparams_14404,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_14406 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (name_14402__$1,mname_14403,maxparams_14404,mmap_14405,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14377_SHARP_){
return cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__14377_SHARP_)));
});})(name_14402__$1,mname_14403,maxparams_14404,mmap_14405,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq(mmap_14405));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() {"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_14403," = null;"], 0));

var seq__14383_14407 = cljs.core.seq(ms_14406);
var chunk__14384_14408 = null;
var count__14385_14409 = (0);
var i__14386_14410 = (0);
while(true){
if((i__14386_14410 < count__14385_14409)){
var vec__14387_14411 = chunk__14384_14408.cljs$core$IIndexed$_nth$arity$2(null,i__14386_14410);
var n_14412 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14387_14411,(0),null);
var meth_14413 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14387_14411,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_14412," = "], 0));

if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14413))){
cljs.compiler.emit_variadic_fn_method(meth_14413);
} else {
cljs.compiler.emit_fn_method(meth_14413);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__14414 = seq__14383_14407;
var G__14415 = chunk__14384_14408;
var G__14416 = count__14385_14409;
var G__14417 = (i__14386_14410 + (1));
seq__14383_14407 = G__14414;
chunk__14384_14408 = G__14415;
count__14385_14409 = G__14416;
i__14386_14410 = G__14417;
continue;
} else {
var temp__4657__auto___14418 = cljs.core.seq(seq__14383_14407);
if(temp__4657__auto___14418){
var seq__14383_14419__$1 = temp__4657__auto___14418;
if(cljs.core.chunked_seq_QMARK_(seq__14383_14419__$1)){
var c__6673__auto___14420 = cljs.core.chunk_first(seq__14383_14419__$1);
var G__14421 = cljs.core.chunk_rest(seq__14383_14419__$1);
var G__14422 = c__6673__auto___14420;
var G__14423 = cljs.core.count(c__6673__auto___14420);
var G__14424 = (0);
seq__14383_14407 = G__14421;
chunk__14384_14408 = G__14422;
count__14385_14409 = G__14423;
i__14386_14410 = G__14424;
continue;
} else {
var vec__14388_14425 = cljs.core.first(seq__14383_14419__$1);
var n_14426 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14388_14425,(0),null);
var meth_14427 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14388_14425,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_14426," = "], 0));

if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14427))){
cljs.compiler.emit_variadic_fn_method(meth_14427);
} else {
cljs.compiler.emit_fn_method(meth_14427);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__14428 = cljs.core.next(seq__14383_14419__$1);
var G__14429 = null;
var G__14430 = (0);
var G__14431 = (0);
seq__14383_14407 = G__14428;
chunk__14384_14408 = G__14429;
count__14385_14409 = G__14430;
i__14386_14410 = G__14431;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_14404),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):maxparams_14404)),"){"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(maxparams_14404));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = var_args;"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch(arguments.length){"], 0));

var seq__14389_14432 = cljs.core.seq(ms_14406);
var chunk__14390_14433 = null;
var count__14391_14434 = (0);
var i__14392_14435 = (0);
while(true){
if((i__14392_14435 < count__14391_14434)){
var vec__14393_14436 = chunk__14390_14433.cljs$core$IIndexed$_nth$arity$2(null,i__14392_14435);
var n_14437 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14393_14436,(0),null);
var meth_14438 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14393_14436,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14438))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_14439 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_14439," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_14440 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_14439," = new cljs.core.IndexedSeq(",a_14440,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14437,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_14404)),(((cljs.core.count(maxparams_14404) > (1)))?", ":null),restarg_14439,");"], 0));
} else {
var pcnt_14441 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14438));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_14441,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14437,".call(this",(((pcnt_14441 === (0)))?null:cljs.core._conj((function (){var x__6696__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_14441,maxparams_14404));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),",")),");"], 0));
}

var G__14442 = seq__14389_14432;
var G__14443 = chunk__14390_14433;
var G__14444 = count__14391_14434;
var G__14445 = (i__14392_14435 + (1));
seq__14389_14432 = G__14442;
chunk__14390_14433 = G__14443;
count__14391_14434 = G__14444;
i__14392_14435 = G__14445;
continue;
} else {
var temp__4657__auto___14446 = cljs.core.seq(seq__14389_14432);
if(temp__4657__auto___14446){
var seq__14389_14447__$1 = temp__4657__auto___14446;
if(cljs.core.chunked_seq_QMARK_(seq__14389_14447__$1)){
var c__6673__auto___14448 = cljs.core.chunk_first(seq__14389_14447__$1);
var G__14449 = cljs.core.chunk_rest(seq__14389_14447__$1);
var G__14450 = c__6673__auto___14448;
var G__14451 = cljs.core.count(c__6673__auto___14448);
var G__14452 = (0);
seq__14389_14432 = G__14449;
chunk__14390_14433 = G__14450;
count__14391_14434 = G__14451;
i__14392_14435 = G__14452;
continue;
} else {
var vec__14394_14453 = cljs.core.first(seq__14389_14447__$1);
var n_14454 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14394_14453,(0),null);
var meth_14455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14394_14453,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14455))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_14456 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_14456," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_14457 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_14456," = new cljs.core.IndexedSeq(",a_14457,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14454,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_14404)),(((cljs.core.count(maxparams_14404) > (1)))?", ":null),restarg_14456,");"], 0));
} else {
var pcnt_14458 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14455));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_14458,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14454,".call(this",(((pcnt_14458 === (0)))?null:cljs.core._conj((function (){var x__6696__auto__ = cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_14458,maxparams_14404));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),",")),");"], 0));
}

var G__14459 = cljs.core.next(seq__14389_14447__$1);
var G__14460 = null;
var G__14461 = (0);
var G__14462 = (0);
seq__14389_14432 = G__14459;
chunk__14390_14433 = G__14460;
count__14391_14434 = G__14461;
i__14392_14435 = G__14462;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["throw(new Error('Invalid arity: ' + arguments.length));"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$lang$applyTo = ",cljs.core.some(((function (name_14402__$1,mname_14403,maxparams_14404,mmap_14405,ms_14406,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14378_SHARP_){
var vec__14395 = p1__14378_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14395,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14395,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_14402__$1,mname_14403,maxparams_14404,mmap_14405,ms_14406,loop_locals,map__14380,map__14380__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_14406),".cljs$lang$applyTo;"], 0));
} else {
}

var seq__14396_14463 = cljs.core.seq(ms_14406);
var chunk__14397_14464 = null;
var count__14398_14465 = (0);
var i__14399_14466 = (0);
while(true){
if((i__14399_14466 < count__14398_14465)){
var vec__14400_14467 = chunk__14397_14464.cljs$core$IIndexed$_nth$arity$2(null,i__14399_14466);
var n_14468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14400_14467,(0),null);
var meth_14469 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14400_14467,(1),null);
var c_14470 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14469));
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14469))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$core$IFn$_invoke$arity$variadic = ",n_14468,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$core$IFn$_invoke$arity$",c_14470," = ",n_14468,";"], 0));
}

var G__14471 = seq__14396_14463;
var G__14472 = chunk__14397_14464;
var G__14473 = count__14398_14465;
var G__14474 = (i__14399_14466 + (1));
seq__14396_14463 = G__14471;
chunk__14397_14464 = G__14472;
count__14398_14465 = G__14473;
i__14399_14466 = G__14474;
continue;
} else {
var temp__4657__auto___14475 = cljs.core.seq(seq__14396_14463);
if(temp__4657__auto___14475){
var seq__14396_14476__$1 = temp__4657__auto___14475;
if(cljs.core.chunked_seq_QMARK_(seq__14396_14476__$1)){
var c__6673__auto___14477 = cljs.core.chunk_first(seq__14396_14476__$1);
var G__14478 = cljs.core.chunk_rest(seq__14396_14476__$1);
var G__14479 = c__6673__auto___14477;
var G__14480 = cljs.core.count(c__6673__auto___14477);
var G__14481 = (0);
seq__14396_14463 = G__14478;
chunk__14397_14464 = G__14479;
count__14398_14465 = G__14480;
i__14399_14466 = G__14481;
continue;
} else {
var vec__14401_14482 = cljs.core.first(seq__14396_14476__$1);
var n_14483 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14401_14482,(0),null);
var meth_14484 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14401_14482,(1),null);
var c_14485 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14484));
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14484))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$core$IFn$_invoke$arity$variadic = ",n_14483,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14403,".cljs$core$IFn$_invoke$arity$",c_14485," = ",n_14483,";"], 0));
}

var G__14486 = cljs.core.next(seq__14396_14476__$1);
var G__14487 = null;
var G__14488 = (0);
var G__14489 = (0);
seq__14396_14463 = G__14486;
chunk__14397_14464 = G__14487;
count__14398_14465 = G__14488;
i__14399_14466 = G__14489;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_14403,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";})(",cljs.compiler.comma_sep(loop_locals),"))"], 0));
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$do,(function (p__14490){
var map__14491 = p__14490;
var map__14491__$1 = ((((!((map__14491 == null)))?((((map__14491.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14491.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14491):map__14491);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14491__$1,cljs.core.cst$kw$statements);
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14491__$1,cljs.core.cst$kw$ret);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14491__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var and__5850__auto__ = statements;
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context);
} else {
return and__5850__auto__;
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__14493_14497 = cljs.core.seq(statements);
var chunk__14494_14498 = null;
var count__14495_14499 = (0);
var i__14496_14500 = (0);
while(true){
if((i__14496_14500 < count__14495_14499)){
var s_14501 = chunk__14494_14498.cljs$core$IIndexed$_nth$arity$2(null,i__14496_14500);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_14501], 0));

var G__14502 = seq__14493_14497;
var G__14503 = chunk__14494_14498;
var G__14504 = count__14495_14499;
var G__14505 = (i__14496_14500 + (1));
seq__14493_14497 = G__14502;
chunk__14494_14498 = G__14503;
count__14495_14499 = G__14504;
i__14496_14500 = G__14505;
continue;
} else {
var temp__4657__auto___14506 = cljs.core.seq(seq__14493_14497);
if(temp__4657__auto___14506){
var seq__14493_14507__$1 = temp__4657__auto___14506;
if(cljs.core.chunked_seq_QMARK_(seq__14493_14507__$1)){
var c__6673__auto___14508 = cljs.core.chunk_first(seq__14493_14507__$1);
var G__14509 = cljs.core.chunk_rest(seq__14493_14507__$1);
var G__14510 = c__6673__auto___14508;
var G__14511 = cljs.core.count(c__6673__auto___14508);
var G__14512 = (0);
seq__14493_14497 = G__14509;
chunk__14494_14498 = G__14510;
count__14495_14499 = G__14511;
i__14496_14500 = G__14512;
continue;
} else {
var s_14513 = cljs.core.first(seq__14493_14507__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_14513], 0));

var G__14514 = cljs.core.next(seq__14493_14507__$1);
var G__14515 = null;
var G__14516 = (0);
var G__14517 = (0);
seq__14493_14497 = G__14514;
chunk__14494_14498 = G__14515;
count__14495_14499 = G__14516;
i__14496_14500 = G__14517;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit(ret);

if(cljs.core.truth_((function (){var and__5850__auto__ = statements;
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context);
} else {
return and__5850__auto__;
}
})())){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$try,(function (p__14518){
var map__14519 = p__14518;
var map__14519__$1 = ((((!((map__14519 == null)))?((((map__14519.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14519.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14519):map__14519);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14519__$1,cljs.core.cst$kw$env);
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14519__$1,cljs.core.cst$kw$try);
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14519__$1,cljs.core.cst$kw$catch);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14519__$1,cljs.core.cst$kw$name);
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14519__$1,cljs.core.cst$kw$finally);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["try{",try$,"}"], 0));

if(cljs.core.truth_(name)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["catch (",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"){",catch$,"}"], 0));
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$constant,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(finally$))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str("(not= :constant (:op finally))")].join('')));
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["finally {",finally$,"}"], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
} else {
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([try$], 0));
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__14521,is_loop){
var map__14533 = p__14521;
var map__14533__$1 = ((((!((map__14533 == null)))?((((map__14533.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14533.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14533):map__14533);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14533__$1,cljs.core.cst$kw$bindings);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14533__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14533__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var _STAR_lexical_renames_STAR_14535_14544 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_lexical_renames_STAR_14535_14544,context,map__14533,map__14533__$1,bindings,expr,env){
return (function (binding){
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_14535_14544,context,map__14533,map__14533__$1,bindings,expr,env))
,bindings):null));

try{var seq__14536_14545 = cljs.core.seq(bindings);
var chunk__14537_14546 = null;
var count__14538_14547 = (0);
var i__14539_14548 = (0);
while(true){
if((i__14539_14548 < count__14538_14547)){
var map__14540_14549 = chunk__14537_14546.cljs$core$IIndexed$_nth$arity$2(null,i__14539_14548);
var map__14540_14550__$1 = ((((!((map__14540_14549 == null)))?((((map__14540_14549.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14540_14549.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14540_14549):map__14540_14549);
var binding_14551 = map__14540_14550__$1;
var init_14552 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14540_14550__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_14551);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_14552,";"], 0));

var G__14553 = seq__14536_14545;
var G__14554 = chunk__14537_14546;
var G__14555 = count__14538_14547;
var G__14556 = (i__14539_14548 + (1));
seq__14536_14545 = G__14553;
chunk__14537_14546 = G__14554;
count__14538_14547 = G__14555;
i__14539_14548 = G__14556;
continue;
} else {
var temp__4657__auto___14557 = cljs.core.seq(seq__14536_14545);
if(temp__4657__auto___14557){
var seq__14536_14558__$1 = temp__4657__auto___14557;
if(cljs.core.chunked_seq_QMARK_(seq__14536_14558__$1)){
var c__6673__auto___14559 = cljs.core.chunk_first(seq__14536_14558__$1);
var G__14560 = cljs.core.chunk_rest(seq__14536_14558__$1);
var G__14561 = c__6673__auto___14559;
var G__14562 = cljs.core.count(c__6673__auto___14559);
var G__14563 = (0);
seq__14536_14545 = G__14560;
chunk__14537_14546 = G__14561;
count__14538_14547 = G__14562;
i__14539_14548 = G__14563;
continue;
} else {
var map__14542_14564 = cljs.core.first(seq__14536_14558__$1);
var map__14542_14565__$1 = ((((!((map__14542_14564 == null)))?((((map__14542_14564.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14542_14564.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14542_14564):map__14542_14564);
var binding_14566 = map__14542_14565__$1;
var init_14567 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14542_14565__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_14566);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_14567,";"], 0));

var G__14568 = cljs.core.next(seq__14536_14558__$1);
var G__14569 = null;
var G__14570 = (0);
var G__14571 = (0);
seq__14536_14545 = G__14568;
chunk__14537_14546 = G__14569;
count__14538_14547 = G__14570;
i__14539_14548 = G__14571;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["while(true){"], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_14535_14544;
}
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$let,(function (ast){
return cljs.compiler.emit_let(ast,false);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$loop,(function (ast){
return cljs.compiler.emit_let(ast,true);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$recur,(function (p__14572){
var map__14573 = p__14572;
var map__14573__$1 = ((((!((map__14573 == null)))?((((map__14573.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14573.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14573):map__14573);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$frame);
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$exprs);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$env);
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame);
var n__6777__auto___14575 = cljs.core.count(exprs);
var i_14576 = (0);
while(true){
if((i_14576 < n__6777__auto___14575)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_14576) : temps.call(null,i_14576))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_14576) : exprs.call(null,i_14576)),";"], 0));

var G__14577 = (i_14576 + (1));
i_14576 = G__14577;
continue;
} else {
}
break;
}

var n__6777__auto___14578 = cljs.core.count(exprs);
var i_14579 = (0);
while(true){
if((i_14579 < n__6777__auto___14578)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_14579) : params.call(null,i_14579)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_14579) : temps.call(null,i_14579)),";"], 0));

var G__14580 = (i_14579 + (1));
i_14579 = G__14580;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["continue;"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$letfn,(function (p__14581){
var map__14582 = p__14581;
var map__14582__$1 = ((((!((map__14582 == null)))?((((map__14582.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14582.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14582):map__14582);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14582__$1,cljs.core.cst$kw$bindings);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14582__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14582__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__14584_14592 = cljs.core.seq(bindings);
var chunk__14585_14593 = null;
var count__14586_14594 = (0);
var i__14587_14595 = (0);
while(true){
if((i__14587_14595 < count__14586_14594)){
var map__14588_14596 = chunk__14585_14593.cljs$core$IIndexed$_nth$arity$2(null,i__14587_14595);
var map__14588_14597__$1 = ((((!((map__14588_14596 == null)))?((((map__14588_14596.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14588_14596.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14588_14596):map__14588_14596);
var binding_14598 = map__14588_14597__$1;
var init_14599 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14588_14597__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_14598)," = ",init_14599,";"], 0));

var G__14600 = seq__14584_14592;
var G__14601 = chunk__14585_14593;
var G__14602 = count__14586_14594;
var G__14603 = (i__14587_14595 + (1));
seq__14584_14592 = G__14600;
chunk__14585_14593 = G__14601;
count__14586_14594 = G__14602;
i__14587_14595 = G__14603;
continue;
} else {
var temp__4657__auto___14604 = cljs.core.seq(seq__14584_14592);
if(temp__4657__auto___14604){
var seq__14584_14605__$1 = temp__4657__auto___14604;
if(cljs.core.chunked_seq_QMARK_(seq__14584_14605__$1)){
var c__6673__auto___14606 = cljs.core.chunk_first(seq__14584_14605__$1);
var G__14607 = cljs.core.chunk_rest(seq__14584_14605__$1);
var G__14608 = c__6673__auto___14606;
var G__14609 = cljs.core.count(c__6673__auto___14606);
var G__14610 = (0);
seq__14584_14592 = G__14607;
chunk__14585_14593 = G__14608;
count__14586_14594 = G__14609;
i__14587_14595 = G__14610;
continue;
} else {
var map__14590_14611 = cljs.core.first(seq__14584_14605__$1);
var map__14590_14612__$1 = ((((!((map__14590_14611 == null)))?((((map__14590_14611.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14590_14611.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14590_14611):map__14590_14611);
var binding_14613 = map__14590_14612__$1;
var init_14614 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14590_14612__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_14613)," = ",init_14614,";"], 0));

var G__14615 = cljs.core.next(seq__14584_14605__$1);
var G__14616 = null;
var G__14617 = (0);
var G__14618 = (0);
seq__14584_14592 = G__14615;
chunk__14585_14593 = G__14616;
count__14586_14594 = G__14617;
i__14587_14595 = G__14618;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str("$")].join(''));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invoke,(function (p__14621){
var map__14622 = p__14621;
var map__14622__$1 = ((((!((map__14622 == null)))?((((map__14622.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14622.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14622):map__14622);
var expr = map__14622__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14622__$1,cljs.core.cst$kw$f);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14622__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14622__$1,cljs.core.cst$kw$env);
var info = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__5850__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5850__auto__)){
var and__5850__auto____$1 = cljs.core.not(cljs.core.cst$kw$dynamic.cljs$core$IFn$_invoke$arity$1(info));
if(and__5850__auto____$1){
return cljs.core.cst$kw$fn_DASH_var.cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})();
var protocol = cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__5850__auto__ = protocol;
if(cljs.core.truth_(and__5850__auto__)){
var and__5850__auto____$1 = tag;
if(cljs.core.truth_(and__5850__auto____$1)){
var or__5862__auto__ = (function (){var and__5850__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5850__auto____$2)){
var and__5850__auto____$3 = protocol;
if(cljs.core.truth_(and__5850__auto____$3)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(tag,cljs.core.cst$sym$not_DASH_native);
} else {
return and__5850__auto____$3;
}
} else {
return and__5850__auto____$2;
}
})();
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var and__5850__auto____$2 = (function (){var or__5862__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__5862__auto____$1)){
return or__5862__auto____$1;
} else {
return cljs.core.cst$kw$protocol_DASH_inline.cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__5850__auto____$2)){
var or__5862__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(protocol,tag);
if(or__5862__auto____$1){
return or__5862__auto____$1;
} else {
var and__5850__auto____$3 = !(cljs.core.set_QMARK_(tag));
if(and__5850__auto____$3){
var and__5850__auto____$4 = cljs.core.not(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [cljs.core.cst$sym$clj,null,cljs.core.cst$sym$boolean,null,cljs.core.cst$sym$object,null,cljs.core.cst$sym$any,null,cljs.core.cst$sym$number,null,cljs.core.cst$sym$clj_DASH_or_DASH_nil,null,cljs.core.cst$sym$array,null,cljs.core.cst$sym$string,null,cljs.core.cst$sym$function,null,cljs.core.cst$sym$clj_DASH_nil,null], null), null).call(null,tag));
if(and__5850__auto____$4){
var temp__4657__auto__ = cljs.core.cst$kw$protocols.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),tag));
if(cljs.core.truth_(temp__4657__auto__)){
var ps = temp__4657__auto__;
return (ps.cljs$core$IFn$_invoke$arity$1 ? ps.cljs$core$IFn$_invoke$arity$1(protocol) : ps.call(null,protocol));
} else {
return null;
}
} else {
return and__5850__auto____$4;
}
} else {
return and__5850__auto____$3;
}
}
} else {
return and__5850__auto____$2;
}
}
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})();
var opt_not_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$sym$cljs$core_SLASH_not)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.analyzer.infer_tag(env,cljs.core.first(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(expr))),cljs.core.cst$sym$boolean));
var ns = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$js)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$Math));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__5862__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,cljs.core.cst$sym$goog);
if(or__5862__auto__){
return or__5862__auto__;
} else {
var temp__4657__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__4657__auto__)){
var ns_str = temp__4657__auto__;
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.string.split.cljs$core$IFn$_invoke$arity$2(ns_str,/\./),(0),null),"goog");
} else {
return null;
}
}
})():null);
var keyword_QMARK_ = (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f),cljs.core.cst$kw$constant)) && ((cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(f) instanceof cljs.core.Keyword));
var vec__14624 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
var variadic_QMARK_ = cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(info);
var mps = cljs.core.cst$kw$method_DASH_params.cljs$core$IFn$_invoke$arity$1(info);
var mfa = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(info);
if((cljs.core.not(variadic_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(mps),(1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__5850__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__5850__auto__)){
return (arity > mfa);
} else {
return and__5850__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env){
return (function (p1__14619_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__14619_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_fixed_DASH_arity,mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env){
return (function (p1__14620_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__14620_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14622,map__14622__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14624,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14624,(1),null);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["!(",cljs.core.first(args),")"], 0));
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_14625 = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(args),".",pimpl_14625,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_14626 = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_14626,args)),(((mfa_14626 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_14626,args)),"], 0))"], 0));
} else {
if(cljs.core.truth_((function (){var or__5862__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = js_QMARK_;
if(or__5862__auto____$1){
return or__5862__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(f__$1),cljs.core.cst$kw$var);
} else {
return and__5850__auto__;
}
})())){
var fprop_14627 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",f__$1,fprop_14627," ? ",f__$1,fprop_14627,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")"], 0));
}

}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$new,(function (p__14628){
var map__14629 = p__14628;
var map__14629__$1 = ((((!((map__14629 == null)))?((((map__14629.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14629.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14629):map__14629);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14629__$1,cljs.core.cst$kw$ctor);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14629__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14629__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new ",ctor,"(",cljs.compiler.comma_sep(args),"))"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set_BANG_,(function (p__14631){
var map__14632 = p__14631;
var map__14632__$1 = ((((!((map__14632 == null)))?((((map__14632.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14632.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14632):map__14632);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14632__$1,cljs.core.cst$kw$target);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14632__$1,cljs.core.cst$kw$val);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14632__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target," = ",val], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads){
var loaded_libs = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_);
var loaded_libs_temp = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$sym$cljs$core$_STAR_loaded_DASH_libs_STAR_));
if(cljs.core.truth_(cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set();"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.set();"], 0));
} else {
}

var seq__14638_14642 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.vals(libs))));
var chunk__14639_14643 = null;
var count__14640_14644 = (0);
var i__14641_14645 = (0);
while(true){
if((i__14641_14645 < count__14640_14644)){
var lib_14646 = chunk__14639_14643.cljs$core$IIndexed$_nth$arity$2(null,i__14641_14645);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14646),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14646),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14646),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14646),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14646),"');"], 0));

}
}

var G__14647 = seq__14638_14642;
var G__14648 = chunk__14639_14643;
var G__14649 = count__14640_14644;
var G__14650 = (i__14641_14645 + (1));
seq__14638_14642 = G__14647;
chunk__14639_14643 = G__14648;
count__14640_14644 = G__14649;
i__14641_14645 = G__14650;
continue;
} else {
var temp__4657__auto___14651 = cljs.core.seq(seq__14638_14642);
if(temp__4657__auto___14651){
var seq__14638_14652__$1 = temp__4657__auto___14651;
if(cljs.core.chunked_seq_QMARK_(seq__14638_14652__$1)){
var c__6673__auto___14653 = cljs.core.chunk_first(seq__14638_14652__$1);
var G__14654 = cljs.core.chunk_rest(seq__14638_14652__$1);
var G__14655 = c__6673__auto___14653;
var G__14656 = cljs.core.count(c__6673__auto___14653);
var G__14657 = (0);
seq__14638_14642 = G__14654;
chunk__14639_14643 = G__14655;
count__14640_14644 = G__14656;
i__14641_14645 = G__14657;
continue;
} else {
var lib_14658 = cljs.core.first(seq__14638_14652__$1);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14658),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14658),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14658),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14658),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14658),"');"], 0));

}
}

var G__14659 = cljs.core.next(seq__14638_14652__$1);
var G__14660 = null;
var G__14661 = (0);
var G__14662 = (0);
seq__14638_14642 = G__14659;
chunk__14639_14643 = G__14660;
count__14640_14644 = G__14661;
i__14641_14645 = G__14662;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs)))){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");"], 0));
} else {
return null;
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns,(function (p__14663){
var map__14664 = p__14663;
var map__14664__$1 = ((((!((map__14664 == null)))?((((map__14664.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14664.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14664):map__14664);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14664__$1,cljs.core.cst$kw$env);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$core)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('cljs.core');"], 0));
}

cljs.compiler.load_libs(requires,null,cljs.core.cst$kw$require.cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs(uses,requires,cljs.core.cst$kw$use.cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$deftype_STAR_,(function (p__14666){
var map__14667 = p__14666;
var map__14667__$1 = ((((!((map__14667 == null)))?((((map__14667.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14667.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14667):map__14667);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14667__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14667__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14667__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14667__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14667__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__14669_14683 = cljs.core.seq(protocols);
var chunk__14670_14684 = null;
var count__14671_14685 = (0);
var i__14672_14686 = (0);
while(true){
if((i__14672_14686 < count__14671_14685)){
var protocol_14687 = chunk__14670_14684.cljs$core$IIndexed$_nth$arity$2(null,i__14672_14686);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14687)].join('')),"}"], 0));

var G__14688 = seq__14669_14683;
var G__14689 = chunk__14670_14684;
var G__14690 = count__14671_14685;
var G__14691 = (i__14672_14686 + (1));
seq__14669_14683 = G__14688;
chunk__14670_14684 = G__14689;
count__14671_14685 = G__14690;
i__14672_14686 = G__14691;
continue;
} else {
var temp__4657__auto___14692 = cljs.core.seq(seq__14669_14683);
if(temp__4657__auto___14692){
var seq__14669_14693__$1 = temp__4657__auto___14692;
if(cljs.core.chunked_seq_QMARK_(seq__14669_14693__$1)){
var c__6673__auto___14694 = cljs.core.chunk_first(seq__14669_14693__$1);
var G__14695 = cljs.core.chunk_rest(seq__14669_14693__$1);
var G__14696 = c__6673__auto___14694;
var G__14697 = cljs.core.count(c__6673__auto___14694);
var G__14698 = (0);
seq__14669_14683 = G__14695;
chunk__14670_14684 = G__14696;
count__14671_14685 = G__14697;
i__14672_14686 = G__14698;
continue;
} else {
var protocol_14699 = cljs.core.first(seq__14669_14693__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14699)].join('')),"}"], 0));

var G__14700 = cljs.core.next(seq__14669_14693__$1);
var G__14701 = null;
var G__14702 = (0);
var G__14703 = (0);
seq__14669_14683 = G__14700;
chunk__14670_14684 = G__14701;
count__14671_14685 = G__14702;
i__14672_14686 = G__14703;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__14673_14704 = cljs.core.seq(fields__$1);
var chunk__14674_14705 = null;
var count__14675_14706 = (0);
var i__14676_14707 = (0);
while(true){
if((i__14676_14707 < count__14675_14706)){
var fld_14708 = chunk__14674_14705.cljs$core$IIndexed$_nth$arity$2(null,i__14676_14707);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14708," = ",fld_14708,";"], 0));

var G__14709 = seq__14673_14704;
var G__14710 = chunk__14674_14705;
var G__14711 = count__14675_14706;
var G__14712 = (i__14676_14707 + (1));
seq__14673_14704 = G__14709;
chunk__14674_14705 = G__14710;
count__14675_14706 = G__14711;
i__14676_14707 = G__14712;
continue;
} else {
var temp__4657__auto___14713 = cljs.core.seq(seq__14673_14704);
if(temp__4657__auto___14713){
var seq__14673_14714__$1 = temp__4657__auto___14713;
if(cljs.core.chunked_seq_QMARK_(seq__14673_14714__$1)){
var c__6673__auto___14715 = cljs.core.chunk_first(seq__14673_14714__$1);
var G__14716 = cljs.core.chunk_rest(seq__14673_14714__$1);
var G__14717 = c__6673__auto___14715;
var G__14718 = cljs.core.count(c__6673__auto___14715);
var G__14719 = (0);
seq__14673_14704 = G__14716;
chunk__14674_14705 = G__14717;
count__14675_14706 = G__14718;
i__14676_14707 = G__14719;
continue;
} else {
var fld_14720 = cljs.core.first(seq__14673_14714__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14720," = ",fld_14720,";"], 0));

var G__14721 = cljs.core.next(seq__14673_14714__$1);
var G__14722 = null;
var G__14723 = (0);
var G__14724 = (0);
seq__14673_14704 = G__14721;
chunk__14674_14705 = G__14722;
count__14675_14706 = G__14723;
i__14676_14707 = G__14724;
continue;
}
} else {
}
}
break;
}

var seq__14677_14725 = cljs.core.seq(pmasks);
var chunk__14678_14726 = null;
var count__14679_14727 = (0);
var i__14680_14728 = (0);
while(true){
if((i__14680_14728 < count__14679_14727)){
var vec__14681_14729 = chunk__14678_14726.cljs$core$IIndexed$_nth$arity$2(null,i__14680_14728);
var pno_14730 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14681_14729,(0),null);
var pmask_14731 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14681_14729,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14730,"$ = ",pmask_14731,";"], 0));

var G__14732 = seq__14677_14725;
var G__14733 = chunk__14678_14726;
var G__14734 = count__14679_14727;
var G__14735 = (i__14680_14728 + (1));
seq__14677_14725 = G__14732;
chunk__14678_14726 = G__14733;
count__14679_14727 = G__14734;
i__14680_14728 = G__14735;
continue;
} else {
var temp__4657__auto___14736 = cljs.core.seq(seq__14677_14725);
if(temp__4657__auto___14736){
var seq__14677_14737__$1 = temp__4657__auto___14736;
if(cljs.core.chunked_seq_QMARK_(seq__14677_14737__$1)){
var c__6673__auto___14738 = cljs.core.chunk_first(seq__14677_14737__$1);
var G__14739 = cljs.core.chunk_rest(seq__14677_14737__$1);
var G__14740 = c__6673__auto___14738;
var G__14741 = cljs.core.count(c__6673__auto___14738);
var G__14742 = (0);
seq__14677_14725 = G__14739;
chunk__14678_14726 = G__14740;
count__14679_14727 = G__14741;
i__14680_14728 = G__14742;
continue;
} else {
var vec__14682_14743 = cljs.core.first(seq__14677_14737__$1);
var pno_14744 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14682_14743,(0),null);
var pmask_14745 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14682_14743,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14744,"$ = ",pmask_14745,";"], 0));

var G__14746 = cljs.core.next(seq__14677_14737__$1);
var G__14747 = null;
var G__14748 = (0);
var G__14749 = (0);
seq__14677_14725 = G__14746;
chunk__14678_14726 = G__14747;
count__14679_14727 = G__14748;
i__14680_14728 = G__14749;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$defrecord_STAR_,(function (p__14750){
var map__14751 = p__14750;
var map__14751__$1 = ((((!((map__14751 == null)))?((((map__14751.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14751.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14751):map__14751);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14751__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14751__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14751__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14751__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14751__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$__meta,cljs.core.cst$sym$__extmap,cljs.core.cst$sym$__hash], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__14753_14767 = cljs.core.seq(protocols);
var chunk__14754_14768 = null;
var count__14755_14769 = (0);
var i__14756_14770 = (0);
while(true){
if((i__14756_14770 < count__14755_14769)){
var protocol_14771 = chunk__14754_14768.cljs$core$IIndexed$_nth$arity$2(null,i__14756_14770);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14771)].join('')),"}"], 0));

var G__14772 = seq__14753_14767;
var G__14773 = chunk__14754_14768;
var G__14774 = count__14755_14769;
var G__14775 = (i__14756_14770 + (1));
seq__14753_14767 = G__14772;
chunk__14754_14768 = G__14773;
count__14755_14769 = G__14774;
i__14756_14770 = G__14775;
continue;
} else {
var temp__4657__auto___14776 = cljs.core.seq(seq__14753_14767);
if(temp__4657__auto___14776){
var seq__14753_14777__$1 = temp__4657__auto___14776;
if(cljs.core.chunked_seq_QMARK_(seq__14753_14777__$1)){
var c__6673__auto___14778 = cljs.core.chunk_first(seq__14753_14777__$1);
var G__14779 = cljs.core.chunk_rest(seq__14753_14777__$1);
var G__14780 = c__6673__auto___14778;
var G__14781 = cljs.core.count(c__6673__auto___14778);
var G__14782 = (0);
seq__14753_14767 = G__14779;
chunk__14754_14768 = G__14780;
count__14755_14769 = G__14781;
i__14756_14770 = G__14782;
continue;
} else {
var protocol_14783 = cljs.core.first(seq__14753_14777__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14783)].join('')),"}"], 0));

var G__14784 = cljs.core.next(seq__14753_14777__$1);
var G__14785 = null;
var G__14786 = (0);
var G__14787 = (0);
seq__14753_14767 = G__14784;
chunk__14754_14768 = G__14785;
count__14755_14769 = G__14786;
i__14756_14770 = G__14787;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__14757_14788 = cljs.core.seq(fields__$1);
var chunk__14758_14789 = null;
var count__14759_14790 = (0);
var i__14760_14791 = (0);
while(true){
if((i__14760_14791 < count__14759_14790)){
var fld_14792 = chunk__14758_14789.cljs$core$IIndexed$_nth$arity$2(null,i__14760_14791);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14792," = ",fld_14792,";"], 0));

var G__14793 = seq__14757_14788;
var G__14794 = chunk__14758_14789;
var G__14795 = count__14759_14790;
var G__14796 = (i__14760_14791 + (1));
seq__14757_14788 = G__14793;
chunk__14758_14789 = G__14794;
count__14759_14790 = G__14795;
i__14760_14791 = G__14796;
continue;
} else {
var temp__4657__auto___14797 = cljs.core.seq(seq__14757_14788);
if(temp__4657__auto___14797){
var seq__14757_14798__$1 = temp__4657__auto___14797;
if(cljs.core.chunked_seq_QMARK_(seq__14757_14798__$1)){
var c__6673__auto___14799 = cljs.core.chunk_first(seq__14757_14798__$1);
var G__14800 = cljs.core.chunk_rest(seq__14757_14798__$1);
var G__14801 = c__6673__auto___14799;
var G__14802 = cljs.core.count(c__6673__auto___14799);
var G__14803 = (0);
seq__14757_14788 = G__14800;
chunk__14758_14789 = G__14801;
count__14759_14790 = G__14802;
i__14760_14791 = G__14803;
continue;
} else {
var fld_14804 = cljs.core.first(seq__14757_14798__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14804," = ",fld_14804,";"], 0));

var G__14805 = cljs.core.next(seq__14757_14798__$1);
var G__14806 = null;
var G__14807 = (0);
var G__14808 = (0);
seq__14757_14788 = G__14805;
chunk__14758_14789 = G__14806;
count__14759_14790 = G__14807;
i__14760_14791 = G__14808;
continue;
}
} else {
}
}
break;
}

var seq__14761_14809 = cljs.core.seq(pmasks);
var chunk__14762_14810 = null;
var count__14763_14811 = (0);
var i__14764_14812 = (0);
while(true){
if((i__14764_14812 < count__14763_14811)){
var vec__14765_14813 = chunk__14762_14810.cljs$core$IIndexed$_nth$arity$2(null,i__14764_14812);
var pno_14814 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14765_14813,(0),null);
var pmask_14815 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14765_14813,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14814,"$ = ",pmask_14815,";"], 0));

var G__14816 = seq__14761_14809;
var G__14817 = chunk__14762_14810;
var G__14818 = count__14763_14811;
var G__14819 = (i__14764_14812 + (1));
seq__14761_14809 = G__14816;
chunk__14762_14810 = G__14817;
count__14763_14811 = G__14818;
i__14764_14812 = G__14819;
continue;
} else {
var temp__4657__auto___14820 = cljs.core.seq(seq__14761_14809);
if(temp__4657__auto___14820){
var seq__14761_14821__$1 = temp__4657__auto___14820;
if(cljs.core.chunked_seq_QMARK_(seq__14761_14821__$1)){
var c__6673__auto___14822 = cljs.core.chunk_first(seq__14761_14821__$1);
var G__14823 = cljs.core.chunk_rest(seq__14761_14821__$1);
var G__14824 = c__6673__auto___14822;
var G__14825 = cljs.core.count(c__6673__auto___14822);
var G__14826 = (0);
seq__14761_14809 = G__14823;
chunk__14762_14810 = G__14824;
count__14763_14811 = G__14825;
i__14764_14812 = G__14826;
continue;
} else {
var vec__14766_14827 = cljs.core.first(seq__14761_14821__$1);
var pno_14828 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14766_14827,(0),null);
var pmask_14829 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14766_14827,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14828,"$ = ",pmask_14829,";"], 0));

var G__14830 = cljs.core.next(seq__14761_14821__$1);
var G__14831 = null;
var G__14832 = (0);
var G__14833 = (0);
seq__14761_14809 = G__14830;
chunk__14762_14810 = G__14831;
count__14763_14811 = G__14832;
i__14764_14812 = G__14833;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})"], 0));

return cljs.compiler.emit(body);
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$dot,(function (p__14834){
var map__14835 = p__14834;
var map__14835__$1 = ((((!((map__14835 == null)))?((((map__14835.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14835.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14835):map__14835);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14835__$1,cljs.core.cst$kw$target);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14835__$1,cljs.core.cst$kw$field);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14835__$1,cljs.core.cst$kw$method);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14835__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14835__$1,cljs.core.cst$kw$env);
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY)], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js,(function (p__14837){
var map__14838 = p__14837;
var map__14838__$1 = ((((!((map__14838 == null)))?((((map__14838.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14838.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14838):map__14838);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14838__$1,cljs.core.cst$kw$op);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14838__$1,cljs.core.cst$kw$env);
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14838__$1,cljs.core.cst$kw$code);
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14838__$1,cljs.core.cst$kw$segs);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14838__$1,cljs.core.cst$kw$args);
if(cljs.core.truth_((function (){var and__5850__auto__ = code;
if(cljs.core.truth_(and__5850__auto__)){
var G__14840 = clojure.string.trim(code);
var G__14841 = "/*";
return goog.string.startsWith(G__14840,G__14841);
} else {
return and__5850__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
var env__13768__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null)))], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13768__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.build_affecting_options = (function cljs$compiler$build_affecting_options(opts){
return cljs.core.select_keys(opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$static_DASH_fns,cljs.core.cst$kw$optimize_DASH_constants,cljs.core.cst$kw$elide_DASH_asserts,cljs.core.cst$kw$target], null));
});
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
var seq__14850 = cljs.core.seq(table);
var chunk__14851 = null;
var count__14852 = (0);
var i__14853 = (0);
while(true){
if((i__14853 < count__14852)){
var vec__14854 = chunk__14851.cljs$core$IIndexed$_nth$arity$2(null,i__14853);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14854,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14854,(1),null);
var ns_14856 = cljs.core.namespace(sym);
var name_14857 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,cljs.core.cst$kw$invalid_DASH_constant_DASH_type], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__14858 = seq__14850;
var G__14859 = chunk__14851;
var G__14860 = count__14852;
var G__14861 = (i__14853 + (1));
seq__14850 = G__14858;
chunk__14851 = G__14859;
count__14852 = G__14860;
i__14853 = G__14861;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14850);
if(temp__4657__auto__){
var seq__14850__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14850__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14850__$1);
var G__14862 = cljs.core.chunk_rest(seq__14850__$1);
var G__14863 = c__6673__auto__;
var G__14864 = cljs.core.count(c__6673__auto__);
var G__14865 = (0);
seq__14850 = G__14862;
chunk__14851 = G__14863;
count__14852 = G__14864;
i__14853 = G__14865;
continue;
} else {
var vec__14855 = cljs.core.first(seq__14850__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14855,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14855,(1),null);
var ns_14866 = cljs.core.namespace(sym);
var name_14867 = cljs.core.name(sym);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value," = "], 0));

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword(sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol(sym);
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type(sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$error,cljs.core.cst$kw$invalid_DASH_constant_DASH_type], null));

}
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";\n"], 0));

var G__14868 = cljs.core.next(seq__14850__$1);
var G__14869 = null;
var G__14870 = (0);
var G__14871 = (0);
seq__14850 = G__14868;
chunk__14851 = G__14869;
count__14852 = G__14870;
i__14853 = G__14871;
continue;
}
} else {
return null;
}
}
break;
}
});
