// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.cache');
goog.require('cljs.core');
goog.require('cognitect.transit');
goog.require('clojure.string');
replumb.cache.transit_json__GT_cljs = (function replumb$cache$transit_json__GT_cljs(json){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),json);
});
replumb.cache.cljs__GT_transit_json = (function replumb$cache$cljs__GT_transit_json(source){
return cognitect.transit.write(cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),source);
});
replumb.cache.compiled_by_string = (function replumb$cache$compiled_by_string(var_args){
var args16754 = [];
var len__6932__auto___16757 = arguments.length;
var i__6933__auto___16758 = (0);
while(true){
if((i__6933__auto___16758 < len__6932__auto___16757)){
args16754.push((arguments[i__6933__auto___16758]));

var G__16759 = (i__6933__auto___16758 + (1));
i__6933__auto___16758 = G__16759;
continue;
} else {
}
break;
}

var G__16756 = args16754.length;
switch (G__16756) {
case 0:
return replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16754.length)].join('')));

}
});

replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$1(null);
});

replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$1 = (function (eval_opts){
return [cljs.core.str("// Compiled by ClojureScript "),cljs.core.str(cljs.core._STAR_clojurescript_version_STAR_),cljs.core.str((cljs.core.truth_(eval_opts)?[cljs.core.str(" "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([eval_opts], 0)))].join(''):null))].join('');
});

replumb.cache.compiled_by_string.cljs$lang$maxFixedArity = 1;
replumb.cache.cache_prefix_for_path = (function replumb$cache$cache_prefix_for_path(var_args){
var args16761 = [];
var len__6932__auto___16764 = arguments.length;
var i__6933__auto___16765 = (0);
while(true){
if((i__6933__auto___16765 < len__6932__auto___16764)){
args16761.push((arguments[i__6933__auto___16765]));

var G__16766 = (i__6933__auto___16765 + (1));
i__6933__auto___16765 = G__16766;
continue;
} else {
}
break;
}

var G__16763 = args16761.length;
switch (G__16763) {
case 2:
return replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16761.length)].join('')));

}
});

replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$2 = (function (path,macros){
return [cljs.core.str(cljs.core.munge(path)),cljs.core.str((cljs.core.truth_(macros)?"$macros":null))].join('');
});

replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$3 = (function (cache_path,path,macros){
return [cljs.core.str(cache_path),cljs.core.str("/"),cljs.core.str(cljs.core.munge(path)),cljs.core.str((cljs.core.truth_(macros)?"$macros":null))].join('');
});

replumb.cache.cache_prefix_for_path.cljs$lang$maxFixedArity = 3;
replumb.cache.is_macros_QMARK_ = (function replumb$cache$is_macros_QMARK_(cache){
return clojure.string.ends_with_QMARK_([cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cache))].join(''),"$macros");
});
replumb.cache.clojurescript_compiler_version = (function replumb$cache$clojurescript_compiler_version(js_source){
return cljs.core.second(cljs.core.re_find(/\/\/ Compiled by ClojureScript (\S*)/,js_source));
});
replumb.cache.cached_js_valid_QMARK_ = (function replumb$cache$cached_js_valid_QMARK_(js_source){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_clojurescript_version_STAR_,replumb.cache.clojurescript_compiler_version(js_source));
});
