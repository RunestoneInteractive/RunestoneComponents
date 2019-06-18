// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.core');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('replumb.repl');
goog.require('replumb.common');
/**
 * Reads, evaluates and calls back with the evaluation result.
 * 
 *   The first parameter is a map of configuration options, currently
 *   supporting:
 * 
 *   * `:verbose` will enable the the evaluation logging, defaults to false.
 *   To customize how to print, use `(set! *print-fn* (fn [& args] ...)`
 * 
 *   * `:warning-as-error` will consider a compiler warning as error.
 * 
 *   * `:target` `:nodejs` and `:browser` supported, the latter is used if
 *   missing.
 * 
 *   * `:init-fn!` user provided initialization function, it will be passed a
 *   map:
 * 
 *        :form   ;; the form to evaluate, as data
 *        :ns     ;; the current namespace, as symbol
 *        :target ;; the current target
 * 
 *   * `:load-fn!` will override replumb's default `cljs.js/*load-fn*`.
 *   It rules out `:read-file-fn!`, losing any perk of using `replumb.load`
 *   helpers. Trickily enough, `:load-fn!` is never used with `load-file`. It is the
 *   only case where it does not take precedence over `:read-file-fn!`. Use it if
 *   you know what you are doing and follow this protocol:
 * 
 *    ```
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 *    ```
 * 
 *   * `:read-file-fn!` an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found). It is mutually exclusive with `:load-fn!` and
 *   will be ignored in case both are present.
 * 
 *   * `:write-file-fn!` a synchronous 2-arity function with signature
 *   `[file-path data]` that accepts a file-path and data to write.
 * 
 *   * `:src-paths` - a vector of paths containing source files.
 * 
 *   * `:cache` - a map containing two optional values: the first, `:path`,
 *   indicates the path of the cached files. The second, `:src-paths-lookup?`,
 *   indicates whether search the cached files in `:src-paths`. If both present,
 *   `:path` will have the priority but both will be inspected.
 * 
 *   * `:no-pr-str-on-value`  in case of `:success?` avoid converting the
 *   result map `:value` to string.
 * 
 *   * `:context` - indicates the evaluation context that will be passed to
 *   `cljs/eval-str`. One in `:expr`, `:statement`, `:return`. Defaults to `:expr`.
 *   If you really feel adventurous check [David Nolen's dev notes](https://github.com/clojure/clojurescript/blob/r1.7.228/devnotes/day1.org#tricky-bit---context).
 * 
 *   * `:foreign-libs` - a way to include foreign libraries. The format is analogous
 *   to the compiler option. For more info visit the [compiler options page](https://github.com/clojure/clojurescript/wiki/Compiler-Options#foreign-libs).
 * 
 *   The second parameter, `callback`, should be a 1-arity function which receives
 *   the result map, whose result keys will be:
 * 
 *   ```
 *   :success?  a boolean indicating if everything went alright
 *   :value     (if (:success? result)), this key contains the yielded value as
 *           string, unless :no-pr-str-on-value is true, in which case it
 *           returns the bare value.
 *   :error     (if-not (:success? result)) will contain a js/Error
 *   :warning   in case a warning was thrown and :warning-as-error is falsey
 *   :form      the evaluated form as data structure (not string)}
 *   ```
 * 
 *   The third parameter is the source string to be read and evaluated.
 * 
 *   It initializes the repl harness either on first execution or if an
 *   option in `#{:src-paths :init-fn!}` changes from the previous
 *   `read-eval-call`.
 */
replumb.core.read_eval_call = (function replumb$core$read_eval_call(var_args){
var args19528 = [];
var len__6932__auto___19531 = arguments.length;
var i__6933__auto___19532 = (0);
while(true){
if((i__6933__auto___19532 < len__6932__auto___19531)){
args19528.push((arguments[i__6933__auto___19532]));

var G__19533 = (i__6933__auto___19532 + (1));
i__6933__auto___19532 = G__19533;
continue;
} else {
}
break;
}

var G__19530 = args19528.length;
switch (G__19530) {
case 2:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19528.length)].join('')));

}
});
goog.exportSymbol('replumb.core.read_eval_call', replumb.core.read_eval_call);

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2 = (function (callback,source){
return replumb.repl.read_eval_call(cljs.core.PersistentArrayMap.EMPTY,callback,source);
});

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3 = (function (opts,callback,source){
return replumb.repl.read_eval_call(opts,callback,source);
});

replumb.core.read_eval_call.cljs$lang$maxFixedArity = 3;
/**
 * Retrieves the REPL prompt to display, according to the current
 *   namespace. Returns a string.
 */
replumb.core.get_prompt = (function replumb$core$get_prompt(){
return [cljs.core.str(replumb.repl.current_ns()),cljs.core.str("=> ")].join('');
});
goog.exportSymbol('replumb.core.get_prompt', replumb.core.get_prompt);
/**
 * Return the message string of the input `js/Error`.
 */
replumb.core.error__GT_str = (function replumb$core$error__GT_str(var_args){
var args19535 = [];
var len__6932__auto___19538 = arguments.length;
var i__6933__auto___19539 = (0);
while(true){
if((i__6933__auto___19539 < len__6932__auto___19538)){
args19535.push((arguments[i__6933__auto___19539]));

var G__19540 = (i__6933__auto___19539 + (1));
i__6933__auto___19539 = G__19540;
continue;
} else {
}
break;
}

var G__19537 = args19535.length;
switch (G__19537) {
case 1:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19535.length)].join('')));

}
});
goog.exportSymbol('replumb.core.error__GT_str', replumb.core.error__GT_str);

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1 = (function (error){
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$1(error);
});

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2 = (function (print_stack_QMARK_,error){
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$2(print_stack_QMARK_,error);
});

replumb.core.error__GT_str.cljs$lang$maxFixedArity = 2;
/**
 * Unwraps the result of an evaluation.
 * 
 *   It returns the content of `:value` in case of success and the content
 *   of `:error` (a `js/Error`) in case of failure.
 * 
 *   When `include-warning?` is true, then the string returned is, in
 *   order, from the `:error`, `:warning` and eventually `:value` key in
 *   the result map.
 */
replumb.core.unwrap_result = (function replumb$core$unwrap_result(var_args){
var args19542 = [];
var len__6932__auto___19547 = arguments.length;
var i__6933__auto___19548 = (0);
while(true){
if((i__6933__auto___19548 < len__6932__auto___19547)){
args19542.push((arguments[i__6933__auto___19548]));

var G__19549 = (i__6933__auto___19548 + (1));
i__6933__auto___19548 = G__19549;
continue;
} else {
}
break;
}

var G__19544 = args19542.length;
switch (G__19544) {
case 1:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19542.length)].join('')));

}
});
goog.exportSymbol('replumb.core.unwrap_result', replumb.core.unwrap_result);

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2(false,result_map);
});

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2 = (function (include_warning_QMARK_,result_map){
var map__19545 = result_map;
var map__19545__$1 = ((((!((map__19545 == null)))?((((map__19545.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19545.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19545):map__19545);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19545__$1,cljs.core.cst$kw$error);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19545__$1,cljs.core.cst$kw$value);
var warning = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19545__$1,cljs.core.cst$kw$warning);
if(cljs.core.truth_(error)){
return error;
} else {
if(cljs.core.truth_((function (){var and__5850__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__5850__auto__)){
return warning;
} else {
return and__5850__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.unwrap_result.cljs$lang$maxFixedArity = 2;
/**
 * Given a `result-map`, tells whether the evaluation was successful.
 */
replumb.core.success_QMARK_ = (function replumb$core$success_QMARK_(result_map){
return cljs.core.cst$kw$success_QMARK_.cljs$core$IFn$_invoke$arity$1(result_map);
});
goog.exportSymbol('replumb.core.success_QMARK_', replumb.core.success_QMARK_);
/**
 * Given a `result-map`, returns the result of the evaluation as string.
 * 
 *   - When `include-warning?` is true, then the string returned is, in
 *   order, from the `:error`, `:warning` and eventually `:value` key in
 *   the result map.
 * 
 *   - When `print-stack?` is true, the error string will include the stack
 *   trace.
 */
replumb.core.result__GT_string = (function replumb$core$result__GT_string(var_args){
var args19551 = [];
var len__6932__auto___19556 = arguments.length;
var i__6933__auto___19557 = (0);
while(true){
if((i__6933__auto___19557 < len__6932__auto___19556)){
args19551.push((arguments[i__6933__auto___19557]));

var G__19558 = (i__6933__auto___19557 + (1));
i__6933__auto___19557 = G__19558;
continue;
} else {
}
break;
}

var G__19553 = args19551.length;
switch (G__19553) {
case 1:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19551.length)].join('')));

}
});
goog.exportSymbol('replumb.core.result__GT_string', replumb.core.result__GT_string);

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3(false,false,result_map);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2 = (function (print_stack_QMARK_,result_map){
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3(print_stack_QMARK_,false,result_map);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3 = (function (print_stack_QMARK_,include_warning_QMARK_,result_map){
if(!(cljs.core.map_QMARK_(print_stack_QMARK_))){
} else {
throw (new Error("Assert failed: (not (map? print-stack?))"));
}

if(!(cljs.core.map_QMARK_(include_warning_QMARK_))){
} else {
throw (new Error("Assert failed: (not (map? include-warning?))"));
}

if(cljs.core.map_QMARK_(result_map)){
} else {
throw (new Error("Assert failed: (map? result-map)"));
}

var map__19554 = result_map;
var map__19554__$1 = ((((!((map__19554 == null)))?((((map__19554.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19554.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__19554):map__19554);
var error = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19554__$1,cljs.core.cst$kw$error);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19554__$1,cljs.core.cst$kw$value);
var warning = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__19554__$1,cljs.core.cst$kw$warning);
if(cljs.core.truth_(error)){
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3(print_stack_QMARK_,false,error);
} else {
if(cljs.core.truth_((function (){var and__5850__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__5850__auto__)){
return warning;
} else {
return and__5850__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.result__GT_string.cljs$lang$maxFixedArity = 3;
/**
 * Creates the right option map for read-eval-call.
 * 
 *   Supported targets: `:nodejs` or `:node`, `:browser`. It throws if not
 *   supported.
 * 
 *   The 1-arity function requires a `load-fn!` compatible with
 *   ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
 *   doing and follow this protocol:
 * 
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 * 
 *   The 2-arity function accepts a sequence of source path strings and
 *   `read-file-fn!`, an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found).
 * 
 *   The 3-arity function receives additionally a third parameter `write-file-fn!`,
 *   a synchronous 2-arity function with signature `[file-path data]` that accepts
 *   a file-path and data to write.
 */
replumb.core.options = (function replumb$core$options(var_args){
var args19560 = [];
var len__6932__auto___19565 = arguments.length;
var i__6933__auto___19566 = (0);
while(true){
if((i__6933__auto___19566 < len__6932__auto___19565)){
args19560.push((arguments[i__6933__auto___19566]));

var G__19567 = (i__6933__auto___19566 + (1));
i__6933__auto___19566 = G__19567;
continue;
} else {
}
break;
}

var G__19562 = args19560.length;
switch (G__19562) {
case 2:
return replumb.core.options.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.options.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.core.options.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19560.length)].join('')));

}
});
goog.exportSymbol('replumb.core.options', replumb.core.options);

replumb.core.options.cljs$core$IFn$_invoke$arity$2 = (function (target,load_fn_BANG_){
var G__19563 = (((target instanceof cljs.core.Keyword))?target.fqn:null);
switch (G__19563) {
case "nodejs":
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target,cljs.core.cst$kw$nodejs,cljs.core.cst$kw$load_DASH_fn_BANG_,load_fn_BANG_], null);

break;
case "node":
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target,cljs.core.cst$kw$nodejs,cljs.core.cst$kw$load_DASH_fn_BANG_,load_fn_BANG_], null);

break;
case "browser":
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target,cljs.core.cst$kw$default,cljs.core.cst$kw$load_DASH_fn_BANG_,load_fn_BANG_], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(target)].join('')));

}
});

replumb.core.options.cljs$core$IFn$_invoke$arity$3 = (function (target,src_paths,read_file_fn_BANG_){
return replumb.core.options.cljs$core$IFn$_invoke$arity$4(target,src_paths,read_file_fn_BANG_,null);
});

replumb.core.options.cljs$core$IFn$_invoke$arity$4 = (function (target,src_paths,read_file_fn_BANG_,write_file_fn_BANG_){
var G__19564 = (((target instanceof cljs.core.Keyword))?target.fqn:null);
switch (G__19564) {
case "nodejs":
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$target,cljs.core.cst$kw$nodejs,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_,read_file_fn_BANG_,cljs.core.cst$kw$src_DASH_paths,src_paths,cljs.core.cst$kw$write_DASH_file_DASH_fn_BANG_,write_file_fn_BANG_], null);

break;
case "node":
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$target,cljs.core.cst$kw$nodejs,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_,read_file_fn_BANG_,cljs.core.cst$kw$src_DASH_paths,src_paths,cljs.core.cst$kw$write_DASH_file_DASH_fn_BANG_,write_file_fn_BANG_], null);

break;
case "browser":
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$target,cljs.core.cst$kw$default,cljs.core.cst$kw$read_DASH_file_DASH_fn_BANG_,read_file_fn_BANG_,cljs.core.cst$kw$src_DASH_paths,src_paths,cljs.core.cst$kw$write_DASH_file_DASH_fn_BANG_,write_file_fn_BANG_], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(target)].join('')));

}
});

replumb.core.options.cljs$lang$maxFixedArity = 4;
/**
 * Reset the repl and the current compiler state.
 * 
 *   It performs the following (in order):
 * 
 *   1. removes `cljs.js/*loaded*` namespaces from the compiler environment
 *   2. calls `(read-eval-call (in-ns 'cljs.user))`
 *   3. resets the last warning
 *   4. sets `*e` to nil
 *   5. resets the init options (the next eval will trigger an init)
 */
replumb.core.repl_reset_BANG_ = (function replumb$core$repl_reset_BANG_(opts){
if(cljs.core.truth_(replumb.repl.empty_cljs_user_QMARK_())){
} else {
replumb.repl.purge_cljs_user_BANG_.cljs$core$IFn$_invoke$arity$0();
}

replumb.repl.read_eval_call(opts,cljs.core.identity,"(in-ns 'cljs.user)");

replumb.repl.reset_last_warning_BANG_();

replumb.repl.read_eval_call(opts,cljs.core.identity,"(set! *e nil)");

return replumb.repl.reset_init_opts_BANG_();
});
