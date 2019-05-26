// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('replumb.ast');
goog.require('cljs.core');
goog.require('goog.string');
/**
 * Given a compiler state, return the seq of namespace symbols currently
 *   present in the AST.
 */
replumb.ast.known_namespaces = (function replumb$ast$known_namespaces(state){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,cljs.core.keys(cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces.cljs$core$IFn$_invoke$arity$1(state)));
});
/**
 * Given compiler state and namespace symbol return all the public vars
 *   in the AST.
 * 
 *   Analogous to `cljs.analyzer/ns-publics`, but it returns analysis maps
 *   not vars.
 * 
 *   Beware, there can be a lot of data.
 */
replumb.ast.ns_publics = (function replumb$ast$ns_publics(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__19117){
var vec__19118 = p__19117;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19118,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19118,(1),null);
return cljs.core.cst$kw$private.cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$macros], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null))], 0))));
});
/**
 * Given compiler state and namespace symbol return all the vars in the
 *   AST.
 * 
 *   Analogous to `cljs.analyzer/ns-interns`, but it returns analysis maps
 *   not vars.
 * 
 *   Beware, there can be a lot of data.
 */
replumb.ast.ns_interns = (function replumb$ast$ns_interns(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$macros], null)),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null))], 0));
});
/**
 * Given compiler state and namespace symbol, returns its AST's `:defs`
 *   key content.
 * 
 *   Beware, there can be a lot of data.
 */
replumb.ast.ns_defs = (function replumb$ast$ns_defs(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null));
});
/**
 * Given compiler state and namespace symbol, returns its whole AST
 *   content.
 * 
 *   Beware, there can be a lot of data.
 */
replumb.ast.namespace = (function replumb$ast$namespace(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns], null));
});
/**
 * Return required symbols given compiler state and namespace: a map of
 *   `{ns ns, another-ns another-ns, ...}`.
 * 
 *   Note that `import` also adds something to the AST's `:requires` key of
 *   the requirer-ns, see `replumb.ast/dissoc-import`.
 * 
 *   You need a `require` in the requirer-ns namespace for this to return
 *   something.
 */
replumb.ast.requires = (function replumb$ast$requires(state,requirer_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$requires], null));
});
/**
 * Return imported symbols given compiler state and a namespace: a map
 *   of `{symbol1 ns, symbol2 ns, ...}`.
 * 
 *   Note that an `import` symbol is the final segment only, so `User` in
 *   the `foo.bar.User`
 * 
 *   You need a `import` in the requirer-ns namespace for this to return
 *   something.
 */
replumb.ast.imports = (function replumb$ast$imports(state,requirer_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$imports], null));
});
/**
 * Return referred/used symbols given compiler state and a namespace: a
 *   map of `{symbol1 ns, symbol2 ns, ...}`.
 * 
 *   You need a `:refer` in the requirer-ns namespace for this to return
 *   something.
 */
replumb.ast.symbols = (function replumb$ast$symbols(state,requirer_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$uses], null));
});
/**
 * Return all the macro symbols given compiler state and namespace: a
 *   map of `{macro-symbol1 macro-ns, macro-symbol2 macro-ns}`.
 * 
 *   You need a `:refer` in the requirer-ns namespace for this to return
 *   something.
 */
replumb.ast.macros = (function replumb$ast$macros(state,requirer_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$use_DASH_macros], null));
});
/**
 * Return all the required macro namespaces given compiler state and a
 *   namespace: a map of `{macro-ns1 macro-ns1, macro-ns2 macro-ns2, ...}`.
 * 
 *   You need a `require-macros` in the requirer-ns namespace for this to
 *   return something.
 */
replumb.ast.macro_requires = (function replumb$ast$macro_requires(state,requirer_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$require_DASH_macros], null));
});
/**
 * Yields true when the symbol belongs to ns.
 * 
 *   This typically works on the output of either `replumb.ast/requires` or
 *   `replumb.ast/macro-requires`.
 */
replumb.ast.require_of_ns_QMARK_ = (function replumb$ast$require_of_ns_QMARK_(ns,sym){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,sym);
});
/**
 * Yields true when the symbol belongs to ns.
 * 
 *   This typically works on the output of `replumb.ast/symbols`.
 */
replumb.ast.symbol_of_ns_QMARK_ = (function replumb$ast$symbol_of_ns_QMARK_(ns,sym){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,sym);
});
/**
 * Yields true when sym belongs to ns.
 * 
 *   This typically works on the output of `replumb.ast/imports`.
 */
replumb.ast.import_of_ns_QMARK_ = (function replumb$ast$import_of_ns_QMARK_(ns,sym){
var G__19121 = [cljs.core.str(sym)].join('');
var G__19122 = [cljs.core.str(ns)].join('');
return goog.string.caseInsensitiveContains(G__19121,G__19122);
});
/**
 * Yields true when the sym belongs to ns.
 * 
 *   This typically works on the output of `replumb.ast/macros`.
 */
replumb.ast.macro_of_ns_QMARK_ = (function replumb$ast$macro_of_ns_QMARK_(ns,sym){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(ns,sym);
});
/**
 * Dissoc the namespace symbol from the compiler state.
 */
replumb.ast.dissoc_ns = (function replumb$ast$dissoc_ns(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? ns)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces], null),cljs.core.dissoc,ns);
});
/**
 * Dissoc symbol from the compiler state given the symbol of the
 *   namespace where `require` (or `use`) was called from.
 */
replumb.ast.dissoc_symbol = (function replumb$ast$dissoc_symbol(state,requirer_ns,sym){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$uses], null),cljs.core.dissoc,sym);
});
/**
 * Dissoc the imported symbol from the compiler state.
 */
replumb.ast.dissoc_import = (function replumb$ast$dissoc_import(state,requirer_ns,sym){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$requires], null),cljs.core.dissoc,sym),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$imports], null),cljs.core.dissoc,sym);
});
/**
 * Dissoc a macro symbol from the compiler state given the symbol of the
 *   namespace where `require-macros` (or `use-macros`) was called from.
 */
replumb.ast.dissoc_macro = (function replumb$ast$dissoc_macro(state,requirer_ns,sym){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? sym)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$use_DASH_macros], null),cljs.core.dissoc,sym);
});
/**
 * Dissoc the required-ns from requirer-ns.
 * 
 *   For instance after:
 * 
 *   ```
 *   (in-ns 'cljs.user)        ;; requirer-ns
 *   (require 'clojure.string) ;; required-ns
 *   ```
 * 
 *   You can use the following to clean the compiler state:
 * 
 *   ```
 *   (dissoc-require repl/st 'cljs.user 'clojure.string)
 *   ```
 * 
 *   This util function does not remove aliases. See
 *   `replumb.ast/dissoc-all`.
 */
replumb.ast.dissoc_require = (function replumb$ast$dissoc_require(state,requirer_ns,required_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

if((required_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? required-ns)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$requires], null),cljs.core.dissoc,required_ns);
});
/**
 * Dissoc the macro required-ns from requirer-ns.
 * 
 *   For instance after:
 * 
 *   ```
 *   (in-ns 'cljs.user)          ;; requirer-ns
 *   (require-macros 'cljs.test) ;; required-ns
 *   ```
 * 
 *   You can use the following to clean the compiler state:
 * 
 *   ```
 *   (dissoc-macro-require repl/st 'cljs.user 'cljs.test)
 *   ```
 * 
 *   This util function does not remove aliases. See
 *   `replumb.ast/dissoc-all`.
 */
replumb.ast.dissoc_macro_require = (function replumb$ast$dissoc_macro_require(state,requirer_ns,required_ns){
if((requirer_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? requirer-ns)"));
}

if((required_ns instanceof cljs.core.Symbol)){
} else {
throw (new Error("Assert failed: (symbol? required-ns)"));
}

return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,requirer_ns,cljs.core.cst$kw$require_DASH_macros], null),cljs.core.dissoc,required_ns);
});
/**
 * Dissoc all the required-ns symbols from requirer-ns.
 * 
 *   There are five types of symbol in replumb jargon, which loosely map to
 *   `cljs.js` ones. These optionally go in the type parameter as keyword:
 * 
 *   - `:symbol`, the default, for instance my-sym in `(def my-sym 3)`
 *   - `:macro`, which comes from a `(defmacro ...)`
 *   - `:import`, for instance User in `(import 'foo.bar.User)`
 *   - `:require`, which is the namespace symbol in a `(require ...)`
 *   - `:macro-require`, which is the namespace symbol in a `(require-macros ...)`
 * 
 *   This is the only function in the lot that also reliably clears
 *   namespace aliases.
 */
replumb.ast.dissoc_all = (function replumb$ast$dissoc_all(var_args){
var args19130 = [];
var len__6932__auto___19135 = arguments.length;
var i__6933__auto___19136 = (0);
while(true){
if((i__6933__auto___19136 < len__6932__auto___19135)){
args19130.push((arguments[i__6933__auto___19136]));

var G__19137 = (i__6933__auto___19136 + (1));
i__6933__auto___19136 = G__19137;
continue;
} else {
}
break;
}

var G__19132 = args19130.length;
switch (G__19132) {
case 3:
return replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19130.length)].join('')));

}
});

replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$3 = (function (state,requirer_ns,required_ns){
return replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4(state,requirer_ns,required_ns,cljs.core.cst$kw$symbol);
});

replumb.ast.dissoc_all.cljs$core$IFn$_invoke$arity$4 = (function (state,requirer_ns,required_ns,type){
var vec__19133 = (function (){var G__19134 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__19134) {
case "require":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.ast.requires,((function (G__19134){
return (function (p1__19123_SHARP_){
return replumb.ast.require_of_ns_QMARK_(required_ns,cljs.core.second(p1__19123_SHARP_));
});})(G__19134))
,replumb.ast.dissoc_require], null);

break;
case "macro-require":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.ast.macro_requires,((function (G__19134){
return (function (p1__19124_SHARP_){
return replumb.ast.require_of_ns_QMARK_(required_ns,cljs.core.second(p1__19124_SHARP_));
});})(G__19134))
,replumb.ast.dissoc_macro_require], null);

break;
case "symbol":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.ast.symbols,((function (G__19134){
return (function (p1__19125_SHARP_){
return replumb.ast.symbol_of_ns_QMARK_(required_ns,cljs.core.second(p1__19125_SHARP_));
});})(G__19134))
,replumb.ast.dissoc_symbol], null);

break;
case "macro":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.ast.macros,((function (G__19134){
return (function (p1__19126_SHARP_){
return replumb.ast.macro_of_ns_QMARK_(required_ns,cljs.core.second(p1__19126_SHARP_));
});})(G__19134))
,replumb.ast.dissoc_macro], null);

break;
case "import":
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.ast.imports,((function (G__19134){
return (function (p1__19127_SHARP_){
return replumb.ast.import_of_ns_QMARK_(required_ns,cljs.core.second(p1__19127_SHARP_));
});})(G__19134))
,replumb.ast.dissoc_import], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}
})();
var get_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19133,(0),null);
var pred = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19133,(1),null);
var dissoc_fn = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__19133,(2),null);
var syms = (get_fn.cljs$core$IFn$_invoke$arity$2 ? get_fn.cljs$core$IFn$_invoke$arity$2(state,requirer_ns) : get_fn.call(null,state,requirer_ns));
var required_syms = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(pred,syms));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (syms,required_syms,vec__19133,get_fn,pred,dissoc_fn){
return (function (p1__19128_SHARP_,p2__19129_SHARP_){
return (dissoc_fn.cljs$core$IFn$_invoke$arity$3 ? dissoc_fn.cljs$core$IFn$_invoke$arity$3(p1__19128_SHARP_,requirer_ns,p2__19129_SHARP_) : dissoc_fn.call(null,p1__19128_SHARP_,requirer_ns,p2__19129_SHARP_));
});})(syms,required_syms,vec__19133,get_fn,pred,dissoc_fn))
,state,required_syms);
});

replumb.ast.dissoc_all.cljs$lang$maxFixedArity = 4;
/**
 * Retrieves a map with the state details for the input requirer-ns.
 * 
 *   In replumb jargon:
 * 
 *   ```
 *   (in-ns 'cljs.user)          ;; requirer-ns
 *   (require-macros 'cljs.test) ;; required-ns
 *   ```
 * 
 *   And the returned map is (on the right, the compiler AST real key):
 * 
 *   ```
 *   {:requires (replumb.ast/requires ...)             ;; :requires
 * :macro-requires (replumb.ast/macro-requires ...) ;; :require-macros
 * :symbols (replumb.ast/symbols ...)               ;; :uses
 * :macros (replumb.ast/macros ...)                 ;; :use-macros
 * :imports (replumb.ast/imports ...)}              ;; :imports
 *   ```
 */
replumb.ast.get_state = (function replumb$ast$get_state(state,requirer_ns){
return new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$requires,replumb.ast.requires(state,requirer_ns),cljs.core.cst$kw$macro_DASH_requires,replumb.ast.macro_requires(state,requirer_ns),cljs.core.cst$kw$symbols,replumb.ast.symbols(state,requirer_ns),cljs.core.cst$kw$macros,replumb.ast.macros(state,requirer_ns),cljs.core.cst$kw$imports,replumb.ast.imports(state,requirer_ns)], null);
});
/**
 * Return true if the compiler state is empty.
 * 
 *   In other words if `(every? empty? (vals (replumb.ast/get-state ...)`
 *   returns true for the input requirer-ns.
 * 
 *   In replumb jargon:
 * 
 *   ```
 *   (in-ns 'cljs.user)          ;; requirer-ns
 *   (require-macros 'cljs.test) ;; required-ns
 *   ```
 */
replumb.ast.empty_state_QMARK_ = (function replumb$ast$empty_state_QMARK_(state,requirer_ns){
return cljs.core.every_QMARK_(cljs.core.empty_QMARK_,cljs.core.vals(replumb.ast.get_state(state,requirer_ns)));
});
