// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.repl');
goog.require('cljs.core');
goog.require('cljs.tools.reader.impl.commons');
goog.require('cljs.js');
goog.require('replumb.load');
goog.require('cljs.tools.reader');
goog.require('cljs.tagged_literals');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('replumb.cache');
goog.require('replumb.browser');
goog.require('replumb.doc_maps');
goog.require('cljs.pprint');
goog.require('replumb.ast');
goog.require('replumb.nodejs');
goog.require('clojure.string');
goog.require('replumb.common');
goog.require('cljs.repl');
if(typeof replumb.repl.st !== 'undefined'){
} else {
replumb.repl.st = cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();
}
if(typeof replumb.repl.app_env !== 'undefined'){
} else {
replumb.repl.app_env = (function (){var G__19148 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$current_DASH_ns,cljs.core.cst$sym$cljs$user,cljs.core.cst$kw$last_DASH_eval_DASH_warning,null,cljs.core.cst$kw$initializing_QMARK_,false,cljs.core.cst$kw$needs_DASH_init_QMARK_,true,cljs.core.cst$kw$previous_DASH_init_DASH_opts,cljs.core.PersistentArrayMap.EMPTY], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__19148) : cljs.core.atom.call(null,G__19148));
})();
}
/**
 * The ex-info data for this file
 */
replumb.repl.ex_info_data = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$kw$replumb$repl_SLASH_error], null);
/**
 * Return the current namespace, as a symbol.
 */
replumb.repl.current_ns = (function replumb$repl$current_ns(){
return cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)));
});
/**
 * Given a Google Closure provide / Clojure require (e.g. goog.string),
 *   returns the path to the actual file (without extension).
 */
replumb.repl.get_goog_path = (function replumb$repl$get_goog_path(provide){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$goog_DASH_provide_DASH__GT_path,provide], null));
});
replumb.repl.empty_analyzer_env = (function replumb$repl$empty_analyzer_env(){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.analyzer.empty_env(),cljs.core.cst$kw$ns,replumb.ast.namespace((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)))),cljs.core.array_seq([cljs.core.cst$kw$context,cljs.core.cst$kw$expr], 0));
});
replumb.repl.map_keys = (function replumb$repl$map_keys(f,m){
return cljs.core.reduce_kv((function (r,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(r,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(k) : f.call(null,k)),v);
}),cljs.core.PersistentArrayMap.EMPTY,m);
});
/**
 * Reading forms from a reader (see clojure.tools.reader.reader-types
 *   for reader implementations). This function throws if a valid form
 *   cannot be found.
 */
replumb.repl.read = (function replumb$repl$read(opts,rdr){
var _STAR_cljs_ns_STAR_19153 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_19154 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_19155 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol19156 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{return cljs.tools.reader.read.cljs$core$IFn$_invoke$arity$2(opts,rdr);
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol19156;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19155;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_19154;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_19153;
}});
/**
 * Reading forms from a string. This function throws if a valid one
 *   cannot be found.
 */
replumb.repl.read_string = (function replumb$repl$read_string(opts,s){
var _STAR_cljs_ns_STAR_19161 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_19162 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_19163 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol19164 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{return cljs.tools.reader.read_string.cljs$core$IFn$_invoke$arity$2(opts,s);
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol19164;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19163;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_19162;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_19161;
}});
replumb.repl.ns_form_QMARK_ = (function replumb$repl$ns_form_QMARK_(form){
return (cljs.core.seq_QMARK_(form)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$ns,cljs.core.first(form)));
});
/**
 * Is the input analyzer var (from either cljs.analyzer/resolve-var or
 *   cljs.analyzer/resolve-macro-var) a macro?
 */
replumb.repl.macro_QMARK_ = (function replumb$repl$macro_QMARK_(var$){
return cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(var$);
});
/**
 * From cljs.analyzer.api.clj. Given an analysis environment resolve a
 *   var. Analogous to clojure.core/resolve
 */
replumb.repl.resolve = (function replumb$repl$resolve(opts,env,sym){
if(cljs.core.map_QMARK_(env)){
} else {
throw (new Error("Assert failed: (map? env)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

var macro_var = cljs.analyzer.resolve_macro_var(env,sym);
var var$ = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(env,sym,cljs.analyzer.confirm_var_exist_warning);
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.not(cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts));
if(and__5850__auto__){
return cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__5850__auto__;
}
})())){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.analyzer/resolve-macro-var returned",(function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19169_19173 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19170_19174 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19169_19173,_STAR_print_fn_STAR_19170_19174,sb__6848__auto__,macro_var,var$){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19169_19173,_STAR_print_fn_STAR_19170_19174,sb__6848__auto__,macro_var,var$))
;

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(macro_var);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19170_19174;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19169_19173;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})()], 0));

replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["cljs.analyzer/resolve-var returned",(function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19171_19175 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19172_19176 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19171_19175,_STAR_print_fn_STAR_19172_19176,sb__6848__auto__,macro_var,var$){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19171_19175,_STAR_print_fn_STAR_19172_19176,sb__6848__auto__,macro_var,var$))
;

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(var$);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19172_19176;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19171_19175;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})()], 0));
} else {
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([macro_var,var$], 0));
});
replumb.repl.get_var = (function replumb$repl$get_var(opts,env,sym){
var var$ = (function (){var env__12169__auto__ = replumb.repl.st;
var env__12169__auto____$1 = ((cljs.core.map_QMARK_(env__12169__auto__))?(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(env__12169__auto__) : cljs.core.atom.call(null,env__12169__auto__)):((((env__12169__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(env__12169__auto__) : cljs.core.deref.call(null,env__12169__auto__)))))?env__12169__auto__:(function(){throw (new Error([cljs.core.str("Compiler environment must be a map or atom containing a map, not "),cljs.core.str(cljs.core.type(env__12169__auto__))].join('')))})()
));
var _STAR_compiler_STAR_19179 = cljs.env._STAR_compiler_STAR_;
cljs.env._STAR_compiler_STAR_ = env__12169__auto____$1;

try{return replumb.repl.resolve(opts,env,sym);
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_19179;
}})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(var$)),[cljs.core.str(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(var$))].join(''))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$3(var$,cljs.core.cst$kw$name,((function (var$){
return (function (p1__19177_SHARP_){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(p1__19177_SHARP_));
});})(var$))
);
} else {
return var$;
}
});
replumb.repl.replumb_repl_special_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$sym$doc,null,cljs.core.cst$sym$import,null,cljs.core.cst$sym$find_DASH_doc,null,cljs.core.cst$sym$dir,null,cljs.core.cst$sym$pst,null,cljs.core.cst$sym$in_DASH_ns,null,cljs.core.cst$sym$require,null,cljs.core.cst$sym$source,null,cljs.core.cst$sym$load_DASH_file,null,cljs.core.cst$sym$require_DASH_macros,null,cljs.core.cst$sym$apropos,null], null), null);
replumb.repl.repl_special_QMARK_ = (function replumb$repl$repl_special_QMARK_(form){
var and__5850__auto__ = cljs.core.seq_QMARK_(form);
if(and__5850__auto__){
var G__19183 = cljs.core.first(form);
return (replumb.repl.replumb_repl_special_set.cljs$core$IFn$_invoke$arity$1 ? replumb.repl.replumb_repl_special_set.cljs$core$IFn$_invoke$arity$1(G__19183) : replumb.repl.replumb_repl_special_set.call(null,G__19183));
} else {
return and__5850__auto__;
}
});
/**
 * Makes an eval function that will be used to eval JavaScript code. It returns
 *   a cljs.js-compatible *eval-fn*. Expects a map of user options, specifically:
 * 
 *   * :cache - a map containing an optional :path key which indicates the path
 *   in which write the cached files. If not empty, the function will first write
 *   the cached files and then eval the source, otherwise only the latter
 *   * write-file-fn! - a synchronous 2-arity function which expects the path and
 *   data to write.
 */
replumb.repl.make_js_eval_fn = (function replumb$repl$make_js_eval_fn(opts){
return (function (p__19193){
var map__19194 = p__19193;
var map__19194__$1 = ((((!((map__19194 == null)))?((((map__19194.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19194.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19194):map__19194);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19194__$1,cljs.core.cst$kw$path);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19194__$1,cljs.core.cst$kw$name);
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19194__$1,cljs.core.cst$kw$source);
var cache = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19194__$1,cljs.core.cst$kw$cache);
var verbose = cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts);
var write_file_fn_BANG_ = cljs.core.cst$kw$write_DASH_file_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(opts);
var cache_path = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cache,cljs.core.cst$kw$path], null));
if(cljs.core.truth_((function (){var and__5850__auto__ = path;
if(cljs.core.truth_(and__5850__auto__)){
var and__5850__auto____$1 = source;
if(cljs.core.truth_(and__5850__auto____$1)){
var and__5850__auto____$2 = cache;
if(cljs.core.truth_(and__5850__auto____$2)){
return cache_path;
} else {
return and__5850__auto____$2;
}
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})())){
if(cljs.core.truth_(write_file_fn_BANG_)){
var cache_prefix_for_path_19201 = replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$3(cache_path,path,replumb.cache.is_macros_QMARK_(cache));
var vec__19196_19202 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (cache_prefix_for_path_19201,verbose,write_file_fn_BANG_,cache_path,map__19194,map__19194__$1,path,name,source,cache){
return (function (p1__19184_SHARP_){
return [cljs.core.str(cache_prefix_for_path_19201),cljs.core.str(p1__19184_SHARP_)].join('');
});})(cache_prefix_for_path_19201,verbose,write_file_fn_BANG_,cache_path,map__19194,map__19194__$1,path,name,source,cache))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".js",".cache.json"], null));
var js_path_19203 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19196_19202,(0),null);
var json_path_19204 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19196_19202,(1),null);
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Attempting to write",js_path_19203,"..."], 0));
} else {
}

var G__19197_19205 = js_path_19203;
var G__19198_19206 = [cljs.core.str(replumb.cache.compiled_by_string.cljs$core$IFn$_invoke$arity$0()),cljs.core.str("\n"),cljs.core.str(source)].join('');
(write_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2 ? write_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2(G__19197_19205,G__19198_19206) : write_file_fn_BANG_.call(null,G__19197_19205,G__19198_19206));

if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Attempting to write",json_path_19204,"..."], 0));
} else {
}

var G__19199_19207 = json_path_19204;
var G__19200_19208 = replumb.cache.cljs__GT_transit_json(cache);
(write_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2 ? write_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2(G__19199_19207,G__19200_19208) : write_file_fn_BANG_.call(null,G__19199_19207,G__19200_19208));
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Invalid :write-file-fn!. No cache will be written."], 0));
} else {
}
}
} else {
}

return eval(source);
});
});
/**
 * Gets the base set of evaluation options. The 1-arity function
 *   specifies opts that override default. No check here if opts are
 *   valid.
 */
replumb.repl.base_eval_opts_BANG_ = (function replumb$repl$base_eval_opts_BANG_(var_args){
var args19209 = [];
var len__6932__auto___19212 = arguments.length;
var i__6933__auto___19213 = (0);
while(true){
if((i__6933__auto___19213 < len__6932__auto___19212)){
args19209.push((arguments[i__6933__auto___19213]));

var G__19214 = (i__6933__auto___19213 + (1));
i__6933__auto___19213 = G__19214;
continue;
} else {
}
break;
}

var G__19211 = args19209.length;
switch (G__19211) {
case 0:
return replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19209.length)].join('')));

}
});

replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
});

replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (user_opts){
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$ns,cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env))),cljs.core.cst$kw$context,(function (){var or__5862__auto__ = cljs.core.cst$kw$context.cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.cst$kw$expr;
}
})(),cljs.core.cst$kw$source_DASH_map,false,cljs.core.cst$kw$def_DASH_emits_DASH_var,true,cljs.core.cst$kw$load,cljs.core.cst$kw$load_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(user_opts),cljs.core.cst$kw$eval,replumb.repl.make_js_eval_fn(user_opts),cljs.core.cst$kw$verbose,(function (){var or__5862__auto__ = cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return false;
}
})(),cljs.core.cst$kw$static_DASH_fns,false], null);
});

replumb.repl.base_eval_opts_BANG_.cljs$lang$maxFixedArity = 1;
replumb.repl.load_eval_opts_BANG_ = (function replumb$repl$load_eval_opts_BANG_(user_opts,file_name){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(user_opts),cljs.core.cst$kw$context),cljs.core.cst$kw$file_DASH_name,file_name);
});
replumb.repl.self_require_QMARK_ = (function replumb$repl$self_require_QMARK_(specs){
return cljs.core.some((function (quoted_spec_or_kw){
var and__5850__auto__ = !((quoted_spec_or_kw instanceof cljs.core.Keyword));
if(and__5850__auto__){
var spec = cljs.core.second(quoted_spec_or_kw);
var ns = ((cljs.core.sequential_QMARK_(spec))?cljs.core.first(spec):spec);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.current_ns) : cljs.core.deref.call(null,replumb.repl.current_ns)));
} else {
return and__5850__auto__;
}
}),specs);
});
replumb.repl.canonicalize_specs = (function replumb$repl$canonicalize_specs(specs){
var canonicalize = (function replumb$repl$canonicalize_specs_$_canonicalize(quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
var spec = cljs.core.second(quoted_spec_or_kw);
if(cljs.core.vector_QMARK_(spec)){
return spec;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec], null);
}
}
});
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(canonicalize,specs);
});
/**
 * Is the compiler state for the cljs.user namespace empty?
 */
replumb.repl.empty_cljs_user_QMARK_ = (function replumb$repl$empty_cljs_user_QMARK_(){
return replumb.ast.empty_state_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),cljs.core.cst$sym$cljs$user);
});
/**
 * Remove all the references to the given namespace in the compiler
 *   state.
 */
replumb.repl.purge_required_ns_BANG_ = (function replumb$repl$purge_required_ns_BANG_(required_ns){
var required_macro_ns = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(required_ns),cljs.core.str("$macros")].join(''));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(replumb.repl.st,((function (required_macro_ns){
return (function (p1__19216_SHARP_){
return replumb.ast.dissoc_ns(replumb.ast.dissoc_ns(p1__19216_SHARP_,required_ns),required_macro_ns);
});})(required_macro_ns))
);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.js._STAR_loaded_STAR_,((function (required_macro_ns){
return (function (p1__19217_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(replumb.ast.import_of_ns_QMARK_,required_ns),cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.disj.cljs$core$IFn$_invoke$arity$2(p1__19217_SHARP_,required_ns),required_macro_ns)));
});})(required_macro_ns))
);
});
/**
 * Get rid of all the compiler state references to required-ns macros
 *   namespaces and symbols from requirer-ns.
 */
replumb.repl.purge_symbols_BANG_ = (function replumb$repl$purge_symbols_BANG_(requirer_ns,required_ns){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(replumb.repl.st,(function (p1__19218_SHARP_){
return replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(p1__19218_SHARP_,requirer_ns,required_ns,cljs.core.cst$kw$require),requirer_ns,required_ns,cljs.core.cst$kw$macro_DASH_require),requirer_ns,required_ns,cljs.core.cst$kw$macro),requirer_ns,required_ns,cljs.core.cst$kw$symbol),requirer_ns,required_ns,cljs.core.cst$kw$import);
}));
});
/**
 * Remove all the namespace references, symbols included, required from
 *   inside the input requirer-ns namespace.
 * 
 *   For instance after evaluating:
 * 
 *   (in-ns 'cljs.user)         ;; requirer-ns
 *   (require 'clojure.string)  ;; required-ns
 * 
 *   You can eval the following to clean the compiler state:
 * 
 *   (replumb.repl/purge-require 'cljs.user 'clojure.string).
 * 
 *   Note that doing this manually is tricky, as, for instance,
 *   clojure.string has the following dependencies to clear: goog.string
 *   goog.string.StringBuffer.
 */
replumb.repl.purge_namespaces_BANG_ = (function replumb$repl$purge_namespaces_BANG_(requirer_ns,namespaces){
var seq__19223 = cljs.core.seq(namespaces);
var chunk__19224 = null;
var count__19225 = (0);
var i__19226 = (0);
while(true){
if((i__19226 < count__19225)){
var ns = chunk__19224.cljs$core$IIndexed$_nth$arity$2(null,i__19226);
replumb.repl.purge_required_ns_BANG_(ns);

replumb.repl.purge_symbols_BANG_(requirer_ns,ns);

var G__19227 = seq__19223;
var G__19228 = chunk__19224;
var G__19229 = count__19225;
var G__19230 = (i__19226 + (1));
seq__19223 = G__19227;
chunk__19224 = G__19228;
count__19225 = G__19229;
i__19226 = G__19230;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__19223);
if(temp__4657__auto__){
var seq__19223__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19223__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__19223__$1);
var G__19231 = cljs.core.chunk_rest(seq__19223__$1);
var G__19232 = c__6673__auto__;
var G__19233 = cljs.core.count(c__6673__auto__);
var G__19234 = (0);
seq__19223 = G__19231;
chunk__19224 = G__19232;
count__19225 = G__19233;
i__19226 = G__19234;
continue;
} else {
var ns = cljs.core.first(seq__19223__$1);
replumb.repl.purge_required_ns_BANG_(ns);

replumb.repl.purge_symbols_BANG_(requirer_ns,ns);

var G__19235 = cljs.core.next(seq__19223__$1);
var G__19236 = null;
var G__19237 = (0);
var G__19238 = (0);
seq__19223 = G__19235;
chunk__19224 = G__19236;
count__19225 = G__19237;
i__19226 = G__19238;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Remove all the namespace references required from inside cljs.user
 *   from the compiler state.
 * 
 *   The 0-arity version cleans namespaces in cljs.js/*loaded*.
 */
replumb.repl.purge_cljs_user_BANG_ = (function replumb$repl$purge_cljs_user_BANG_(var_args){
var args19239 = [];
var len__6932__auto___19242 = arguments.length;
var i__6933__auto___19243 = (0);
while(true){
if((i__6933__auto___19243 < len__6932__auto___19242)){
args19239.push((arguments[i__6933__auto___19243]));

var G__19244 = (i__6933__auto___19243 + (1));
i__6933__auto___19243 = G__19244;
continue;
} else {
}
break;
}

var G__19241 = args19239.length;
switch (G__19241) {
case 0:
return replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19239.length)].join('')));

}
});

replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.repl.purge_namespaces_BANG_(cljs.core.cst$sym$cljs$user,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.js._STAR_loaded_STAR_) : cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_)));
});

replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (namespaces){
return replumb.repl.purge_namespaces_BANG_(cljs.core.cst$sym$cljs$user,namespaces);
});

replumb.repl.purge_cljs_user_BANG_.cljs$lang$maxFixedArity = 1;
replumb.repl.process_reloads_BANG_ = (function replumb$repl$process_reloads_BANG_(specs){
var temp__4655__auto__ = cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$reload,null,cljs.core.cst$kw$reload_DASH_all,null], null), null),specs);
if(cljs.core.truth_(temp__4655__auto__)){
var k = temp__4655__auto__;
var specs__$1 = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.fromArray([k], true),specs);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$reload_DASH_all)){
replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.js._STAR_loaded_STAR_) : cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_)));
} else {
replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,specs__$1));
}

return specs__$1;
} else {
return specs;
}
});
replumb.repl.make_ns_form = (function replumb$repl$make_ns_form(kind,specs,target_ns){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(kind,cljs.core.cst$kw$import)){
return cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ns),(function (){var x__6696__auto__ = target_ns;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = kind;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
return cljs.core.second(quoted_spec_or_kw);
}
}),specs))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$merge,true,cljs.core.cst$kw$line,(1),cljs.core.cst$kw$column,(1)], null));
} else {
return cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ns),(function (){var x__6696__auto__ = target_ns;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = kind;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),replumb.repl.process_reloads_BANG_(replumb.repl.canonicalize_specs(specs)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$merge,true,cljs.core.cst$kw$line,(1),cljs.core.cst$kw$column,(1)], null));
}
});
/**
 * Given the content of goog/deps.js file, create a map
 *   provide->path (without extension) of Google dependencies.
 * 
 *   Adapted from planck:
 *   https://github.com/mfikes/planck/blob/master/planck-cljs/src/planck/repl.cljs#L438-L451
 */
replumb.repl.goog_deps_map = (function replumb$repl$goog_deps_map(deps_js_content){
var paths_to_provides = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__19261){
var vec__19262 = p__19261;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19262,(0),null);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19262,(1),null);
var provides = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19262,(2),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,cljs.core.re_seq(/'(.*?)'/,provides))], null);
}),cljs.core.re_seq(/\ngoog\.addDependency\('(.*)', \[(.*?)\].*/,deps_js_content));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__6642__auto__ = ((function (paths_to_provides){
return (function replumb$repl$goog_deps_map_$_iter__19263(s__19264){
return (new cljs.core.LazySeq(null,((function (paths_to_provides){
return (function (){
var s__19264__$1 = s__19264;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__19264__$1);
if(temp__4657__auto__){
var xs__5205__auto__ = temp__4657__auto__;
var vec__19273 = cljs.core.first(xs__5205__auto__);
var path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19273,(0),null);
var provides = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19273,(1),null);
var iterys__6638__auto__ = ((function (s__19264__$1,vec__19273,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides){
return (function replumb$repl$goog_deps_map_$_iter__19263_$_iter__19265(s__19266){
return (new cljs.core.LazySeq(null,((function (s__19264__$1,vec__19273,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides){
return (function (){
var s__19266__$1 = s__19266;
while(true){
var temp__4657__auto____$1 = cljs.core.seq(s__19266__$1);
if(temp__4657__auto____$1){
var s__19266__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__19266__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__19266__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__19268 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__19267 = (0);
while(true){
if((i__19267 < size__6641__auto__)){
var provide = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__19267);
cljs.core.chunk_append(b__19268,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(provide),[cljs.core.str("goog/"),cljs.core.str(cljs.core.second(cljs.core.re_find(/(.*)\.js$/,path)))].join('')], null));

var G__19276 = (i__19267 + (1));
i__19267 = G__19276;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19268),replumb$repl$goog_deps_map_$_iter__19263_$_iter__19265(cljs.core.chunk_rest(s__19266__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19268),null);
}
} else {
var provide = cljs.core.first(s__19266__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(provide),[cljs.core.str("goog/"),cljs.core.str(cljs.core.second(cljs.core.re_find(/(.*)\.js$/,path)))].join('')], null),replumb$repl$goog_deps_map_$_iter__19263_$_iter__19265(cljs.core.rest(s__19266__$2)));
}
} else {
return null;
}
break;
}
});})(s__19264__$1,vec__19273,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides))
,null,null));
});})(s__19264__$1,vec__19273,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides))
;
var fs__6639__auto__ = cljs.core.seq(iterys__6638__auto__(provides));
if(fs__6639__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__6639__auto__,replumb$repl$goog_deps_map_$_iter__19263(cljs.core.rest(s__19264__$1)));
} else {
var G__19277 = cljs.core.rest(s__19264__$1);
s__19264__$1 = G__19277;
continue;
}
} else {
return null;
}
break;
}
});})(paths_to_provides))
,null,null));
});})(paths_to_provides))
;
return iter__6642__auto__(paths_to_provides);
})());
});
/**
 * Retrives the path for a file from (.-dependencies_.nameToPath js/goog). If
 *   not found will returns nil.
 */
replumb.repl.file_path_from_goog_dependencies = (function replumb$repl$file_path_from_goog_dependencies(name){
var temp__4657__auto__ = (goog.dependencies_.nameToPath[[cljs.core.str(name)].join('')]);
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((3),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((3),path)));
} else {
return null;
}
});
/**
 * Retrieves the path for a file from the user provided :foreign-libs option.
 *   If not found, returns nil.
 */
replumb.repl.file_path_from_foreign_libs = (function replumb$repl$file_path_from_foreign_libs(name,foreign_libs){
var temp__4657__auto__ = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__19278_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.first(cljs.core.cst$kw$provides.cljs$core$IFn$_invoke$arity$1(p1__19278_SHARP_)));
}),foreign_libs));
if(temp__4657__auto__){
var foreign_libs__$1 = temp__4657__auto__;
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.drop_last.cljs$core$IFn$_invoke$arity$2((3),cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(cljs.core.first(foreign_libs__$1))));
} else {
return null;
}
});
/**
 * Makes a load function that will read from a sequence of src-paths
 *   using a supplied read-file-fn!. It returns a cljs.js-compatible
 *   *load-fn*. Both src-paths and read-file-fn! are values in the options map
 *   passed as parameter.
 * 
 *   Read-file-fn! is an async 2-arity function with signature [file-path
 *   src-cb] where src-cb is itself a function (fn [source] ...) that needs
 *   to be called with the full source of the library (as string).
 * 
 *   If additionally the user map contains the :cache map the loading process
 *   will consider cached files as follow: if :path is present, it will try to load
 *   the cached files from the given path. If :src-paths-lookup? is present, it
 *   will try to load the cached files from src-paths.
 */
replumb.repl.make_load_fn = (function replumb$repl$make_load_fn(p__19279){
var map__19286 = p__19279;
var map__19286__$1 = ((((!((map__19286 == null)))?((((map__19286.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19286.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19286):map__19286);
var verbose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$verbose);
var src_paths = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$src_DASH_paths);
var read_file_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_);
var cache = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$cache);
var foreign_libs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$foreign_DASH_libs);
var as = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$as);
var user_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19286__$1,cljs.core.cst$kw$user_DASH_opts);
if(cljs.core.truth_((function (){var and__5850__auto__ = read_file_fn_BANG_;
if(cljs.core.truth_(and__5850__auto__)){
return (cljs.core.sequential_QMARK_(src_paths)) && (cljs.core.every_QMARK_(cljs.core.string_QMARK_,src_paths));
} else {
return and__5850__auto__;
}
})())){
return ((function (map__19286,map__19286__$1,verbose,src_paths,read_file_fn_BANG_,cache,foreign_libs,as,user_opts){
return (function (p__19288,cb){
var map__19289 = p__19288;
var map__19289__$1 = ((((!((map__19289 == null)))?((((map__19289.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19289.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19289):map__19289);
var load_map = map__19289__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19289__$1,cljs.core.cst$kw$name);
var macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19289__$1,cljs.core.cst$kw$macros);
var path = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19289__$1,cljs.core.cst$kw$path);
if(cljs.core.truth_(replumb.load.skip_load_QMARK_(load_map))){
return replumb.load.fake_load_fn_BANG_(load_map,cb);
} else {
if(cljs.core.truth_(cljs.core.re_matches(/^goog\/.*/,path))){
var temp__4655__auto__ = replumb.repl.get_goog_path(name);
if(cljs.core.truth_(temp__4655__auto__)){
var goog_path = temp__4655__auto__;
return replumb.load.read_files_and_callback_BANG_(verbose,replumb.load.file_paths_for_closure(src_paths,goog_path),read_file_fn_BANG_,cb);
} else {
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(null) : cb.call(null,null));
}
} else {
var path__$1 = (function (){var or__5862__auto__ = (cljs.core.truth_(goog.DEPENDENCIES_ENABLED)?replumb.repl.file_path_from_goog_dependencies([cljs.core.str(name)].join('')):null);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = replumb.repl.file_path_from_foreign_libs([cljs.core.str(name)].join(''),foreign_libs);
if(cljs.core.truth_(or__5862__auto____$1)){
return or__5862__auto____$1;
} else {
return path;
}
}
})();
var args = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [verbose,replumb.load.file_paths_for_load_fn(src_paths,macros,path__$1),read_file_fn_BANG_,cb], null);
var cache_path = cljs.core.cst$kw$path.cljs$core$IFn$_invoke$arity$1(cache);
var src_paths_lookup_QMARK_ = cljs.core.cst$kw$src_DASH_paths_DASH_lookup_QMARK_.cljs$core$IFn$_invoke$arity$1(cache);
if(cljs.core.truth_((function (){var or__5862__auto__ = cache_path;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return src_paths_lookup_QMARK_;
}
})())){
var cache_paths = (function (){var G__19291 = cljs.core.PersistentVector.EMPTY;
var G__19291__$1 = (cljs.core.truth_(cache_path)?cljs.core.into.cljs$core$IFn$_invoke$arity$2(G__19291,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cache_path], null)):G__19291);
if(cljs.core.truth_(src_paths_lookup_QMARK_)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(G__19291__$1,src_paths);
} else {
return G__19291__$1;
}
})();
var cached_file_paths = replumb.load.cache_file_paths_for_load_fn(cache_paths,macros,path__$1);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(replumb.load.read_files_from_cache_and_callback_BANG_,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(args,cached_file_paths));
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(replumb.load.read_files_and_callback_BANG_,args);
}

}
}
});
;})(map__19286,map__19286__$1,verbose,src_paths,read_file_fn_BANG_,cache,foreign_libs,as,user_opts))
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Invalid :read-file-fn! or :src-paths (is it sequential? Are all paths strings?). No *load-fn* will be passed to cljs.js."], 0));
} else {
}

return null;
}
});
/**
 * Set of valid option used for external input validation.
 */
replumb.repl.valid_opts_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_,null,cljs.core.cst$kw$write_DASH_file_DASH_fn_BANG_,null,cljs.core.cst$kw$verbose,null,cljs.core.cst$kw$cache,null,cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,null,cljs.core.cst$kw$warning_DASH_as_DASH_error,null,cljs.core.cst$kw$context,null,cljs.core.cst$kw$foreign_DASH_libs,null,cljs.core.cst$kw$load_DASH_fn_BANG_,null,cljs.core.cst$kw$target,null,cljs.core.cst$kw$src_DASH_paths,null,cljs.core.cst$kw$init_DASH_fn_BANG_,null], null), null);
/**
 * Validate the input user options. Returns a new map without invalid
 *   ones according to valid-opts-set.
 */
replumb.repl.valid_opts = (function replumb$repl$valid_opts(user_opts){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(replumb.repl.valid_opts_set,cljs.core.first),user_opts));
});
/**
 * Given user provided options, conjoins the default option map for
 *   its :target (string or keyword). Defaults to conjoining :default (browser,
 *   aka :js target).
 */
replumb.repl.add_default_opts = (function replumb$repl$add_default_opts(opts,user_opts){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,(function (){var pred__19295 = cljs.core._EQ_;
var expr__19296 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$target.cljs$core$IFn$_invoke$arity$1(user_opts));
if(cljs.core.truth_((pred__19295.cljs$core$IFn$_invoke$arity$2 ? pred__19295.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$nodejs,expr__19296) : pred__19295.call(null,cljs.core.cst$kw$nodejs,expr__19296)))){
return replumb.nodejs.default_opts;
} else {
return replumb.browser.default_opts;
}
})()], 0));
});
/**
 * Given current and user options, if :load-fn! is present in user-opts,
 *   conjoins it. Try to create and conjoin one from :src-paths
 *   and :read-file-fn! otherwise. Conjoins nil if it cannot.
 */
replumb.repl.add_load_fn = (function replumb$repl$add_load_fn(opts,user_opts){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$load_DASH_fn_BANG_,(function (){var or__5862__auto__ = cljs.core.cst$kw$load_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return replumb.repl.make_load_fn(user_opts);
}
})());
});
/**
 * Given current and user options, returns a map containing a
 *   valid :init-fns,conjoining with the one in current if necessary.
 */
replumb.repl.add_init_fns = (function replumb$repl$add_init_fns(opts,user_opts){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(opts,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$init_DASH_fns], null),(function (init_fns){
var temp__4655__auto__ = cljs.core.cst$kw$init_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(temp__4655__auto__)){
var fn = temp__4655__auto__;
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(init_fns,fn);
} else {
return init_fns;
}
}));
});
/**
 * Process the user options. Returns the map that can be fed to
 *   read-eval-call.
 */
replumb.repl.normalize_opts = (function replumb$repl$normalize_opts(user_opts){
var vld_opts = replumb.repl.valid_opts(user_opts);
return replumb.repl.add_init_fns(replumb.repl.add_load_fn(replumb.repl.add_default_opts(vld_opts,vld_opts),vld_opts),vld_opts);
});
/**
 * Builds the map to return when the evaluation returned success.
 *   Supports the following options:
 * 
 *   * :no-pr-str-on-value avoids wrapping value in pr-str.
 */
replumb.repl.success_map = (function replumb$repl$success_map(opts,form,warning,value){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$success_QMARK_,true,cljs.core.cst$kw$form,form,cljs.core.cst$kw$warning,warning,cljs.core.cst$kw$value,((cljs.core.not(cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts)))?cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([value], 0)):value)], null);
});
/**
 * Builds the map to return when the evaluation returned error.
 */
replumb.repl.error_map = (function replumb$repl$error_map(opts,form,warning,error){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$success_QMARK_,false,cljs.core.cst$kw$form,form,cljs.core.cst$kw$warning,warning,cljs.core.cst$kw$error,error], null);
});
replumb.repl.reset_last_warning_BANG_ = (function replumb$repl$reset_last_warning_BANG_(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$last_DASH_eval_DASH_warning,null);
});
/**
 * Handles the case when the evaluation returns a warning and can be
 *   passed as a warning handler when partially applied. At the moment it
 *   treats warnings as errors.
 */
replumb.repl.custom_warning_handler = (function replumb$repl$custom_warning_handler(opts,cb,warning_type,env,extra){
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("Handling warning:\n"),cljs.core.str((function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19300_19302 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19301_19303 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19300_19302,_STAR_print_fn_STAR_19301_19303,sb__6848__auto__){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19300_19302,_STAR_print_fn_STAR_19301_19303,sb__6848__auto__))
;

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$warning_DASH_type,warning_type,cljs.core.cst$kw$env,env,cljs.core.cst$kw$extra,extra], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19301_19303;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19300_19302;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})())].join('')], 0));
} else {
}

if(cljs.core.truth_((warning_type.cljs$core$IFn$_invoke$arity$1 ? warning_type.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_) : warning_type.call(null,cljs.analyzer._STAR_cljs_warnings_STAR_)))){
var temp__4657__auto__ = (cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2 ? cljs.analyzer.error_message.cljs$core$IFn$_invoke$arity$2(warning_type,extra) : cljs.analyzer.error_message.call(null,warning_type,extra));
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$last_DASH_eval_DASH_warning,cljs.analyzer.message(env,s));
} else {
return null;
}
} else {
return null;
}
});
replumb.repl.validated_call_back_BANG_ = (function replumb$repl$validated_call_back_BANG_(opts,cb,res){
if(cljs.core.map_QMARK_(res)){
} else {
throw (new Error("Assert failed: (map? res)"));
}

if(cljs.core.truth_(cljs.core.find(res,cljs.core.cst$kw$form))){
} else {
throw (new Error("Assert failed: (find res :form)"));
}

if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.find(res,cljs.core.cst$kw$error);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.find(res,cljs.core.cst$kw$value);
}
})())){
} else {
throw (new Error("Assert failed: (or (find res :error) (find res :value))"));
}

if(cljs.core.truth_((function (){var or__5862__auto__ = (function (){var and__5850__auto__ = cljs.core.find(res,cljs.core.cst$kw$value);
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$success_QMARK_);
} else {
return and__5850__auto__;
}
})();
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var and__5850__auto__ = cljs.core.find(res,cljs.core.cst$kw$error);
if(cljs.core.truth_(and__5850__auto__)){
return cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$success_QMARK_));
} else {
return and__5850__auto__;
}
}
})())){
} else {
throw (new Error("Assert failed: (or (and (find res :value) (get res :success?)) (and (find res :error) (not (get res :success?))))"));
}

if(cljs.core.truth_((function (){var or__5862__auto__ = (function (){var and__5850__auto__ = cljs.core.find(res,cljs.core.cst$kw$value);
if(cljs.core.truth_(and__5850__auto__)){
var or__5862__auto__ = (cljs.core.not(cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts))) && (typeof cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$value) === 'string');
if(or__5862__auto__){
return or__5862__auto__;
} else {
var and__5850__auto____$1 = cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__5850__auto____$1)){
return !((res == null));
} else {
return and__5850__auto____$1;
}
}
} else {
return and__5850__auto__;
}
})();
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
var and__5850__auto__ = cljs.core.find(res,cljs.core.cst$kw$error);
if(cljs.core.truth_(and__5850__auto__)){
return (cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$error) instanceof Error);
} else {
return and__5850__auto__;
}
}
})())){
} else {
throw (new Error("Assert failed: (or (and (find res :value) (or (and (not (:no-pr-str-on-value opts)) (string? (get res :value))) (and (:no-pr-str-on-value opts) (not (nil? res))))) (and (find res :error) (instance? js/Error (get res :error))))"));
}

if(cljs.core.truth_((function (){var or__5862__auto__ = cljs.core.not(cljs.core.find(res,cljs.core.cst$kw$warning));
if(or__5862__auto__){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = cljs.core.find(res,cljs.core.cst$kw$warning);
if(cljs.core.truth_(or__5862__auto____$1)){
return or__5862__auto____$1;
} else {
return typeof cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$warning) === 'string';
}
}
})())){
} else {
throw (new Error("Assert failed: (or (not (find res :warning)) (and (find res :warning)) (string? (get res :warning)))"));
}

return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(res) : cb.call(null,res));
});
replumb.repl.validated_init_fn_BANG_ = (function replumb$repl$validated_init_fn_BANG_(init_fn_BANG_,res){
if(cljs.core.map_QMARK_(res)){
} else {
throw (new Error("Assert failed: (map? res)"));
}

if(cljs.core.truth_(cljs.core.find(res,cljs.core.cst$kw$form))){
} else {
throw (new Error("Assert failed: (find res :form)"));
}

if(cljs.core.truth_(cljs.core.find(res,cljs.core.cst$kw$ns))){
} else {
throw (new Error("Assert failed: (find res :ns)"));
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_target_STAR_,cljs.core.get.cljs$core$IFn$_invoke$arity$2(res,cljs.core.cst$kw$target))){
} else {
throw (new Error("Assert failed: (= *target* (get res :target))"));
}

return (init_fn_BANG_.cljs$core$IFn$_invoke$arity$1 ? init_fn_BANG_.cljs$core$IFn$_invoke$arity$1(res) : init_fn_BANG_.call(null,res));
});
/**
 * Execute the correct side effecting function from data.
 *   Handles :side-effect-fn!, :on-error-fn! and :on-success-fn!.
 */
replumb.repl.call_side_effect_BANG_ = (function replumb$repl$call_side_effect_BANG_(data,p__19304){
var map__19307 = p__19304;
var map__19307__$1 = ((((!((map__19307 == null)))?((((map__19307.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19307.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19307):map__19307);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19307__$1,cljs.core.cst$kw$value);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19307__$1,cljs.core.cst$kw$error);
var temp__4655__auto__ = cljs.core.cst$kw$side_DASH_effect_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4655__auto__)){
var f_BANG_ = temp__4655__auto__;
return (f_BANG_.cljs$core$IFn$_invoke$arity$0 ? f_BANG_.cljs$core$IFn$_invoke$arity$0() : f_BANG_.call(null));
} else {
if(cljs.core.not(error)){
var temp__4657__auto__ = cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4657__auto__)){
var s_BANG_ = temp__4657__auto__;
return (s_BANG_.cljs$core$IFn$_invoke$arity$0 ? s_BANG_.cljs$core$IFn$_invoke$arity$0() : s_BANG_.call(null));
} else {
return null;
}
} else {
var temp__4657__auto__ = cljs.core.cst$kw$on_DASH_error_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4657__auto__)){
var e_BANG_ = temp__4657__auto__;
return (e_BANG_.cljs$core$IFn$_invoke$arity$0 ? e_BANG_.cljs$core$IFn$_invoke$arity$0() : e_BANG_.call(null));
} else {
return null;
}
}
}
});
/**
 * Checks if there has been a warning and if so will return a new result
 *   map instead of the input one, potentially with a :warning key
 *   containing the warning message in it.
 * 
 *   The code paths are the following:
 * 
 *   - if the input map was already an :error, there will be no warning,
 *   the original :error is returned.
 *   - if the input map was a :value:
 *  - if (:warning-as-error opts) is truey, the new map will always
 *    contain it as :error, overriding the original.
 *  - if (:warning-as-error opts) is falsey, the new map will contain
 *    the warning as :warning along with the original :value
 */
replumb.repl.warning_error_map_BANG_ = (function replumb$repl$warning_error_map_BANG_(opts,p__19309){
var map__19312 = p__19309;
var map__19312__$1 = ((((!((map__19312 == null)))?((((map__19312.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19312.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19312):map__19312);
var orig = map__19312__$1;
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19312__$1,cljs.core.cst$kw$error);
var temp__4655__auto__ = cljs.core.cst$kw$last_DASH_eval_DASH_warning.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)));
if(cljs.core.truth_(temp__4655__auto__)){
var warning_msg = temp__4655__auto__;
if(cljs.core.not(error)){
if(cljs.core.not(cljs.core.cst$kw$warning_DASH_as_DASH_error.cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(orig,cljs.core.cst$kw$warning,warning_msg);
} else {
var warning_error = cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(warning_msg,replumb.repl.ex_info_data);
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Erroring on last warning: ",warning_msg], 0));
} else {
}

return replumb.common.wrap_error(warning_error);
}
} else {
return orig;
}
} else {
return orig;
}
});
/**
 * Handles the evaluation result, calling the callback in the right way,
 *   based on the success or error of the evaluation. The res parameter
 *   expects the same map as ClojureScript's cljs.js callback,
 *   :value if success and :error if not. The data parameter might contain
 *   additional stuff:
 * 
 *   * :form the source form that has been eval-ed
 *   * :on-success-fn! 0-arity function that will be executed on success
 *   * :on-error-fn! 0-arity function that will be executed on error
 *   * :side-effect-fn! 0-arity function that if present will be executed
 *   for both success and error, effectively disabling the individual
 *   on-success-fn! and on-error-fn!
 * 
 *   Call-back! supports the following opts:
 * 
 *   * :verbose will enable the evaluation logging, defaults to false.
 *   * :no-pr-str-on-value avoids wrapping successful value in a pr-str
 *   * :warning-as-error will consider a warning like an error
 * 
 *   Notes:
 *   1. The opts map passed here overrides the environment options.
 *   2. This function will also clear the :last-eval-warning flag in
 *   app-env.
 *   3. It will execute (:side-effect-fn!) or (on-success-fn!)
 *   and (on-error-fn!)  *before* the callback is called.
 * 
 *   ** Every function in this namespace should call call-back! as
 *   single point of exit. **
 */
replumb.repl.call_back_BANG_ = (function replumb$repl$call_back_BANG_(var_args){
var args19314 = [];
var len__6932__auto___19323 = arguments.length;
var i__6933__auto___19324 = (0);
while(true){
if((i__6933__auto___19324 < len__6932__auto___19323)){
args19314.push((arguments[i__6933__auto___19324]));

var G__19325 = (i__6933__auto___19324 + (1));
i__6933__auto___19324 = G__19325;
continue;
} else {
}
break;
}

var G__19316 = args19314.length;
switch (G__19316) {
case 3:
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19314.length)].join('')));

}
});

replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (opts,cb,res){
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,cljs.core.PersistentArrayMap.EMPTY,res);
});

replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (opts,cb,data,res){
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Calling back!\n",(function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19317_19327 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19318_19328 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19317_19327,_STAR_print_fn_STAR_19318_19328,sb__6848__auto__){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19317_19327,_STAR_print_fn_STAR_19318_19328,sb__6848__auto__))
;

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$opts,replumb.common.filter_fn_keys(opts),cljs.core.cst$kw$data,replumb.common.filter_fn_keys(data),cljs.core.cst$kw$res,res], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19318_19328;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19317_19327;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})()], 0));
} else {
}

var res__$1 = replumb.repl.warning_error_map_BANG_(opts,res);
var map__19319 = res__$1;
var map__19319__$1 = ((((!((map__19319 == null)))?((((map__19319.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19319.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19319):map__19319);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$value);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$error);
var warning = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19319__$1,cljs.core.cst$kw$warning);
replumb.repl.call_side_effect_BANG_(data,res__$1);

replumb.repl.reset_last_warning_BANG_();

if(cljs.core.not(error)){
cljs.core._STAR_e = null;

var G__19321 = replumb.repl.success_map(opts,cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(data),warning,value);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__19321) : cb.call(null,G__19321));
} else {
cljs.core._STAR_e = error;

var G__19322 = replumb.repl.error_map(opts,cljs.core.cst$kw$form.cljs$core$IFn$_invoke$arity$1(data),warning,error);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__19322) : cb.call(null,G__19322));
}
});

replumb.repl.call_back_BANG_.cljs$lang$maxFixedArity = 4;
replumb.repl.process_1_2_3 = (function replumb$repl$process_1_2_3(data,expression_form,value){
if(cljs.core.truth_((function (){var or__5862__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$sym$_STAR_2,null,cljs.core.cst$sym$_STAR_1,null,cljs.core.cst$sym$_STAR_e,null,cljs.core.cst$sym$_STAR_3,null], null), null).call(null,expression_form);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return replumb.repl.ns_form_QMARK_(expression_form);
}
})())){
return null;
} else {
cljs.core._STAR_3 = cljs.core._STAR_2;

cljs.core._STAR_2 = cljs.core._STAR_1;

return cljs.core._STAR_1 = value;
}
});
/**
 * Custom version of cljs.js/eval-str. The only difference is in the
 *   spitting of eval-opts, which is the map which the actual
 *   cljs.js/eval-str needs and usually built by base-eval-opts!, and
 *   user-opts, passed through read-eval-call (same keys supported).
 * 
 *   Additionally, eval-opts might contain:
 * 
 *   * :file-name In case of file loading, indicates its name
 *   * :on-success-fn! 1-arity function that will be executed on success,
 *   the input is the evaluation result
 *   * :on-error-fn! 1-arity function that will be executed on error, the
 *   input is the evaluation result
 *   * :side-effect-fn! 1-arity function that if present will be executed
 *   for both success and error, effectively disabling the individual
 *   on-success-fn! and on-error-fn!. The input is the evaluation result
 */
replumb.repl.eval_str_STAR_ = (function replumb$repl$eval_str_STAR_(eval_opts,user_opts,cb,data,source){
var map__19332 = eval_opts;
var map__19332__$1 = ((((!((map__19332 == null)))?((((map__19332.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19332.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19332):map__19332);
var file_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19332__$1,cljs.core.cst$kw$file_DASH_name);
var on_success_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19332__$1,cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_);
var on_error_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19332__$1,cljs.core.cst$kw$on_DASH_error_DASH_fn_BANG_);
var side_effect_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19332__$1,cljs.core.cst$kw$side_DASH_effect_DASH_fn_BANG_);
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5(replumb.repl.st,source,(cljs.core.truth_(file_name)?file_name:source),eval_opts,((function (map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (res){
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(user_opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Evaluation returned: ",res], 0));
} else {
}

return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(user_opts,cb,(function (){var G__19334 = data;
var G__19334__$1 = (cljs.core.truth_(on_success_fn_BANG_)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19334,cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_,((function (G__19334,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return (on_success_fn_BANG_.cljs$core$IFn$_invoke$arity$1 ? on_success_fn_BANG_.cljs$core$IFn$_invoke$arity$1(res) : on_success_fn_BANG_.call(null,res));
});})(G__19334,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
):G__19334);
var G__19334__$2 = (cljs.core.truth_(on_error_fn_BANG_)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19334__$1,cljs.core.cst$kw$on_DASH_error_DASH_fn_BANG_,((function (G__19334,G__19334__$1,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return (on_error_fn_BANG_.cljs$core$IFn$_invoke$arity$1 ? on_error_fn_BANG_.cljs$core$IFn$_invoke$arity$1(res) : on_error_fn_BANG_.call(null,res));
});})(G__19334,G__19334__$1,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
):G__19334__$1);
if(cljs.core.truth_(side_effect_fn_BANG_)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__19334__$2,cljs.core.cst$kw$side_DASH_effect_DASH_fn_BANG_,((function (G__19334,G__19334__$1,G__19334__$2,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return (side_effect_fn_BANG_.cljs$core$IFn$_invoke$arity$1 ? side_effect_fn_BANG_.cljs$core$IFn$_invoke$arity$1(res) : side_effect_fn_BANG_.call(null,res));
});})(G__19334,G__19334__$1,G__19334__$2,map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
);
} else {
return G__19334__$2;
}
})(),res);
});})(map__19332,map__19332__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
);
});
replumb.repl.process_require = (function replumb$repl$process_require(opts,cb,data,kind,specs){
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.ffirst(specs)))){
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,data,replumb.common.error_argument_must_be_symbol("require",replumb.repl.ex_info_data));
} else {
var is_self_require_QMARK_ = (function (){var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$kind,cljs.core.cst$kw$require);
if(and__5850__auto__){
return replumb.repl.self_require_QMARK_(specs);
} else {
return and__5850__auto__;
}
})();
var vec__19339 = ((cljs.core.not(is_self_require_QMARK_))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env))),null], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$user,cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)))], null));
var target_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19339,(0),null);
var restore_ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19339,(1),null);
var ns_form = replumb.repl.make_ns_form(kind,specs,target_ns);
var restore_ns_BANG_ = ((function (is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form){
return (function (){
if(cljs.core.truth_(is_self_require_QMARK_)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$current_DASH_ns,restore_ns);
} else {
return null;
}
});})(is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form))
;
var purge_ns_BANG_ = ((function (is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_){
return (function (){
return replumb.repl.purge_namespaces_BANG_(target_ns,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.js._STAR_loaded_STAR_) : cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_)));
});})(is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_))
;
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Processing",kind,"via",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([ns_form], 0))], 0));
} else {
}

return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(replumb.repl.st,ns_form,replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(opts),((function (is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_){
return (function (p__19340){
var map__19341 = p__19340;
var map__19341__$1 = ((((!((map__19341 == null)))?((((map__19341.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19341.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19341):map__19341);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19341__$1,cljs.core.cst$kw$error);
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$on_DASH_error_DASH_fn_BANG_,((function (map__19341,map__19341__$1,error,is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_){
return (function (){
purge_ns_BANG_();

return restore_ns_BANG_();
});})(map__19341,map__19341__$1,error,is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_))
,cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_,((function (map__19341,map__19341__$1,error,is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_){
return (function (){
return restore_ns_BANG_();
});})(map__19341,map__19341__$1,error,is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_))
], null)], 0)),(cljs.core.truth_(error)?replumb.common.wrap_error(error):replumb.common.wrap_success(null)));
});})(is_self_require_QMARK_,vec__19339,target_ns,restore_ns,ns_form,restore_ns_BANG_,purge_ns_BANG_))
);
}
});
replumb.repl.doc_map_special_symbols = (function replumb$repl$doc_map_special_symbols(sym){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$sym$_AMPERSAND_,cljs.core.cst$sym$fn,cljs.core.cst$sym$catch,cljs.core.cst$sym$try,cljs.core.cst$sym$finally,cljs.core.cst$sym$try], null),sym,sym);
});
replumb.repl.process_doc = (function replumb$repl$process_doc(opts,cb,data,sym){
var opts__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,true], null)], 0));
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts__$1,cb,data,replumb.common.wrap_success((function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19345_19347 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19346_19348 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19345_19347,_STAR_print_fn_STAR_19346_19348,sb__6848__auto__,opts__$1){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19345_19347,_STAR_print_fn_STAR_19346_19348,sb__6848__auto__,opts__$1))
;

try{var sym_19349__$1 = replumb.repl.doc_map_special_symbols(sym);
if(cljs.core.truth_((replumb.doc_maps.special_doc_map.cljs$core$IFn$_invoke$arity$1 ? replumb.doc_maps.special_doc_map.cljs$core$IFn$_invoke$arity$1(sym_19349__$1) : replumb.doc_maps.special_doc_map.call(null,sym_19349__$1)))){
cljs.repl.print_doc(replumb.doc_maps.special_doc(sym_19349__$1));
} else {
if(cljs.core.truth_((replumb.doc_maps.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1 ? replumb.doc_maps.repl_special_doc_map.cljs$core$IFn$_invoke$arity$1(sym_19349__$1) : replumb.doc_maps.repl_special_doc_map.call(null,sym_19349__$1)))){
cljs.repl.print_doc(replumb.doc_maps.repl_special_doc(sym_19349__$1));
} else {
if(cljs.core.truth_(replumb.ast.namespace((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),sym_19349__$1))){
cljs.repl.print_doc(cljs.core.select_keys(replumb.ast.namespace((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),sym_19349__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$name,cljs.core.cst$kw$doc], null)));
} else {
cljs.repl.print_doc(replumb.repl.get_var(opts__$1,replumb.repl.empty_analyzer_env(),sym_19349__$1));

}
}
}
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19346_19348;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19345_19347;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})()));
});
replumb.repl.process_pst = (function replumb$repl$process_pst(opts,cb,data,expr){
var temp__4655__auto__ = (function (){var or__5862__auto__ = expr;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.cst$sym$_STAR_e;
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var expr__$1 = temp__4655__auto__;
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(replumb.repl.st,expr__$1,replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(opts),((function (expr__$1,temp__4655__auto__){
return (function (p__19353){
var map__19354 = p__19353;
var map__19354__$1 = ((((!((map__19354 == null)))?((((map__19354.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19354.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19354):map__19354);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19354__$1,cljs.core.cst$kw$value);
var msg = (cljs.core.truth_(value)?replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3(true,true,value):"nil");
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,true),cb,data,replumb.common.wrap_success(msg));
});})(expr__$1,temp__4655__auto__))
);
} else {
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,data,replumb.common.wrap_success(null));
}
});
replumb.repl.process_in_ns = (function replumb$repl$process_in_ns(opts,cb,data,ns_string){
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(replumb.repl.st,ns_string,replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(opts),(function (p__19359){
var map__19360 = p__19359;
var map__19360__$1 = ((((!((map__19360 == null)))?((((map__19360.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19360.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19360):map__19360);
var result = map__19360__$1;
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19360__$1,cljs.core.cst$kw$error);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19360__$1,cljs.core.cst$kw$value);
if(cljs.core.truth_(error)){
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,data,result);
} else {
var ns_symbol = value;
if(!((ns_symbol instanceof cljs.core.Symbol))){
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,data,replumb.common.error_argument_must_be_symbol("in-ns",replumb.repl.ex_info_data));
} else {
if(cljs.core.truth_(cljs.core.some(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,ns_symbol),replumb.ast.known_namespaces((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)))))){
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$side_DASH_effect_DASH_fn_BANG_,((function (ns_symbol,map__19360,map__19360__$1,result,error,value){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$current_DASH_ns,ns_symbol);
});})(ns_symbol,map__19360,map__19360__$1,result,error,value))
], null)], 0)),replumb.common.wrap_success(null));
} else {
var ns_form = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ns),(function (){var x__6696__auto__ = ns_symbol;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4(replumb.repl.st,ns_form,replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.partial.cljs$core$IFn$_invoke$arity$4(replumb.repl.call_back_BANG_,opts,cb,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_,((function (ns_form,ns_symbol,map__19360,map__19360__$1,result,error,value){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$current_DASH_ns,ns_symbol);
});})(ns_form,ns_symbol,map__19360,map__19360__$1,result,error,value))
], null)], 0))));
}
}
}
}));
});
replumb.repl.fetch_source = (function replumb$repl$fetch_source(p__19362,var$,paths_to_try,cb){
var map__19372 = p__19362;
var map__19372__$1 = ((((!((map__19372 == null)))?((((map__19372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19372):map__19372);
var verbose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19372__$1,cljs.core.cst$kw$verbose);
var read_file_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19372__$1,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_);
if(cljs.core.truth_(read_file_fn_BANG_)){
return replumb.load.read_files_and_callback_BANG_(verbose,paths_to_try,read_file_fn_BANG_,((function (map__19372,map__19372__$1,verbose,read_file_fn_BANG_){
return (function (result){
if(cljs.core.truth_(result)){
var _STAR_cljs_ns_STAR_19374 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_19375 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_19376 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol19377 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env)));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{var source = cljs.core.cst$kw$source.cljs$core$IFn$_invoke$arity$1(result);
var rdr = cljs.tools.reader.reader_types.source_logging_push_back_reader.cljs$core$IFn$_invoke$arity$1(source);
var n__6777__auto___19381 = (cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(var$) - (1));
var __19382 = (0);
while(true){
if((__19382 < n__6777__auto___19381)){
cljs.tools.reader.impl.commons.skip_line(rdr);

var G__19383 = (__19382 + (1));
__19382 = G__19383;
continue;
} else {
}
break;
}

var G__19378 = replumb.common.wrap_success(cljs.core.cst$kw$source.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(replumb.repl.read(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$read_DASH_cond,cljs.core.cst$kw$allow,cljs.core.cst$kw$features,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs,null], null), null)], null),rdr))));
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__19378) : cb.call(null,G__19378));
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol19377;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19376;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_19375;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_19374;
}} else {
var G__19379 = replumb.common.wrap_success("nil");
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__19379) : cb.call(null,G__19379));
}
});})(map__19372,map__19372__$1,verbose,read_file_fn_BANG_))
);
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["No :read-file-fn! provided, skipping source fetching..."], 0));
} else {
}

var G__19380 = replumb.common.wrap_success("nil");
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__19380) : cb.call(null,G__19380));
}
});
replumb.repl.process_source = (function replumb$repl$process_source(opts,cb,data,sym){
var var$ = replumb.repl.get_var(opts,replumb.repl.empty_analyzer_env(),sym);
var call_back = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(replumb.repl.call_back_BANG_,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,true], null)], 0)),cb,data);
var temp__4655__auto__ = (function (){var or__5862__auto__ = cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(var$);
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.cst$kw$file.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$meta.cljs$core$IFn$_invoke$arity$1(var$));
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var full_path_or_ns = temp__4655__auto__;
var paths_to_try = ((!((full_path_or_ns instanceof cljs.core.Symbol)))?replumb.load.file_paths(cljs.core.cst$kw$src_DASH_paths.cljs$core$IFn$_invoke$arity$1(opts),full_path_or_ns):replumb.load.file_paths_for_load_fn(cljs.core.cst$kw$src_DASH_paths.cljs$core$IFn$_invoke$arity$1(opts),replumb.repl.macro_QMARK_(var$),cljs.js.ns__GT_relpath(full_path_or_ns)));
return replumb.repl.fetch_source(opts,var$,paths_to_try,call_back);
} else {
var G__19385 = replumb.common.wrap_success("nil");
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19385) : call_back.call(null,G__19385));
}
});
replumb.repl.process_dir = (function replumb$repl$process_dir(opts,cb,data,sym){
var vars = cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.keys(replumb.ast.ns_publics((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),sym)));
var call_back = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(replumb.repl.call_back_BANG_,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,true], null)], 0)),cb,data);
if(cljs.core.seq(vars)){
var G__19388 = replumb.common.wrap_success(clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",vars));
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19388) : call_back.call(null,G__19388));
} else {
var G__19389 = replumb.common.wrap_success("nil");
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19389) : call_back.call(null,G__19389));
}
});
replumb.repl.process_apropos = (function replumb$repl$process_apropos(opts,cb,data,str_or_pattern){
var matches_QMARK_ = (((str_or_pattern instanceof RegExp))?(function (p1__19390_SHARP_){
return cljs.core.re_find(str_or_pattern,[cljs.core.str(p1__19390_SHARP_)].join(''));
}):(function (p1__19391_SHARP_){
return ((-1) < [cljs.core.str(p1__19391_SHARP_)].join('').indexOf([cljs.core.str(str_or_pattern)].join('')));
}));
var defs = cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (matches_QMARK_){
return (function (ns){
var ns_name = [cljs.core.str(ns)].join('');
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (ns_name,matches_QMARK_){
return (function (p1__19392_SHARP_){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(ns_name,[cljs.core.str(p1__19392_SHARP_)].join(''));
});})(ns_name,matches_QMARK_))
,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(matches_QMARK_,cljs.core.keys(replumb.ast.ns_publics((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),ns))));
});})(matches_QMARK_))
,cljs.core.array_seq([replumb.ast.known_namespaces((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)))], 0)));
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,data,replumb.common.wrap_success(cljs.core.seq(defs)));
});
replumb.repl.process_find_doc = (function replumb$repl$process_find_doc(opts,cb,data,re_string_or_pattern){
var re = cljs.core.re_pattern(re_string_or_pattern);
var ms = cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (re){
return (function (ns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (re){
return (function (m){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.select_keys(m,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$doc,cljs.core.cst$kw$forms,cljs.core.cst$kw$arglists,cljs.core.cst$kw$macro,cljs.core.cst$kw$url], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$name], null),((function (re){
return (function (p1__19393_SHARP_){
if(!((p1__19393_SHARP_ == null))){
return cljs.core.name(p1__19393_SHARP_);
} else {
return p1__19393_SHARP_;
}
});})(re))
);
});})(re))
,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name,cljs.core.vals(replumb.ast.ns_interns((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),ns))));
});})(re))
,cljs.core.array_seq([replumb.ast.known_namespaces((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)))], 0)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (re){
return (function (p1__19394_SHARP_){
return cljs.core.select_keys(replumb.ast.namespace((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)),p1__19394_SHARP_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$name,cljs.core.cst$kw$doc], null));
});})(re))
,replumb.ast.known_namespaces((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.st) : cljs.core.deref.call(null,replumb.repl.st)))),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(replumb.doc_maps.special_doc,cljs.core.keys(replumb.doc_maps.special_doc_map))], 0));
var ms__$1 = (function (){var iter__6642__auto__ = ((function (re,ms){
return (function replumb$repl$process_find_doc_$_iter__19408(s__19409){
return (new cljs.core.LazySeq(null,((function (re,ms){
return (function (){
var s__19409__$1 = s__19409;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__19409__$1);
if(temp__4657__auto__){
var s__19409__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__19409__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__19409__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__19411 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__19410 = (0);
while(true){
if((i__19410 < size__6641__auto__)){
var m = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__19410);
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(and__5850__auto__)){
var or__5862__auto__ = cljs.core.re_find(re,cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.re_find(re,[cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
return and__5850__auto__;
}
})())){
cljs.core.chunk_append(b__19411,m);

var G__19420 = (i__19410 + (1));
i__19410 = G__19420;
continue;
} else {
var G__19421 = (i__19410 + (1));
i__19410 = G__19421;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__19411),replumb$repl$process_find_doc_$_iter__19408(cljs.core.chunk_rest(s__19409__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__19411),null);
}
} else {
var m = cljs.core.first(s__19409__$2);
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(and__5850__auto__)){
var or__5862__auto__ = cljs.core.re_find(re,cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m));
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.re_find(re,[cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
return and__5850__auto__;
}
})())){
return cljs.core.cons(m,replumb$repl$process_find_doc_$_iter__19408(cljs.core.rest(s__19409__$2)));
} else {
var G__19422 = cljs.core.rest(s__19409__$2);
s__19409__$1 = G__19422;
continue;
}
}
} else {
return null;
}
break;
}
});})(re,ms))
,null,null));
});})(re,ms))
;
return iter__6642__auto__(ms);
})();
var call_back = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(replumb.repl.call_back_BANG_,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([opts,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$no_DASH_pr_DASH_str_DASH_on_DASH_value,true], null)], 0)),cb,data);
if(cljs.core.seq(ms__$1)){
var G__19416 = replumb.common.wrap_success(clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (re,ms,ms__$1,call_back){
return (function (p1__19395_SHARP_){
var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19417_19423 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19418_19424 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19417_19423,_STAR_print_fn_STAR_19418_19424,sb__6848__auto__,re,ms,ms__$1,call_back){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19417_19423,_STAR_print_fn_STAR_19418_19424,sb__6848__auto__,re,ms,ms__$1,call_back))
;

try{cljs.repl.print_doc(p1__19395_SHARP_);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19418_19424;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19417_19423;
}
return [cljs.core.str(sb__6848__auto__)].join('');
});})(re,ms,ms__$1,call_back))
,ms__$1)));
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19416) : call_back.call(null,G__19416));
} else {
var G__19419 = replumb.common.wrap_success("nil");
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19419) : call_back.call(null,G__19419));
}
});
replumb.repl.last_form = (function replumb$repl$last_form(source){
var rdr = cljs.tools.reader.reader_types.string_push_back_reader.cljs$core$IFn$_invoke$arity$1(source);
var eof = {};
var read = ((function (rdr,eof){
return (function (){
return replumb.repl.read(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$eof,eof], null),rdr);
});})(rdr,eof))
;
var first_form = read();
var second_form = read();
while(true){
if((eof === second_form)){
return first_form;
} else {
var G__19429 = second_form;
var G__19430 = read();
first_form = G__19429;
second_form = G__19430;
continue;
}
break;
}
});
replumb.repl.process_load_file = (function replumb$repl$process_load_file(p__19431,cb,data,file_name){
var map__19439 = p__19431;
var map__19439__$1 = ((((!((map__19439 == null)))?((((map__19439.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19439.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19439):map__19439);
var opts = map__19439__$1;
var verbose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19439__$1,cljs.core.cst$kw$verbose);
var read_file_fn_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19439__$1,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_);
var src_paths = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19439__$1,cljs.core.cst$kw$src_DASH_paths);
var call_back = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(replumb.repl.call_back_BANG_,opts,cb,data);
if(cljs.core.truth_(read_file_fn_BANG_)){
return replumb.load.read_files_and_callback_BANG_(verbose,replumb.load.file_paths(src_paths,file_name),read_file_fn_BANG_,((function (call_back,map__19439,map__19439__$1,opts,verbose,read_file_fn_BANG_,src_paths){
return (function (p__19441){
var map__19442 = p__19441;
var map__19442__$1 = ((((!((map__19442 == null)))?((((map__19442.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19442.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19442):map__19442);
var result = map__19442__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19442__$1,cljs.core.cst$kw$source);
if(cljs.core.truth_(result)){
return replumb.repl.eval_str_STAR_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(replumb.repl.load_eval_opts_BANG_(opts,file_name),cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_,((function (map__19442,map__19442__$1,result,source,call_back,map__19439,map__19439__$1,opts,verbose,read_file_fn_BANG_,src_paths){
return (function (eval_res){
return replumb.repl.process_1_2_3(data,replumb.repl.last_form(source),cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(eval_res));
});})(map__19442,map__19442__$1,result,source,call_back,map__19439,map__19439__$1,opts,verbose,read_file_fn_BANG_,src_paths))
),opts,cb,data,source);
} else {
var G__19444 = replumb.common.wrap_error(cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2([cljs.core.str("Could not load file "),cljs.core.str(file_name)].join(''),replumb.repl.ex_info_data));
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19444) : call_back.call(null,G__19444));
}
});})(call_back,map__19439,map__19439__$1,opts,verbose,read_file_fn_BANG_,src_paths))
);
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["No :read-file-fn! provided, skipping file loading..."], 0));
} else {
}

var G__19445 = replumb.common.wrap_success(null);
return (call_back.cljs$core$IFn$_invoke$arity$1 ? call_back.cljs$core$IFn$_invoke$arity$1(G__19445) : call_back.call(null,G__19445));
}
});
replumb.repl.process_repl_special = (function replumb$repl$process_repl_special(opts,cb,data,expression_form){
var argument = cljs.core.second(expression_form);
var G__19447 = cljs.core.first(expression_form);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$find_DASH_doc,G__19447)){
return replumb.repl.process_find_doc(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$dir,G__19447)){
return replumb.repl.process_dir(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$import,G__19447)){
return replumb.repl.process_require(opts,cb,data,cljs.core.cst$kw$import,cljs.core.rest(expression_form));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$require_DASH_macros,G__19447)){
return replumb.repl.process_require(opts,cb,data,cljs.core.cst$kw$require_DASH_macros,cljs.core.rest(expression_form));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$pst,G__19447)){
return replumb.repl.process_pst(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$load_DASH_file,G__19447)){
return replumb.repl.process_load_file(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$source,G__19447)){
return replumb.repl.process_source(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$doc,G__19447)){
return replumb.repl.process_doc(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$in_DASH_ns,G__19447)){
return replumb.repl.process_in_ns(opts,cb,data,argument);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$require,G__19447)){
return replumb.repl.process_require(opts,cb,data,cljs.core.cst$kw$require,cljs.core.rest(expression_form));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$apropos,G__19447)){
return replumb.repl.process_apropos(opts,cb,data,argument);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.first(expression_form))].join('')));

}
}
}
}
}
}
}
}
}
}
}
});
replumb.repl.init_option_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$src_DASH_paths,null,cljs.core.cst$kw$init_DASH_fn_BANG_,null], null), null);
/**
 * If we are not already :initializing? and :needs-init? is true, then
 *   move to the "Initializing" state, signaling that the init is in
 *   progress.
 */
replumb.repl.initializing_state = (function replumb$repl$initializing_state(old_app_env){
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.not(cljs.core.cst$kw$initializing_QMARK_.cljs$core$IFn$_invoke$arity$1(old_app_env));
if(and__5850__auto__){
return cljs.core.cst$kw$needs_DASH_init_QMARK_.cljs$core$IFn$_invoke$arity$1(old_app_env);
} else {
return and__5850__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(old_app_env,cljs.core.cst$kw$initializing_QMARK_,true);
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(old_app_env,cljs.core.cst$kw$needs_DASH_init_QMARK_,false);
}
});
/**
 * Move the state to "Initialized", signaling that the init is not in
 *   progress and done.
 */
replumb.repl.initialized_state = (function replumb$repl$initialized_state(old_app_env){
if(cljs.core.truth_(cljs.core.cst$kw$needs_DASH_init_QMARK_.cljs$core$IFn$_invoke$arity$1(old_app_env))){
} else {
throw (new Error("Assert failed: (:needs-init? old-app-env)"));
}

if(cljs.core.truth_(cljs.core.cst$kw$initializing_QMARK_.cljs$core$IFn$_invoke$arity$1(old_app_env))){
} else {
throw (new Error("Assert failed: (:initializing? old-app-env)"));
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([old_app_env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$initializing_QMARK_,false,cljs.core.cst$kw$needs_DASH_init_QMARK_,false], null)], 0));
});
/**
 * Just assoc the options to persist to the input map.
 */
replumb.repl.auto_init_opts = (function replumb$repl$auto_init_opts(opts){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__19448_SHARP_){
var G__19450 = cljs.core.first(p1__19448_SHARP_);
return (replumb.repl.init_option_set.cljs$core$IFn$_invoke$arity$1 ? replumb.repl.init_option_set.cljs$core$IFn$_invoke$arity$1(G__19450) : replumb.repl.init_option_set.call(null,G__19450));
}),opts));
});
/**
 * Reset the initialization state, moving to "Needs Init", signaling
 *   that the we need to initialize the app.
 */
replumb.repl.needs_init_state = (function replumb$repl$needs_init_state(old_app_env){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([old_app_env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$initializing_QMARK_,false,cljs.core.cst$kw$needs_DASH_init_QMARK_,true], null)], 0));
});
/**
 * Update the :previous-auto-init-opts and, if necessary, also
 *   turns :needs-init? to true, concretely deciding whether when need to
 *   initialise again. Move the state to "Needs Init".
 */
replumb.repl.needs_init_from_opts_state = (function replumb$repl$needs_init_from_opts_state(old_app_env,new_opts){
if(!(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$previous_DASH_init_DASH_opts.cljs$core$IFn$_invoke$arity$1(old_app_env),replumb.repl.auto_init_opts(new_opts)))){
return replumb.repl.needs_init_state(old_app_env);
} else {
return old_app_env;
}
});
/**
 * Force the initialization at the next read-eval-call. Use this every
 *   time an option that needs to be read at initialization time changes,
 *   e.g. :source-path. In the future this will be automated.
 */
replumb.repl.force_init_BANG_ = (function replumb$repl$force_init_BANG_(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(replumb.repl.app_env,replumb.repl.needs_init_state);
});
/**
 * Persist the options necessary to the initialization FSM to work.
 */
replumb.repl.persist_init_opts_BANG_ = (function replumb$repl$persist_init_opts_BANG_(opts){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$previous_DASH_init_DASH_opts,replumb.repl.auto_init_opts(opts));
});
/**
 * Reset the initialization persisted options.
 */
replumb.repl.reset_init_opts_BANG_ = (function replumb$repl$reset_init_opts_BANG_(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$previous_DASH_init_DASH_opts,cljs.core.PersistentArrayMap.EMPTY);
});
/**
 * Create and swap in app-env a map from Google Closure provide string
 *   to their respective path (without extension).  It merges with the
 *   current map if many deps.js are on the source path, precedence to the
 *   last (as per merge).
 */
replumb.repl.init_closure_index_BANG_ = (function replumb$repl$init_closure_index_BANG_(opts){
var verbose_QMARK_ = cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts);
var read_file_BANG_ = cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_.cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(read_file_BANG_)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Discovering goog/deps.js in",cljs.core.cst$kw$src_DASH_paths.cljs$core$IFn$_invoke$arity$1(opts)], 0));
} else {
}

var seq__19459 = cljs.core.seq(cljs.core.cst$kw$src_DASH_paths.cljs$core$IFn$_invoke$arity$1(opts));
var chunk__19460 = null;
var count__19461 = (0);
var i__19462 = (0);
while(true){
if((i__19462 < count__19461)){
var path = chunk__19460.cljs$core$IIndexed$_nth$arity$2(null,i__19462);
var goog_deps_path_19467 = [cljs.core.str(replumb.common.normalize_path(path)),cljs.core.str("goog/deps.js")].join('');
var G__19463_19468 = goog_deps_path_19467;
var G__19464_19469 = ((function (seq__19459,chunk__19460,count__19461,i__19462,G__19463_19468,goog_deps_path_19467,path,verbose_QMARK_,read_file_BANG_){
return (function (content){
if(cljs.core.truth_(content)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Found valid",goog_deps_path_19467], 0));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(replumb.repl.app_env,cljs.core.update,cljs.core.cst$kw$goog_DASH_provide_DASH__GT_path,cljs.core.merge,cljs.core.array_seq([replumb.repl.goog_deps_map(content)], 0));
} else {
return null;
}
});})(seq__19459,chunk__19460,count__19461,i__19462,G__19463_19468,goog_deps_path_19467,path,verbose_QMARK_,read_file_BANG_))
;
(read_file_BANG_.cljs$core$IFn$_invoke$arity$2 ? read_file_BANG_.cljs$core$IFn$_invoke$arity$2(G__19463_19468,G__19464_19469) : read_file_BANG_.call(null,G__19463_19468,G__19464_19469));

var G__19470 = seq__19459;
var G__19471 = chunk__19460;
var G__19472 = count__19461;
var G__19473 = (i__19462 + (1));
seq__19459 = G__19470;
chunk__19460 = G__19471;
count__19461 = G__19472;
i__19462 = G__19473;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__19459);
if(temp__4657__auto__){
var seq__19459__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__19459__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__19459__$1);
var G__19474 = cljs.core.chunk_rest(seq__19459__$1);
var G__19475 = c__6673__auto__;
var G__19476 = cljs.core.count(c__6673__auto__);
var G__19477 = (0);
seq__19459 = G__19474;
chunk__19460 = G__19475;
count__19461 = G__19476;
i__19462 = G__19477;
continue;
} else {
var path = cljs.core.first(seq__19459__$1);
var goog_deps_path_19478 = [cljs.core.str(replumb.common.normalize_path(path)),cljs.core.str("goog/deps.js")].join('');
var G__19465_19479 = goog_deps_path_19478;
var G__19466_19480 = ((function (seq__19459,chunk__19460,count__19461,i__19462,G__19465_19479,goog_deps_path_19478,path,seq__19459__$1,temp__4657__auto__,verbose_QMARK_,read_file_BANG_){
return (function (content){
if(cljs.core.truth_(content)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Found valid",goog_deps_path_19478], 0));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(replumb.repl.app_env,cljs.core.update,cljs.core.cst$kw$goog_DASH_provide_DASH__GT_path,cljs.core.merge,cljs.core.array_seq([replumb.repl.goog_deps_map(content)], 0));
} else {
return null;
}
});})(seq__19459,chunk__19460,count__19461,i__19462,G__19465_19479,goog_deps_path_19478,path,seq__19459__$1,temp__4657__auto__,verbose_QMARK_,read_file_BANG_))
;
(read_file_BANG_.cljs$core$IFn$_invoke$arity$2 ? read_file_BANG_.cljs$core$IFn$_invoke$arity$2(G__19465_19479,G__19466_19480) : read_file_BANG_.call(null,G__19465_19479,G__19466_19480));

var G__19481 = cljs.core.next(seq__19459__$1);
var G__19482 = null;
var G__19483 = (0);
var G__19484 = (0);
seq__19459 = G__19481;
chunk__19460 = G__19482;
count__19461 = G__19483;
i__19462 = G__19484;
continue;
}
} else {
return null;
}
}
break;
}
} else {
if(cljs.core.truth_(verbose_QMARK_)){
return replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["No :read-file-fn! provided, skipping goog/deps.js discovering..."], 0));
} else {
return null;
}
}
});
/**
 * The init-repl function. It uses the following opts keys:
 * 
 *   * :init-fns initialization function vector, it will be executed in
 *   order
 * 
 *   Data is passed from outside and will be forwarded to :init-fn!.
 */
replumb.repl.init_repl_BANG_ = (function replumb$repl$init_repl_BANG_(opts,data){
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Initializing REPL environment with data",(function (){var sb__6848__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19491_19497 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19492_19498 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19491_19497,_STAR_print_fn_STAR_19492_19498,sb__6848__auto__){
return (function (x__6849__auto__){
return sb__6848__auto__.append(x__6849__auto__);
});})(_STAR_print_newline_STAR_19491_19497,_STAR_print_fn_STAR_19492_19498,sb__6848__auto__))
;

try{cljs.pprint.pprint.cljs$core$IFn$_invoke$arity$1(data);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19492_19498;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19491_19497;
}
return [cljs.core.str(sb__6848__auto__)].join('');
})()], 0));
} else {
}

var init_fns_19499 = cljs.core.cst$kw$init_DASH_fns.cljs$core$IFn$_invoke$arity$1(opts);
if((cljs.core.count(init_fns_19499) > (0))){
} else {
throw (new Error("Assert failed: (> (count init-fns) 0)"));
}

var seq__19493_19500 = cljs.core.seq(init_fns_19499);
var chunk__19494_19501 = null;
var count__19495_19502 = (0);
var i__19496_19503 = (0);
while(true){
if((i__19496_19503 < count__19495_19502)){
var init_fn_BANG__19504 = chunk__19494_19501.cljs$core$IIndexed$_nth$arity$2(null,i__19496_19503);
(init_fn_BANG__19504.cljs$core$IFn$_invoke$arity$1 ? init_fn_BANG__19504.cljs$core$IFn$_invoke$arity$1(data) : init_fn_BANG__19504.call(null,data));

var G__19505 = seq__19493_19500;
var G__19506 = chunk__19494_19501;
var G__19507 = count__19495_19502;
var G__19508 = (i__19496_19503 + (1));
seq__19493_19500 = G__19505;
chunk__19494_19501 = G__19506;
count__19495_19502 = G__19507;
i__19496_19503 = G__19508;
continue;
} else {
var temp__4657__auto___19509 = cljs.core.seq(seq__19493_19500);
if(temp__4657__auto___19509){
var seq__19493_19510__$1 = temp__4657__auto___19509;
if(cljs.core.chunked_seq_QMARK_(seq__19493_19510__$1)){
var c__6673__auto___19511 = cljs.core.chunk_first(seq__19493_19510__$1);
var G__19512 = cljs.core.chunk_rest(seq__19493_19510__$1);
var G__19513 = c__6673__auto___19511;
var G__19514 = cljs.core.count(c__6673__auto___19511);
var G__19515 = (0);
seq__19493_19500 = G__19512;
chunk__19494_19501 = G__19513;
count__19495_19502 = G__19514;
i__19496_19503 = G__19515;
continue;
} else {
var init_fn_BANG__19516 = cljs.core.first(seq__19493_19510__$1);
(init_fn_BANG__19516.cljs$core$IFn$_invoke$arity$1 ? init_fn_BANG__19516.cljs$core$IFn$_invoke$arity$1(data) : init_fn_BANG__19516.call(null,data));

var G__19517 = cljs.core.next(seq__19493_19510__$1);
var G__19518 = null;
var G__19519 = (0);
var G__19520 = (0);
seq__19493_19500 = G__19517;
chunk__19494_19501 = G__19518;
count__19495_19502 = G__19519;
i__19496_19503 = G__19520;
continue;
}
} else {
}
}
break;
}

replumb.repl.init_closure_index_BANG_(opts);

return replumb.repl.persist_init_opts_BANG_(opts);
});
replumb.repl.init_repl_if_necessary_BANG_ = (function replumb$repl$init_repl_if_necessary_BANG_(opts,data){
if(cljs.core.truth_(cljs.core.cst$kw$needs_DASH_init_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(replumb.repl.app_env,(function (p1__19521_SHARP_){
return replumb.repl.initializing_state(replumb.repl.needs_init_from_opts_state(p1__19521_SHARP_,opts));
}))))){
replumb.repl.init_repl_BANG_(opts,data);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(replumb.repl.app_env,replumb.repl.initialized_state);
} else {
return null;
}
});
/**
 * Reads, evaluates and calls back with the evaluation result.
 * 
 *   The first parameter is a map of configuration options, currently
 *   supporting:
 * 
 *   * :verbose - will enable the evaluation logging, defaults to false.
 *   To customize how to print, use (set! *print-fn* (fn [& args] ...)
 * 
 *   * :warning-as-error - will consider a compiler warning as error.
 * 
 *   * :target - :nodejs and :browser supported, the latter is used if
 *   missing.
 * 
 *   * :init-fn! - user provided initialization function, it will be passed
 *   a map of data currently containing:
 * 
 *    :form   ;; the form to evaluate, as data, past the reader step
 *    :ns     ;; the current namespace, as symbol
 *    :target ;; *target* as keyword, :default is the default
 * 
 *   * :load-fn! - will override replumb's default cljs.js/*load-fn*.
 *   It rules out :read-file-fn!, losing any perk of using replumb.load
 *   helpers. Use it if you know what you are doing and keep in mind
 *   that :load-fn! is never used with load-file. It is the only case where
 *   it does not take precedence over :read-file-fn!.
 * 
 *   * :read-file-fn! an asynchronous 2-arity function with signature
 *   [file-path src-cb] where src-cb is itself a function (fn [source] ...)
 *   that needs to be called with the file content as string (nil if no
 *   file is found). It is mutually exclusive with :load-fn! and will be
 *   ignored in case both are present.
 * 
 *   * :write-file-fn! a synchronous 2-arity function with signature
 *   [file-path data] that accepts a file-path and data to write.
 * 
 *   * :src-paths - a vector of paths containing source files.
 * 
 *   * :cache - a map containing two optional values: the first, :path, indicates
 *   the path of the cached files. The second, :src-paths-lookup?, indicates
 *   if look for cached files in :src-paths. If both present, :path will have
 *   the priority but both will be inspected.
 * 
 *   * :no-pr-str-on-value - in case of :success? avoid converting the
 *   result map :value to string.
 * 
 *   * :context - indicates the evaluation context that will be passed to
 *   cljs/eval-str. One in :expr, :statement, :return. Defaults to :expr.
 * 
 *   * :foreign-libs - a way to include foreign libraries. The format is analogous
 *   to the compiler option.
 * 
 *   The second parameter cb, is a 1-arity function which receives the
 *   result map.
 * 
 *   Therefore, given cb (fn [result-map] ...), the main map keys are:
 * 
 *   :success? - a boolean indicating if everything went right
 *   :value    - (if (:success? result)), this key contains the yielded value as
 *            string, unless :no-pr-str-on-value is true, in which case it
 *            returns the bare value.
 *   :error    - (if-not (:success? result)) will contain a js/Error
 *   :warning  - in case a warning was thrown and :warning-as-error is falsey
 *   :form     - the evaluated form as data structure (not a string)
 * 
 *   The third parameter is the source string to be read and evaluated.
 * 
 *   It initializes the repl harness either on first execution or if an
 *   option in #{:src-paths :init-fn!} changes from the previous
 *   read-eval-call.
 */
replumb.repl.read_eval_call = (function replumb$repl$read_eval_call(opts,cb,source){
try{var expression_form = replumb.repl.read_string(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$read_DASH_cond,cljs.core.cst$kw$allow,cljs.core.cst$kw$features,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs,null], null), null)], null),source);
var opts__$1 = replumb.repl.normalize_opts(opts);
var data = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$form,expression_form,cljs.core.cst$kw$ns,cljs.core.cst$kw$current_DASH_ns.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(replumb.repl.app_env) : cljs.core.deref.call(null,replumb.repl.app_env))),cljs.core.cst$kw$target,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_target_STAR_)], null);
replumb.repl.init_repl_if_necessary_BANG_(opts__$1,data);

if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts__$1))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Calling eval-str on",expression_form,"with options",replumb.common.filter_fn_keys(opts__$1)], 0));
} else {
}

var _STAR_cljs_warning_handlers_STAR_19525 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.partial.cljs$core$IFn$_invoke$arity$3(replumb.repl.custom_warning_handler,opts__$1,cb)], null);

try{if(cljs.core.truth_(replumb.repl.repl_special_QMARK_(expression_form))){
return replumb.repl.process_repl_special(opts__$1,cb,data,expression_form);
} else {
return replumb.repl.eval_str_STAR_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1(opts__$1),cljs.core.cst$kw$on_DASH_success_DASH_fn_BANG_,((function (_STAR_cljs_warning_handlers_STAR_19525,expression_form,opts__$1,data){
return (function (eval_res){
replumb.repl.process_1_2_3(data,expression_form,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(eval_res));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(replumb.repl.app_env,cljs.core.assoc,cljs.core.cst$kw$current_DASH_ns,cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(eval_res));
});})(_STAR_cljs_warning_handlers_STAR_19525,expression_form,opts__$1,data))
),opts__$1,cb,data,source);
}
}finally {cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR_19525;
}}catch (e19524){var e = e19524;
if(cljs.core.truth_(cljs.core.cst$kw$verbose.cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Exception caught in read-eval-call: ",e.stack], 0));
} else {
}

return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4(opts,cb,cljs.core.PersistentArrayMap.EMPTY,replumb.common.wrap_error(e));
}});
