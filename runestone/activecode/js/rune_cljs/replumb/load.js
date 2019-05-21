// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.load');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('replumb.cache');
goog.require('clojure.string');
goog.require('replumb.common');
goog.require('cljs.reader');
/**
 * This load function just calls:
 *   (cb {:lang   :js
 *     :source ""})
 */
replumb.load.fake_load_fn_BANG_ = (function replumb$load$fake_load_fn_BANG_(_,cb){
var G__16798 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$lang,cljs.core.cst$kw$js,cljs.core.cst$kw$source,""], null);
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(G__16798) : cb.call(null,G__16798));
});
/**
 * Mimics "Resource not found" as it just calls: (cb nil)
 */
replumb.load.no_resource_load_fn_BANG_ = (function replumb$load$no_resource_load_fn_BANG_(_,cb){
return (cb.cljs$core$IFn$_invoke$arity$1 ? cb.cljs$core$IFn$_invoke$arity$1(null) : cb.call(null,null));
});
/**
 * Converts a filename to a lang keyword by inspecting the file
 *   extension.
 */
replumb.load.filename__GT_lang = (function replumb$load$filename__GT_lang(file_name){
if(clojure.string.ends_with_QMARK_(file_name,".js")){
return cljs.core.cst$kw$js;
} else {
return cljs.core.cst$kw$clj;
}
});
/**
 * Read the cache source depending on whether is a edn or json file
 */
replumb.load.read_cache_source = (function replumb$load$read_cache_source(cache_path,cache_source){
if(clojure.string.ends_with_QMARK_(cache_path,".edn")){
return cljs.reader.read_string(cache_source);
} else {
return replumb.cache.transit_json__GT_cljs(cache_source);
}
});
/**
 * Returns the correct file extensions to try (no dot prefix), following
 *   the cljs.js/*load-fn* docstring.
 */
replumb.load.extensions = (function replumb$load$extensions(var_args){
var args16799 = [];
var len__6932__auto___16802 = arguments.length;
var i__6933__auto___16803 = (0);
while(true){
if((i__6933__auto___16803 < len__6932__auto___16802)){
args16799.push((arguments[i__6933__auto___16803]));

var G__16804 = (i__6933__auto___16803 + (1));
i__6933__auto___16803 = G__16804;
continue;
} else {
}
break;
}

var G__16801 = args16799.length;
switch (G__16801) {
case 0:
return replumb.load.extensions.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.load.extensions.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16799.length)].join('')));

}
});

replumb.load.extensions.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.load.extensions.cljs$core$IFn$_invoke$arity$1(false);
});

replumb.load.extensions.cljs$core$IFn$_invoke$arity$1 = (function (macros){
if(cljs.core.truth_(macros)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["clj","cljc"], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["cljs","cljc","js"], null);
}
});

replumb.load.extensions.cljs$lang$maxFixedArity = 1;
/**
 * Loop on the file-names using a supplied read-file-fn (fn [file-name
 *   src-cb] ...), calling back cb upon first successful read, otherwise
 *   calling back with nil.
 *   This function does not check whether parameters are nil, please do it
 *   in the caller.
 */
replumb.load.read_files_and_callback_BANG_ = (function replumb$load$read_files_and_callback_BANG_(verbose_QMARK_,file_names,read_file_fn_BANG_,load_fn_cb){
var temp__4655__auto__ = cljs.core.first(file_names);
if(cljs.core.truth_(temp__4655__auto__)){
var name = temp__4655__auto__;
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Reading",name,"..."], 0));
} else {
}

var G__16819 = name;
var G__16820 = ((function (G__16819,name,temp__4655__auto__){
return (function (source){
if(cljs.core.truth_(source)){
var G__16821 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$lang,replumb.load.filename__GT_lang(name),cljs.core.cst$kw$source,source], null);
return (load_fn_cb.cljs$core$IFn$_invoke$arity$1 ? load_fn_cb.cljs$core$IFn$_invoke$arity$1(G__16821) : load_fn_cb.call(null,G__16821));
} else {
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["No source found..."], 0));
} else {
}

return replumb$load$read_files_and_callback_BANG_(verbose_QMARK_,cljs.core.rest(file_names),read_file_fn_BANG_,load_fn_cb);
}
});})(G__16819,name,temp__4655__auto__))
;
return (read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2 ? read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2(G__16819,G__16820) : read_file_fn_BANG_.call(null,G__16819,G__16820));
} else {
return (load_fn_cb.cljs$core$IFn$_invoke$arity$1 ? load_fn_cb.cljs$core$IFn$_invoke$arity$1(null) : load_fn_cb.call(null,null));
}
});
/**
 * Loops over cached-file-names in order to retrieve them. It needs to find
 *   both the related .js file and .cache.json file, otherwise keeps looping.
 *   If it does not find the cached files calls read-files-and-callback! and
 *   tries to load the unevaluated ones.
 *   This function does not check whether parameters are nil, please do it in
 *   the caller.
 */
replumb.load.read_files_from_cache_and_callback_BANG_ = (function replumb$load$read_files_from_cache_and_callback_BANG_(verbose_QMARK_,file_names,read_file_fn_BANG_,load_fn_cb,cached_file_names){
var temp__4655__auto__ = cljs.core.first(cached_file_names);
if(cljs.core.truth_(temp__4655__auto__)){
var vec__16838 = temp__4655__auto__;
var js_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16838,(0),null);
var cache_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16838,(1),null);
var try_next_files_pair = ((function (vec__16838,js_path,cache_path,temp__4655__auto__){
return (function (){
return replumb$load$read_files_from_cache_and_callback_BANG_(verbose_QMARK_,file_names,read_file_fn_BANG_,load_fn_cb,cljs.core.rest(cached_file_names));
});})(vec__16838,js_path,cache_path,temp__4655__auto__))
;
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Reading",js_path,"..."], 0));
} else {
}

var G__16843 = js_path;
var G__16844 = ((function (G__16843,try_next_files_pair,vec__16838,js_path,cache_path,temp__4655__auto__){
return (function (js_source){
if(cljs.core.truth_((function (){var and__5850__auto__ = js_source;
if(cljs.core.truth_(and__5850__auto__)){
return replumb.cache.cached_js_valid_QMARK_(js_source);
} else {
return and__5850__auto__;
}
})())){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Reading",cache_path,"..."], 0));
} else {
}

var G__16846 = cache_path;
var G__16847 = ((function (G__16846,G__16843,try_next_files_pair,vec__16838,js_path,cache_path,temp__4655__auto__){
return (function (cache_source){
if(cljs.core.truth_(cache_source)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("Retrieved from cache "),cljs.core.str(js_path),cljs.core.str(" and "),cljs.core.str(cache_path)].join('')], 0));
} else {
}

var G__16848 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$lang,replumb.load.filename__GT_lang(js_path),cljs.core.cst$kw$source,js_source,cljs.core.cst$kw$cache,replumb.load.read_cache_source(cache_path,cache_source)], null);
return (load_fn_cb.cljs$core$IFn$_invoke$arity$1 ? load_fn_cb.cljs$core$IFn$_invoke$arity$1(G__16848) : load_fn_cb.call(null,G__16848));
} else {
return try_next_files_pair();
}
});})(G__16846,G__16843,try_next_files_pair,vec__16838,js_path,cache_path,temp__4655__auto__))
;
return (read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2 ? read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2(G__16846,G__16847) : read_file_fn_BANG_.call(null,G__16846,G__16847));
} else {
return try_next_files_pair();
}
});})(G__16843,try_next_files_pair,vec__16838,js_path,cache_path,temp__4655__auto__))
;
return (read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2 ? read_file_fn_BANG_.cljs$core$IFn$_invoke$arity$2(G__16843,G__16844) : read_file_fn_BANG_.call(null,G__16843,G__16844));
} else {
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Cannot load cache files..."], 0));
} else {
}

return replumb.load.read_files_and_callback_BANG_(verbose_QMARK_,file_names,read_file_fn_BANG_,load_fn_cb);
}
});
/**
 * Produces a sequence of file paths based on src-paths and file-path (a
 *   path already including one or more "/" and an extension).
 */
replumb.load.file_paths = (function replumb$load$file_paths(src_paths,file_path){
var iter__6642__auto__ = (function replumb$load$file_paths_$_iter__16855(s__16856){
return (new cljs.core.LazySeq(null,(function (){
var s__16856__$1 = s__16856;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__16856__$1);
if(temp__4657__auto__){
var s__16856__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__16856__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__16856__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__16858 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__16857 = (0);
while(true){
if((i__16857 < size__6641__auto__)){
var src_path = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__16857);
cljs.core.chunk_append(b__16858,[cljs.core.str(replumb.common.normalize_path(src_path)),cljs.core.str(file_path)].join(''));

var G__16861 = (i__16857 + (1));
i__16857 = G__16861;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__16858),replumb$load$file_paths_$_iter__16855(cljs.core.chunk_rest(s__16856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__16858),null);
}
} else {
var src_path = cljs.core.first(s__16856__$2);
return cljs.core.cons([cljs.core.str(replumb.common.normalize_path(src_path)),cljs.core.str(file_path)].join(''),replumb$load$file_paths_$_iter__16855(cljs.core.rest(s__16856__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__6642__auto__(src_paths);
});
/**
 * Produces a sequence of file names to try reading from src-paths and
 *   file-path-without-ext (it should already include one or more
 *   "/"). The right order and extension is taken from cljs.js/*load-fn*
 *   docstring and takes into consideration the macros parameter.
 */
replumb.load.file_paths_for_load_fn = (function replumb$load$file_paths_for_load_fn(src_paths,macros,file_path_without_ext){
var iter__6642__auto__ = (function replumb$load$file_paths_for_load_fn_$_iter__16873(s__16874){
return (new cljs.core.LazySeq(null,(function (){
var s__16874__$1 = s__16874;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__16874__$1);
if(temp__4657__auto__){
var xs__5205__auto__ = temp__4657__auto__;
var extension = cljs.core.first(xs__5205__auto__);
var iterys__6638__auto__ = ((function (s__16874__$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function replumb$load$file_paths_for_load_fn_$_iter__16873_$_iter__16875(s__16876){
return (new cljs.core.LazySeq(null,((function (s__16874__$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function (){
var s__16876__$1 = s__16876;
while(true){
var temp__4657__auto____$1 = cljs.core.seq(s__16876__$1);
if(temp__4657__auto____$1){
var s__16876__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__16876__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__16876__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__16878 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__16877 = (0);
while(true){
if((i__16877 < size__6641__auto__)){
var src_path = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__16877);
cljs.core.chunk_append(b__16878,[cljs.core.str(src_path),cljs.core.str("."),cljs.core.str(extension)].join(''));

var G__16884 = (i__16877 + (1));
i__16877 = G__16884;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__16878),replumb$load$file_paths_for_load_fn_$_iter__16873_$_iter__16875(cljs.core.chunk_rest(s__16876__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__16878),null);
}
} else {
var src_path = cljs.core.first(s__16876__$2);
return cljs.core.cons([cljs.core.str(src_path),cljs.core.str("."),cljs.core.str(extension)].join(''),replumb$load$file_paths_for_load_fn_$_iter__16873_$_iter__16875(cljs.core.rest(s__16876__$2)));
}
} else {
return null;
}
break;
}
});})(s__16874__$1,extension,xs__5205__auto__,temp__4657__auto__))
,null,null));
});})(s__16874__$1,extension,xs__5205__auto__,temp__4657__auto__))
;
var fs__6639__auto__ = cljs.core.seq(iterys__6638__auto__(replumb.load.file_paths(src_paths,file_path_without_ext)));
if(fs__6639__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__6639__auto__,replumb$load$file_paths_for_load_fn_$_iter__16873(cljs.core.rest(s__16874__$1)));
} else {
var G__16885 = cljs.core.rest(s__16874__$1);
s__16874__$1 = G__16885;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__6642__auto__(replumb.load.extensions.cljs$core$IFn$_invoke$arity$1(macros));
});
/**
 * Produces a sequence of pairs containing the file paths to try reading for
 *   evaluation caching.
 *   The first file is always a ".js" file while the second is the cache file
 *   and can be a ".json" or ".edn" file.
 */
replumb.load.cache_file_paths_for_load_fn = (function replumb$load$cache_file_paths_for_load_fn(cache_paths,macros,file_path_without_ext){
var iter__6642__auto__ = (function replumb$load$cache_file_paths_for_load_fn_$_iter__16906(s__16907){
return (new cljs.core.LazySeq(null,(function (){
var s__16907__$1 = s__16907;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__16907__$1);
if(temp__4657__auto__){
var xs__5205__auto__ = temp__4657__auto__;
var extension = cljs.core.first(xs__5205__auto__);
var iterys__6638__auto__ = ((function (s__16907__$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function replumb$load$cache_file_paths_for_load_fn_$_iter__16906_$_iter__16908(s__16909){
return (new cljs.core.LazySeq(null,((function (s__16907__$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function (){
var s__16909__$1 = s__16909;
while(true){
var temp__4657__auto____$1 = cljs.core.seq(s__16909__$1);
if(temp__4657__auto____$1){
var xs__5205__auto____$1 = temp__4657__auto____$1;
var cache_extension = cljs.core.first(xs__5205__auto____$1);
var iterys__6638__auto__ = ((function (s__16909__$1,s__16907__$1,cache_extension,xs__5205__auto____$1,temp__4657__auto____$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function replumb$load$cache_file_paths_for_load_fn_$_iter__16906_$_iter__16908_$_iter__16910(s__16911){
return (new cljs.core.LazySeq(null,((function (s__16909__$1,s__16907__$1,cache_extension,xs__5205__auto____$1,temp__4657__auto____$1,extension,xs__5205__auto__,temp__4657__auto__){
return (function (){
var s__16911__$1 = s__16911;
while(true){
var temp__4657__auto____$2 = cljs.core.seq(s__16911__$1);
if(temp__4657__auto____$2){
var s__16911__$2 = temp__4657__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__16911__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__16911__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__16913 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__16912 = (0);
while(true){
if((i__16912 < size__6641__auto__)){
var src_path = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__16912);
cljs.core.chunk_append(b__16913,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(src_path),cljs.core.str(".js")].join(''),[cljs.core.str(src_path),cljs.core.str(extension),cljs.core.str(cache_extension)].join('')], null));

var G__16925 = (i__16912 + (1));
i__16912 = G__16925;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__16913),replumb$load$cache_file_paths_for_load_fn_$_iter__16906_$_iter__16908_$_iter__16910(cljs.core.chunk_rest(s__16911__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__16913),null);
}
} else {
var src_path = cljs.core.first(s__16911__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(src_path),cljs.core.str(".js")].join(''),[cljs.core.str(src_path),cljs.core.str(extension),cljs.core.str(cache_extension)].join('')], null),replumb$load$cache_file_paths_for_load_fn_$_iter__16906_$_iter__16908_$_iter__16910(cljs.core.rest(s__16911__$2)));
}
} else {
return null;
}
break;
}
});})(s__16909__$1,s__16907__$1,cache_extension,xs__5205__auto____$1,temp__4657__auto____$1,extension,xs__5205__auto__,temp__4657__auto__))
,null,null));
});})(s__16909__$1,s__16907__$1,cache_extension,xs__5205__auto____$1,temp__4657__auto____$1,extension,xs__5205__auto__,temp__4657__auto__))
;
var fs__6639__auto__ = cljs.core.seq(iterys__6638__auto__(cljs.core.into.cljs$core$IFn$_invoke$arity$2(replumb.load.file_paths(cache_paths,file_path_without_ext),replumb.load.file_paths(cache_paths,replumb.cache.cache_prefix_for_path.cljs$core$IFn$_invoke$arity$2(file_path_without_ext,macros)))));
if(fs__6639__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__6639__auto__,replumb$load$cache_file_paths_for_load_fn_$_iter__16906_$_iter__16908(cljs.core.rest(s__16909__$1)));
} else {
var G__16926 = cljs.core.rest(s__16909__$1);
s__16909__$1 = G__16926;
continue;
}
} else {
return null;
}
break;
}
});})(s__16907__$1,extension,xs__5205__auto__,temp__4657__auto__))
,null,null));
});})(s__16907__$1,extension,xs__5205__auto__,temp__4657__auto__))
;
var fs__6639__auto__ = cljs.core.seq(iterys__6638__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".cache.json",".cache.edn"], null)));
if(fs__6639__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__6639__auto__,replumb$load$cache_file_paths_for_load_fn_$_iter__16906(cljs.core.rest(s__16907__$1)));
} else {
var G__16927 = cljs.core.rest(s__16907__$1);
s__16907__$1 = G__16927;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__6642__auto__(cljs.core.cons("",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (iter__6642__auto__){
return (function (p1__16886_SHARP_){
return [cljs.core.str("."),cljs.core.str(p1__16886_SHARP_)].join('');
});})(iter__6642__auto__))
,replumb.load.extensions.cljs$core$IFn$_invoke$arity$1(macros))));
});
/**
 * Produces a sequence of filenames to try reading crafted for goog
 *   libraries, in the order they should be tried.
 */
replumb.load.file_paths_for_closure = (function replumb$load$file_paths_for_closure(src_paths,goog_path){
var iter__6642__auto__ = (function replumb$load$file_paths_for_closure_$_iter__16934(s__16935){
return (new cljs.core.LazySeq(null,(function (){
var s__16935__$1 = s__16935;
while(true){
var temp__4657__auto__ = cljs.core.seq(s__16935__$1);
if(temp__4657__auto__){
var s__16935__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(s__16935__$2)){
var c__6640__auto__ = cljs.core.chunk_first(s__16935__$2);
var size__6641__auto__ = cljs.core.count(c__6640__auto__);
var b__16937 = cljs.core.chunk_buffer(size__6641__auto__);
if((function (){var i__16936 = (0);
while(true){
if((i__16936 < size__6641__auto__)){
var src_path = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__6640__auto__,i__16936);
cljs.core.chunk_append(b__16937,[cljs.core.str(replumb.common.normalize_path(src_path)),cljs.core.str(goog_path),cljs.core.str(".js")].join(''));

var G__16940 = (i__16936 + (1));
i__16936 = G__16940;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__16937),replumb$load$file_paths_for_closure_$_iter__16934(cljs.core.chunk_rest(s__16935__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__16937),null);
}
} else {
var src_path = cljs.core.first(s__16935__$2);
return cljs.core.cons([cljs.core.str(replumb.common.normalize_path(src_path)),cljs.core.str(goog_path),cljs.core.str(".js")].join(''),replumb$load$file_paths_for_closure_$_iter__16934(cljs.core.rest(s__16935__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__6642__auto__(src_paths);
});
replumb.load.skip_load_QMARK_ = (function replumb$load$skip_load_QMARK_(p__16941){
var map__16944 = p__16941;
var map__16944__$1 = ((((!((map__16944 == null)))?((((map__16944.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16944.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16944):map__16944);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16944__$1,cljs.core.cst$kw$name);
var macros = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__16944__$1,cljs.core.cst$kw$macros);
var or__5862__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$core);
if(or__5862__auto__){
return or__5862__auto__;
} else {
var or__5862__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$analyzer);
if(or__5862__auto____$1){
return or__5862__auto____$1;
} else {
var or__5862__auto____$2 = (function (){var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$pprint);
if(and__5850__auto__){
return macros;
} else {
return and__5850__auto__;
}
})();
if(cljs.core.truth_(or__5862__auto____$2)){
return or__5862__auto____$2;
} else {
var or__5862__auto____$3 = (function (){var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$cljs$test);
if(and__5850__auto__){
return macros;
} else {
return and__5850__auto__;
}
})();
if(cljs.core.truth_(or__5862__auto____$3)){
return or__5862__auto____$3;
} else {
var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,cljs.core.cst$sym$clojure$template);
if(and__5850__auto__){
return macros;
} else {
return and__5850__auto__;
}
}
}
}
}
});
