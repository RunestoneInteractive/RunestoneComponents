// Compiled by ClojureScript 1.8.34 {:static-fns true, :optimize-constants true}
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
var map__13690 = s;
var map__13690__$1 = ((((!((map__13690 == null)))?((((map__13690.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13690.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13690):map__13690);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13690__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13690__$1,cljs.core.cst$kw$info);
var d = (0);
var G__13693 = info;
var map__13694 = G__13693;
var map__13694__$1 = ((((!((map__13694 == null)))?((((map__13694.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13694.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13694):map__13694);
var shadow = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13694__$1,cljs.core.cst$kw$shadow);
var d__$1 = d;
var G__13693__$1 = G__13693;
while(true){
var d__$2 = d__$1;
var map__13696 = G__13693__$1;
var map__13696__$1 = ((((!((map__13696 == null)))?((((map__13696.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13696.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13696):map__13696);
var shadow__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13696__$1,cljs.core.cst$kw$shadow);
if(cljs.core.truth_(shadow__$1)){
var G__13698 = (d__$2 + (1));
var G__13699 = shadow__$1;
d__$1 = G__13698;
G__13693__$1 = G__13699;
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
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__13700){
var map__13706 = p__13700;
var map__13706__$1 = ((((!((map__13706 == null)))?((((map__13706.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13706.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13706):map__13706);
var name_var = map__13706__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13706__$1,cljs.core.cst$kw$name);
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13706__$1,cljs.core.cst$kw$info);
var name__$1 = clojure.string.replace([cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__13708 = info;
var map__13708__$1 = ((((!((map__13708 == null)))?((((map__13708.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13708.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13708):map__13708);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13708__$1,cljs.core.cst$kw$ns);
var fn_scope = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13708__$1,cljs.core.cst$kw$fn_DASH_scope);
var scoped_name = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("_$_",cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.cst$kw$name),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1((function (){var G__13710 = [cljs.core.str(clojure.string.replace([cljs.core.str(ns)].join(''),".","$")),cljs.core.str("$"),cljs.core.str(scoped_name)].join('');
return (cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__13710) : cljs.compiler.munge.call(null,G__13710));
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
var args13711 = [];
var len__6931__auto___13714 = arguments.length;
var i__6932__auto___13715 = (0);
while(true){
if((i__6932__auto___13715 < len__6931__auto___13714)){
args13711.push((arguments[i__6932__auto___13715]));

var G__13716 = (i__6932__auto___13715 + (1));
i__6932__auto___13715 = G__13716;
continue;
} else {
}
break;
}

var G__13713 = args13711.length;
switch (G__13713) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13711.length)].join('')));

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
var G__13719 = cp;
switch (G__13719) {
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
var seq__13725_13729 = cljs.core.seq(s);
var chunk__13726_13730 = null;
var count__13727_13731 = (0);
var i__13728_13732 = (0);
while(true){
if((i__13728_13732 < count__13727_13731)){
var c_13733 = chunk__13726_13730.cljs$core$IIndexed$_nth$arity$2(null,i__13728_13732);
sb.append(cljs.compiler.escape_char(c_13733));

var G__13734 = seq__13725_13729;
var G__13735 = chunk__13726_13730;
var G__13736 = count__13727_13731;
var G__13737 = (i__13728_13732 + (1));
seq__13725_13729 = G__13734;
chunk__13726_13730 = G__13735;
count__13727_13731 = G__13736;
i__13728_13732 = G__13737;
continue;
} else {
var temp__4657__auto___13738 = cljs.core.seq(seq__13725_13729);
if(temp__4657__auto___13738){
var seq__13725_13739__$1 = temp__4657__auto___13738;
if(cljs.core.chunked_seq_QMARK_(seq__13725_13739__$1)){
var c__6673__auto___13740 = cljs.core.chunk_first(seq__13725_13739__$1);
var G__13741 = cljs.core.chunk_rest(seq__13725_13739__$1);
var G__13742 = c__6673__auto___13740;
var G__13743 = cljs.core.count(c__6673__auto___13740);
var G__13744 = (0);
seq__13725_13729 = G__13741;
chunk__13726_13730 = G__13742;
count__13727_13731 = G__13743;
i__13728_13732 = G__13744;
continue;
} else {
var c_13745 = cljs.core.first(seq__13725_13739__$1);
sb.append(cljs.compiler.escape_char(c_13745));

var G__13746 = cljs.core.next(seq__13725_13739__$1);
var G__13747 = null;
var G__13748 = (0);
var G__13749 = (0);
seq__13725_13729 = G__13746;
chunk__13726_13730 = G__13747;
count__13727_13731 = G__13748;
i__13728_13732 = G__13749;
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
cljs.compiler.emit_STAR_ = (function (){var method_table__6786__auto__ = (function (){var G__13750 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13750) : cljs.core.atom.call(null,G__13750));
})();
var prefer_table__6787__auto__ = (function (){var G__13751 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13751) : cljs.core.atom.call(null,G__13751));
})();
var method_cache__6788__auto__ = (function (){var G__13752 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13752) : cljs.core.atom.call(null,G__13752));
})();
var cached_hierarchy__6789__auto__ = (function (){var G__13753 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13753) : cljs.core.atom.call(null,G__13753));
})();
var hierarchy__6790__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit*"),cljs.core.cst$kw$op,cljs.core.cst$kw$default,hierarchy__6790__auto__,method_table__6786__auto__,prefer_table__6787__auto__,method_cache__6788__auto__,cached_hierarchy__6789__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__12081__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__12081__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.cljs$core$IFn$_invoke$arity$0();
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__13759_13764 = ast;
var map__13759_13765__$1 = ((((!((map__13759_13764 == null)))?((((map__13759_13764.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13759_13764.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13759_13764):map__13759_13764);
var env_13766 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13759_13765__$1,cljs.core.cst$kw$env);
if(cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env_13766))){
var map__13761_13767 = env_13766;
var map__13761_13768__$1 = ((((!((map__13761_13767 == null)))?((((map__13761_13767.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13761_13767.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13761_13767):map__13761_13767);
var line_13769 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13761_13768__$1,cljs.core.cst$kw$line);
var column_13770 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13761_13768__$1,cljs.core.cst$kw$column);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,((function (map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__){
return (function (m){
var minfo = (function (){var G__13763 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$gcol,cljs.core.cst$kw$gen_DASH_col.cljs$core$IFn$_invoke$arity$1(m),cljs.core.cst$kw$gline,cljs.core.cst$kw$gen_DASH_line.cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast),cljs.core.cst$kw$var)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__13763,cljs.core.cst$kw$name,[cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(ast)))].join(''));
} else {
return G__13763;
}
})();
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$source_DASH_map,(line_13769 - (1))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__){
return (function (line__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_13770)?(column_13770 - (1)):(0))], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(((function (minfo,map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__){
return (function (column__$1){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(column__$1,minfo);
});})(minfo,map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__))
,cljs.core.sorted_map()));
});})(map__13761_13767,map__13761_13768__$1,line_13769,column_13770,map__13759_13764,map__13759_13765__$1,env_13766,val__12081__auto__))
);
} else {
}
} else {
}

return (cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_STAR_.cljs$core$IFn$_invoke$arity$1(ast) : cljs.compiler.emit_STAR_.call(null,ast));
}finally {if((val__12081__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__6938__auto__ = [];
var len__6931__auto___13777 = arguments.length;
var i__6932__auto___13778 = (0);
while(true){
if((i__6932__auto___13778 < len__6931__auto___13777)){
args__6938__auto__.push((arguments[i__6932__auto___13778]));

var G__13779 = (i__6932__auto___13778 + (1));
i__6932__auto___13778 = G__13779;
continue;
} else {
}
break;
}

var argseq__6939__auto__ = ((((0) < args__6938__auto__.length))?(new cljs.core.IndexedSeq(args__6938__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__6939__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__13773_13780 = cljs.core.seq(xs);
var chunk__13774_13781 = null;
var count__13775_13782 = (0);
var i__13776_13783 = (0);
while(true){
if((i__13776_13783 < count__13775_13782)){
var x_13784 = chunk__13774_13781.cljs$core$IIndexed$_nth$arity$2(null,i__13776_13783);
if((x_13784 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_13784)){
cljs.compiler.emit(x_13784);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_13784)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_13784);
} else {
if(goog.isFunction(x_13784)){
(x_13784.cljs$core$IFn$_invoke$arity$0 ? x_13784.cljs$core$IFn$_invoke$arity$0() : x_13784.call(null));
} else {
var s_13785 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_13784], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gen_DASH_col], null),((function (seq__13773_13780,chunk__13774_13781,count__13775_13782,i__13776_13783,s_13785,x_13784){
return (function (p1__13771_SHARP_){
return (p1__13771_SHARP_ + cljs.core.count(s_13785));
});})(seq__13773_13780,chunk__13774_13781,count__13775_13782,i__13776_13783,s_13785,x_13784))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_13785], 0));

}
}
}
}

var G__13786 = seq__13773_13780;
var G__13787 = chunk__13774_13781;
var G__13788 = count__13775_13782;
var G__13789 = (i__13776_13783 + (1));
seq__13773_13780 = G__13786;
chunk__13774_13781 = G__13787;
count__13775_13782 = G__13788;
i__13776_13783 = G__13789;
continue;
} else {
var temp__4657__auto___13790 = cljs.core.seq(seq__13773_13780);
if(temp__4657__auto___13790){
var seq__13773_13791__$1 = temp__4657__auto___13790;
if(cljs.core.chunked_seq_QMARK_(seq__13773_13791__$1)){
var c__6673__auto___13792 = cljs.core.chunk_first(seq__13773_13791__$1);
var G__13793 = cljs.core.chunk_rest(seq__13773_13791__$1);
var G__13794 = c__6673__auto___13792;
var G__13795 = cljs.core.count(c__6673__auto___13792);
var G__13796 = (0);
seq__13773_13780 = G__13793;
chunk__13774_13781 = G__13794;
count__13775_13782 = G__13795;
i__13776_13783 = G__13796;
continue;
} else {
var x_13797 = cljs.core.first(seq__13773_13791__$1);
if((x_13797 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_(x_13797)){
cljs.compiler.emit(x_13797);
} else {
if(cljs.analyzer.cljs_seq_QMARK_(x_13797)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,x_13797);
} else {
if(goog.isFunction(x_13797)){
(x_13797.cljs$core$IFn$_invoke$arity$0 ? x_13797.cljs$core$IFn$_invoke$arity$0() : x_13797.call(null));
} else {
var s_13798 = cljs.core.print_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x_13797], 0));
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$gen_DASH_col], null),((function (seq__13773_13780,chunk__13774_13781,count__13775_13782,i__13776_13783,s_13798,x_13797,seq__13773_13791__$1,temp__4657__auto___13790){
return (function (p1__13771_SHARP_){
return (p1__13771_SHARP_ + cljs.core.count(s_13798));
});})(seq__13773_13780,chunk__13774_13781,count__13775_13782,i__13776_13783,s_13798,x_13797,seq__13773_13791__$1,temp__4657__auto___13790))
);
}

cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_13798], 0));

}
}
}
}

var G__13799 = cljs.core.next(seq__13773_13791__$1);
var G__13800 = null;
var G__13801 = (0);
var G__13802 = (0);
seq__13773_13780 = G__13799;
chunk__13774_13781 = G__13800;
count__13775_13782 = G__13801;
i__13776_13783 = G__13802;
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

cljs.compiler.emits.cljs$lang$applyTo = (function (seq13772){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13772));
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__6938__auto__ = [];
var len__6931__auto___13807 = arguments.length;
var i__6932__auto___13808 = (0);
while(true){
if((i__6932__auto___13808 < len__6931__auto___13807)){
args__6938__auto__.push((arguments[i__6932__auto___13808]));

var G__13809 = (i__6932__auto___13808 + (1));
i__6932__auto___13808 = G__13809;
continue;
} else {
}
break;
}

var argseq__6939__auto__ = ((((0) < args__6938__auto__.length))?(new cljs.core.IndexedSeq(args__6938__auto__.slice((0)),(0),null)):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__6939__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.compiler.emits,xs);

cljs.core.println();

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_source_map_data_STAR_,(function (p__13804){
var map__13805 = p__13804;
var map__13805__$1 = ((((!((map__13805 == null)))?((((map__13805.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13805.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13805):map__13805);
var m = map__13805__$1;
var gen_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13805__$1,cljs.core.cst$kw$gen_DASH_line);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(m,cljs.core.cst$kw$gen_DASH_line,(gen_line + (1)),cljs.core.array_seq([cljs.core.cst$kw$gen_DASH_col,(0)], 0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq13803){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq13803));
});
cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__6847__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13812_13814 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13813_13815 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13812_13814,_STAR_print_fn_STAR_13813_13815,sb__6847__auto__){
return (function (x__6848__auto__){
return sb__6847__auto__.append(x__6848__auto__);
});})(_STAR_print_newline_STAR_13812_13814,_STAR_print_fn_STAR_13813_13815,sb__6847__auto__))
;

try{cljs.compiler.emit(expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13813_13815;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13812_13814;
}
return [cljs.core.str(sb__6847__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__6786__auto__ = (function (){var G__13816 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13816) : cljs.core.atom.call(null,G__13816));
})();
var prefer_table__6787__auto__ = (function (){var G__13817 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13817) : cljs.core.atom.call(null,G__13817));
})();
var method_cache__6788__auto__ = (function (){var G__13818 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13818) : cljs.core.atom.call(null,G__13818));
})();
var cached_hierarchy__6789__auto__ = (function (){var G__13819 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__13819) : cljs.core.atom.call(null,G__13819));
})();
var hierarchy__6790__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.compiler","emit-constant"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__6790__auto__,method_table__6786__auto__,prefer_table__6787__auto__,method_cache__6788__auto__,cached_hierarchy__6789__auto__));
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
var vec__13820 = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13820,(0),null);
var flags = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13820,(1),null);
var pattern = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13820,(2),null);
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

var G__13823_13825 = (cljs.core.truth_(ns)?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13823_13825) : cljs.compiler.emit_constant.call(null,G__13823_13825));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

var G__13824_13826 = cljs.core.hash(kw);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13824_13826) : cljs.compiler.emit_constant.call(null,G__13824_13826));

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

var G__13828_13829 = cljs.core.hash(sym);
(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(G__13828_13829) : cljs.compiler.emit_constant.call(null,G__13828_13829));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(null) : cljs.compiler.emit_constant.call(null,null));

return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([")"], 0));
});
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__13830 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__13830) : x.call(null,G__13830));
})();
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.",value], 0));
} else {
return cljs.compiler.emits_keyword(x);
}
}));
cljs.compiler.emit_constant.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(cljs.core.cst$kw$emit_DASH_constants.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$options.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)))))){
var value = (function (){var G__13831 = cljs.core.cst$kw$cljs$analyzer_SLASH_constant_DASH_table.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return (x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(G__13831) : x.call(null,G__13831));
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$var,(function (p__13833){
var map__13834 = p__13833;
var map__13834__$1 = ((((!((map__13834 == null)))?((((map__13834.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13834.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13834):map__13834);
var arg = map__13834__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13834__$1,cljs.core.cst$kw$info);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13834__$1,cljs.core.cst$kw$env);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13834__$1,cljs.core.cst$kw$form);
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
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (){var G__13836 = info__$1;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(form,cljs.core.cst$sym$js_SLASH__DASH_Infinity)){
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(G__13836);
} else {
return G__13836;
}
})()], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$var_DASH_special,(function (p__13837){
var map__13838 = p__13837;
var map__13838__$1 = ((((!((map__13838 == null)))?((((map__13838.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13838.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13838):map__13838);
var arg = map__13838__$1;
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13838__$1,cljs.core.cst$kw$env);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13838__$1,cljs.core.cst$kw$var);
var sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13838__$1,cljs.core.cst$kw$sym);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13838__$1,cljs.core.cst$kw$meta);
if(cljs.analyzer.ast_QMARK_(sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_(meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__13840 = cljs.core.cst$kw$info.cljs$core$IFn$_invoke$arity$1(var$);
var map__13840__$1 = ((((!((map__13840 == null)))?((((map__13840.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13840.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13840):map__13840);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13840__$1,cljs.core.cst$kw$name);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.Var(function(){return ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),";},",sym,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$meta,(function (p__13842){
var map__13843 = p__13842;
var map__13843__$1 = ((((!((map__13843 == null)))?((((map__13843.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13843.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13843):map__13843);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13843__$1,cljs.core.cst$kw$expr);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13843__$1,cljs.core.cst$kw$meta);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13843__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.with_meta(",expr,",",meta,")"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_((function (p1__13845_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__13845_SHARP_),cljs.core.cst$kw$constant);
}),keys)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count(keys)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$map,(function (p__13846){
var map__13847 = p__13846;
var map__13847__$1 = ((((!((map__13847 == null)))?((((map__13847.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13847.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13847):map__13847);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13847__$1,cljs.core.cst$kw$env);
var keys = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13847__$1,cljs.core.cst$kw$keys);
var vals = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13847__$1,cljs.core.cst$kw$vals);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__13849){
var map__13850 = p__13849;
var map__13850__$1 = ((((!((map__13850 == null)))?((((map__13850.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13850.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13850):map__13850);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13850__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13850__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.List.EMPTY"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.list(",cljs.compiler.comma_sep(items),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$vector,(function (p__13852){
var map__13853 = p__13852;
var map__13853__$1 = ((((!((map__13853 == null)))?((((map__13853.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13853.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13853):map__13853);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13853__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13853__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.empty_QMARK_(items)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.EMPTY"], 0));
} else {
var cnt_13855 = cljs.core.count(items);
if((cnt_13855 < (32))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["new cljs.core.PersistentVector(null, ",cnt_13855,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep(items),"], null)"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep(items),"], true)"], 0));
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_((function (p1__13856_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__13856_SHARP_),cljs.core.cst$kw$constant);
}),items)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count(items)));
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set,(function (p__13857){
var map__13858 = p__13857;
var map__13858__$1 = ((((!((map__13858 == null)))?((((map__13858.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13858.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13858):map__13858);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13858__$1,cljs.core.cst$kw$items);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13858__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js_DASH_value,(function (p__13860){
var map__13861 = p__13860;
var map__13861__$1 = ((((!((map__13861 == null)))?((((map__13861.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13861.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13861):map__13861);
var items = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13861__$1,cljs.core.cst$kw$items);
var js_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13861__$1,cljs.core.cst$kw$js_DASH_type);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13861__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(js_type,cljs.core.cst$kw$object)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["{"], 0));

var temp__4657__auto___13871 = cljs.core.seq(items);
if(temp__4657__auto___13871){
var items_13872__$1 = temp__4657__auto___13871;
var vec__13863_13873 = items_13872__$1;
var vec__13864_13874 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13863_13873,(0),null);
var k_13875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13864_13874,(0),null);
var v_13876 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13864_13874,(1),null);
var r_13877 = cljs.core.nthnext(vec__13863_13873,(1));
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\"",cljs.core.name(k_13875),"\": ",v_13876], 0));

var seq__13865_13878 = cljs.core.seq(r_13877);
var chunk__13866_13879 = null;
var count__13867_13880 = (0);
var i__13868_13881 = (0);
while(true){
if((i__13868_13881 < count__13867_13880)){
var vec__13869_13882 = chunk__13866_13879.cljs$core$IIndexed$_nth$arity$2(null,i__13868_13881);
var k_13883__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13869_13882,(0),null);
var v_13884__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13869_13882,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_13883__$1),"\": ",v_13884__$1], 0));

var G__13885 = seq__13865_13878;
var G__13886 = chunk__13866_13879;
var G__13887 = count__13867_13880;
var G__13888 = (i__13868_13881 + (1));
seq__13865_13878 = G__13885;
chunk__13866_13879 = G__13886;
count__13867_13880 = G__13887;
i__13868_13881 = G__13888;
continue;
} else {
var temp__4657__auto___13889__$1 = cljs.core.seq(seq__13865_13878);
if(temp__4657__auto___13889__$1){
var seq__13865_13890__$1 = temp__4657__auto___13889__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13865_13890__$1)){
var c__6673__auto___13891 = cljs.core.chunk_first(seq__13865_13890__$1);
var G__13892 = cljs.core.chunk_rest(seq__13865_13890__$1);
var G__13893 = c__6673__auto___13891;
var G__13894 = cljs.core.count(c__6673__auto___13891);
var G__13895 = (0);
seq__13865_13878 = G__13892;
chunk__13866_13879 = G__13893;
count__13867_13880 = G__13894;
i__13868_13881 = G__13895;
continue;
} else {
var vec__13870_13896 = cljs.core.first(seq__13865_13890__$1);
var k_13897__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13870_13896,(0),null);
var v_13898__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13870_13896,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([", \"",cljs.core.name(k_13897__$1),"\": ",v_13898__$1], 0));

var G__13899 = cljs.core.next(seq__13865_13890__$1);
var G__13900 = null;
var G__13901 = (0);
var G__13902 = (0);
seq__13865_13878 = G__13899;
chunk__13866_13879 = G__13900;
count__13867_13880 = G__13901;
i__13868_13881 = G__13902;
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$constant,(function (p__13903){
var map__13904 = p__13903;
var map__13904__$1 = ((((!((map__13904 == null)))?((((map__13904.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13904.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13904):map__13904);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13904__$1,cljs.core.cst$kw$form);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13904__$1,cljs.core.cst$kw$env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

(cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1 ? cljs.compiler.emit_constant.cljs$core$IFn$_invoke$arity$1(form) : cljs.compiler.emit_constant.call(null,form));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__13906){
var map__13909 = p__13906;
var map__13909__$1 = ((((!((map__13909 == null)))?((((map__13909.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13909.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13909):map__13909);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13909__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13909__$1,cljs.core.cst$kw$form);
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
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__13911){
var map__13914 = p__13911;
var map__13914__$1 = ((((!((map__13914 == null)))?((((map__13914.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13914.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13914):map__13914);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13914__$1,cljs.core.cst$kw$op);
var form = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13914__$1,cljs.core.cst$kw$form);
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$if,(function (p__13916){
var map__13917 = p__13916;
var map__13917__$1 = ((((!((map__13917 == null)))?((((map__13917.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13917.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13917):map__13917);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13917__$1,cljs.core.cst$kw$test);
var then = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13917__$1,cljs.core.cst$kw$then);
var else$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13917__$1,cljs.core.cst$kw$else);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13917__$1,cljs.core.cst$kw$env);
var unchecked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13917__$1,cljs.core.cst$kw$unchecked);
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$case_STAR_,(function (p__13919){
var map__13920 = p__13919;
var map__13920__$1 = ((((!((map__13920 == null)))?((((map__13920.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13920.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__13920):map__13920);
var v = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13920__$1,cljs.core.cst$kw$v);
var tests = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13920__$1,cljs.core.cst$kw$tests);
var thens = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13920__$1,cljs.core.cst$kw$thens);
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13920__$1,cljs.core.cst$kw$default);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__13920__$1,cljs.core.cst$kw$env);
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

var seq__13922_13936 = cljs.core.seq(cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(tests,thens)));
var chunk__13923_13937 = null;
var count__13924_13938 = (0);
var i__13925_13939 = (0);
while(true){
if((i__13925_13939 < count__13924_13938)){
var vec__13926_13940 = chunk__13923_13937.cljs$core$IIndexed$_nth$arity$2(null,i__13925_13939);
var ts_13941 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13926_13940,(0),null);
var then_13942 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13926_13940,(1),null);
var seq__13927_13943 = cljs.core.seq(ts_13941);
var chunk__13928_13944 = null;
var count__13929_13945 = (0);
var i__13930_13946 = (0);
while(true){
if((i__13930_13946 < count__13929_13945)){
var test_13947 = chunk__13928_13944.cljs$core$IIndexed$_nth$arity$2(null,i__13930_13946);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_13947,":"], 0));

var G__13948 = seq__13927_13943;
var G__13949 = chunk__13928_13944;
var G__13950 = count__13929_13945;
var G__13951 = (i__13930_13946 + (1));
seq__13927_13943 = G__13948;
chunk__13928_13944 = G__13949;
count__13929_13945 = G__13950;
i__13930_13946 = G__13951;
continue;
} else {
var temp__4657__auto___13952 = cljs.core.seq(seq__13927_13943);
if(temp__4657__auto___13952){
var seq__13927_13953__$1 = temp__4657__auto___13952;
if(cljs.core.chunked_seq_QMARK_(seq__13927_13953__$1)){
var c__6673__auto___13954 = cljs.core.chunk_first(seq__13927_13953__$1);
var G__13955 = cljs.core.chunk_rest(seq__13927_13953__$1);
var G__13956 = c__6673__auto___13954;
var G__13957 = cljs.core.count(c__6673__auto___13954);
var G__13958 = (0);
seq__13927_13943 = G__13955;
chunk__13928_13944 = G__13956;
count__13929_13945 = G__13957;
i__13930_13946 = G__13958;
continue;
} else {
var test_13959 = cljs.core.first(seq__13927_13953__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_13959,":"], 0));

var G__13960 = cljs.core.next(seq__13927_13953__$1);
var G__13961 = null;
var G__13962 = (0);
var G__13963 = (0);
seq__13927_13943 = G__13960;
chunk__13928_13944 = G__13961;
count__13929_13945 = G__13962;
i__13930_13946 = G__13963;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_13942], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_13942], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__13964 = seq__13922_13936;
var G__13965 = chunk__13923_13937;
var G__13966 = count__13924_13938;
var G__13967 = (i__13925_13939 + (1));
seq__13922_13936 = G__13964;
chunk__13923_13937 = G__13965;
count__13924_13938 = G__13966;
i__13925_13939 = G__13967;
continue;
} else {
var temp__4657__auto___13968 = cljs.core.seq(seq__13922_13936);
if(temp__4657__auto___13968){
var seq__13922_13969__$1 = temp__4657__auto___13968;
if(cljs.core.chunked_seq_QMARK_(seq__13922_13969__$1)){
var c__6673__auto___13970 = cljs.core.chunk_first(seq__13922_13969__$1);
var G__13971 = cljs.core.chunk_rest(seq__13922_13969__$1);
var G__13972 = c__6673__auto___13970;
var G__13973 = cljs.core.count(c__6673__auto___13970);
var G__13974 = (0);
seq__13922_13936 = G__13971;
chunk__13923_13937 = G__13972;
count__13924_13938 = G__13973;
i__13925_13939 = G__13974;
continue;
} else {
var vec__13931_13975 = cljs.core.first(seq__13922_13969__$1);
var ts_13976 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13931_13975,(0),null);
var then_13977 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__13931_13975,(1),null);
var seq__13932_13978 = cljs.core.seq(ts_13976);
var chunk__13933_13979 = null;
var count__13934_13980 = (0);
var i__13935_13981 = (0);
while(true){
if((i__13935_13981 < count__13934_13980)){
var test_13982 = chunk__13933_13979.cljs$core$IIndexed$_nth$arity$2(null,i__13935_13981);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_13982,":"], 0));

var G__13983 = seq__13932_13978;
var G__13984 = chunk__13933_13979;
var G__13985 = count__13934_13980;
var G__13986 = (i__13935_13981 + (1));
seq__13932_13978 = G__13983;
chunk__13933_13979 = G__13984;
count__13934_13980 = G__13985;
i__13935_13981 = G__13986;
continue;
} else {
var temp__4657__auto___13987__$1 = cljs.core.seq(seq__13932_13978);
if(temp__4657__auto___13987__$1){
var seq__13932_13988__$1 = temp__4657__auto___13987__$1;
if(cljs.core.chunked_seq_QMARK_(seq__13932_13988__$1)){
var c__6673__auto___13989 = cljs.core.chunk_first(seq__13932_13988__$1);
var G__13990 = cljs.core.chunk_rest(seq__13932_13988__$1);
var G__13991 = c__6673__auto___13989;
var G__13992 = cljs.core.count(c__6673__auto___13989);
var G__13993 = (0);
seq__13932_13978 = G__13990;
chunk__13933_13979 = G__13991;
count__13934_13980 = G__13992;
i__13935_13981 = G__13993;
continue;
} else {
var test_13994 = cljs.core.first(seq__13932_13988__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",test_13994,":"], 0));

var G__13995 = cljs.core.next(seq__13932_13988__$1);
var G__13996 = null;
var G__13997 = (0);
var G__13998 = (0);
seq__13932_13978 = G__13995;
chunk__13933_13979 = G__13996;
count__13934_13980 = G__13997;
i__13935_13981 = G__13998;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([gs,"=",then_13977], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([then_13977], 0));
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["break;"], 0));

var G__13999 = cljs.core.next(seq__13922_13969__$1);
var G__14000 = null;
var G__14001 = (0);
var G__14002 = (0);
seq__13922_13936 = G__13999;
chunk__13923_13937 = G__14000;
count__13924_13938 = G__14001;
i__13925_13939 = G__14002;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$throw,(function (p__14003){
var map__14004 = p__14003;
var map__14004__$1 = ((((!((map__14004 == null)))?((((map__14004.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14004.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14004):map__14004);
var throw$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14004__$1,cljs.core.cst$kw$throw);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14004__$1,cljs.core.cst$kw$env);
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
var vec__14013 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(0),idx),cljs.core.subs.cljs$core$IFn$_invoke$arity$3(t,(idx + (1)),cljs.core.count(t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14013,(0),null);
var rstr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14013,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs$compiler$resolve_type(env,rstr):null);
var axstr = cljs.core.subs.cljs$core$IFn$_invoke$arity$3(fstr,(9),(cljs.core.count(fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_(axstr))?null:cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (idx,vec__14013,fstr,rstr,ret_t,axstr){
return (function (p1__14006_SHARP_){
return cljs$compiler$resolve_type(env,p1__14006_SHARP_);
});})(idx,vec__14013,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.cljs$core$IFn$_invoke$arity$2(axstr,/,/)));
var G__14014 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.cljs$core$IFn$_invoke$arity$2(",",args_ts)),cljs.core.str(")")].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str(G__14014),cljs.core.str(":"),cljs.core.str(ret_t)].join('');
} else {
return G__14014;
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
return (function (p1__14015_SHARP_){
return cljs.compiler.resolve_type(env,p1__14015_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find(/@param/,line))){
var vec__14018 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14018,(0),null);
var ts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14018,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14018,(2),null);
var xs = cljs.core.nthnext(vec__14018,(3));
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
var vec__14019 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(clojure.string.trim,clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(line),/ /));
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14019,(0),null);
var ts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14019,(1),null);
var xs = cljs.core.nthnext(vec__14019,(2));
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
var args14021 = [];
var len__6931__auto___14048 = arguments.length;
var i__6932__auto___14049 = (0);
while(true){
if((i__6932__auto___14049 < len__6931__auto___14048)){
args14021.push((arguments[i__6932__auto___14049]));

var G__14050 = (i__6932__auto___14049 + (1));
i__6932__auto___14049 = G__14050;
continue;
} else {
}
break;
}

var G__14023 = args14021.length;
switch (G__14023) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14021.length)].join('')));

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
var vec__14039 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (docs,docs__$1,docs__$2){
return (function (p1__14020_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())){
return cljs.compiler.munge_param_return(env,p1__14020_SHARP_);
} else {
return p1__14020_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines(e));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14039,(0),null);
var ys = cljs.core.nthnext(vec__14039,(1));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(x,"*/","* /")], 0));

var seq__14040 = cljs.core.seq(ys);
var chunk__14041 = null;
var count__14042 = (0);
var i__14043 = (0);
while(true){
if((i__14043 < count__14042)){
var next_line = chunk__14041.cljs$core$IIndexed$_nth$arity$2(null,i__14043);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__14052 = seq__14040;
var G__14053 = chunk__14041;
var G__14054 = count__14042;
var G__14055 = (i__14043 + (1));
seq__14040 = G__14052;
chunk__14041 = G__14053;
count__14042 = G__14054;
i__14043 = G__14055;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14040);
if(temp__4657__auto__){
var seq__14040__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14040__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14040__$1);
var G__14056 = cljs.core.chunk_rest(seq__14040__$1);
var G__14057 = c__6673__auto__;
var G__14058 = cljs.core.count(c__6673__auto__);
var G__14059 = (0);
seq__14040 = G__14056;
chunk__14041 = G__14057;
count__14042 = G__14058;
i__14043 = G__14059;
continue;
} else {
var next_line = cljs.core.first(seq__14040__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * ",clojure.string.replace(clojure.string.replace(next_line,/^   /,""),"*/","* /")], 0));

var G__14060 = cljs.core.next(seq__14040__$1);
var G__14061 = null;
var G__14062 = (0);
var G__14063 = (0);
seq__14040 = G__14060;
chunk__14041 = G__14061;
count__14042 = G__14062;
i__14043 = G__14063;
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

var seq__14044_14064 = cljs.core.seq(docs__$2);
var chunk__14045_14065 = null;
var count__14046_14066 = (0);
var i__14047_14067 = (0);
while(true){
if((i__14047_14067 < count__14046_14066)){
var e_14068 = chunk__14045_14065.cljs$core$IIndexed$_nth$arity$2(null,i__14047_14067);
if(cljs.core.truth_(e_14068)){
print_comment_lines(e_14068);
} else {
}

var G__14069 = seq__14044_14064;
var G__14070 = chunk__14045_14065;
var G__14071 = count__14046_14066;
var G__14072 = (i__14047_14067 + (1));
seq__14044_14064 = G__14069;
chunk__14045_14065 = G__14070;
count__14046_14066 = G__14071;
i__14047_14067 = G__14072;
continue;
} else {
var temp__4657__auto___14073 = cljs.core.seq(seq__14044_14064);
if(temp__4657__auto___14073){
var seq__14044_14074__$1 = temp__4657__auto___14073;
if(cljs.core.chunked_seq_QMARK_(seq__14044_14074__$1)){
var c__6673__auto___14075 = cljs.core.chunk_first(seq__14044_14074__$1);
var G__14076 = cljs.core.chunk_rest(seq__14044_14074__$1);
var G__14077 = c__6673__auto___14075;
var G__14078 = cljs.core.count(c__6673__auto___14075);
var G__14079 = (0);
seq__14044_14064 = G__14076;
chunk__14045_14065 = G__14077;
count__14046_14066 = G__14078;
i__14047_14067 = G__14079;
continue;
} else {
var e_14080 = cljs.core.first(seq__14044_14074__$1);
if(cljs.core.truth_(e_14080)){
print_comment_lines(e_14080);
} else {
}

var G__14081 = cljs.core.next(seq__14044_14074__$1);
var G__14082 = null;
var G__14083 = (0);
var G__14084 = (0);
seq__14044_14064 = G__14081;
chunk__14045_14065 = G__14082;
count__14046_14066 = G__14083;
i__14047_14067 = G__14084;
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
return (function (p1__14086_SHARP_){
return goog.string.startsWith(p1__14086_SHARP_,"@define");
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$def,(function (p__14087){
var map__14088 = p__14087;
var map__14088__$1 = ((((!((map__14088 == null)))?((((map__14088.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14088.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14088):map__14088);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$name);
var var$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$var);
var init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$init);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$env);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$doc);
var jsdoc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$jsdoc);
var export$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$export);
var test = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$test);
var var_ast = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14088__$1,cljs.core.cst$kw$var_DASH_ast);
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
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__14090){
var map__14107 = p__14090;
var map__14107__$1 = ((((!((map__14107 == null)))?((((map__14107.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14107.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14107):map__14107);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14107__$1,cljs.core.cst$kw$name);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14107__$1,cljs.core.cst$kw$params);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14107__$1,cljs.core.cst$kw$env);
var arglist = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (",arglist,"){"], 0));

var seq__14109_14123 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((2),params)));
var chunk__14110_14124 = null;
var count__14111_14125 = (0);
var i__14112_14126 = (0);
while(true){
if((i__14112_14126 < count__14111_14125)){
var vec__14113_14127 = chunk__14110_14124.cljs$core$IIndexed$_nth$arity$2(null,i__14112_14126);
var i_14128 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113_14127,(0),null);
var param_14129 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14113_14127,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_14129);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__14130 = seq__14109_14123;
var G__14131 = chunk__14110_14124;
var G__14132 = count__14111_14125;
var G__14133 = (i__14112_14126 + (1));
seq__14109_14123 = G__14130;
chunk__14110_14124 = G__14131;
count__14111_14125 = G__14132;
i__14112_14126 = G__14133;
continue;
} else {
var temp__4657__auto___14134 = cljs.core.seq(seq__14109_14123);
if(temp__4657__auto___14134){
var seq__14109_14135__$1 = temp__4657__auto___14134;
if(cljs.core.chunked_seq_QMARK_(seq__14109_14135__$1)){
var c__6673__auto___14136 = cljs.core.chunk_first(seq__14109_14135__$1);
var G__14137 = cljs.core.chunk_rest(seq__14109_14135__$1);
var G__14138 = c__6673__auto___14136;
var G__14139 = cljs.core.count(c__6673__auto___14136);
var G__14140 = (0);
seq__14109_14123 = G__14137;
chunk__14110_14124 = G__14138;
count__14111_14125 = G__14139;
i__14112_14126 = G__14140;
continue;
} else {
var vec__14114_14141 = cljs.core.first(seq__14109_14135__$1);
var i_14142 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14114_14141,(0),null);
var param_14143 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14114_14141,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(param_14143);

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = cljs.core.first("], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist,");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglist," = cljs.core.next(",arglist,");"], 0));

var G__14144 = cljs.core.next(seq__14109_14135__$1);
var G__14145 = null;
var G__14146 = (0);
var G__14147 = (0);
seq__14109_14123 = G__14144;
chunk__14110_14124 = G__14145;
count__14111_14125 = G__14146;
i__14112_14126 = G__14147;
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

var seq__14115_14148 = cljs.core.seq(params);
var chunk__14116_14149 = null;
var count__14117_14150 = (0);
var i__14118_14151 = (0);
while(true){
if((i__14118_14151 < count__14117_14150)){
var param_14152 = chunk__14116_14149.cljs$core$IIndexed$_nth$arity$2(null,i__14118_14151);
cljs.compiler.emit(param_14152);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14152,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14153 = seq__14115_14148;
var G__14154 = chunk__14116_14149;
var G__14155 = count__14117_14150;
var G__14156 = (i__14118_14151 + (1));
seq__14115_14148 = G__14153;
chunk__14116_14149 = G__14154;
count__14117_14150 = G__14155;
i__14118_14151 = G__14156;
continue;
} else {
var temp__4657__auto___14157 = cljs.core.seq(seq__14115_14148);
if(temp__4657__auto___14157){
var seq__14115_14158__$1 = temp__4657__auto___14157;
if(cljs.core.chunked_seq_QMARK_(seq__14115_14158__$1)){
var c__6673__auto___14159 = cljs.core.chunk_first(seq__14115_14158__$1);
var G__14160 = cljs.core.chunk_rest(seq__14115_14158__$1);
var G__14161 = c__6673__auto___14159;
var G__14162 = cljs.core.count(c__6673__auto___14159);
var G__14163 = (0);
seq__14115_14148 = G__14160;
chunk__14116_14149 = G__14161;
count__14117_14150 = G__14162;
i__14118_14151 = G__14163;
continue;
} else {
var param_14164 = cljs.core.first(seq__14115_14158__$1);
cljs.compiler.emit(param_14164);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14164,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14165 = cljs.core.next(seq__14115_14158__$1);
var G__14166 = null;
var G__14167 = (0);
var G__14168 = (0);
seq__14115_14148 = G__14165;
chunk__14116_14149 = G__14166;
count__14117_14150 = G__14167;
i__14118_14151 = G__14168;
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

var seq__14119_14169 = cljs.core.seq(params);
var chunk__14120_14170 = null;
var count__14121_14171 = (0);
var i__14122_14172 = (0);
while(true){
if((i__14122_14172 < count__14121_14171)){
var param_14173 = chunk__14120_14170.cljs$core$IIndexed$_nth$arity$2(null,i__14122_14172);
cljs.compiler.emit(param_14173);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14173,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14174 = seq__14119_14169;
var G__14175 = chunk__14120_14170;
var G__14176 = count__14121_14171;
var G__14177 = (i__14122_14172 + (1));
seq__14119_14169 = G__14174;
chunk__14120_14170 = G__14175;
count__14121_14171 = G__14176;
i__14122_14172 = G__14177;
continue;
} else {
var temp__4657__auto___14178 = cljs.core.seq(seq__14119_14169);
if(temp__4657__auto___14178){
var seq__14119_14179__$1 = temp__4657__auto___14178;
if(cljs.core.chunked_seq_QMARK_(seq__14119_14179__$1)){
var c__6673__auto___14180 = cljs.core.chunk_first(seq__14119_14179__$1);
var G__14181 = cljs.core.chunk_rest(seq__14119_14179__$1);
var G__14182 = c__6673__auto___14180;
var G__14183 = cljs.core.count(c__6673__auto___14180);
var G__14184 = (0);
seq__14119_14169 = G__14181;
chunk__14120_14170 = G__14182;
count__14121_14171 = G__14183;
i__14122_14172 = G__14184;
continue;
} else {
var param_14185 = cljs.core.first(seq__14119_14179__$1);
cljs.compiler.emit(param_14185);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14185,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14186 = cljs.core.next(seq__14119_14179__$1);
var G__14187 = null;
var G__14188 = (0);
var G__14189 = (0);
seq__14119_14169 = G__14186;
chunk__14120_14170 = G__14187;
count__14121_14171 = G__14188;
i__14122_14172 = G__14189;
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
var seq__14194 = cljs.core.seq(params);
var chunk__14195 = null;
var count__14196 = (0);
var i__14197 = (0);
while(true){
if((i__14197 < count__14196)){
var param = chunk__14195.cljs$core$IIndexed$_nth$arity$2(null,i__14197);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14198 = seq__14194;
var G__14199 = chunk__14195;
var G__14200 = count__14196;
var G__14201 = (i__14197 + (1));
seq__14194 = G__14198;
chunk__14195 = G__14199;
count__14196 = G__14200;
i__14197 = G__14201;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14194);
if(temp__4657__auto__){
var seq__14194__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14194__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14194__$1);
var G__14202 = cljs.core.chunk_rest(seq__14194__$1);
var G__14203 = c__6673__auto__;
var G__14204 = cljs.core.count(c__6673__auto__);
var G__14205 = (0);
seq__14194 = G__14202;
chunk__14195 = G__14203;
count__14196 = G__14204;
i__14197 = G__14205;
continue;
} else {
var param = cljs.core.first(seq__14194__$1);
cljs.compiler.emit(param);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14206 = cljs.core.next(seq__14194__$1);
var G__14207 = null;
var G__14208 = (0);
var G__14209 = (0);
seq__14194 = G__14206;
chunk__14195 = G__14207;
count__14196 = G__14208;
i__14197 = G__14209;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__14210){
var map__14213 = p__14210;
var map__14213__$1 = ((((!((map__14213 == null)))?((((map__14213.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14213.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14213):map__14213);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$name);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$variadic);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$params);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$recurs);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14213__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__14215){
var map__14226 = p__14215;
var map__14226__$1 = ((((!((map__14226 == null)))?((((map__14226.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14226.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14226):map__14226);
var f = map__14226__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$type);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$name);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$variadic);
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$params);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$env);
var recurs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$recurs);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14226__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

var name_14236__$1 = (function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_14237 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_14236__$1);
var delegate_name_14238 = [cljs.core.str(mname_14237),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() { "], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",delegate_name_14238," = function ("], 0));

var seq__14228_14239 = cljs.core.seq(params);
var chunk__14229_14240 = null;
var count__14230_14241 = (0);
var i__14231_14242 = (0);
while(true){
if((i__14231_14242 < count__14230_14241)){
var param_14243 = chunk__14229_14240.cljs$core$IIndexed$_nth$arity$2(null,i__14231_14242);
cljs.compiler.emit(param_14243);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14243,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14244 = seq__14228_14239;
var G__14245 = chunk__14229_14240;
var G__14246 = count__14230_14241;
var G__14247 = (i__14231_14242 + (1));
seq__14228_14239 = G__14244;
chunk__14229_14240 = G__14245;
count__14230_14241 = G__14246;
i__14231_14242 = G__14247;
continue;
} else {
var temp__4657__auto___14248 = cljs.core.seq(seq__14228_14239);
if(temp__4657__auto___14248){
var seq__14228_14249__$1 = temp__4657__auto___14248;
if(cljs.core.chunked_seq_QMARK_(seq__14228_14249__$1)){
var c__6673__auto___14250 = cljs.core.chunk_first(seq__14228_14249__$1);
var G__14251 = cljs.core.chunk_rest(seq__14228_14249__$1);
var G__14252 = c__6673__auto___14250;
var G__14253 = cljs.core.count(c__6673__auto___14250);
var G__14254 = (0);
seq__14228_14239 = G__14251;
chunk__14229_14240 = G__14252;
count__14230_14241 = G__14253;
i__14231_14242 = G__14254;
continue;
} else {
var param_14255 = cljs.core.first(seq__14228_14249__$1);
cljs.compiler.emit(param_14255);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14255,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14256 = cljs.core.next(seq__14228_14249__$1);
var G__14257 = null;
var G__14258 = (0);
var G__14259 = (0);
seq__14228_14239 = G__14256;
chunk__14229_14240 = G__14257;
count__14230_14241 = G__14258;
i__14231_14242 = G__14259;
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

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_14237," = function (",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):params)),"){"], 0));

if(cljs.core.truth_(type)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var self__ = this;"], 0));
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(params));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",(cljs.core.count(params) - (1)),") {"], 0));

var a_14260 = cljs.compiler.emit_arguments_to_array((cljs.core.count(params) - (1)));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",cljs.core.last(params)," = new cljs.core.IndexedSeq(",a_14260,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["} "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",delegate_name_14238,".call(this,"], 0));

var seq__14232_14261 = cljs.core.seq(params);
var chunk__14233_14262 = null;
var count__14234_14263 = (0);
var i__14235_14264 = (0);
while(true){
if((i__14235_14264 < count__14234_14263)){
var param_14265 = chunk__14233_14262.cljs$core$IIndexed$_nth$arity$2(null,i__14235_14264);
cljs.compiler.emit(param_14265);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14265,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14266 = seq__14232_14261;
var G__14267 = chunk__14233_14262;
var G__14268 = count__14234_14263;
var G__14269 = (i__14235_14264 + (1));
seq__14232_14261 = G__14266;
chunk__14233_14262 = G__14267;
count__14234_14263 = G__14268;
i__14235_14264 = G__14269;
continue;
} else {
var temp__4657__auto___14270 = cljs.core.seq(seq__14232_14261);
if(temp__4657__auto___14270){
var seq__14232_14271__$1 = temp__4657__auto___14270;
if(cljs.core.chunked_seq_QMARK_(seq__14232_14271__$1)){
var c__6673__auto___14272 = cljs.core.chunk_first(seq__14232_14271__$1);
var G__14273 = cljs.core.chunk_rest(seq__14232_14271__$1);
var G__14274 = c__6673__auto___14272;
var G__14275 = cljs.core.count(c__6673__auto___14272);
var G__14276 = (0);
seq__14232_14261 = G__14273;
chunk__14233_14262 = G__14274;
count__14234_14263 = G__14275;
i__14235_14264 = G__14276;
continue;
} else {
var param_14277 = cljs.core.first(seq__14232_14271__$1);
cljs.compiler.emit(param_14277);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(param_14277,cljs.core.last(params))){
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([","], 0));
}

var G__14278 = cljs.core.next(seq__14232_14271__$1);
var G__14279 = null;
var G__14280 = (0);
var G__14281 = (0);
seq__14232_14261 = G__14278;
chunk__14233_14262 = G__14279;
count__14234_14263 = G__14280;
i__14235_14264 = G__14281;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([");"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["};"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14237,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14237,".cljs$lang$applyTo = "], 0));

cljs.compiler.emit_apply_to(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f,cljs.core.cst$kw$name,name_14236__$1));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14237,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_14238,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_14237,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
});
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$fn,(function (p__14285){
var map__14286 = p__14285;
var map__14286__$1 = ((((!((map__14286 == null)))?((((map__14286.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14286.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14286):map__14286);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$name);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$env);
var methods$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$methods);
var max_fixed_arity = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$max_DASH_fixed_DASH_arity);
var variadic = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$variadic);
var recur_frames = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$recur_DASH_frames);
var loop_lets = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14286__$1,cljs.core.cst$kw$loop_DASH_lets);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$params,cljs.core.array_seq([cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14282_SHARP_){
var and__5850__auto__ = p1__14282_SHARP_;
if(cljs.core.truth_(and__5850__auto__)){
var G__14288 = cljs.core.cst$kw$flag.cljs$core$IFn$_invoke$arity$1(p1__14282_SHARP_);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__14288) : cljs.core.deref.call(null,G__14288));
} else {
return and__5850__auto__;
}
});})(map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
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
var name_14308__$1 = (function (){var or__5862__auto__ = name;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
})();
var mname_14309 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name_14308__$1);
var maxparams_14310 = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$params,methods$));
var mmap_14311 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (name_14308__$1,mname_14309,maxparams_14310,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(mname_14309),cljs.core.str("__"),cljs.core.str(cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_14308__$1,mname_14309,maxparams_14310,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_14312 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (name_14308__$1,mname_14309,maxparams_14310,mmap_14311,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14283_SHARP_){
return cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__14283_SHARP_)));
});})(name_14308__$1,mname_14309,maxparams_14310,mmap_14311,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq(mmap_14311));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function() {"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",mname_14309," = null;"], 0));

var seq__14289_14313 = cljs.core.seq(ms_14312);
var chunk__14290_14314 = null;
var count__14291_14315 = (0);
var i__14292_14316 = (0);
while(true){
if((i__14292_14316 < count__14291_14315)){
var vec__14293_14317 = chunk__14290_14314.cljs$core$IIndexed$_nth$arity$2(null,i__14292_14316);
var n_14318 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14293_14317,(0),null);
var meth_14319 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14293_14317,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_14318," = "], 0));

if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14319))){
cljs.compiler.emit_variadic_fn_method(meth_14319);
} else {
cljs.compiler.emit_fn_method(meth_14319);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__14320 = seq__14289_14313;
var G__14321 = chunk__14290_14314;
var G__14322 = count__14291_14315;
var G__14323 = (i__14292_14316 + (1));
seq__14289_14313 = G__14320;
chunk__14290_14314 = G__14321;
count__14291_14315 = G__14322;
i__14292_14316 = G__14323;
continue;
} else {
var temp__4657__auto___14324 = cljs.core.seq(seq__14289_14313);
if(temp__4657__auto___14324){
var seq__14289_14325__$1 = temp__4657__auto___14324;
if(cljs.core.chunked_seq_QMARK_(seq__14289_14325__$1)){
var c__6673__auto___14326 = cljs.core.chunk_first(seq__14289_14325__$1);
var G__14327 = cljs.core.chunk_rest(seq__14289_14325__$1);
var G__14328 = c__6673__auto___14326;
var G__14329 = cljs.core.count(c__6673__auto___14326);
var G__14330 = (0);
seq__14289_14313 = G__14327;
chunk__14290_14314 = G__14328;
count__14291_14315 = G__14329;
i__14292_14316 = G__14330;
continue;
} else {
var vec__14294_14331 = cljs.core.first(seq__14289_14325__$1);
var n_14332 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14294_14331,(0),null);
var meth_14333 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14294_14331,(1),null);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",n_14332," = "], 0));

if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14333))){
cljs.compiler.emit_variadic_fn_method(meth_14333);
} else {
cljs.compiler.emit_fn_method(meth_14333);
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));

var G__14334 = cljs.core.next(seq__14289_14325__$1);
var G__14335 = null;
var G__14336 = (0);
var G__14337 = (0);
seq__14289_14313 = G__14334;
chunk__14290_14314 = G__14335;
count__14291_14315 = G__14336;
i__14292_14316 = G__14337;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309," = function(",cljs.compiler.comma_sep((cljs.core.truth_(variadic)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.butlast(maxparams_14310),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$var_args], null)):maxparams_14310)),"){"], 0));

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(cljs.core.last(maxparams_14310));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = var_args;"], 0));
} else {
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["switch(arguments.length){"], 0));

var seq__14295_14338 = cljs.core.seq(ms_14312);
var chunk__14296_14339 = null;
var count__14297_14340 = (0);
var i__14298_14341 = (0);
while(true){
if((i__14298_14341 < count__14297_14340)){
var vec__14299_14342 = chunk__14296_14339.cljs$core$IIndexed$_nth$arity$2(null,i__14298_14341);
var n_14343 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14299_14342,(0),null);
var meth_14344 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14299_14342,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14344))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_14345 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_14345," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_14346 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_14345," = new cljs.core.IndexedSeq(",a_14346,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14343,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_14310)),(((cljs.core.count(maxparams_14310) > (1)))?", ":null),restarg_14345,");"], 0));
} else {
var pcnt_14347 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14344));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_14347,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14343,".call(this",(((pcnt_14347 === (0)))?null:cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_14347,maxparams_14310))),",")),");"], 0));
}

var G__14348 = seq__14295_14338;
var G__14349 = chunk__14296_14339;
var G__14350 = count__14297_14340;
var G__14351 = (i__14298_14341 + (1));
seq__14295_14338 = G__14348;
chunk__14296_14339 = G__14349;
count__14297_14340 = G__14350;
i__14298_14341 = G__14351;
continue;
} else {
var temp__4657__auto___14352 = cljs.core.seq(seq__14295_14338);
if(temp__4657__auto___14352){
var seq__14295_14353__$1 = temp__4657__auto___14352;
if(cljs.core.chunked_seq_QMARK_(seq__14295_14353__$1)){
var c__6673__auto___14354 = cljs.core.chunk_first(seq__14295_14353__$1);
var G__14355 = cljs.core.chunk_rest(seq__14295_14353__$1);
var G__14356 = c__6673__auto___14354;
var G__14357 = cljs.core.count(c__6673__auto___14354);
var G__14358 = (0);
seq__14295_14338 = G__14355;
chunk__14296_14339 = G__14356;
count__14297_14340 = G__14357;
i__14298_14341 = G__14358;
continue;
} else {
var vec__14300_14359 = cljs.core.first(seq__14295_14353__$1);
var n_14360 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14300_14359,(0),null);
var meth_14361 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14300_14359,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14361))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["default:"], 0));

var restarg_14362 = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",restarg_14362," = null;"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["if (arguments.length > ",max_fixed_arity,") {"], 0));

var a_14363 = cljs.compiler.emit_arguments_to_array(max_fixed_arity);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([restarg_14362," = new cljs.core.IndexedSeq(",a_14363,",0);"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["}"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14360,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep(cljs.core.butlast(maxparams_14310)),(((cljs.core.count(maxparams_14310) > (1)))?", ":null),restarg_14362,");"], 0));
} else {
var pcnt_14364 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14361));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["case ",pcnt_14364,":"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",n_14360,".call(this",(((pcnt_14364 === (0)))?null:cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(pcnt_14364,maxparams_14310))),",")),");"], 0));
}

var G__14365 = cljs.core.next(seq__14295_14353__$1);
var G__14366 = null;
var G__14367 = (0);
var G__14368 = (0);
seq__14295_14338 = G__14365;
chunk__14296_14339 = G__14366;
count__14297_14340 = G__14367;
i__14298_14341 = G__14368;
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
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$lang$maxFixedArity = ",max_fixed_arity,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$lang$applyTo = ",cljs.core.some(((function (name_14308__$1,mname_14309,maxparams_14310,mmap_14311,ms_14312,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__14284_SHARP_){
var vec__14301 = p1__14284_SHARP_;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14301,(0),null);
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14301,(1),null);
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_14308__$1,mname_14309,maxparams_14310,mmap_14311,ms_14312,loop_locals,map__14286,map__14286__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_14312),".cljs$lang$applyTo;"], 0));
} else {
}

var seq__14302_14369 = cljs.core.seq(ms_14312);
var chunk__14303_14370 = null;
var count__14304_14371 = (0);
var i__14305_14372 = (0);
while(true){
if((i__14305_14372 < count__14304_14371)){
var vec__14306_14373 = chunk__14303_14370.cljs$core$IIndexed$_nth$arity$2(null,i__14305_14372);
var n_14374 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14306_14373,(0),null);
var meth_14375 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14306_14373,(1),null);
var c_14376 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14375));
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14375))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$core$IFn$_invoke$arity$variadic = ",n_14374,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$core$IFn$_invoke$arity$",c_14376," = ",n_14374,";"], 0));
}

var G__14377 = seq__14302_14369;
var G__14378 = chunk__14303_14370;
var G__14379 = count__14304_14371;
var G__14380 = (i__14305_14372 + (1));
seq__14302_14369 = G__14377;
chunk__14303_14370 = G__14378;
count__14304_14371 = G__14379;
i__14305_14372 = G__14380;
continue;
} else {
var temp__4657__auto___14381 = cljs.core.seq(seq__14302_14369);
if(temp__4657__auto___14381){
var seq__14302_14382__$1 = temp__4657__auto___14381;
if(cljs.core.chunked_seq_QMARK_(seq__14302_14382__$1)){
var c__6673__auto___14383 = cljs.core.chunk_first(seq__14302_14382__$1);
var G__14384 = cljs.core.chunk_rest(seq__14302_14382__$1);
var G__14385 = c__6673__auto___14383;
var G__14386 = cljs.core.count(c__6673__auto___14383);
var G__14387 = (0);
seq__14302_14369 = G__14384;
chunk__14303_14370 = G__14385;
count__14304_14371 = G__14386;
i__14305_14372 = G__14387;
continue;
} else {
var vec__14307_14388 = cljs.core.first(seq__14302_14382__$1);
var n_14389 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14307_14388,(0),null);
var meth_14390 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14307_14388,(1),null);
var c_14391 = cljs.core.count(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(meth_14390));
if(cljs.core.truth_(cljs.core.cst$kw$variadic.cljs$core$IFn$_invoke$arity$1(meth_14390))){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$core$IFn$_invoke$arity$variadic = ",n_14389,".cljs$core$IFn$_invoke$arity$variadic;"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([mname_14309,".cljs$core$IFn$_invoke$arity$",c_14391," = ",n_14389,";"], 0));
}

var G__14392 = cljs.core.next(seq__14302_14382__$1);
var G__14393 = null;
var G__14394 = (0);
var G__14395 = (0);
seq__14302_14369 = G__14392;
chunk__14303_14370 = G__14393;
count__14304_14371 = G__14394;
i__14305_14372 = G__14395;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return ",mname_14309,";"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["})()"], 0));
}

if(loop_locals){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";})(",cljs.compiler.comma_sep(loop_locals),"))"], 0));
} else {
return null;
}
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$do,(function (p__14396){
var map__14397 = p__14396;
var map__14397__$1 = ((((!((map__14397 == null)))?((((map__14397.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14397.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14397):map__14397);
var statements = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14397__$1,cljs.core.cst$kw$statements);
var ret = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14397__$1,cljs.core.cst$kw$ret);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14397__$1,cljs.core.cst$kw$env);
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

var seq__14399_14403 = cljs.core.seq(statements);
var chunk__14400_14404 = null;
var count__14401_14405 = (0);
var i__14402_14406 = (0);
while(true){
if((i__14402_14406 < count__14401_14405)){
var s_14407 = chunk__14400_14404.cljs$core$IIndexed$_nth$arity$2(null,i__14402_14406);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_14407], 0));

var G__14408 = seq__14399_14403;
var G__14409 = chunk__14400_14404;
var G__14410 = count__14401_14405;
var G__14411 = (i__14402_14406 + (1));
seq__14399_14403 = G__14408;
chunk__14400_14404 = G__14409;
count__14401_14405 = G__14410;
i__14402_14406 = G__14411;
continue;
} else {
var temp__4657__auto___14412 = cljs.core.seq(seq__14399_14403);
if(temp__4657__auto___14412){
var seq__14399_14413__$1 = temp__4657__auto___14412;
if(cljs.core.chunked_seq_QMARK_(seq__14399_14413__$1)){
var c__6673__auto___14414 = cljs.core.chunk_first(seq__14399_14413__$1);
var G__14415 = cljs.core.chunk_rest(seq__14399_14413__$1);
var G__14416 = c__6673__auto___14414;
var G__14417 = cljs.core.count(c__6673__auto___14414);
var G__14418 = (0);
seq__14399_14403 = G__14415;
chunk__14400_14404 = G__14416;
count__14401_14405 = G__14417;
i__14402_14406 = G__14418;
continue;
} else {
var s_14419 = cljs.core.first(seq__14399_14413__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([s_14419], 0));

var G__14420 = cljs.core.next(seq__14399_14413__$1);
var G__14421 = null;
var G__14422 = (0);
var G__14423 = (0);
seq__14399_14403 = G__14420;
chunk__14400_14404 = G__14421;
count__14401_14405 = G__14422;
i__14402_14406 = G__14423;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$try,(function (p__14424){
var map__14425 = p__14424;
var map__14425__$1 = ((((!((map__14425 == null)))?((((map__14425.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14425.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14425):map__14425);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14425__$1,cljs.core.cst$kw$env);
var try$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14425__$1,cljs.core.cst$kw$try);
var catch$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14425__$1,cljs.core.cst$kw$catch);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14425__$1,cljs.core.cst$kw$name);
var finally$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14425__$1,cljs.core.cst$kw$finally);
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
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__14427,is_loop){
var map__14439 = p__14427;
var map__14439__$1 = ((((!((map__14439 == null)))?((((map__14439.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14439.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14439):map__14439);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14439__$1,cljs.core.cst$kw$bindings);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14439__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14439__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var _STAR_lexical_renames_STAR_14441_14450 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$statement,context))?cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (_STAR_lexical_renames_STAR_14441_14450,context,map__14439,map__14439__$1,bindings,expr,env){
return (function (binding){
var name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope(binding),cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_14441_14450,context,map__14439,map__14439__$1,bindings,expr,env))
,bindings):null));

try{var seq__14442_14451 = cljs.core.seq(bindings);
var chunk__14443_14452 = null;
var count__14444_14453 = (0);
var i__14445_14454 = (0);
while(true){
if((i__14445_14454 < count__14444_14453)){
var map__14446_14455 = chunk__14443_14452.cljs$core$IIndexed$_nth$arity$2(null,i__14445_14454);
var map__14446_14456__$1 = ((((!((map__14446_14455 == null)))?((((map__14446_14455.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14446_14455.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14446_14455):map__14446_14455);
var binding_14457 = map__14446_14456__$1;
var init_14458 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14446_14456__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_14457);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_14458,";"], 0));

var G__14459 = seq__14442_14451;
var G__14460 = chunk__14443_14452;
var G__14461 = count__14444_14453;
var G__14462 = (i__14445_14454 + (1));
seq__14442_14451 = G__14459;
chunk__14443_14452 = G__14460;
count__14444_14453 = G__14461;
i__14445_14454 = G__14462;
continue;
} else {
var temp__4657__auto___14463 = cljs.core.seq(seq__14442_14451);
if(temp__4657__auto___14463){
var seq__14442_14464__$1 = temp__4657__auto___14463;
if(cljs.core.chunked_seq_QMARK_(seq__14442_14464__$1)){
var c__6673__auto___14465 = cljs.core.chunk_first(seq__14442_14464__$1);
var G__14466 = cljs.core.chunk_rest(seq__14442_14464__$1);
var G__14467 = c__6673__auto___14465;
var G__14468 = cljs.core.count(c__6673__auto___14465);
var G__14469 = (0);
seq__14442_14451 = G__14466;
chunk__14443_14452 = G__14467;
count__14444_14453 = G__14468;
i__14445_14454 = G__14469;
continue;
} else {
var map__14448_14470 = cljs.core.first(seq__14442_14464__$1);
var map__14448_14471__$1 = ((((!((map__14448_14470 == null)))?((((map__14448_14470.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14448_14470.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14448_14470):map__14448_14470);
var binding_14472 = map__14448_14471__$1;
var init_14473 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14448_14471__$1,cljs.core.cst$kw$init);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var "], 0));

cljs.compiler.emit(binding_14472);

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" = ",init_14473,";"], 0));

var G__14474 = cljs.core.next(seq__14442_14464__$1);
var G__14475 = null;
var G__14476 = (0);
var G__14477 = (0);
seq__14442_14451 = G__14474;
chunk__14443_14452 = G__14475;
count__14444_14453 = G__14476;
i__14445_14454 = G__14477;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_14441_14450;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$recur,(function (p__14478){
var map__14479 = p__14478;
var map__14479__$1 = ((((!((map__14479 == null)))?((((map__14479.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14479.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14479):map__14479);
var frame = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14479__$1,cljs.core.cst$kw$frame);
var exprs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14479__$1,cljs.core.cst$kw$exprs);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14479__$1,cljs.core.cst$kw$env);
var temps = cljs.core.vec(cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(exprs),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym)));
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(frame);
var n__6776__auto___14481 = cljs.core.count(exprs);
var i_14482 = (0);
while(true){
if((i_14482 < n__6776__auto___14481)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_14482) : temps.call(null,i_14482))," = ",(exprs.cljs$core$IFn$_invoke$arity$1 ? exprs.cljs$core$IFn$_invoke$arity$1(i_14482) : exprs.call(null,i_14482)),";"], 0));

var G__14483 = (i_14482 + (1));
i_14482 = G__14483;
continue;
} else {
}
break;
}

var n__6776__auto___14484 = cljs.core.count(exprs);
var i_14485 = (0);
while(true){
if((i_14485 < n__6776__auto___14484)){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((params.cljs$core$IFn$_invoke$arity$1 ? params.cljs$core$IFn$_invoke$arity$1(i_14485) : params.call(null,i_14485)))," = ",(temps.cljs$core$IFn$_invoke$arity$1 ? temps.cljs$core$IFn$_invoke$arity$1(i_14485) : temps.call(null,i_14485)),";"], 0));

var G__14486 = (i_14485 + (1));
i_14485 = G__14486;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["continue;"], 0));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$letfn,(function (p__14487){
var map__14488 = p__14487;
var map__14488__$1 = ((((!((map__14488 == null)))?((((map__14488.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14488.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14488):map__14488);
var bindings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14488__$1,cljs.core.cst$kw$bindings);
var expr = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14488__$1,cljs.core.cst$kw$expr);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14488__$1,cljs.core.cst$kw$env);
var context = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,context)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(function (){"], 0));
} else {
}

var seq__14490_14498 = cljs.core.seq(bindings);
var chunk__14491_14499 = null;
var count__14492_14500 = (0);
var i__14493_14501 = (0);
while(true){
if((i__14493_14501 < count__14492_14500)){
var map__14494_14502 = chunk__14491_14499.cljs$core$IIndexed$_nth$arity$2(null,i__14493_14501);
var map__14494_14503__$1 = ((((!((map__14494_14502 == null)))?((((map__14494_14502.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14494_14502.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14494_14502):map__14494_14502);
var binding_14504 = map__14494_14503__$1;
var init_14505 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14494_14503__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_14504)," = ",init_14505,";"], 0));

var G__14506 = seq__14490_14498;
var G__14507 = chunk__14491_14499;
var G__14508 = count__14492_14500;
var G__14509 = (i__14493_14501 + (1));
seq__14490_14498 = G__14506;
chunk__14491_14499 = G__14507;
count__14492_14500 = G__14508;
i__14493_14501 = G__14509;
continue;
} else {
var temp__4657__auto___14510 = cljs.core.seq(seq__14490_14498);
if(temp__4657__auto___14510){
var seq__14490_14511__$1 = temp__4657__auto___14510;
if(cljs.core.chunked_seq_QMARK_(seq__14490_14511__$1)){
var c__6673__auto___14512 = cljs.core.chunk_first(seq__14490_14511__$1);
var G__14513 = cljs.core.chunk_rest(seq__14490_14511__$1);
var G__14514 = c__6673__auto___14512;
var G__14515 = cljs.core.count(c__6673__auto___14512);
var G__14516 = (0);
seq__14490_14498 = G__14513;
chunk__14491_14499 = G__14514;
count__14492_14500 = G__14515;
i__14493_14501 = G__14516;
continue;
} else {
var map__14496_14517 = cljs.core.first(seq__14490_14511__$1);
var map__14496_14518__$1 = ((((!((map__14496_14517 == null)))?((((map__14496_14517.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14496_14517.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14496_14517):map__14496_14517);
var binding_14519 = map__14496_14518__$1;
var init_14520 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14496_14518__$1,cljs.core.cst$kw$init);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["var ",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(binding_14519)," = ",init_14520,";"], 0));

var G__14521 = cljs.core.next(seq__14490_14511__$1);
var G__14522 = null;
var G__14523 = (0);
var G__14524 = (0);
seq__14490_14498 = G__14521;
chunk__14491_14499 = G__14522;
count__14492_14500 = G__14523;
i__14493_14501 = G__14524;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$invoke,(function (p__14527){
var map__14528 = p__14527;
var map__14528__$1 = ((((!((map__14528 == null)))?((((map__14528.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14528.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14528):map__14528);
var expr = map__14528__$1;
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14528__$1,cljs.core.cst$kw$f);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14528__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14528__$1,cljs.core.cst$kw$env);
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
var vec__14530 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count(args);
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env){
return (function (p1__14525_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__14525_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_fixed_DASH_arity,mfa], null)], null);
} else {
var arities = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(info__$1,cljs.core.cst$kw$name,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$info], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env){
return (function (p1__14526_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__14526_SHARP_,cljs.core.cst$kw$shadow),cljs.core.cst$kw$fn_DASH_self_DASH_name);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14528,map__14528__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14530,(0),null);
var variadic_invoke = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14530,(1),null);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["!(",cljs.core.first(args),")"], 0));
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_14531 = [cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.compiler.protocol_prefix(protocol))),cljs.core.str(cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(cljs.core.name(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(args),".",pimpl_14531,"(",cljs.compiler.comma_sep(cljs.core.cons("null",cljs.core.rest(args))),")"], 0));
} else {
if(keyword_QMARK_){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count(args),"(",cljs.compiler.comma_sep(args),")"], 0));
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_14532 = cljs.core.cst$kw$max_DASH_fixed_DASH_arity.cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,"(",cljs.compiler.comma_sep(cljs.core.take.cljs$core$IFn$_invoke$arity$2(mfa_14532,args)),(((mfa_14532 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep(cljs.core.drop.cljs$core$IFn$_invoke$arity$2(mfa_14532,args)),"], 0))"], 0));
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
var fprop_14533 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count(args))].join('');
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(",f__$1,fprop_14533," ? ",f__$1,fprop_14533,"(",cljs.compiler.comma_sep(args),") : ",f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),"))"], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([f__$1,".call(",cljs.compiler.comma_sep(cljs.core.cons("null",args)),")"], 0));
}

}
}
}
}
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$new,(function (p__14534){
var map__14535 = p__14534;
var map__14535__$1 = ((((!((map__14535 == null)))?((((map__14535.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14535.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14535):map__14535);
var ctor = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14535__$1,cljs.core.cst$kw$ctor);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14535__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14535__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["(new ",ctor,"(",cljs.compiler.comma_sep(args),"))"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$set_BANG_,(function (p__14537){
var map__14538 = p__14537;
var map__14538__$1 = ((((!((map__14538 == null)))?((((map__14538.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14538.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14538):map__14538);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14538__$1,cljs.core.cst$kw$target);
var val = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14538__$1,cljs.core.cst$kw$val);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14538__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target," = ",val], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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

var seq__14544_14548 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.vals(seen)),cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.vals(libs))));
var chunk__14545_14549 = null;
var count__14546_14550 = (0);
var i__14547_14551 = (0);
while(true){
if((i__14547_14551 < count__14546_14550)){
var lib_14552 = chunk__14545_14549.cljs$core$IIndexed$_nth$arity$2(null,i__14547_14551);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14552),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14552),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14552),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14552),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14552),"');"], 0));

}
}

var G__14553 = seq__14544_14548;
var G__14554 = chunk__14545_14549;
var G__14555 = count__14546_14550;
var G__14556 = (i__14547_14551 + (1));
seq__14544_14548 = G__14553;
chunk__14545_14549 = G__14554;
count__14546_14550 = G__14555;
i__14547_14551 = G__14556;
continue;
} else {
var temp__4657__auto___14557 = cljs.core.seq(seq__14544_14548);
if(temp__4657__auto___14557){
var seq__14544_14558__$1 = temp__4657__auto___14557;
if(cljs.core.chunked_seq_QMARK_(seq__14544_14558__$1)){
var c__6673__auto___14559 = cljs.core.chunk_first(seq__14544_14558__$1);
var G__14560 = cljs.core.chunk_rest(seq__14544_14558__$1);
var G__14561 = c__6673__auto___14559;
var G__14562 = cljs.core.count(c__6673__auto___14559);
var G__14563 = (0);
seq__14544_14548 = G__14560;
chunk__14545_14549 = G__14561;
count__14546_14550 = G__14562;
i__14547_14551 = G__14563;
continue;
} else {
var lib_14564 = cljs.core.first(seq__14544_14558__$1);
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14564),cljs.core.cst$kw$reload);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14564),"', 'reload');"], 0));
} else {
if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.cst$kw$reload_DASH_all.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(libs));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(reloads,lib_14564),cljs.core.cst$kw$reload_DASH_all);
}
})())){
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14564),"', 'reload-all');"], 0));
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(lib_14564),"');"], 0));

}
}

var G__14565 = cljs.core.next(seq__14544_14558__$1);
var G__14566 = null;
var G__14567 = (0);
var G__14568 = (0);
seq__14544_14548 = G__14565;
chunk__14545_14549 = G__14566;
count__14546_14550 = G__14567;
i__14547_14551 = G__14568;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$ns,(function (p__14569){
var map__14570 = p__14569;
var map__14570__$1 = ((((!((map__14570 == null)))?((((map__14570.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14570.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14570):map__14570);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$name);
var requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$requires);
var uses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$uses);
var require_macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$require_DASH_macros);
var reloads = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$reloads);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14570__$1,cljs.core.cst$kw$env);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.provide('",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(name),"');"], 0));

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$core)){
} else {
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["goog.require('cljs.core');"], 0));
}

cljs.compiler.load_libs(requires,null,cljs.core.cst$kw$require.cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs(uses,requires,cljs.core.cst$kw$use.cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$deftype_STAR_,(function (p__14572){
var map__14573 = p__14572;
var map__14573__$1 = ((((!((map__14573 == null)))?((((map__14573.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14573.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14573):map__14573);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14573__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__14575_14589 = cljs.core.seq(protocols);
var chunk__14576_14590 = null;
var count__14577_14591 = (0);
var i__14578_14592 = (0);
while(true){
if((i__14578_14592 < count__14577_14591)){
var protocol_14593 = chunk__14576_14590.cljs$core$IIndexed$_nth$arity$2(null,i__14578_14592);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14593)].join('')),"}"], 0));

var G__14594 = seq__14575_14589;
var G__14595 = chunk__14576_14590;
var G__14596 = count__14577_14591;
var G__14597 = (i__14578_14592 + (1));
seq__14575_14589 = G__14594;
chunk__14576_14590 = G__14595;
count__14577_14591 = G__14596;
i__14578_14592 = G__14597;
continue;
} else {
var temp__4657__auto___14598 = cljs.core.seq(seq__14575_14589);
if(temp__4657__auto___14598){
var seq__14575_14599__$1 = temp__4657__auto___14598;
if(cljs.core.chunked_seq_QMARK_(seq__14575_14599__$1)){
var c__6673__auto___14600 = cljs.core.chunk_first(seq__14575_14599__$1);
var G__14601 = cljs.core.chunk_rest(seq__14575_14599__$1);
var G__14602 = c__6673__auto___14600;
var G__14603 = cljs.core.count(c__6673__auto___14600);
var G__14604 = (0);
seq__14575_14589 = G__14601;
chunk__14576_14590 = G__14602;
count__14577_14591 = G__14603;
i__14578_14592 = G__14604;
continue;
} else {
var protocol_14605 = cljs.core.first(seq__14575_14599__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14605)].join('')),"}"], 0));

var G__14606 = cljs.core.next(seq__14575_14599__$1);
var G__14607 = null;
var G__14608 = (0);
var G__14609 = (0);
seq__14575_14589 = G__14606;
chunk__14576_14590 = G__14607;
count__14577_14591 = G__14608;
i__14578_14592 = G__14609;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__14579_14610 = cljs.core.seq(fields__$1);
var chunk__14580_14611 = null;
var count__14581_14612 = (0);
var i__14582_14613 = (0);
while(true){
if((i__14582_14613 < count__14581_14612)){
var fld_14614 = chunk__14580_14611.cljs$core$IIndexed$_nth$arity$2(null,i__14582_14613);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14614," = ",fld_14614,";"], 0));

var G__14615 = seq__14579_14610;
var G__14616 = chunk__14580_14611;
var G__14617 = count__14581_14612;
var G__14618 = (i__14582_14613 + (1));
seq__14579_14610 = G__14615;
chunk__14580_14611 = G__14616;
count__14581_14612 = G__14617;
i__14582_14613 = G__14618;
continue;
} else {
var temp__4657__auto___14619 = cljs.core.seq(seq__14579_14610);
if(temp__4657__auto___14619){
var seq__14579_14620__$1 = temp__4657__auto___14619;
if(cljs.core.chunked_seq_QMARK_(seq__14579_14620__$1)){
var c__6673__auto___14621 = cljs.core.chunk_first(seq__14579_14620__$1);
var G__14622 = cljs.core.chunk_rest(seq__14579_14620__$1);
var G__14623 = c__6673__auto___14621;
var G__14624 = cljs.core.count(c__6673__auto___14621);
var G__14625 = (0);
seq__14579_14610 = G__14622;
chunk__14580_14611 = G__14623;
count__14581_14612 = G__14624;
i__14582_14613 = G__14625;
continue;
} else {
var fld_14626 = cljs.core.first(seq__14579_14620__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14626," = ",fld_14626,";"], 0));

var G__14627 = cljs.core.next(seq__14579_14620__$1);
var G__14628 = null;
var G__14629 = (0);
var G__14630 = (0);
seq__14579_14610 = G__14627;
chunk__14580_14611 = G__14628;
count__14581_14612 = G__14629;
i__14582_14613 = G__14630;
continue;
}
} else {
}
}
break;
}

var seq__14583_14631 = cljs.core.seq(pmasks);
var chunk__14584_14632 = null;
var count__14585_14633 = (0);
var i__14586_14634 = (0);
while(true){
if((i__14586_14634 < count__14585_14633)){
var vec__14587_14635 = chunk__14584_14632.cljs$core$IIndexed$_nth$arity$2(null,i__14586_14634);
var pno_14636 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14587_14635,(0),null);
var pmask_14637 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14587_14635,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14636,"$ = ",pmask_14637,";"], 0));

var G__14638 = seq__14583_14631;
var G__14639 = chunk__14584_14632;
var G__14640 = count__14585_14633;
var G__14641 = (i__14586_14634 + (1));
seq__14583_14631 = G__14638;
chunk__14584_14632 = G__14639;
count__14585_14633 = G__14640;
i__14586_14634 = G__14641;
continue;
} else {
var temp__4657__auto___14642 = cljs.core.seq(seq__14583_14631);
if(temp__4657__auto___14642){
var seq__14583_14643__$1 = temp__4657__auto___14642;
if(cljs.core.chunked_seq_QMARK_(seq__14583_14643__$1)){
var c__6673__auto___14644 = cljs.core.chunk_first(seq__14583_14643__$1);
var G__14645 = cljs.core.chunk_rest(seq__14583_14643__$1);
var G__14646 = c__6673__auto___14644;
var G__14647 = cljs.core.count(c__6673__auto___14644);
var G__14648 = (0);
seq__14583_14631 = G__14645;
chunk__14584_14632 = G__14646;
count__14585_14633 = G__14647;
i__14586_14634 = G__14648;
continue;
} else {
var vec__14588_14649 = cljs.core.first(seq__14583_14643__$1);
var pno_14650 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14588_14649,(0),null);
var pmask_14651 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14588_14649,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14650,"$ = ",pmask_14651,";"], 0));

var G__14652 = cljs.core.next(seq__14583_14643__$1);
var G__14653 = null;
var G__14654 = (0);
var G__14655 = (0);
seq__14583_14631 = G__14652;
chunk__14584_14632 = G__14653;
count__14585_14633 = G__14654;
i__14586_14634 = G__14655;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$defrecord_STAR_,(function (p__14656){
var map__14657 = p__14656;
var map__14657__$1 = ((((!((map__14657 == null)))?((((map__14657.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14657.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14657):map__14657);
var t = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14657__$1,cljs.core.cst$kw$t);
var fields = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14657__$1,cljs.core.cst$kw$fields);
var pmasks = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14657__$1,cljs.core.cst$kw$pmasks);
var body = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14657__$1,cljs.core.cst$kw$body);
var protocols = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14657__$1,cljs.core.cst$kw$protocols);
var fields__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$__meta,cljs.core.cst$sym$__extmap,cljs.core.cst$sym$__hash], null));
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([""], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["/**"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["* @constructor"], 0));

var seq__14659_14673 = cljs.core.seq(protocols);
var chunk__14660_14674 = null;
var count__14661_14675 = (0);
var i__14662_14676 = (0);
while(true){
if((i__14662_14676 < count__14661_14675)){
var protocol_14677 = chunk__14660_14674.cljs$core$IIndexed$_nth$arity$2(null,i__14662_14676);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14677)].join('')),"}"], 0));

var G__14678 = seq__14659_14673;
var G__14679 = chunk__14660_14674;
var G__14680 = count__14661_14675;
var G__14681 = (i__14662_14676 + (1));
seq__14659_14673 = G__14678;
chunk__14660_14674 = G__14679;
count__14661_14675 = G__14680;
i__14662_14676 = G__14681;
continue;
} else {
var temp__4657__auto___14682 = cljs.core.seq(seq__14659_14673);
if(temp__4657__auto___14682){
var seq__14659_14683__$1 = temp__4657__auto___14682;
if(cljs.core.chunked_seq_QMARK_(seq__14659_14683__$1)){
var c__6673__auto___14684 = cljs.core.chunk_first(seq__14659_14683__$1);
var G__14685 = cljs.core.chunk_rest(seq__14659_14683__$1);
var G__14686 = c__6673__auto___14684;
var G__14687 = cljs.core.count(c__6673__auto___14684);
var G__14688 = (0);
seq__14659_14673 = G__14685;
chunk__14660_14674 = G__14686;
count__14661_14675 = G__14687;
i__14662_14676 = G__14688;
continue;
} else {
var protocol_14689 = cljs.core.first(seq__14659_14683__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" * @implements {",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(protocol_14689)].join('')),"}"], 0));

var G__14690 = cljs.core.next(seq__14659_14683__$1);
var G__14691 = null;
var G__14692 = (0);
var G__14693 = (0);
seq__14659_14673 = G__14690;
chunk__14660_14674 = G__14691;
count__14661_14675 = G__14692;
i__14662_14676 = G__14693;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["*/"], 0));

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(t)," = (function (",cljs.compiler.comma_sep(fields__$1),"){"], 0));

var seq__14663_14694 = cljs.core.seq(fields__$1);
var chunk__14664_14695 = null;
var count__14665_14696 = (0);
var i__14666_14697 = (0);
while(true){
if((i__14666_14697 < count__14665_14696)){
var fld_14698 = chunk__14664_14695.cljs$core$IIndexed$_nth$arity$2(null,i__14666_14697);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14698," = ",fld_14698,";"], 0));

var G__14699 = seq__14663_14694;
var G__14700 = chunk__14664_14695;
var G__14701 = count__14665_14696;
var G__14702 = (i__14666_14697 + (1));
seq__14663_14694 = G__14699;
chunk__14664_14695 = G__14700;
count__14665_14696 = G__14701;
i__14666_14697 = G__14702;
continue;
} else {
var temp__4657__auto___14703 = cljs.core.seq(seq__14663_14694);
if(temp__4657__auto___14703){
var seq__14663_14704__$1 = temp__4657__auto___14703;
if(cljs.core.chunked_seq_QMARK_(seq__14663_14704__$1)){
var c__6673__auto___14705 = cljs.core.chunk_first(seq__14663_14704__$1);
var G__14706 = cljs.core.chunk_rest(seq__14663_14704__$1);
var G__14707 = c__6673__auto___14705;
var G__14708 = cljs.core.count(c__6673__auto___14705);
var G__14709 = (0);
seq__14663_14694 = G__14706;
chunk__14664_14695 = G__14707;
count__14665_14696 = G__14708;
i__14666_14697 = G__14709;
continue;
} else {
var fld_14710 = cljs.core.first(seq__14663_14704__$1);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.",fld_14710," = ",fld_14710,";"], 0));

var G__14711 = cljs.core.next(seq__14663_14704__$1);
var G__14712 = null;
var G__14713 = (0);
var G__14714 = (0);
seq__14663_14694 = G__14711;
chunk__14664_14695 = G__14712;
count__14665_14696 = G__14713;
i__14666_14697 = G__14714;
continue;
}
} else {
}
}
break;
}

var seq__14667_14715 = cljs.core.seq(pmasks);
var chunk__14668_14716 = null;
var count__14669_14717 = (0);
var i__14670_14718 = (0);
while(true){
if((i__14670_14718 < count__14669_14717)){
var vec__14671_14719 = chunk__14668_14716.cljs$core$IIndexed$_nth$arity$2(null,i__14670_14718);
var pno_14720 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14671_14719,(0),null);
var pmask_14721 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14671_14719,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14720,"$ = ",pmask_14721,";"], 0));

var G__14722 = seq__14667_14715;
var G__14723 = chunk__14668_14716;
var G__14724 = count__14669_14717;
var G__14725 = (i__14670_14718 + (1));
seq__14667_14715 = G__14722;
chunk__14668_14716 = G__14723;
count__14669_14717 = G__14724;
i__14670_14718 = G__14725;
continue;
} else {
var temp__4657__auto___14726 = cljs.core.seq(seq__14667_14715);
if(temp__4657__auto___14726){
var seq__14667_14727__$1 = temp__4657__auto___14726;
if(cljs.core.chunked_seq_QMARK_(seq__14667_14727__$1)){
var c__6673__auto___14728 = cljs.core.chunk_first(seq__14667_14727__$1);
var G__14729 = cljs.core.chunk_rest(seq__14667_14727__$1);
var G__14730 = c__6673__auto___14728;
var G__14731 = cljs.core.count(c__6673__auto___14728);
var G__14732 = (0);
seq__14667_14715 = G__14729;
chunk__14668_14716 = G__14730;
count__14669_14717 = G__14731;
i__14670_14718 = G__14732;
continue;
} else {
var vec__14672_14733 = cljs.core.first(seq__14667_14727__$1);
var pno_14734 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14672_14733,(0),null);
var pmask_14735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14672_14733,(1),null);
cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["this.cljs$lang$protocol_mask$partition",pno_14734,"$ = ",pmask_14735,";"], 0));

var G__14736 = cljs.core.next(seq__14667_14727__$1);
var G__14737 = null;
var G__14738 = (0);
var G__14739 = (0);
seq__14667_14715 = G__14736;
chunk__14668_14716 = G__14737;
count__14669_14717 = G__14738;
i__14670_14718 = G__14739;
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
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$dot,(function (p__14740){
var map__14741 = p__14740;
var map__14741__$1 = ((((!((map__14741 == null)))?((((map__14741.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14741.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14741):map__14741);
var target = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14741__$1,cljs.core.cst$kw$target);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14741__$1,cljs.core.cst$kw$field);
var method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14741__$1,cljs.core.cst$kw$method);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14741__$1,cljs.core.cst$kw$args);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14741__$1,cljs.core.cst$kw$env);
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(field,cljs.core.PersistentHashSet.EMPTY)], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([target,".",cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2(method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep(args),")"], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
return null;
} else {
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([";"], 0));
}
}));
cljs.compiler.emit_STAR_.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$js,(function (p__14743){
var map__14744 = p__14743;
var map__14744__$1 = ((((!((map__14744 == null)))?((((map__14744.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14744.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__14744):map__14744);
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14744__$1,cljs.core.cst$kw$op);
var env = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14744__$1,cljs.core.cst$kw$env);
var code = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14744__$1,cljs.core.cst$kw$code);
var segs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14744__$1,cljs.core.cst$kw$segs);
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__14744__$1,cljs.core.cst$kw$args);
if(cljs.core.truth_((function (){var and__5850__auto__ = code;
if(cljs.core.truth_(and__5850__auto__)){
var G__14746 = clojure.string.trim(code);
var G__14747 = "/*";
return goog.string.startsWith(G__14746,G__14747);
} else {
return and__5850__auto__;
}
})())){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
var env__13674__auto__ = env;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$return,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["return "], 0));
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([code], 0));
} else {
cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(segs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)),cljs.core.concat.cljs$core$IFn$_invoke$arity$2(args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null)))], 0));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$expr,cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(env__13674__auto__))){
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
var seq__14756 = cljs.core.seq(table);
var chunk__14757 = null;
var count__14758 = (0);
var i__14759 = (0);
while(true){
if((i__14759 < count__14758)){
var vec__14760 = chunk__14757.cljs$core$IIndexed$_nth$arity$2(null,i__14759);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14760,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14760,(1),null);
var ns_14762 = cljs.core.namespace(sym);
var name_14763 = cljs.core.name(sym);
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

var G__14764 = seq__14756;
var G__14765 = chunk__14757;
var G__14766 = count__14758;
var G__14767 = (i__14759 + (1));
seq__14756 = G__14764;
chunk__14757 = G__14765;
count__14758 = G__14766;
i__14759 = G__14767;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__14756);
if(temp__4657__auto__){
var seq__14756__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__14756__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__14756__$1);
var G__14768 = cljs.core.chunk_rest(seq__14756__$1);
var G__14769 = c__6673__auto__;
var G__14770 = cljs.core.count(c__6673__auto__);
var G__14771 = (0);
seq__14756 = G__14768;
chunk__14757 = G__14769;
count__14758 = G__14770;
i__14759 = G__14771;
continue;
} else {
var vec__14761 = cljs.core.first(seq__14756__$1);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14761,(0),null);
var value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14761,(1),null);
var ns_14772 = cljs.core.namespace(sym);
var name_14773 = cljs.core.name(sym);
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

var G__14774 = cljs.core.next(seq__14756__$1);
var G__14775 = null;
var G__14776 = (0);
var G__14777 = (0);
seq__14756 = G__14774;
chunk__14757 = G__14775;
count__14758 = G__14776;
i__14759 = G__14777;
continue;
}
} else {
return null;
}
}
break;
}
});
