// Compiled by ClojureScript 1.8.51 {:static-fns true, :optimize-constants true}
goog.provide('cljs.core$macros');
goog.require('cljs.core');
goog.require('cljs.compiler');
goog.require('cljs.core');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('clojure.walk');
/**
 * Threads the expr through the forms. Inserts x as the
 *   second item in the first form, making a list of it if it is not a
 *   list already. If there are more forms, inserts the first form as the
 *   second item in second form, etc.
 */
cljs.core$macros.__GT_ = (function cljs$core$macros$__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14897 = arguments.length;
var i__6933__auto___14898 = (0);
while(true){
if((i__6933__auto___14898 < len__6932__auto___14897)){
args__6939__auto__.push((arguments[i__6933__auto___14898]));

var G__14899 = (i__6933__auto___14898 + (1));
i__6933__auto___14898 = G__14899;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,forms){
var x__$1 = x;
var forms__$1 = forms;
while(true){
if(cljs.core.truth_(forms__$1)){
var form = cljs.core.first(forms__$1);
var threaded = ((cljs.core.seq_QMARK_(form))?cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = cljs.core.first(form);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = x__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.next(form)], 0)))),cljs.core.meta(form)):(function (){var x__6696__auto__ = form;
return cljs.core._conj((function (){var x__6696__auto____$1 = x__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})());
var G__14900 = threaded;
var G__14901 = cljs.core.next(forms__$1);
x__$1 = G__14900;
forms__$1 = G__14901;
continue;
} else {
return x__$1;
}
break;
}
});

cljs.core$macros.__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.__GT_.cljs$lang$applyTo = (function (seq14893){
var G__14894 = cljs.core.first(seq14893);
var seq14893__$1 = cljs.core.next(seq14893);
var G__14895 = cljs.core.first(seq14893__$1);
var seq14893__$2 = cljs.core.next(seq14893__$1);
var G__14896 = cljs.core.first(seq14893__$2);
var seq14893__$3 = cljs.core.next(seq14893__$2);
return cljs.core$macros.__GT_.cljs$core$IFn$_invoke$arity$variadic(G__14894,G__14895,G__14896,seq14893__$3);
});

cljs.core$macros.__GT_.cljs$lang$macro = true;
/**
 * Threads the expr through the forms. Inserts x as the
 *   last item in the first form, making a list of it if it is not a
 *   list already. If there are more forms, inserts the first form as the
 *   last item in second form, etc.
 */
cljs.core$macros.__GT__GT_ = (function cljs$core$macros$__GT__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14906 = arguments.length;
var i__6933__auto___14907 = (0);
while(true){
if((i__6933__auto___14907 < len__6932__auto___14906)){
args__6939__auto__.push((arguments[i__6933__auto___14907]));

var G__14908 = (i__6933__auto___14907 + (1));
i__6933__auto___14907 = G__14908;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.__GT__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.__GT__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,forms){
var x__$1 = x;
var forms__$1 = forms;
while(true){
if(cljs.core.truth_(forms__$1)){
var form = cljs.core.first(forms__$1);
var threaded = ((cljs.core.seq_QMARK_(form))?cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = cljs.core.first(form);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.next(form),cljs.core.array_seq([(function (){var x__6696__auto__ = x__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.meta(form)):(function (){var x__6696__auto__ = form;
return cljs.core._conj((function (){var x__6696__auto____$1 = x__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})());
var G__14909 = threaded;
var G__14910 = cljs.core.next(forms__$1);
x__$1 = G__14909;
forms__$1 = G__14910;
continue;
} else {
return x__$1;
}
break;
}
});

cljs.core$macros.__GT__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.__GT__GT_.cljs$lang$applyTo = (function (seq14902){
var G__14903 = cljs.core.first(seq14902);
var seq14902__$1 = cljs.core.next(seq14902);
var G__14904 = cljs.core.first(seq14902__$1);
var seq14902__$2 = cljs.core.next(seq14902__$1);
var G__14905 = cljs.core.first(seq14902__$2);
var seq14902__$3 = cljs.core.next(seq14902__$2);
return cljs.core$macros.__GT__GT_.cljs$core$IFn$_invoke$arity$variadic(G__14903,G__14904,G__14905,seq14902__$3);
});

cljs.core$macros.__GT__GT_.cljs$lang$macro = true;
/**
 * form => fieldName-symbol or (instanceMethodName-symbol args*)
 * 
 *   Expands into a member access (.) of the first member on the first
 *   argument, followed by the next member on the result, etc. For
 *   instance:
 * 
 *   (.. System (getProperties) (get "os.name"))
 * 
 *   expands to:
 * 
 *   (. (. System (getProperties)) (get "os.name"))
 * 
 *   but is easier to write, read, and understand.
 */
cljs.core$macros._DOT__DOT_ = (function cljs$core$macros$_DOT__DOT_(var_args){
var args14911 = [];
var len__6932__auto___14919 = arguments.length;
var i__6933__auto___14920 = (0);
while(true){
if((i__6933__auto___14920 < len__6932__auto___14919)){
args14911.push((arguments[i__6933__auto___14920]));

var G__14921 = (i__6933__auto___14920 + (1));
i__6933__auto___14920 = G__14921;
continue;
} else {
}
break;
}

var G__14918 = args14911.length;
switch (G__14918) {
case 4:
return cljs.core$macros._DOT__DOT_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args14911.slice((4)),(0),null));
return cljs.core$macros._DOT__DOT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._DOT__DOT_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,form){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._DOT__DOT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,form,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros._DOT__DOT_.cljs$lang$applyTo = (function (seq14912){
var G__14913 = cljs.core.first(seq14912);
var seq14912__$1 = cljs.core.next(seq14912);
var G__14914 = cljs.core.first(seq14912__$1);
var seq14912__$2 = cljs.core.next(seq14912__$1);
var G__14915 = cljs.core.first(seq14912__$2);
var seq14912__$3 = cljs.core.next(seq14912__$2);
var G__14916 = cljs.core.first(seq14912__$3);
var seq14912__$4 = cljs.core.next(seq14912__$3);
return cljs.core$macros._DOT__DOT_.cljs$core$IFn$_invoke$arity$variadic(G__14913,G__14914,G__14915,G__14916,seq14912__$4);
});

cljs.core$macros._DOT__DOT_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._DOT__DOT_.cljs$lang$macro = true;
/**
 * Ignores body, yields nil
 */
cljs.core$macros.comment = (function cljs$core$macros$comment(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14926 = arguments.length;
var i__6933__auto___14927 = (0);
while(true){
if((i__6933__auto___14927 < len__6932__auto___14926)){
args__6939__auto__.push((arguments[i__6933__auto___14927]));

var G__14928 = (i__6933__auto___14927 + (1));
i__6933__auto___14927 = G__14928;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.comment.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.comment.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return null;
});

cljs.core$macros.comment.cljs$lang$maxFixedArity = (2);

cljs.core$macros.comment.cljs$lang$applyTo = (function (seq14923){
var G__14924 = cljs.core.first(seq14923);
var seq14923__$1 = cljs.core.next(seq14923);
var G__14925 = cljs.core.first(seq14923__$1);
var seq14923__$2 = cljs.core.next(seq14923__$1);
return cljs.core$macros.comment.cljs$core$IFn$_invoke$arity$variadic(G__14924,G__14925,seq14923__$2);
});

cljs.core$macros.comment.cljs$lang$macro = true;
/**
 * Takes a set of test/expr pairs. It evaluates each test one at a
 *   time.  If a test returns logical true, cond evaluates and returns
 *   the value of the corresponding expr and doesn't evaluate any of the
 *   other tests or exprs. (cond) returns nil.
 */
cljs.core$macros.cond = (function cljs$core$macros$cond(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14932 = arguments.length;
var i__6933__auto___14933 = (0);
while(true){
if((i__6933__auto___14933 < len__6932__auto___14932)){
args__6939__auto__.push((arguments[i__6933__auto___14933]));

var G__14934 = (i__6933__auto___14933 + (1));
i__6933__auto___14933 = G__14934;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.cond.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.cond.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,clauses){
if(cljs.core.truth_(clauses)){
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.first(clauses);
return cljs.core._conj((function (){var x__6696__auto____$1 = ((cljs.core.next(clauses))?cljs.core.second(clauses):(function(){throw (new Error("cond requires an even number of forms"))})());
return cljs.core._conj((function (){var x__6696__auto____$2 = cljs.core.cons(cljs.core.cst$sym$cljs$core_SLASH_cond,cljs.core.next(cljs.core.next(clauses)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$2);
})(),x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$if);
} else {
return null;
}
});

cljs.core$macros.cond.cljs$lang$maxFixedArity = (2);

cljs.core$macros.cond.cljs$lang$applyTo = (function (seq14929){
var G__14930 = cljs.core.first(seq14929);
var seq14929__$1 = cljs.core.next(seq14929);
var G__14931 = cljs.core.first(seq14929__$1);
var seq14929__$2 = cljs.core.next(seq14929__$1);
return cljs.core$macros.cond.cljs$core$IFn$_invoke$arity$variadic(G__14930,G__14931,seq14929__$2);
});

cljs.core$macros.cond.cljs$lang$macro = true;
/**
 * defs the supplied var names with no bindings, useful for making forward declarations.
 */
cljs.core$macros.declare = (function cljs$core$macros$declare(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14939 = arguments.length;
var i__6933__auto___14940 = (0);
while(true){
if((i__6933__auto___14940 < len__6932__auto___14939)){
args__6939__auto__.push((arguments[i__6933__auto___14940]));

var G__14941 = (i__6933__auto___14940 + (1));
i__6933__auto___14940 = G__14941;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.declare.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.declare.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,names){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__14935_SHARP_){
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(p1__14935_SHARP_,cljs.core.assoc,cljs.core.cst$kw$declared,true);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$def);
}),names))));
});

cljs.core$macros.declare.cljs$lang$maxFixedArity = (2);

cljs.core$macros.declare.cljs$lang$applyTo = (function (seq14936){
var G__14937 = cljs.core.first(seq14936);
var seq14936__$1 = cljs.core.next(seq14936);
var G__14938 = cljs.core.first(seq14936__$1);
var seq14936__$2 = cljs.core.next(seq14936__$1);
return cljs.core$macros.declare.cljs$core$IFn$_invoke$arity$variadic(G__14937,G__14938,seq14936__$2);
});

cljs.core$macros.declare.cljs$lang$macro = true;
/**
 * Evaluates x then calls all of the methods and functions with the
 *   value of x supplied at the front of the given arguments.  The forms
 *   are evaluated in order.  Returns x.
 * 
 *   (doto (new java.util.HashMap) (.put "a" 1) (.put "b" 2))
 */
cljs.core$macros.doto = (function cljs$core$macros$doto(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14946 = arguments.length;
var i__6933__auto___14947 = (0);
while(true){
if((i__6933__auto___14947 < len__6932__auto___14946)){
args__6939__auto__.push((arguments[i__6933__auto___14947]));

var G__14948 = (i__6933__auto___14947 + (1));
i__6933__auto___14947 = G__14948;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.doto.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.doto.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,forms){
var gx = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = gx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (gx){
return (function (f){
if(cljs.core.seq_QMARK_(f)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = cljs.core.first(f);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.next(f)], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = f;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
}
});})(gx))
,forms),(function (){var x__6696__auto__ = gx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.doto.cljs$lang$maxFixedArity = (3);

cljs.core$macros.doto.cljs$lang$applyTo = (function (seq14942){
var G__14943 = cljs.core.first(seq14942);
var seq14942__$1 = cljs.core.next(seq14942);
var G__14944 = cljs.core.first(seq14942__$1);
var seq14942__$2 = cljs.core.next(seq14942__$1);
var G__14945 = cljs.core.first(seq14942__$2);
var seq14942__$3 = cljs.core.next(seq14942__$2);
return cljs.core$macros.doto.cljs$core$IFn$_invoke$arity$variadic(G__14943,G__14944,G__14945,seq14942__$3);
});

cljs.core$macros.doto.cljs$lang$macro = true;
cljs.core$macros.parse_impls = (function cljs$core$macros$parse_impls(specs){
var ret = cljs.core.PersistentArrayMap.EMPTY;
var s = specs;
while(true){
if(cljs.core.seq(s)){
var G__14949 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,cljs.core.first(s),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(s)));
var G__14950 = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(s));
ret = G__14949;
s = G__14950;
continue;
} else {
return ret;
}
break;
}
});
cljs.core$macros.emit_extend_protocol = (function cljs$core$macros$emit_extend_protocol(p,specs){
var impls = cljs.core$macros.parse_impls(specs);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (impls){
return (function (p__14953){
var vec__14954 = p__14953;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14954,(0),null);
var fs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14954,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_extend_DASH_type),(function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = p;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),fs], 0))));
});})(impls))
,impls))));
});
/**
 * Useful when you want to provide several implementations of the same
 *   protocol all at once. Takes a single protocol and the implementation
 *   of that protocol for one or more types. Expands into calls to
 *   extend-type:
 * 
 *   (extend-protocol Protocol
 *     AType
 *       (foo [x] ...)
 *       (bar [x y] ...)
 *     BType
 *       (foo [x] ...)
 *       (bar [x y] ...)
 *     AClass
 *       (foo [x] ...)
 *       (bar [x y] ...)
 *     nil
 *       (foo [x] ...)
 *       (bar [x y] ...))
 * 
 *   expands into:
 * 
 *   (do
 *    (clojure.core/extend-type AType Protocol
 *      (foo [x] ...)
 *      (bar [x y] ...))
 *    (clojure.core/extend-type BType Protocol
 *      (foo [x] ...)
 *      (bar [x y] ...))
 *    (clojure.core/extend-type AClass Protocol
 *      (foo [x] ...)
 *      (bar [x y] ...))
 *    (clojure.core/extend-type nil Protocol
 *      (foo [x] ...)
 *      (bar [x y] ...)))
 */
cljs.core$macros.extend_protocol = (function cljs$core$macros$extend_protocol(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14959 = arguments.length;
var i__6933__auto___14960 = (0);
while(true){
if((i__6933__auto___14960 < len__6932__auto___14959)){
args__6939__auto__.push((arguments[i__6933__auto___14960]));

var G__14961 = (i__6933__auto___14960 + (1));
i__6933__auto___14960 = G__14961;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.extend_protocol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.extend_protocol.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,p,specs){
return cljs.core$macros.emit_extend_protocol(p,specs);
});

cljs.core$macros.extend_protocol.cljs$lang$maxFixedArity = (3);

cljs.core$macros.extend_protocol.cljs$lang$applyTo = (function (seq14955){
var G__14956 = cljs.core.first(seq14955);
var seq14955__$1 = cljs.core.next(seq14955);
var G__14957 = cljs.core.first(seq14955__$1);
var seq14955__$2 = cljs.core.next(seq14955__$1);
var G__14958 = cljs.core.first(seq14955__$2);
var seq14955__$3 = cljs.core.next(seq14955__$2);
return cljs.core$macros.extend_protocol.cljs$core$IFn$_invoke$arity$variadic(G__14956,G__14957,G__14958,seq14955__$3);
});

cljs.core$macros.extend_protocol.cljs$lang$macro = true;
cljs.core$macros.maybe_destructured = (function cljs$core$macros$maybe_destructured(params,body){
if(cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,params)){
return cljs.core.cons(params,body);
} else {
var params__$1 = params;
var new_params = cljs.core.with_meta(cljs.core.PersistentVector.EMPTY,cljs.core.meta(params__$1));
var lets = cljs.core.PersistentVector.EMPTY;
while(true){
if(cljs.core.truth_(params__$1)){
if((cljs.core.first(params__$1) instanceof cljs.core.Symbol)){
var G__14962 = cljs.core.next(params__$1);
var G__14963 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new_params,cljs.core.first(params__$1));
var G__14964 = lets;
params__$1 = G__14962;
new_params = G__14963;
lets = G__14964;
continue;
} else {
var gparam = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("p__");
var G__14965 = cljs.core.next(params__$1);
var G__14966 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new_params,gparam);
var G__14967 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(lets,cljs.core.first(params__$1)),gparam);
params__$1 = G__14965;
new_params = G__14966;
lets = G__14967;
continue;
}
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = new_params;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = lets;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
}
break;
}
}
});
/**
 * params => positional-params* , or positional-params* & next-param
 *   positional-param => binding-form
 *   next-param => binding-form
 *   name => symbol
 * 
 *   Defines a function
 */
cljs.core$macros.fn = (function cljs$core$macros$fn(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14972 = arguments.length;
var i__6933__auto___14973 = (0);
while(true){
if((i__6933__auto___14973 < len__6932__auto___14972)){
args__6939__auto__.push((arguments[i__6933__auto___14973]));

var G__14974 = (i__6933__auto___14973 + (1));
i__6933__auto___14973 = G__14974;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.fn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.fn.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,sigs){
var name = (((cljs.core.first(sigs) instanceof cljs.core.Symbol))?cljs.core.first(sigs):null);
var sigs__$1 = (cljs.core.truth_(name)?cljs.core.next(sigs):sigs);
var sigs__$2 = ((cljs.core.vector_QMARK_(cljs.core.first(sigs__$1)))?(function (){var x__6696__auto__ = sigs__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})():((cljs.core.seq_QMARK_(cljs.core.first(sigs__$1)))?sigs__$1:(function(){throw (new Error(((cljs.core.seq(sigs__$1))?[cljs.core.str("Parameter declaration "),cljs.core.str(cljs.core.first(sigs__$1)),cljs.core.str(" should be a vector")].join(''):[cljs.core.str("Parameter declaration missing")].join(''))))})()));
var psig = ((function (name,sigs__$1,sigs__$2){
return (function (sig){
if(!(cljs.core.seq_QMARK_(sig))){
throw (new Error([cljs.core.str("Invalid signature "),cljs.core.str(sig),cljs.core.str(" should be a list")].join('')));
} else {
}

var vec__14971 = sig;
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__14971,(0),null);
var body = cljs.core.nthnext(vec__14971,(1));
var _ = ((!(cljs.core.vector_QMARK_(params)))?(function(){throw (new Error(((cljs.core.seq_QMARK_(cljs.core.first(sigs__$2)))?[cljs.core.str("Parameter declaration "),cljs.core.str(params),cljs.core.str(" should be a vector")].join(''):[cljs.core.str("Invalid signature "),cljs.core.str(sig),cljs.core.str(" should be a list")].join(''))))})():null);
var conds = (((cljs.core.next(body)) && (cljs.core.map_QMARK_(cljs.core.first(body))))?cljs.core.first(body):null);
var body__$1 = (cljs.core.truth_(conds)?cljs.core.next(body):body);
var conds__$1 = (function (){var or__5862__auto__ = conds;
if(cljs.core.truth_(or__5862__auto__)){
return or__5862__auto__;
} else {
return cljs.core.meta(params);
}
})();
var pre = cljs.core.cst$kw$pre.cljs$core$IFn$_invoke$arity$1(conds__$1);
var post = cljs.core.cst$kw$post.cljs$core$IFn$_invoke$arity$1(conds__$1);
var body__$2 = (cljs.core.truth_(post)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_PERCENT_),(function (){var x__6696__auto__ = ((((1) < cljs.core.count(body__$1)))?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),body__$1))):cljs.core.first(body__$1));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__14971,params,body,_,conds,body__$1,conds__$1,pre,post,name,sigs__$1,sigs__$2){
return (function (c){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_assert),(function (){var x__6696__auto__ = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});})(vec__14971,params,body,_,conds,body__$1,conds__$1,pre,post,name,sigs__$1,sigs__$2))
,post),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_PERCENT_)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))):body__$1);
var body__$3 = (cljs.core.truth_(pre)?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__14971,params,body,_,conds,body__$1,conds__$1,pre,post,body__$2,name,sigs__$1,sigs__$2){
return (function (c){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_assert),(function (){var x__6696__auto__ = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});})(vec__14971,params,body,_,conds,body__$1,conds__$1,pre,post,body__$2,name,sigs__$1,sigs__$2))
,pre),body__$2):body__$2);
return cljs.core$macros.maybe_destructured(params,body__$3);
});})(name,sigs__$1,sigs__$2))
;
var new_sigs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(psig,sigs__$2);
return cljs.core.with_meta((cljs.core.truth_(name)?cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$fn_STAR_,name,new_sigs):cljs.core.cons(cljs.core.cst$sym$fn_STAR_,new_sigs)),cljs.core.meta(_AMPERSAND_form));
});

cljs.core$macros.fn.cljs$lang$maxFixedArity = (2);

cljs.core$macros.fn.cljs$lang$applyTo = (function (seq14968){
var G__14969 = cljs.core.first(seq14968);
var seq14968__$1 = cljs.core.next(seq14968);
var G__14970 = cljs.core.first(seq14968__$1);
var seq14968__$2 = cljs.core.next(seq14968__$1);
return cljs.core$macros.fn.cljs$core$IFn$_invoke$arity$variadic(G__14969,G__14970,seq14968__$2);
});

cljs.core$macros.fn.cljs$lang$macro = true;
/**
 * same as defn, yielding non-public def
 */
cljs.core$macros.defn_ = (function cljs$core$macros$defn_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___14979 = arguments.length;
var i__6933__auto___14980 = (0);
while(true){
if((i__6933__auto___14980 < len__6932__auto___14979)){
args__6939__auto__.push((arguments[i__6933__auto___14980]));

var G__14981 = (i__6933__auto___14980 + (1));
i__6933__auto___14980 = G__14981;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.defn_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.defn_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,decls){
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$cljs$core$macros_SLASH_defn,cljs.core.with_meta(name,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.meta(name),cljs.core.cst$kw$private,true)),decls);
});

cljs.core$macros.defn_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.defn_.cljs$lang$applyTo = (function (seq14975){
var G__14976 = cljs.core.first(seq14975);
var seq14975__$1 = cljs.core.next(seq14975);
var G__14977 = cljs.core.first(seq14975__$1);
var seq14975__$2 = cljs.core.next(seq14975__$1);
var G__14978 = cljs.core.first(seq14975__$2);
var seq14975__$3 = cljs.core.next(seq14975__$2);
return cljs.core$macros.defn_.cljs$core$IFn$_invoke$arity$variadic(G__14976,G__14977,G__14978,seq14975__$3);
});

cljs.core$macros.defn_.cljs$lang$macro = true;
/**
 * bindings => binding-form test
 * 
 *   If test is true, evaluates then with binding-form bound to the value of
 *   test, if not, yields else
 */
cljs.core$macros.if_let = (function cljs$core$macros$if_let(var_args){
var args14983 = [];
var len__6932__auto___14992 = arguments.length;
var i__6933__auto___14993 = (0);
while(true){
if((i__6933__auto___14993 < len__6932__auto___14992)){
args14983.push((arguments[i__6933__auto___14993]));

var G__14994 = (i__6933__auto___14993 + (1));
i__6933__auto___14993 = G__14994;
continue;
} else {
}
break;
}

var G__14991 = args14983.length;
switch (G__14991) {
case 4:
return cljs.core$macros.if_let.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args14983.slice((5)),(0),null));
return cljs.core$macros.if_let.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__6951__auto__);

}
});

cljs.core$macros.if_let.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,then){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_let),(function (){var x__6696__auto__ = bindings;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.if_let.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,then,else$,oldform){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-let requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.empty_QMARK_(oldform)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-let requires 1 or 2 forms after binding vector",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-let requires exactly 2 forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var form = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((0)) : bindings.call(null,(0)));
var tst = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((1)) : bindings.call(null,(1)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__14982__auto__),(function (){var x__6696__auto__ = tst;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__14982__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__14982__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = else$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.if_let.cljs$lang$applyTo = (function (seq14984){
var G__14985 = cljs.core.first(seq14984);
var seq14984__$1 = cljs.core.next(seq14984);
var G__14986 = cljs.core.first(seq14984__$1);
var seq14984__$2 = cljs.core.next(seq14984__$1);
var G__14987 = cljs.core.first(seq14984__$2);
var seq14984__$3 = cljs.core.next(seq14984__$2);
var G__14988 = cljs.core.first(seq14984__$3);
var seq14984__$4 = cljs.core.next(seq14984__$3);
var G__14989 = cljs.core.first(seq14984__$4);
var seq14984__$5 = cljs.core.next(seq14984__$4);
return cljs.core$macros.if_let.cljs$core$IFn$_invoke$arity$variadic(G__14985,G__14986,G__14987,G__14988,G__14989,seq14984__$5);
});

cljs.core$macros.if_let.cljs$lang$maxFixedArity = (5);

cljs.core$macros.if_let.cljs$lang$macro = true;
/**
 * Evaluates test. If logical false, evaluates and returns then expr,
 *   otherwise else expr, if supplied, else nil.
 */
cljs.core$macros.if_not = (function cljs$core$macros$if_not(var_args){
var args14996 = [];
var len__6932__auto___14999 = arguments.length;
var i__6933__auto___15000 = (0);
while(true){
if((i__6933__auto___15000 < len__6932__auto___14999)){
args14996.push((arguments[i__6933__auto___15000]));

var G__15001 = (i__6933__auto___15000 + (1));
i__6933__auto___15000 = G__15001;
continue;
} else {
}
break;
}

var G__14998 = args14996.length;
switch (G__14998) {
case 4:
return cljs.core$macros.if_not.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core$macros.if_not.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str((args14996.length - (2)))].join('')));

}
});

cljs.core$macros.if_not.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,test,then){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.if_not.cljs$core$IFn$_invoke$arity$5 = (function (_AMPERSAND_form,_AMPERSAND_env,test,then,else$){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_not),(function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = else$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.if_not.cljs$lang$maxFixedArity = 5;

cljs.core$macros.if_not.cljs$lang$macro = true;
/**
 * fnspec ==> (fname [params*] exprs) or (fname ([params*] exprs)+)
 * 
 *   Takes a vector of function specs and a body, and generates a set of
 *   bindings of functions to their names. All of the names are available
 *   in all of the definitions of the functions, as well as the body.
 */
cljs.core$macros.letfn = (function cljs$core$macros$letfn(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15008 = arguments.length;
var i__6933__auto___15009 = (0);
while(true){
if((i__6933__auto___15009 < len__6932__auto___15008)){
args__6939__auto__.push((arguments[i__6933__auto___15009]));

var G__15010 = (i__6933__auto___15009 + (1));
i__6933__auto___15009 = G__15010;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.letfn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.letfn.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,fnspecs,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$letfn_STAR_),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,fnspecs),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15003_SHARP_){
return cljs.core.cons(cljs.core.cst$sym$cljs$core$macros_SLASH_fn,p1__15003_SHARP_);
}),fnspecs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
});

cljs.core$macros.letfn.cljs$lang$maxFixedArity = (3);

cljs.core$macros.letfn.cljs$lang$applyTo = (function (seq15004){
var G__15005 = cljs.core.first(seq15004);
var seq15004__$1 = cljs.core.next(seq15004);
var G__15006 = cljs.core.first(seq15004__$1);
var seq15004__$2 = cljs.core.next(seq15004__$1);
var G__15007 = cljs.core.first(seq15004__$2);
var seq15004__$3 = cljs.core.next(seq15004__$2);
return cljs.core$macros.letfn.cljs$core$IFn$_invoke$arity$variadic(G__15005,G__15006,G__15007,seq15004__$3);
});

cljs.core$macros.letfn.cljs$lang$macro = true;
/**
 * Expands into code that creates a fn that expects to be passed an
 *   object and any args and calls the named instance method on the
 *   object passing the args. Use when you want to treat a Java method as
 *   a first-class fn. name may be type-hinted with the method receiver's
 *   type in order to avoid reflective calls.
 */
cljs.core$macros.memfn = (function cljs$core$macros$memfn(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15015 = arguments.length;
var i__6933__auto___15016 = (0);
while(true){
if((i__6933__auto___15016 < len__6932__auto___15015)){
args__6939__auto__.push((arguments[i__6933__auto___15016]));

var G__15017 = (i__6933__auto___15016 + (1));
i__6933__auto___15016 = G__15017;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.memfn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.memfn.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,args){
var t = cljs.core.with_meta(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("target"),cljs.core.meta(name));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),args))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),args)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.memfn.cljs$lang$maxFixedArity = (3);

cljs.core$macros.memfn.cljs$lang$applyTo = (function (seq15011){
var G__15012 = cljs.core.first(seq15011);
var seq15011__$1 = cljs.core.next(seq15011);
var G__15013 = cljs.core.first(seq15011__$1);
var seq15011__$2 = cljs.core.next(seq15011__$1);
var G__15014 = cljs.core.first(seq15011__$2);
var seq15011__$3 = cljs.core.next(seq15011__$2);
return cljs.core$macros.memfn.cljs$core$IFn$_invoke$arity$variadic(G__15012,G__15013,G__15014,seq15011__$3);
});

cljs.core$macros.memfn.cljs$lang$macro = true;
/**
 * Evaluates test. If logical true, evaluates body in an implicit do.
 */
cljs.core$macros.when = (function cljs$core$macros$when(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15022 = arguments.length;
var i__6933__auto___15023 = (0);
while(true){
if((i__6933__auto___15023 < len__6932__auto___15022)){
args__6939__auto__.push((arguments[i__6933__auto___15023]));

var G__15024 = (i__6933__auto___15023 + (1));
i__6933__auto___15023 = G__15024;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.when.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.when.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,test,body){
return cljs.core._conj((function (){var x__6696__auto__ = test;
return cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core.cons(cljs.core.cst$sym$do,body);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$if);
});

cljs.core$macros.when.cljs$lang$maxFixedArity = (3);

cljs.core$macros.when.cljs$lang$applyTo = (function (seq15018){
var G__15019 = cljs.core.first(seq15018);
var seq15018__$1 = cljs.core.next(seq15018);
var G__15020 = cljs.core.first(seq15018__$1);
var seq15018__$2 = cljs.core.next(seq15018__$1);
var G__15021 = cljs.core.first(seq15018__$2);
var seq15018__$3 = cljs.core.next(seq15018__$2);
return cljs.core$macros.when.cljs$core$IFn$_invoke$arity$variadic(G__15019,G__15020,G__15021,seq15018__$3);
});

cljs.core$macros.when.cljs$lang$macro = true;
/**
 * bindings => x xs
 * 
 *   Roughly the same as (when (seq xs) (let [x (first xs)] body)) but xs is evaluated only once
 */
cljs.core$macros.when_first = (function cljs$core$macros$when_first(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15031 = arguments.length;
var i__6933__auto___15032 = (0);
while(true){
if((i__6933__auto___15032 < len__6932__auto___15031)){
args__6939__auto__.push((arguments[i__6933__auto___15032]));

var G__15033 = (i__6933__auto___15032 + (1));
i__6933__auto___15032 = G__15033;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.when_first.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.when_first.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-first requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-first requires exactly 2 forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var vec__15030 = bindings;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15030,(0),null);
var xs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15030,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$xs__15025__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = xs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_first),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$xs__15025__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.when_first.cljs$lang$maxFixedArity = (3);

cljs.core$macros.when_first.cljs$lang$applyTo = (function (seq15026){
var G__15027 = cljs.core.first(seq15026);
var seq15026__$1 = cljs.core.next(seq15026);
var G__15028 = cljs.core.first(seq15026__$1);
var seq15026__$2 = cljs.core.next(seq15026__$1);
var G__15029 = cljs.core.first(seq15026__$2);
var seq15026__$3 = cljs.core.next(seq15026__$2);
return cljs.core$macros.when_first.cljs$core$IFn$_invoke$arity$variadic(G__15027,G__15028,G__15029,seq15026__$3);
});

cljs.core$macros.when_first.cljs$lang$macro = true;
/**
 * bindings => binding-form test
 * 
 *   When test is true, evaluates body with binding-form bound to the value of test
 */
cljs.core$macros.when_let = (function cljs$core$macros$when_let(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15039 = arguments.length;
var i__6933__auto___15040 = (0);
while(true){
if((i__6933__auto___15040 < len__6932__auto___15039)){
args__6939__auto__.push((arguments[i__6933__auto___15040]));

var G__15041 = (i__6933__auto___15040 + (1));
i__6933__auto___15040 = G__15041;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.when_let.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.when_let.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-let requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-let requires exactly 2 forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var form = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((0)) : bindings.call(null,(0)));
var tst = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((1)) : bindings.call(null,(1)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15034__auto__),(function (){var x__6696__auto__ = tst;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15034__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15034__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.when_let.cljs$lang$maxFixedArity = (3);

cljs.core$macros.when_let.cljs$lang$applyTo = (function (seq15035){
var G__15036 = cljs.core.first(seq15035);
var seq15035__$1 = cljs.core.next(seq15035);
var G__15037 = cljs.core.first(seq15035__$1);
var seq15035__$2 = cljs.core.next(seq15035__$1);
var G__15038 = cljs.core.first(seq15035__$2);
var seq15035__$3 = cljs.core.next(seq15035__$2);
return cljs.core$macros.when_let.cljs$core$IFn$_invoke$arity$variadic(G__15036,G__15037,G__15038,seq15035__$3);
});

cljs.core$macros.when_let.cljs$lang$macro = true;
/**
 * Evaluates test. If logical false, evaluates body in an implicit do.
 */
cljs.core$macros.when_not = (function cljs$core$macros$when_not(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15046 = arguments.length;
var i__6933__auto___15047 = (0);
while(true){
if((i__6933__auto___15047 < len__6932__auto___15046)){
args__6939__auto__.push((arguments[i__6933__auto___15047]));

var G__15048 = (i__6933__auto___15047 + (1));
i__6933__auto___15047 = G__15048;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.when_not.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.when_not.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,test,body){
return cljs.core._conj((function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core.cons(cljs.core.cst$sym$do,body);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),null),x__6696__auto__);
})(),cljs.core.cst$sym$if);
});

cljs.core$macros.when_not.cljs$lang$maxFixedArity = (3);

cljs.core$macros.when_not.cljs$lang$applyTo = (function (seq15042){
var G__15043 = cljs.core.first(seq15042);
var seq15042__$1 = cljs.core.next(seq15042);
var G__15044 = cljs.core.first(seq15042__$1);
var seq15042__$2 = cljs.core.next(seq15042__$1);
var G__15045 = cljs.core.first(seq15042__$2);
var seq15042__$3 = cljs.core.next(seq15042__$2);
return cljs.core$macros.when_not.cljs$core$IFn$_invoke$arity$variadic(G__15043,G__15044,G__15045,seq15042__$3);
});

cljs.core$macros.when_not.cljs$lang$macro = true;
/**
 * Repeatedly executes body while test expression is true. Presumes
 *   some side-effect will cause test to become false/nil. Returns nil
 */
cljs.core$macros.while$ = (function cljs$core$macros$while(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15053 = arguments.length;
var i__6933__auto___15054 = (0);
while(true){
if((i__6933__auto___15054 < len__6932__auto___15053)){
args__6939__auto__.push((arguments[i__6933__auto___15054]));

var G__15055 = (i__6933__auto___15054 + (1));
i__6933__auto___15054 = G__15055;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.while$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.while$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,test,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body,(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.while$.cljs$lang$maxFixedArity = (3);

cljs.core$macros.while$.cljs$lang$applyTo = (function (seq15049){
var G__15050 = cljs.core.first(seq15049);
var seq15049__$1 = cljs.core.next(seq15049);
var G__15051 = cljs.core.first(seq15049__$1);
var seq15049__$2 = cljs.core.next(seq15049__$1);
var G__15052 = cljs.core.first(seq15049__$2);
var seq15049__$3 = cljs.core.next(seq15049__$2);
return cljs.core$macros.while$.cljs$core$IFn$_invoke$arity$variadic(G__15050,G__15051,G__15052,seq15049__$3);
});

cljs.core$macros.while$.cljs$lang$macro = true;
/**
 * Takes an expression and a set of test/form pairs. Threads expr (via ->)
 *   through each form for which the corresponding test
 *   expression is true. Note that, unlike cond branching, cond-> threading does
 *   not short circuit after the first true test expression.
 */
cljs.core$macros.cond__GT_ = (function cljs$core$macros$cond__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15062 = arguments.length;
var i__6933__auto___15063 = (0);
while(true){
if((i__6933__auto___15063 < len__6932__auto___15062)){
args__6939__auto__.push((arguments[i__6933__auto___15063]));

var G__15064 = (i__6933__auto___15063 + (1));
i__6933__auto___15063 = G__15064;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.cond__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.cond__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,clauses){
if(cljs.core.even_QMARK_(cljs.core.count(clauses))){
} else {
throw (new Error("Assert failed: (even? (count clauses))"));
}

var g = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var pstep = ((function (g){
return (function (p__15060){
var vec__15061 = p__15060;
var test = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15061,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15061,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH__GT_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = step;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(g))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(g),cljs.core.map.cljs$core$IFn$_invoke$arity$2(pstep,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),clauses)))], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.cond__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.cond__GT_.cljs$lang$applyTo = (function (seq15056){
var G__15057 = cljs.core.first(seq15056);
var seq15056__$1 = cljs.core.next(seq15056);
var G__15058 = cljs.core.first(seq15056__$1);
var seq15056__$2 = cljs.core.next(seq15056__$1);
var G__15059 = cljs.core.first(seq15056__$2);
var seq15056__$3 = cljs.core.next(seq15056__$2);
return cljs.core$macros.cond__GT_.cljs$core$IFn$_invoke$arity$variadic(G__15057,G__15058,G__15059,seq15056__$3);
});

cljs.core$macros.cond__GT_.cljs$lang$macro = true;
/**
 * Takes an expression and a set of test/form pairs. Threads expr (via ->>)
 *   through each form for which the corresponding test expression
 *   is true.  Note that, unlike cond branching, cond->> threading does not short circuit
 *   after the first true test expression.
 */
cljs.core$macros.cond__GT__GT_ = (function cljs$core$macros$cond__GT__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15071 = arguments.length;
var i__6933__auto___15072 = (0);
while(true){
if((i__6933__auto___15072 < len__6932__auto___15071)){
args__6939__auto__.push((arguments[i__6933__auto___15072]));

var G__15073 = (i__6933__auto___15072 + (1));
i__6933__auto___15072 = G__15073;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.cond__GT__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.cond__GT__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,clauses){
if(cljs.core.even_QMARK_(cljs.core.count(clauses))){
} else {
throw (new Error("Assert failed: (even? (count clauses))"));
}

var g = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var pstep = ((function (g){
return (function (p__15069){
var vec__15070 = p__15069;
var test = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15070,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15070,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH__GT__GT_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = step;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(g))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(g),cljs.core.map.cljs$core$IFn$_invoke$arity$2(pstep,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),clauses)))], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.cond__GT__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.cond__GT__GT_.cljs$lang$applyTo = (function (seq15065){
var G__15066 = cljs.core.first(seq15065);
var seq15065__$1 = cljs.core.next(seq15065);
var G__15067 = cljs.core.first(seq15065__$1);
var seq15065__$2 = cljs.core.next(seq15065__$1);
var G__15068 = cljs.core.first(seq15065__$2);
var seq15065__$3 = cljs.core.next(seq15065__$2);
return cljs.core$macros.cond__GT__GT_.cljs$core$IFn$_invoke$arity$variadic(G__15066,G__15067,G__15068,seq15065__$3);
});

cljs.core$macros.cond__GT__GT_.cljs$lang$macro = true;
/**
 * Binds name to expr, evaluates the first form in the lexical context
 *   of that binding, then binds name to that result, repeating for each
 *   successive form, returning the result of the last form.
 */
cljs.core$macros.as__GT_ = (function cljs$core$macros$as__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15079 = arguments.length;
var i__6933__auto___15080 = (0);
while(true){
if((i__6933__auto___15080 < len__6932__auto___15079)){
args__6939__auto__.push((arguments[i__6933__auto___15080]));

var G__15081 = (i__6933__auto___15080 + (1));
i__6933__auto___15080 = G__15081;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.as__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.as__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,name,forms){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(name),forms)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.as__GT_.cljs$lang$maxFixedArity = (4);

cljs.core$macros.as__GT_.cljs$lang$applyTo = (function (seq15074){
var G__15075 = cljs.core.first(seq15074);
var seq15074__$1 = cljs.core.next(seq15074);
var G__15076 = cljs.core.first(seq15074__$1);
var seq15074__$2 = cljs.core.next(seq15074__$1);
var G__15077 = cljs.core.first(seq15074__$2);
var seq15074__$3 = cljs.core.next(seq15074__$2);
var G__15078 = cljs.core.first(seq15074__$3);
var seq15074__$4 = cljs.core.next(seq15074__$3);
return cljs.core$macros.as__GT_.cljs$core$IFn$_invoke$arity$variadic(G__15075,G__15076,G__15077,G__15078,seq15074__$4);
});

cljs.core$macros.as__GT_.cljs$lang$macro = true;
/**
 * When expr is not nil, threads it into the first form (via ->),
 *   and when that result is not nil, through the next etc
 */
cljs.core$macros.some__GT_ = (function cljs$core$macros$some__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15086 = arguments.length;
var i__6933__auto___15087 = (0);
while(true){
if((i__6933__auto___15087 < len__6932__auto___15086)){
args__6939__auto__.push((arguments[i__6933__auto___15087]));

var G__15088 = (i__6933__auto___15087 + (1));
i__6933__auto___15087 = G__15088;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.some__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.some__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,forms){
var g = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var pstep = ((function (g){
return (function (step){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH__GT_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = step;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(g))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(g),cljs.core.map.cljs$core$IFn$_invoke$arity$2(pstep,forms))], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.some__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.some__GT_.cljs$lang$applyTo = (function (seq15082){
var G__15083 = cljs.core.first(seq15082);
var seq15082__$1 = cljs.core.next(seq15082);
var G__15084 = cljs.core.first(seq15082__$1);
var seq15082__$2 = cljs.core.next(seq15082__$1);
var G__15085 = cljs.core.first(seq15082__$2);
var seq15082__$3 = cljs.core.next(seq15082__$2);
return cljs.core$macros.some__GT_.cljs$core$IFn$_invoke$arity$variadic(G__15083,G__15084,G__15085,seq15082__$3);
});

cljs.core$macros.some__GT_.cljs$lang$macro = true;
/**
 * When expr is not nil, threads it into the first form (via ->>),
 *   and when that result is not nil, through the next etc
 */
cljs.core$macros.some__GT__GT_ = (function cljs$core$macros$some__GT__GT_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15093 = arguments.length;
var i__6933__auto___15094 = (0);
while(true){
if((i__6933__auto___15094 < len__6932__auto___15093)){
args__6939__auto__.push((arguments[i__6933__auto___15094]));

var G__15095 = (i__6933__auto___15094 + (1));
i__6933__auto___15094 = G__15095;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.some__GT__GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.some__GT__GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,forms){
var g = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var pstep = ((function (g){
return (function (step){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH__GT__GT_),(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = step;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(g))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(g),cljs.core.map.cljs$core$IFn$_invoke$arity$2(pstep,forms))], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = g;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.some__GT__GT_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.some__GT__GT_.cljs$lang$applyTo = (function (seq15089){
var G__15090 = cljs.core.first(seq15089);
var seq15089__$1 = cljs.core.next(seq15089);
var G__15091 = cljs.core.first(seq15089__$1);
var seq15089__$2 = cljs.core.next(seq15089__$1);
var G__15092 = cljs.core.first(seq15089__$2);
var seq15089__$3 = cljs.core.next(seq15089__$2);
return cljs.core$macros.some__GT__GT_.cljs$core$IFn$_invoke$arity$variadic(G__15090,G__15091,G__15092,seq15089__$3);
});

cljs.core$macros.some__GT__GT_.cljs$lang$macro = true;
/**
 * bindings => binding-form test
 * 
 *    If test is not nil, evaluates then with binding-form bound to the
 *    value of test, if not, yields else
 */
cljs.core$macros.if_some = (function cljs$core$macros$if_some(var_args){
var args15097 = [];
var len__6932__auto___15106 = arguments.length;
var i__6933__auto___15107 = (0);
while(true){
if((i__6933__auto___15107 < len__6932__auto___15106)){
args15097.push((arguments[i__6933__auto___15107]));

var G__15108 = (i__6933__auto___15107 + (1));
i__6933__auto___15107 = G__15108;
continue;
} else {
}
break;
}

var G__15105 = args15097.length;
switch (G__15105) {
case 4:
return cljs.core$macros.if_some.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15097.slice((5)),(0),null));
return cljs.core$macros.if_some.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__6951__auto__);

}
});

cljs.core$macros.if_some.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,then){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_some),(function (){var x__6696__auto__ = bindings;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.if_some.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,then,else$,oldform){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-some requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.empty_QMARK_(oldform)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-some requires 1 or 2 forms after binding vector",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("if-some requires exactly 2 forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var form = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((0)) : bindings.call(null,(0)));
var tst = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((1)) : bindings.call(null,(1)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15096__auto__),(function (){var x__6696__auto__ = tst;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15096__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = else$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15096__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = then;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.if_some.cljs$lang$applyTo = (function (seq15098){
var G__15099 = cljs.core.first(seq15098);
var seq15098__$1 = cljs.core.next(seq15098);
var G__15100 = cljs.core.first(seq15098__$1);
var seq15098__$2 = cljs.core.next(seq15098__$1);
var G__15101 = cljs.core.first(seq15098__$2);
var seq15098__$3 = cljs.core.next(seq15098__$2);
var G__15102 = cljs.core.first(seq15098__$3);
var seq15098__$4 = cljs.core.next(seq15098__$3);
var G__15103 = cljs.core.first(seq15098__$4);
var seq15098__$5 = cljs.core.next(seq15098__$4);
return cljs.core$macros.if_some.cljs$core$IFn$_invoke$arity$variadic(G__15099,G__15100,G__15101,G__15102,G__15103,seq15098__$5);
});

cljs.core$macros.if_some.cljs$lang$maxFixedArity = (5);

cljs.core$macros.if_some.cljs$lang$macro = true;
/**
 * bindings => binding-form test
 * 
 *    When test is not nil, evaluates body with binding-form bound to the
 *    value of test
 */
cljs.core$macros.when_some = (function cljs$core$macros$when_some(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15115 = arguments.length;
var i__6933__auto___15116 = (0);
while(true){
if((i__6933__auto___15116 < len__6932__auto___15115)){
args__6939__auto__.push((arguments[i__6933__auto___15116]));

var G__15117 = (i__6933__auto___15116 + (1));
i__6933__auto___15116 = G__15117;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.when_some.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.when_some.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-some requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("when-some requires exactly 2 forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var form = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((0)) : bindings.call(null,(0)));
var tst = (bindings.cljs$core$IFn$_invoke$arity$1 ? bindings.cljs$core$IFn$_invoke$arity$1((1)) : bindings.call(null,(1)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15110__auto__),(function (){var x__6696__auto__ = tst;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15110__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = form;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$temp__15110__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.when_some.cljs$lang$maxFixedArity = (3);

cljs.core$macros.when_some.cljs$lang$applyTo = (function (seq15111){
var G__15112 = cljs.core.first(seq15111);
var seq15111__$1 = cljs.core.next(seq15111);
var G__15113 = cljs.core.first(seq15111__$1);
var seq15111__$2 = cljs.core.next(seq15111__$1);
var G__15114 = cljs.core.first(seq15111__$2);
var seq15111__$3 = cljs.core.next(seq15111__$2);
return cljs.core$macros.when_some.cljs$core$IFn$_invoke$arity$variadic(G__15112,G__15113,G__15114,seq15111__$3);
});

cljs.core$macros.when_some.cljs$lang$macro = true;
/**
 * A good fdecl looks like (([a] ...) ([a b] ...)) near the end of defn.
 */
cljs.core$macros.assert_valid_fdecl = (function cljs$core$macros$assert_valid_fdecl(fdecl){
if(cljs.core.empty_QMARK_(fdecl)){
throw (new Error("Parameter declaration missing"));
} else {
}

var argdecls = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15118_SHARP_){
if(cljs.core.seq_QMARK_(p1__15118_SHARP_)){
return cljs.core.first(p1__15118_SHARP_);
} else {
throw (new Error(((cljs.core.seq_QMARK_(cljs.core.first(fdecl)))?[cljs.core.str("Invalid signature \""),cljs.core.str(p1__15118_SHARP_),cljs.core.str("\" should be a list")].join(''):[cljs.core.str("Parameter declaration \""),cljs.core.str(p1__15118_SHARP_),cljs.core.str("\" should be a vector")].join(''))));
}
}),fdecl);
var bad_args = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(((function (argdecls){
return (function (p1__15119_SHARP_){
return cljs.core.vector_QMARK_(p1__15119_SHARP_);
});})(argdecls))
,argdecls));
if(bad_args){
throw (new Error([cljs.core.str("Parameter declaration \""),cljs.core.str(cljs.core.first(bad_args)),cljs.core.str("\" should be a vector")].join('')));
} else {
return null;
}
});
cljs.core$macros.sigs = (function cljs$core$macros$sigs(fdecl){
(cljs.core$macros.assert_valid_fdecl.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.assert_valid_fdecl.cljs$core$IFn$_invoke$arity$1(fdecl) : cljs.core$macros.assert_valid_fdecl.call(null,fdecl));

var asig = (function (fdecl__$1){
var arglist = cljs.core.first(fdecl__$1);
var arglist__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$_AMPERSAND_form,cljs.core.first(arglist)))?cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(arglist,(2),cljs.core.count(arglist)):arglist);
var body = cljs.core.next(fdecl__$1);
if(cljs.core.map_QMARK_(cljs.core.first(body))){
if(cljs.core.next(body)){
return cljs.core.with_meta(arglist__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_(cljs.core.meta(arglist__$1))?cljs.core.meta(arglist__$1):cljs.core.PersistentArrayMap.EMPTY),cljs.core.first(body)));
} else {
return arglist__$1;
}
} else {
return arglist__$1;
}
});
if(cljs.core.seq_QMARK_(cljs.core.first(fdecl))){
var ret = cljs.core.PersistentVector.EMPTY;
var fdecls = fdecl;
while(true){
if(cljs.core.truth_(fdecls)){
var G__15120 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,asig(cljs.core.first(fdecls)));
var G__15121 = cljs.core.next(fdecls);
ret = G__15120;
fdecls = G__15121;
continue;
} else {
return cljs.core.seq(ret);
}
break;
}
} else {
var x__6696__auto__ = asig(fdecl);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
}
});
cljs.core$macros.defonce = (function cljs$core$macros$defonce(_AMPERSAND_form,_AMPERSAND_env,x,init){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_exists_QMARK_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$def),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = init;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.defonce.cljs$lang$macro = true;
cljs.core$macros.destructure = (function cljs$core$macros$destructure(bindings){
var bents = cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),bindings);
var pb = ((function (bents){
return (function cljs$core$macros$destructure_$_pb(bvec,b,v){
var pvec = ((function (bents){
return (function (bvec__$1,b__$1,val){
var gvec = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("vec__");
var ret = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bvec__$1,gvec),val);
var n = (0);
var bs = b__$1;
var seen_rest_QMARK_ = false;
while(true){
if(cljs.core.seq(bs)){
var firstb = cljs.core.first(bs);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(firstb,cljs.core.cst$sym$_AMPERSAND_)){
var G__15151 = cljs$core$macros$destructure_$_pb(ret,cljs.core.second(bs),cljs.core._conj((function (){var x__6696__auto__ = gvec;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core_SLASH_nthnext));
var G__15152 = n;
var G__15153 = cljs.core.nnext(bs);
var G__15154 = true;
ret = G__15151;
n = G__15152;
bs = G__15153;
seen_rest_QMARK_ = G__15154;
continue;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(firstb,cljs.core.cst$kw$as)){
return cljs$core$macros$destructure_$_pb(ret,cljs.core.second(bs),gvec);
} else {
if(seen_rest_QMARK_){
throw (new Error("Unsupported binding form, only :as can follow & parameter"));
} else {
var G__15155 = cljs$core$macros$destructure_$_pb(ret,firstb,cljs.core._conj((function (){var x__6696__auto__ = gvec;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,null),x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core_SLASH_nth));
var G__15156 = (n + (1));
var G__15157 = cljs.core.next(bs);
var G__15158 = seen_rest_QMARK_;
ret = G__15155;
n = G__15156;
bs = G__15157;
seen_rest_QMARK_ = G__15158;
continue;
}

}
}
} else {
return ret;
}
break;
}
});})(bents))
;
var pmap = ((function (pvec,bents){
return (function (bvec__$1,b__$1,v__$1){
var gmap = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("map__");
var defaults = cljs.core.cst$kw$or.cljs$core$IFn$_invoke$arity$1(b__$1);
var ret = ((function (gmap,defaults,pvec,bents){
return (function (ret){
if(cljs.core.truth_(cljs.core.cst$kw$as.cljs$core$IFn$_invoke$arity$1(b__$1))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(ret,cljs.core.cst$kw$as.cljs$core$IFn$_invoke$arity$1(b__$1),cljs.core.array_seq([gmap], 0));
} else {
return ret;
}
});})(gmap,defaults,pvec,bents))
.call(null,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bvec__$1,gmap),v__$1),gmap),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_implements_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_ISeq),cljs.core.array_seq([(function (){var x__6696__auto__ = gmap;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_apply),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_hash_DASH_map),cljs.core.array_seq([(function (){var x__6696__auto__ = gmap;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gmap;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))));
var bes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (ret,gmap,defaults,pvec,bents){
return (function (bes,entry){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (ret,gmap,defaults,pvec,bents){
return (function (p1__15122_SHARP_,p2__15123_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__15122_SHARP_,p2__15123_SHARP_,cljs.core.val(entry).call(null,p2__15123_SHARP_));
});})(ret,gmap,defaults,pvec,bents))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(bes,cljs.core.key(entry)),cljs.core.key(entry).call(null,bes));
});})(ret,gmap,defaults,pvec,bents))
,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(b__$1,cljs.core.cst$kw$as,cljs.core.array_seq([cljs.core.cst$kw$or], 0)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$keys,((function (ret,gmap,defaults,pvec,bents){
return (function (p1__15124_SHARP_){
if((p1__15124_SHARP_ instanceof cljs.core.Keyword)){
return p1__15124_SHARP_;
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1([cljs.core.str(p1__15124_SHARP_)].join(''));
}
});})(ret,gmap,defaults,pvec,bents))
,cljs.core.cst$kw$strs,cljs.core.str,cljs.core.cst$kw$syms,((function (ret,gmap,defaults,pvec,bents){
return (function (p1__15125_SHARP_){
return cljs.core._conj((function (){var x__6696__auto__ = p1__15125_SHARP_;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$quote);
});})(ret,gmap,defaults,pvec,bents))
], null));
while(true){
if(cljs.core.seq(bes)){
var bb = cljs.core.key(cljs.core.first(bes));
var bk = cljs.core.val(cljs.core.first(bes));
var has_default = cljs.core.contains_QMARK_(defaults,bb);
var G__15159 = cljs$core$macros$destructure_$_pb(ret,bb,((has_default)?cljs.core._conj((function (){var x__6696__auto__ = gmap;
return cljs.core._conj((function (){var x__6696__auto____$1 = bk;
return cljs.core._conj((function (){var x__6696__auto____$2 = (defaults.cljs$core$IFn$_invoke$arity$1 ? defaults.cljs$core$IFn$_invoke$arity$1(bb) : defaults.call(null,bb));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$2);
})(),x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core_SLASH_get):cljs.core._conj((function (){var x__6696__auto__ = gmap;
return cljs.core._conj((function (){var x__6696__auto____$1 = bk;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core_SLASH_get)));
var G__15160 = cljs.core.next(bes);
ret = G__15159;
bes = G__15160;
continue;
} else {
return ret;
}
break;
}
});})(pvec,bents))
;
if((b instanceof cljs.core.Symbol)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bvec,(cljs.core.truth_(cljs.core.namespace(b))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(b)):b)),v);
} else {
if((b instanceof cljs.core.Keyword)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(bvec,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(b))),v);
} else {
if(cljs.core.vector_QMARK_(b)){
return pvec(bvec,b,v);
} else {
if(cljs.core.map_QMARK_(b)){
return pmap(bvec,b,v);
} else {
throw (new Error([cljs.core.str("Unsupported binding form: "),cljs.core.str(b)].join('')));

}
}
}
}
});})(bents))
;
var process_entry = ((function (bents,pb){
return (function (bvec,b){
return pb(bvec,cljs.core.first(b),cljs.core.second(b));
});})(bents,pb))
;
if(cljs.core.every_QMARK_(cljs.core.symbol_QMARK_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,bents))){
return bindings;
} else {
var temp__4655__auto__ = cljs.core.seq(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (bents,pb,process_entry){
return (function (p1__15126_SHARP_){
return (cljs.core.first(p1__15126_SHARP_) instanceof cljs.core.Keyword);
});})(bents,pb,process_entry))
,bents));
if(temp__4655__auto__){
var kwbs = temp__4655__auto__;
throw (new Error([cljs.core.str("Unsupported binding key: "),cljs.core.str(cljs.core.ffirst(kwbs))].join('')));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(process_entry,cljs.core.PersistentVector.EMPTY,bents);
}
}
});
/**
 * Defines a var using `goog.define`. Passed default value must be
 *   string, number or boolean.
 * 
 *   Default value can be overridden at compile time using the
 *   compiler option `:closure-defines`.
 * 
 *   Example:
 *  (ns your-app.core)
 *  (goog-define DEBUG! false)
 *  ;; can be overridden with
 *  :closure-defines {"your_app.core.DEBUG_BANG_" true}
 *  or
 *  :closure-defines {'your-app.core/DEBUG! true}
 */
cljs.core$macros.goog_define = (function cljs$core$macros$goog_define(_AMPERSAND_form,_AMPERSAND_env,sym,default$){
if((typeof default$ === 'string') || (typeof default$ === 'number') || (default$ === true) || (default$ === false)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("goog-define requires a string, number or boolean as default value",cljs.core.PersistentArrayMap.EMPTY);
}


var defname = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core._STAR_ns_STAR_),cljs.core.str("/"),cljs.core.str(sym)].join(''));
var type = ((typeof default$ === 'string')?"string":((typeof default$ === 'number')?"number":(((default$ === true) || (default$ === false))?"boolean":null)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_declare),(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(sym);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),(function (){var x__6696__auto__ = [cljs.core.str("/** @define {"),cljs.core.str(type),cljs.core.str("} */")].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$goog_SLASH_define),(function (){var x__6696__auto__ = defname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = default$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.goog_define.cljs$lang$macro = true;
/**
 * binding => binding-form init-expr
 * 
 *   Evaluates the exprs in a lexical context in which the symbols in
 *   the binding-forms are bound to their respective init-exprs or parts
 *   therein.
 */
cljs.core$macros.let$ = (function cljs$core$macros$let(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15165 = arguments.length;
var i__6933__auto___15166 = (0);
while(true){
if((i__6933__auto___15166 < len__6932__auto___15165)){
args__6939__auto__.push((arguments[i__6933__auto___15166]));

var G__15167 = (i__6933__auto___15166 + (1));
i__6933__auto___15166 = G__15167;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.let$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.let$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("let requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.even_QMARK_(cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("let requires an even number of forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$let_STAR_),(function (){var x__6696__auto__ = cljs.core$macros.destructure(bindings);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
});

cljs.core$macros.let$.cljs$lang$maxFixedArity = (3);

cljs.core$macros.let$.cljs$lang$applyTo = (function (seq15161){
var G__15162 = cljs.core.first(seq15161);
var seq15161__$1 = cljs.core.next(seq15161);
var G__15163 = cljs.core.first(seq15161__$1);
var seq15161__$2 = cljs.core.next(seq15161__$1);
var G__15164 = cljs.core.first(seq15161__$2);
var seq15161__$3 = cljs.core.next(seq15161__$2);
return cljs.core$macros.let$.cljs$core$IFn$_invoke$arity$variadic(G__15162,G__15163,G__15164,seq15161__$3);
});

cljs.core$macros.let$.cljs$lang$macro = true;
/**
 * Evaluates the exprs in a lexical context in which the symbols in
 *   the binding-forms are bound to their respective init-exprs or parts
 *   therein. Acts as a recur target.
 */
cljs.core$macros.loop = (function cljs$core$macros$loop(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15174 = arguments.length;
var i__6933__auto___15175 = (0);
while(true){
if((i__6933__auto___15175 < len__6932__auto___15174)){
args__6939__auto__.push((arguments[i__6933__auto___15175]));

var G__15176 = (i__6933__auto___15175 + (1));
i__6933__auto___15175 = G__15176;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.loop.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.loop.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
if(cljs.core.vector_QMARK_(bindings)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("loop requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.even_QMARK_(cljs.core.count(bindings))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("loop requires an even number of forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var db = cljs.core$macros.destructure(bindings);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(db,bindings)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$loop_STAR_),(function (){var x__6696__auto__ = bindings;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
} else {
var vs = cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),bindings));
var bs = cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),bindings);
var gs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vs,bs,db){
return (function (b){
if((b instanceof cljs.core.Symbol)){
return b;
} else {
return cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
}
});})(vs,bs,db))
,bs);
var bfs = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (vs,bs,gs,db){
return (function (ret,p__15172){
var vec__15173 = p__15172;
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15173,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15173,(1),null);
var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15173,(2),null);
if((b instanceof cljs.core.Symbol)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(ret,g,cljs.core.array_seq([v], 0));
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(ret,g,cljs.core.array_seq([v,b,g], 0));
}
});})(vs,bs,gs,db))
,cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$4(cljs.core.vector,bs,vs,gs));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = bfs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$loop_STAR_),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(gs,gs));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(bs,gs));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.loop.cljs$lang$maxFixedArity = (3);

cljs.core$macros.loop.cljs$lang$applyTo = (function (seq15168){
var G__15169 = cljs.core.first(seq15168);
var seq15168__$1 = cljs.core.next(seq15168);
var G__15170 = cljs.core.first(seq15168__$1);
var seq15168__$2 = cljs.core.next(seq15168__$1);
var G__15171 = cljs.core.first(seq15168__$2);
var seq15168__$3 = cljs.core.next(seq15168__$2);
return cljs.core$macros.loop.cljs$core$IFn$_invoke$arity$variadic(G__15169,G__15170,G__15171,seq15168__$3);
});

cljs.core$macros.loop.cljs$lang$macro = true;
/**
 * protocol fqn -> [partition number, bit]
 */
cljs.core$macros.fast_path_protocols = cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15177_SHARP_){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core",[cljs.core.str(p1__15177_SHARP_)].join(''));
}),cljs.core.PersistentVector.fromArray([cljs.core.cst$sym$IFn,cljs.core.cst$sym$ICounted,cljs.core.cst$sym$IEmptyableCollection,cljs.core.cst$sym$ICollection,cljs.core.cst$sym$IIndexed,cljs.core.cst$sym$ASeq,cljs.core.cst$sym$ISeq,cljs.core.cst$sym$INext,cljs.core.cst$sym$ILookup,cljs.core.cst$sym$IAssociative,cljs.core.cst$sym$IMap,cljs.core.cst$sym$IMapEntry,cljs.core.cst$sym$ISet,cljs.core.cst$sym$IStack,cljs.core.cst$sym$IVector,cljs.core.cst$sym$IDeref,cljs.core.cst$sym$IDerefWithTimeout,cljs.core.cst$sym$IMeta,cljs.core.cst$sym$IWithMeta,cljs.core.cst$sym$IReduce,cljs.core.cst$sym$IKVReduce,cljs.core.cst$sym$IEquiv,cljs.core.cst$sym$IHash,cljs.core.cst$sym$ISeqable,cljs.core.cst$sym$ISequential,cljs.core.cst$sym$IList,cljs.core.cst$sym$IRecord,cljs.core.cst$sym$IReversible,cljs.core.cst$sym$ISorted,cljs.core.cst$sym$IPrintWithWriter,cljs.core.cst$sym$IWriter,cljs.core.cst$sym$IPrintWithWriter,cljs.core.cst$sym$IPending,cljs.core.cst$sym$IWatchable,cljs.core.cst$sym$IEditableCollection,cljs.core.cst$sym$ITransientCollection,cljs.core.cst$sym$ITransientAssociative,cljs.core.cst$sym$ITransientMap,cljs.core.cst$sym$ITransientVector,cljs.core.cst$sym$ITransientSet,cljs.core.cst$sym$IMultiFn,cljs.core.cst$sym$IChunkedSeq,cljs.core.cst$sym$IChunkedNext,cljs.core.cst$sym$IComparable,cljs.core.cst$sym$INamed,cljs.core.cst$sym$ICloneable,cljs.core.cst$sym$IAtom,cljs.core.cst$sym$IReset,cljs.core.cst$sym$ISwap], true)),cljs.core.iterate((function (p__15178){
var vec__15179 = p__15178;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15179,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15179,(1),null);
if(((2147483648) === b)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(p + (1)),(1)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,((2) * b)], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null)));
/**
 * total number of partitions
 */
cljs.core$macros.fast_path_protocol_partitions_count = (function (){var c = cljs.core.count(cljs.core$macros.fast_path_protocols);
var m = cljs.core.mod(c,(32));
if((m === (0))){
return cljs.core.quot(c,(32));
} else {
return (cljs.core.quot(c,(32)) + (1));
}
})();
cljs.core$macros.str = (function cljs$core$macros$str(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15183 = arguments.length;
var i__6933__auto___15184 = (0);
while(true){
if((i__6933__auto___15184 < len__6932__auto___15183)){
args__6939__auto__.push((arguments[i__6933__auto___15184]));

var G__15185 = (i__6933__auto___15184 + (1));
i__6933__auto___15184 = G__15185;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.str.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.str.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
var strs = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(xs),"cljs.core.str(~{})")));
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$js_STAR_,[cljs.core.str("["),cljs.core.str(strs),cljs.core.str("].join('')")].join(''),xs);
});

cljs.core$macros.str.cljs$lang$maxFixedArity = (2);

cljs.core$macros.str.cljs$lang$applyTo = (function (seq15180){
var G__15181 = cljs.core.first(seq15180);
var seq15180__$1 = cljs.core.next(seq15180);
var G__15182 = cljs.core.first(seq15180__$1);
var seq15180__$2 = cljs.core.next(seq15180__$1);
return cljs.core$macros.str.cljs$core$IFn$_invoke$arity$variadic(G__15181,G__15182,seq15180__$2);
});

cljs.core$macros.str.cljs$lang$macro = true;
cljs.core$macros.bool_expr = (function cljs$core$macros$bool_expr(e){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(e,cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean);
});
cljs.core$macros.simple_test_expr_QMARK_ = (function cljs$core$macros$simple_test_expr_QMARK_(env,ast){
var and__5850__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$js,null,cljs.core.cst$kw$constant,null,cljs.core.cst$kw$var,null,cljs.core.cst$kw$invoke,null,cljs.core.cst$kw$dot,null], null), null).call(null,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(ast));
if(cljs.core.truth_(and__5850__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$seq,null,cljs.core.cst$sym$boolean,null], null), null).call(null,cljs.analyzer.infer_tag(env,ast));
} else {
return and__5850__auto__;
}
});
/**
 * Evaluates exprs one at a time, from left to right. If a form
 *   returns logical false (nil or false), and returns that value and
 *   doesn't evaluate any of the other expressions, otherwise it returns
 *   the value of the last expr. (and) returns true.
 */
cljs.core$macros.and = (function cljs$core$macros$and(var_args){
var args15189 = [];
var len__6932__auto___15196 = arguments.length;
var i__6933__auto___15197 = (0);
while(true){
if((i__6933__auto___15197 < len__6932__auto___15196)){
args15189.push((arguments[i__6933__auto___15197]));

var G__15198 = (i__6933__auto___15197 + (1));
i__6933__auto___15197 = G__15198;
continue;
} else {
}
break;
}

var G__15195 = args15189.length;
switch (G__15195) {
case 2:
return cljs.core$macros.and.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core$macros.and.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15189.slice((3)),(0),null));
return cljs.core$macros.and.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6951__auto__);

}
});

cljs.core$macros.and.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return true;
});

cljs.core$macros.and.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.and.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,next){
var forms = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null),next);
if(cljs.core.every_QMARK_(((function (forms){
return (function (p1__15186_SHARP_){
return cljs.core$macros.simple_test_expr_QMARK_(_AMPERSAND_env,p1__15186_SHARP_);
});})(forms))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (forms){
return (function (p1__15187_SHARP_){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,p1__15187_SHARP_);
});})(forms))
,forms))){
var and_str = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" && ",cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(forms),"(~{})")));
return cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),(function (){var x__6696__auto__ = and_str;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([forms], 0)))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$and__15188__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$and__15188__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),next)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$and__15188__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.and.cljs$lang$applyTo = (function (seq15190){
var G__15191 = cljs.core.first(seq15190);
var seq15190__$1 = cljs.core.next(seq15190);
var G__15192 = cljs.core.first(seq15190__$1);
var seq15190__$2 = cljs.core.next(seq15190__$1);
var G__15193 = cljs.core.first(seq15190__$2);
var seq15190__$3 = cljs.core.next(seq15190__$2);
return cljs.core$macros.and.cljs$core$IFn$_invoke$arity$variadic(G__15191,G__15192,G__15193,seq15190__$3);
});

cljs.core$macros.and.cljs$lang$maxFixedArity = (3);

cljs.core$macros.and.cljs$lang$macro = true;
/**
 * Evaluates exprs one at a time, from left to right. If a form
 *   returns a logical true value, or returns that value and doesn't
 *   evaluate any of the other expressions, otherwise it returns the
 *   value of the last expression. (or) returns nil.
 */
cljs.core$macros.or = (function cljs$core$macros$or(var_args){
var args15203 = [];
var len__6932__auto___15210 = arguments.length;
var i__6933__auto___15211 = (0);
while(true){
if((i__6933__auto___15211 < len__6932__auto___15210)){
args15203.push((arguments[i__6933__auto___15211]));

var G__15212 = (i__6933__auto___15211 + (1));
i__6933__auto___15211 = G__15212;
continue;
} else {
}
break;
}

var G__15209 = args15203.length;
switch (G__15209) {
case 2:
return cljs.core$macros.or.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core$macros.or.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15203.slice((3)),(0),null));
return cljs.core$macros.or.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6951__auto__);

}
});

cljs.core$macros.or.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return null;
});

cljs.core$macros.or.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.or.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,next){
var forms = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null),next);
if(cljs.core.every_QMARK_(((function (forms){
return (function (p1__15200_SHARP_){
return cljs.core$macros.simple_test_expr_QMARK_(_AMPERSAND_env,p1__15200_SHARP_);
});})(forms))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (forms){
return (function (p1__15201_SHARP_){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,p1__15201_SHARP_);
});})(forms))
,forms))){
var or_str = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" || ",cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(forms),"(~{})")));
return cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),(function (){var x__6696__auto__ = or_str;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([forms], 0)))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$or__15202__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$or__15202__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$or__15202__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_or),next)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.or.cljs$lang$applyTo = (function (seq15204){
var G__15205 = cljs.core.first(seq15204);
var seq15204__$1 = cljs.core.next(seq15204);
var G__15206 = cljs.core.first(seq15204__$1);
var seq15204__$2 = cljs.core.next(seq15204__$1);
var G__15207 = cljs.core.first(seq15204__$2);
var seq15204__$3 = cljs.core.next(seq15204__$2);
return cljs.core$macros.or.cljs$core$IFn$_invoke$arity$variadic(G__15205,G__15206,G__15207,seq15204__$3);
});

cljs.core$macros.or.cljs$lang$maxFixedArity = (3);

cljs.core$macros.or.cljs$lang$macro = true;
cljs.core$macros.nil_QMARK_ = (function cljs$core$macros$nil_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_coercive_DASH__EQ_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.nil_QMARK_.cljs$lang$macro = true;
cljs.core$macros.coercive_not = (function cljs$core$macros$coercive_not(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"(!~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.coercive_not.cljs$lang$macro = true;
cljs.core$macros.coercive_not_EQ_ = (function cljs$core$macros$coercive_not_EQ_(_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} != ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.coercive_not_EQ_.cljs$lang$macro = true;
cljs.core$macros.coercive__EQ_ = (function cljs$core$macros$coercive__EQ_(_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} == ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.coercive__EQ_.cljs$lang$macro = true;
cljs.core$macros.coercive_boolean = (function cljs$core$macros$coercive_boolean(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.with_meta(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"~{}"),cljs.core.cst$sym$js_STAR_),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$boolean], null));
});

cljs.core$macros.coercive_boolean.cljs$lang$macro = true;
cljs.core$macros.truth_ = (function cljs$core$macros$truth_(_AMPERSAND_form,_AMPERSAND_env,x){
if((x instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("x is substituted twice"),cljs.core.str("\n"),cljs.core.str("(core/symbol? x)")].join('')));
}

return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} != null && ~{} !== false)"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.truth_.cljs$lang$macro = true;
cljs.core$macros.js_arguments = (function cljs$core$macros$js_arguments(_AMPERSAND_form,_AMPERSAND_env){
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,"arguments"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_arguments.cljs$lang$macro = true;
cljs.core$macros.js_delete = (function cljs$core$macros$js_delete(_AMPERSAND_form,_AMPERSAND_env,obj,key){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = obj;
return cljs.core._conj((function (){var x__6696__auto____$1 = key;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"delete ~{}[~{}]"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_delete.cljs$lang$macro = true;
cljs.core$macros.js_in = (function cljs$core$macros$js_in(_AMPERSAND_form,_AMPERSAND_env,key,obj){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = key;
return cljs.core._conj((function (){var x__6696__auto____$1 = obj;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"~{} in ~{}"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_in.cljs$lang$macro = true;
/**
 * Emit JavaScript "debugger;" statement
 */
cljs.core$macros.js_debugger = (function cljs$core$macros$js_debugger(_AMPERSAND_form,_AMPERSAND_env){
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,"debugger"),cljs.core.cst$sym$js_STAR_);
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,null),x__6696__auto__);
})(),cljs.core.cst$sym$do);
});

cljs.core$macros.js_debugger.cljs$lang$macro = true;
/**
 * Emit a top-level JavaScript multi-line comment. New lines will create a
 *   new comment line. Comment block will be preceded and followed by a newline
 */
cljs.core$macros.js_comment = (function cljs$core$macros$js_comment(_AMPERSAND_form,_AMPERSAND_env,comment){
var vec__15216 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(comment,/\n/);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15216,(0),null);
var ys = cljs.core.nthnext(vec__15216,(1));
return cljs.core._conj((function (){var x__6696__auto__ = [cljs.core.str("\n/**\n"),cljs.core.str([cljs.core.str(" * "),cljs.core.str(x),cljs.core.str("\n")].join('')),cljs.core.str(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.str,"",cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15216,x,ys){
return (function (p1__15214_SHARP_){
return [cljs.core.str(" * "),cljs.core.str(clojure.string.replace(p1__15214_SHARP_,/^   /,"")),cljs.core.str("\n")].join('');
});})(vec__15216,x,ys))
,ys))),cljs.core.str(" */\n")].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_comment.cljs$lang$macro = true;
/**
 * EXPERIMENTAL: Subject to change. Unsafely cast a value to a different type.
 */
cljs.core$macros.unsafe_cast = (function cljs$core$macros$unsafe_cast(_AMPERSAND_form,_AMPERSAND_env,t,x){
var cast_expr = [cljs.core.str("~{} = /** @type {"),cljs.core.str(t),cljs.core.str("} */ (~{})")].join('');
return cljs.core._conj((function (){var x__6696__auto__ = cast_expr;
return cljs.core._conj((function (){var x__6696__auto____$1 = x;
return cljs.core._conj((function (){var x__6696__auto____$2 = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$2);
})(),x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.unsafe_cast.cljs$lang$macro = true;
/**
 * Emit an inline JavaScript comment.
 */
cljs.core$macros.js_inline_comment = (function cljs$core$macros$js_inline_comment(_AMPERSAND_form,_AMPERSAND_env,comment){
return cljs.core._conj((function (){var x__6696__auto__ = [cljs.core.str("/**"),cljs.core.str(comment),cljs.core.str("*/")].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_inline_comment.cljs$lang$macro = true;
cljs.core$macros.true_QMARK_ = (function cljs$core$macros$true_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"~{} === true"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.true_QMARK_.cljs$lang$macro = true;
cljs.core$macros.false_QMARK_ = (function cljs$core$macros$false_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"~{} === false"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.false_QMARK_.cljs$lang$macro = true;
cljs.core$macros.string_QMARK_ = (function cljs$core$macros$string_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"typeof ~{} === 'string'"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.string_QMARK_.cljs$lang$macro = true;
/**
 * Return true if argument exists, analogous to usage of typeof operator
 * in JavaScript.
 */
cljs.core$macros.exists_QMARK_ = (function cljs$core$macros$exists_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(x,cljs.core.assoc,cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve,true);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"typeof ~{} !== 'undefined'"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.exists_QMARK_.cljs$lang$macro = true;
/**
 * Return true if argument is identical to the JavaScript undefined value.
 */
cljs.core$macros.undefined_QMARK_ = (function cljs$core$macros$undefined_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"(void 0 === ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.undefined_QMARK_.cljs$lang$macro = true;
cljs.core$macros.identical_QMARK_ = (function cljs$core$macros$identical_QMARK_(_AMPERSAND_form,_AMPERSAND_env,a,b){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = a;
return cljs.core._conj((function (){var x__6696__auto____$1 = b;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} === ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.identical_QMARK_.cljs$lang$macro = true;
cljs.core$macros.instance_QMARK_ = (function cljs$core$macros$instance_QMARK_(_AMPERSAND_form,_AMPERSAND_env,c,x){
return cljs.core$macros.bool_expr((((c instanceof cljs.core.Symbol))?cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} instanceof ~{})"),cljs.core.cst$sym$js_STAR_):cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15217__auto__),(function (){var x__6696__auto__ = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15218__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),cljs.core._conj(cljs.core.List.EMPTY,"(~{} instanceof ~{})"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15218__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15217__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))));
});

cljs.core$macros.instance_QMARK_.cljs$lang$macro = true;
cljs.core$macros.number_QMARK_ = (function cljs$core$macros$number_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"typeof ~{} === 'number'"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.number_QMARK_.cljs$lang$macro = true;
cljs.core$macros.symbol_QMARK_ = (function cljs$core$macros$symbol_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_instance_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_Symbol),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
});

cljs.core$macros.symbol_QMARK_.cljs$lang$macro = true;
cljs.core$macros.keyword_QMARK_ = (function cljs$core$macros$keyword_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_instance_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_Keyword),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
});

cljs.core$macros.keyword_QMARK_.cljs$lang$macro = true;
cljs.core$macros.aget = (function cljs$core$macros$aget(var_args){
var args15219 = [];
var len__6932__auto___15227 = arguments.length;
var i__6933__auto___15228 = (0);
while(true){
if((i__6933__auto___15228 < len__6932__auto___15227)){
args15219.push((arguments[i__6933__auto___15228]));

var G__15229 = (i__6933__auto___15228 + (1));
i__6933__auto___15228 = G__15229;
continue;
} else {
}
break;
}

var G__15226 = args15219.length;
switch (G__15226) {
case 4:
return cljs.core$macros.aget.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15219.slice((4)),(0),null));
return cljs.core$macros.aget.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.aget.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,a,i){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = a;
return cljs.core._conj((function (){var x__6696__auto____$1 = i;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{}[~{}])"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.aget.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,a,i,idxs){
var astr = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(cljs.core.count(idxs),"[~{}]"));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),(function (){var x__6696__auto__ = [cljs.core.str("(~{}[~{}]"),cljs.core.str(astr),cljs.core.str(")")].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = i;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),idxs], 0))));
});

cljs.core$macros.aget.cljs$lang$applyTo = (function (seq15220){
var G__15221 = cljs.core.first(seq15220);
var seq15220__$1 = cljs.core.next(seq15220);
var G__15222 = cljs.core.first(seq15220__$1);
var seq15220__$2 = cljs.core.next(seq15220__$1);
var G__15223 = cljs.core.first(seq15220__$2);
var seq15220__$3 = cljs.core.next(seq15220__$2);
var G__15224 = cljs.core.first(seq15220__$3);
var seq15220__$4 = cljs.core.next(seq15220__$3);
return cljs.core$macros.aget.cljs$core$IFn$_invoke$arity$variadic(G__15221,G__15222,G__15223,G__15224,seq15220__$4);
});

cljs.core$macros.aget.cljs$lang$maxFixedArity = (4);

cljs.core$macros.aget.cljs$lang$macro = true;
cljs.core$macros.aset = (function cljs$core$macros$aset(var_args){
var args15231 = [];
var len__6932__auto___15240 = arguments.length;
var i__6933__auto___15241 = (0);
while(true){
if((i__6933__auto___15241 < len__6932__auto___15240)){
args15231.push((arguments[i__6933__auto___15241]));

var G__15242 = (i__6933__auto___15241 + (1));
i__6933__auto___15241 = G__15242;
continue;
} else {
}
break;
}

var G__15239 = args15231.length;
switch (G__15239) {
case 5:
return cljs.core$macros.aset.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15231.slice((5)),(0),null));
return cljs.core$macros.aset.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__6951__auto__);

}
});

cljs.core$macros.aset.cljs$core$IFn$_invoke$arity$5 = (function (_AMPERSAND_form,_AMPERSAND_env,a,i,v){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = a;
return cljs.core._conj((function (){var x__6696__auto____$1 = i;
return cljs.core._conj((function (){var x__6696__auto____$2 = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$2);
})(),x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{}[~{}] = ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.aset.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,a,idx,idx2,idxv){
var n = (cljs.core.count(idxv) - (1));
var astr = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n,"[~{}]"));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),(function (){var x__6696__auto__ = [cljs.core.str("(~{}[~{}][~{}]"),cljs.core.str(astr),cljs.core.str(" = ~{})")].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = idx2;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),idxv], 0))));
});

cljs.core$macros.aset.cljs$lang$applyTo = (function (seq15232){
var G__15233 = cljs.core.first(seq15232);
var seq15232__$1 = cljs.core.next(seq15232);
var G__15234 = cljs.core.first(seq15232__$1);
var seq15232__$2 = cljs.core.next(seq15232__$1);
var G__15235 = cljs.core.first(seq15232__$2);
var seq15232__$3 = cljs.core.next(seq15232__$2);
var G__15236 = cljs.core.first(seq15232__$3);
var seq15232__$4 = cljs.core.next(seq15232__$3);
var G__15237 = cljs.core.first(seq15232__$4);
var seq15232__$5 = cljs.core.next(seq15232__$4);
return cljs.core$macros.aset.cljs$core$IFn$_invoke$arity$variadic(G__15233,G__15234,G__15235,G__15236,G__15237,seq15232__$5);
});

cljs.core$macros.aset.cljs$lang$maxFixedArity = (5);

cljs.core$macros.aset.cljs$lang$macro = true;
cljs.core$macros._PLUS_ = (function cljs$core$macros$_PLUS_(var_args){
var args15244 = [];
var len__6932__auto___15252 = arguments.length;
var i__6933__auto___15253 = (0);
while(true){
if((i__6933__auto___15253 < len__6932__auto___15252)){
args15244.push((arguments[i__6933__auto___15253]));

var G__15254 = (i__6933__auto___15253 + (1));
i__6933__auto___15253 = G__15254;
continue;
} else {
}
break;
}

var G__15251 = args15244.length;
switch (G__15251) {
case 2:
return cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15244.slice((4)),(0),null));
return cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return (0);
});

cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} + ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros._PLUS_.cljs$lang$applyTo = (function (seq15245){
var G__15246 = cljs.core.first(seq15245);
var seq15245__$1 = cljs.core.next(seq15245);
var G__15247 = cljs.core.first(seq15245__$1);
var seq15245__$2 = cljs.core.next(seq15245__$1);
var G__15248 = cljs.core.first(seq15245__$2);
var seq15245__$3 = cljs.core.next(seq15245__$2);
var G__15249 = cljs.core.first(seq15245__$3);
var seq15245__$4 = cljs.core.next(seq15245__$3);
return cljs.core$macros._PLUS_.cljs$core$IFn$_invoke$arity$variadic(G__15246,G__15247,G__15248,G__15249,seq15245__$4);
});

cljs.core$macros._PLUS_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._PLUS_.cljs$lang$macro = true;
cljs.core$macros.byte$ = (function cljs$core$macros$byte(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.byte$.cljs$lang$macro = true;
cljs.core$macros.short$ = (function cljs$core$macros$short(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.short$.cljs$lang$macro = true;
cljs.core$macros.float$ = (function cljs$core$macros$float(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.float$.cljs$lang$macro = true;
cljs.core$macros.double$ = (function cljs$core$macros$double(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.double$.cljs$lang$macro = true;
cljs.core$macros.unchecked_byte = (function cljs$core$macros$unchecked_byte(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.unchecked_byte.cljs$lang$macro = true;
cljs.core$macros.unchecked_char = (function cljs$core$macros$unchecked_char(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.unchecked_char.cljs$lang$macro = true;
cljs.core$macros.unchecked_short = (function cljs$core$macros$unchecked_short(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.unchecked_short.cljs$lang$macro = true;
cljs.core$macros.unchecked_float = (function cljs$core$macros$unchecked_float(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.unchecked_float.cljs$lang$macro = true;
cljs.core$macros.unchecked_double = (function cljs$core$macros$unchecked_double(_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.unchecked_double.cljs$lang$macro = true;
cljs.core$macros.unchecked_add = (function cljs$core$macros$unchecked_add(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15259 = arguments.length;
var i__6933__auto___15260 = (0);
while(true){
if((i__6933__auto___15260 < len__6932__auto___15259)){
args__6939__auto__.push((arguments[i__6933__auto___15260]));

var G__15261 = (i__6933__auto___15260 + (1));
i__6933__auto___15260 = G__15261;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_add.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_add.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),xs)));
});

cljs.core$macros.unchecked_add.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_add.cljs$lang$applyTo = (function (seq15256){
var G__15257 = cljs.core.first(seq15256);
var seq15256__$1 = cljs.core.next(seq15256);
var G__15258 = cljs.core.first(seq15256__$1);
var seq15256__$2 = cljs.core.next(seq15256__$1);
return cljs.core$macros.unchecked_add.cljs$core$IFn$_invoke$arity$variadic(G__15257,G__15258,seq15256__$2);
});

cljs.core$macros.unchecked_add.cljs$lang$macro = true;
cljs.core$macros.unchecked_add_int = (function cljs$core$macros$unchecked_add_int(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15265 = arguments.length;
var i__6933__auto___15266 = (0);
while(true){
if((i__6933__auto___15266 < len__6932__auto___15265)){
args__6939__auto__.push((arguments[i__6933__auto___15266]));

var G__15267 = (i__6933__auto___15266 + (1));
i__6933__auto___15266 = G__15267;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_add_int.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_add_int.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),xs)));
});

cljs.core$macros.unchecked_add_int.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_add_int.cljs$lang$applyTo = (function (seq15262){
var G__15263 = cljs.core.first(seq15262);
var seq15262__$1 = cljs.core.next(seq15262);
var G__15264 = cljs.core.first(seq15262__$1);
var seq15262__$2 = cljs.core.next(seq15262__$1);
return cljs.core$macros.unchecked_add_int.cljs$core$IFn$_invoke$arity$variadic(G__15263,G__15264,seq15262__$2);
});

cljs.core$macros.unchecked_add_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_dec = (function cljs$core$macros$unchecked_dec(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_dec),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_dec.cljs$lang$macro = true;
cljs.core$macros.unchecked_dec_int = (function cljs$core$macros$unchecked_dec_int(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_dec),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_dec_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_divide_int = (function cljs$core$macros$unchecked_divide_int(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15271 = arguments.length;
var i__6933__auto___15272 = (0);
while(true){
if((i__6933__auto___15272 < len__6932__auto___15271)){
args__6939__auto__.push((arguments[i__6933__auto___15272]));

var G__15273 = (i__6933__auto___15272 + (1));
i__6933__auto___15272 = G__15273;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_divide_int.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_divide_int.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),xs)));
});

cljs.core$macros.unchecked_divide_int.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_divide_int.cljs$lang$applyTo = (function (seq15268){
var G__15269 = cljs.core.first(seq15268);
var seq15268__$1 = cljs.core.next(seq15268);
var G__15270 = cljs.core.first(seq15268__$1);
var seq15268__$2 = cljs.core.next(seq15268__$1);
return cljs.core$macros.unchecked_divide_int.cljs$core$IFn$_invoke$arity$variadic(G__15269,G__15270,seq15268__$2);
});

cljs.core$macros.unchecked_divide_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_inc = (function cljs$core$macros$unchecked_inc(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_inc.cljs$lang$macro = true;
cljs.core$macros.unchecked_inc_int = (function cljs$core$macros$unchecked_inc_int(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_inc_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_multiply = (function cljs$core$macros$unchecked_multiply(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15277 = arguments.length;
var i__6933__auto___15278 = (0);
while(true){
if((i__6933__auto___15278 < len__6932__auto___15277)){
args__6939__auto__.push((arguments[i__6933__auto___15278]));

var G__15279 = (i__6933__auto___15278 + (1));
i__6933__auto___15278 = G__15279;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_multiply.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_multiply.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__STAR_),xs)));
});

cljs.core$macros.unchecked_multiply.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_multiply.cljs$lang$applyTo = (function (seq15274){
var G__15275 = cljs.core.first(seq15274);
var seq15274__$1 = cljs.core.next(seq15274);
var G__15276 = cljs.core.first(seq15274__$1);
var seq15274__$2 = cljs.core.next(seq15274__$1);
return cljs.core$macros.unchecked_multiply.cljs$core$IFn$_invoke$arity$variadic(G__15275,G__15276,seq15274__$2);
});

cljs.core$macros.unchecked_multiply.cljs$lang$macro = true;
cljs.core$macros.unchecked_multiply_int = (function cljs$core$macros$unchecked_multiply_int(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15283 = arguments.length;
var i__6933__auto___15284 = (0);
while(true){
if((i__6933__auto___15284 < len__6932__auto___15283)){
args__6939__auto__.push((arguments[i__6933__auto___15284]));

var G__15285 = (i__6933__auto___15284 + (1));
i__6933__auto___15284 = G__15285;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_multiply_int.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_multiply_int.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__STAR_),xs)));
});

cljs.core$macros.unchecked_multiply_int.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_multiply_int.cljs$lang$applyTo = (function (seq15280){
var G__15281 = cljs.core.first(seq15280);
var seq15280__$1 = cljs.core.next(seq15280);
var G__15282 = cljs.core.first(seq15280__$1);
var seq15280__$2 = cljs.core.next(seq15280__$1);
return cljs.core$macros.unchecked_multiply_int.cljs$core$IFn$_invoke$arity$variadic(G__15281,G__15282,seq15280__$2);
});

cljs.core$macros.unchecked_multiply_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_negate = (function cljs$core$macros$unchecked_negate(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_negate.cljs$lang$macro = true;
cljs.core$macros.unchecked_negate_int = (function cljs$core$macros$unchecked_negate_int(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.unchecked_negate_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_remainder_int = (function cljs$core$macros$unchecked_remainder_int(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_mod),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.unchecked_remainder_int.cljs$lang$macro = true;
cljs.core$macros.unchecked_subtract = (function cljs$core$macros$unchecked_subtract(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15289 = arguments.length;
var i__6933__auto___15290 = (0);
while(true){
if((i__6933__auto___15290 < len__6932__auto___15289)){
args__6939__auto__.push((arguments[i__6933__auto___15290]));

var G__15291 = (i__6933__auto___15290 + (1));
i__6933__auto___15290 = G__15291;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_subtract.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_subtract.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),xs)));
});

cljs.core$macros.unchecked_subtract.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_subtract.cljs$lang$applyTo = (function (seq15286){
var G__15287 = cljs.core.first(seq15286);
var seq15286__$1 = cljs.core.next(seq15286);
var G__15288 = cljs.core.first(seq15286__$1);
var seq15286__$2 = cljs.core.next(seq15286__$1);
return cljs.core$macros.unchecked_subtract.cljs$core$IFn$_invoke$arity$variadic(G__15287,G__15288,seq15286__$2);
});

cljs.core$macros.unchecked_subtract.cljs$lang$macro = true;
cljs.core$macros.unchecked_subtract_int = (function cljs$core$macros$unchecked_subtract_int(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15295 = arguments.length;
var i__6933__auto___15296 = (0);
while(true){
if((i__6933__auto___15296 < len__6932__auto___15295)){
args__6939__auto__.push((arguments[i__6933__auto___15296]));

var G__15297 = (i__6933__auto___15296 + (1));
i__6933__auto___15296 = G__15297;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.unchecked_subtract_int.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.unchecked_subtract_int.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),xs)));
});

cljs.core$macros.unchecked_subtract_int.cljs$lang$maxFixedArity = (2);

cljs.core$macros.unchecked_subtract_int.cljs$lang$applyTo = (function (seq15292){
var G__15293 = cljs.core.first(seq15292);
var seq15292__$1 = cljs.core.next(seq15292);
var G__15294 = cljs.core.first(seq15292__$1);
var seq15292__$2 = cljs.core.next(seq15292__$1);
return cljs.core$macros.unchecked_subtract_int.cljs$core$IFn$_invoke$arity$variadic(G__15293,G__15294,seq15292__$2);
});

cljs.core$macros.unchecked_subtract_int.cljs$lang$macro = true;
cljs.core$macros._ = (function cljs$core$macros$_(var_args){
var args15298 = [];
var len__6932__auto___15306 = arguments.length;
var i__6933__auto___15307 = (0);
while(true){
if((i__6933__auto___15307 < len__6932__auto___15306)){
args15298.push((arguments[i__6933__auto___15307]));

var G__15308 = (i__6933__auto___15307 + (1));
i__6933__auto___15307 = G__15308;
continue;
} else {
}
break;
}

var G__15305 = args15298.length;
switch (G__15305) {
case 3:
return cljs.core$macros._.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15298.slice((4)),(0),null));
return cljs.core$macros._.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"(- ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros._.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} - ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros._.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros._.cljs$lang$applyTo = (function (seq15299){
var G__15300 = cljs.core.first(seq15299);
var seq15299__$1 = cljs.core.next(seq15299);
var G__15301 = cljs.core.first(seq15299__$1);
var seq15299__$2 = cljs.core.next(seq15299__$1);
var G__15302 = cljs.core.first(seq15299__$2);
var seq15299__$3 = cljs.core.next(seq15299__$2);
var G__15303 = cljs.core.first(seq15299__$3);
var seq15299__$4 = cljs.core.next(seq15299__$3);
return cljs.core$macros._.cljs$core$IFn$_invoke$arity$variadic(G__15300,G__15301,G__15302,G__15303,seq15299__$4);
});

cljs.core$macros._.cljs$lang$maxFixedArity = (4);

cljs.core$macros._.cljs$lang$macro = true;
cljs.core$macros._STAR_ = (function cljs$core$macros$_STAR_(var_args){
var args15310 = [];
var len__6932__auto___15318 = arguments.length;
var i__6933__auto___15319 = (0);
while(true){
if((i__6933__auto___15319 < len__6932__auto___15318)){
args15310.push((arguments[i__6933__auto___15319]));

var G__15320 = (i__6933__auto___15319 + (1));
i__6933__auto___15319 = G__15320;
continue;
} else {
}
break;
}

var G__15317 = args15310.length;
switch (G__15317) {
case 2:
return cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15310.slice((4)),(0),null));
return cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return (1);
});

cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} * ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__STAR_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__STAR_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros._STAR_.cljs$lang$applyTo = (function (seq15311){
var G__15312 = cljs.core.first(seq15311);
var seq15311__$1 = cljs.core.next(seq15311);
var G__15313 = cljs.core.first(seq15311__$1);
var seq15311__$2 = cljs.core.next(seq15311__$1);
var G__15314 = cljs.core.first(seq15311__$2);
var seq15311__$3 = cljs.core.next(seq15311__$2);
var G__15315 = cljs.core.first(seq15311__$3);
var seq15311__$4 = cljs.core.next(seq15311__$3);
return cljs.core$macros._STAR_.cljs$core$IFn$_invoke$arity$variadic(G__15312,G__15313,G__15314,G__15315,seq15311__$4);
});

cljs.core$macros._STAR_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._STAR_.cljs$lang$macro = true;
cljs.core$macros._SLASH_ = (function cljs$core$macros$_SLASH_(var_args){
var args15322 = [];
var len__6932__auto___15330 = arguments.length;
var i__6933__auto___15331 = (0);
while(true){
if((i__6933__auto___15331 < len__6932__auto___15330)){
args15322.push((arguments[i__6933__auto___15331]));

var G__15332 = (i__6933__auto___15331 + (1));
i__6933__auto___15331 = G__15332;
continue;
} else {
}
break;
}

var G__15329 = args15322.length;
switch (G__15329) {
case 3:
return cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15322.slice((4)),(0),null));
return cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),cljs.core._conj(cljs.core.List.EMPTY,(1)),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} / ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros._SLASH_.cljs$lang$applyTo = (function (seq15323){
var G__15324 = cljs.core.first(seq15323);
var seq15323__$1 = cljs.core.next(seq15323);
var G__15325 = cljs.core.first(seq15323__$1);
var seq15323__$2 = cljs.core.next(seq15323__$1);
var G__15326 = cljs.core.first(seq15323__$2);
var seq15323__$3 = cljs.core.next(seq15323__$2);
var G__15327 = cljs.core.first(seq15323__$3);
var seq15323__$4 = cljs.core.next(seq15323__$3);
return cljs.core$macros._SLASH_.cljs$core$IFn$_invoke$arity$variadic(G__15324,G__15325,G__15326,G__15327,seq15323__$4);
});

cljs.core$macros._SLASH_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._SLASH_.cljs$lang$macro = true;
cljs.core$macros.divide = (function cljs$core$macros$divide(var_args){
var args15334 = [];
var len__6932__auto___15342 = arguments.length;
var i__6933__auto___15343 = (0);
while(true){
if((i__6933__auto___15343 < len__6932__auto___15342)){
args15334.push((arguments[i__6933__auto___15343]));

var G__15344 = (i__6933__auto___15343 + (1));
i__6933__auto___15343 = G__15344;
continue;
} else {
}
break;
}

var G__15341 = args15334.length;
switch (G__15341) {
case 3:
return cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15334.slice((4)),(0),null));
return cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),cljs.core._conj(cljs.core.List.EMPTY,(1)),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} / ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__SLASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.divide.cljs$lang$applyTo = (function (seq15335){
var G__15336 = cljs.core.first(seq15335);
var seq15335__$1 = cljs.core.next(seq15335);
var G__15337 = cljs.core.first(seq15335__$1);
var seq15335__$2 = cljs.core.next(seq15335__$1);
var G__15338 = cljs.core.first(seq15335__$2);
var seq15335__$3 = cljs.core.next(seq15335__$2);
var G__15339 = cljs.core.first(seq15335__$3);
var seq15335__$4 = cljs.core.next(seq15335__$3);
return cljs.core$macros.divide.cljs$core$IFn$_invoke$arity$variadic(G__15336,G__15337,G__15338,G__15339,seq15335__$4);
});

cljs.core$macros.divide.cljs$lang$maxFixedArity = (4);

cljs.core$macros.divide.cljs$lang$macro = true;
cljs.core$macros._LT_ = (function cljs$core$macros$_LT_(var_args){
var args15346 = [];
var len__6932__auto___15354 = arguments.length;
var i__6933__auto___15355 = (0);
while(true){
if((i__6933__auto___15355 < len__6932__auto___15354)){
args15346.push((arguments[i__6933__auto___15355]));

var G__15356 = (i__6933__auto___15355 + (1));
i__6933__auto___15355 = G__15356;
continue;
} else {
}
break;
}

var G__15353 = args15346.length;
switch (G__15353) {
case 3:
return cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15346.slice((4)),(0),null));
return cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return true;
});

cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} < ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._LT_.cljs$lang$applyTo = (function (seq15347){
var G__15348 = cljs.core.first(seq15347);
var seq15347__$1 = cljs.core.next(seq15347);
var G__15349 = cljs.core.first(seq15347__$1);
var seq15347__$2 = cljs.core.next(seq15347__$1);
var G__15350 = cljs.core.first(seq15347__$2);
var seq15347__$3 = cljs.core.next(seq15347__$2);
var G__15351 = cljs.core.first(seq15347__$3);
var seq15347__$4 = cljs.core.next(seq15347__$3);
return cljs.core$macros._LT_.cljs$core$IFn$_invoke$arity$variadic(G__15348,G__15349,G__15350,G__15351,seq15347__$4);
});

cljs.core$macros._LT_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._LT_.cljs$lang$macro = true;
cljs.core$macros._LT__EQ_ = (function cljs$core$macros$_LT__EQ_(var_args){
var args15358 = [];
var len__6932__auto___15366 = arguments.length;
var i__6933__auto___15367 = (0);
while(true){
if((i__6933__auto___15367 < len__6932__auto___15366)){
args15358.push((arguments[i__6933__auto___15367]));

var G__15368 = (i__6933__auto___15367 + (1));
i__6933__auto___15367 = G__15368;
continue;
} else {
}
break;
}

var G__15365 = args15358.length;
switch (G__15365) {
case 3:
return cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15358.slice((4)),(0),null));
return cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return true;
});

cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} <= ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT__EQ_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT__EQ_),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._LT__EQ_.cljs$lang$applyTo = (function (seq15359){
var G__15360 = cljs.core.first(seq15359);
var seq15359__$1 = cljs.core.next(seq15359);
var G__15361 = cljs.core.first(seq15359__$1);
var seq15359__$2 = cljs.core.next(seq15359__$1);
var G__15362 = cljs.core.first(seq15359__$2);
var seq15359__$3 = cljs.core.next(seq15359__$2);
var G__15363 = cljs.core.first(seq15359__$3);
var seq15359__$4 = cljs.core.next(seq15359__$3);
return cljs.core$macros._LT__EQ_.cljs$core$IFn$_invoke$arity$variadic(G__15360,G__15361,G__15362,G__15363,seq15359__$4);
});

cljs.core$macros._LT__EQ_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._LT__EQ_.cljs$lang$macro = true;
cljs.core$macros._GT_ = (function cljs$core$macros$_GT_(var_args){
var args15370 = [];
var len__6932__auto___15378 = arguments.length;
var i__6933__auto___15379 = (0);
while(true){
if((i__6933__auto___15379 < len__6932__auto___15378)){
args15370.push((arguments[i__6933__auto___15379]));

var G__15380 = (i__6933__auto___15379 + (1));
i__6933__auto___15379 = G__15380;
continue;
} else {
}
break;
}

var G__15377 = args15370.length;
switch (G__15377) {
case 3:
return cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15370.slice((4)),(0),null));
return cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return true;
});

cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} > ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__GT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__GT_),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._GT_.cljs$lang$applyTo = (function (seq15371){
var G__15372 = cljs.core.first(seq15371);
var seq15371__$1 = cljs.core.next(seq15371);
var G__15373 = cljs.core.first(seq15371__$1);
var seq15371__$2 = cljs.core.next(seq15371__$1);
var G__15374 = cljs.core.first(seq15371__$2);
var seq15371__$3 = cljs.core.next(seq15371__$2);
var G__15375 = cljs.core.first(seq15371__$3);
var seq15371__$4 = cljs.core.next(seq15371__$3);
return cljs.core$macros._GT_.cljs$core$IFn$_invoke$arity$variadic(G__15372,G__15373,G__15374,G__15375,seq15371__$4);
});

cljs.core$macros._GT_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._GT_.cljs$lang$macro = true;
cljs.core$macros._GT__EQ_ = (function cljs$core$macros$_GT__EQ_(var_args){
var args15382 = [];
var len__6932__auto___15390 = arguments.length;
var i__6933__auto___15391 = (0);
while(true){
if((i__6933__auto___15391 < len__6932__auto___15390)){
args15382.push((arguments[i__6933__auto___15391]));

var G__15392 = (i__6933__auto___15391 + (1));
i__6933__auto___15391 = G__15392;
continue;
} else {
}
break;
}

var G__15389 = args15382.length;
switch (G__15389) {
case 3:
return cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15382.slice((4)),(0),null));
return cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return true;
});

cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} >= ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__GT__EQ_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__GT__EQ_),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._GT__EQ_.cljs$lang$applyTo = (function (seq15383){
var G__15384 = cljs.core.first(seq15383);
var seq15383__$1 = cljs.core.next(seq15383);
var G__15385 = cljs.core.first(seq15383__$1);
var seq15383__$2 = cljs.core.next(seq15383__$1);
var G__15386 = cljs.core.first(seq15383__$2);
var seq15383__$3 = cljs.core.next(seq15383__$2);
var G__15387 = cljs.core.first(seq15383__$3);
var seq15383__$4 = cljs.core.next(seq15383__$3);
return cljs.core$macros._GT__EQ_.cljs$core$IFn$_invoke$arity$variadic(G__15384,G__15385,G__15386,G__15387,seq15383__$4);
});

cljs.core$macros._GT__EQ_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._GT__EQ_.cljs$lang$macro = true;
cljs.core$macros._EQ__EQ_ = (function cljs$core$macros$_EQ__EQ_(var_args){
var args15394 = [];
var len__6932__auto___15402 = arguments.length;
var i__6933__auto___15403 = (0);
while(true){
if((i__6933__auto___15403 < len__6932__auto___15402)){
args15394.push((arguments[i__6933__auto___15403]));

var G__15404 = (i__6933__auto___15403 + (1));
i__6933__auto___15403 = G__15404;
continue;
} else {
}
break;
}

var G__15401 = args15394.length;
switch (G__15401) {
case 3:
return cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15394.slice((4)),(0),null));
return cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return true;
});

cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} === ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__EQ__EQ_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__EQ__EQ_),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros._EQ__EQ_.cljs$lang$applyTo = (function (seq15395){
var G__15396 = cljs.core.first(seq15395);
var seq15395__$1 = cljs.core.next(seq15395);
var G__15397 = cljs.core.first(seq15395__$1);
var seq15395__$2 = cljs.core.next(seq15395__$1);
var G__15398 = cljs.core.first(seq15395__$2);
var seq15395__$3 = cljs.core.next(seq15395__$2);
var G__15399 = cljs.core.first(seq15395__$3);
var seq15395__$4 = cljs.core.next(seq15395__$3);
return cljs.core$macros._EQ__EQ_.cljs$core$IFn$_invoke$arity$variadic(G__15396,G__15397,G__15398,G__15399,seq15395__$4);
});

cljs.core$macros._EQ__EQ_.cljs$lang$maxFixedArity = (4);

cljs.core$macros._EQ__EQ_.cljs$lang$macro = true;
cljs.core$macros.dec = (function cljs$core$macros$dec(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(1))], 0))));
});

cljs.core$macros.dec.cljs$lang$macro = true;
cljs.core$macros.inc = (function cljs$core$macros$inc(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(1))], 0))));
});

cljs.core$macros.inc.cljs$lang$macro = true;
cljs.core$macros.zero_QMARK_ = (function cljs$core$macros$zero_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__EQ__EQ_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
});

cljs.core$macros.zero_QMARK_.cljs$lang$macro = true;
cljs.core$macros.pos_QMARK_ = (function cljs$core$macros$pos_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__GT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
});

cljs.core$macros.pos_QMARK_.cljs$lang$macro = true;
cljs.core$macros.neg_QMARK_ = (function cljs$core$macros$neg_QMARK_(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
});

cljs.core$macros.neg_QMARK_.cljs$lang$macro = true;
cljs.core$macros.max = (function cljs$core$macros$max(var_args){
var args15408 = [];
var len__6932__auto___15416 = arguments.length;
var i__6933__auto___15417 = (0);
while(true){
if((i__6933__auto___15417 < len__6932__auto___15416)){
args15408.push((arguments[i__6933__auto___15417]));

var G__15418 = (i__6933__auto___15417 + (1));
i__6933__auto___15417 = G__15418;
continue;
} else {
}
break;
}

var G__15415 = args15408.length;
switch (G__15415) {
case 3:
return cljs.core$macros.max.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.max.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15408.slice((4)),(0),null));
return cljs.core$macros.max.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.max.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.max.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15406__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15407__auto__),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),cljs.core._conj(cljs.core.List.EMPTY,"((~{} > ~{}) ? ~{} : ~{})"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15406__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15407__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15406__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15407__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.max.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_max),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_max),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.max.cljs$lang$applyTo = (function (seq15409){
var G__15410 = cljs.core.first(seq15409);
var seq15409__$1 = cljs.core.next(seq15409);
var G__15411 = cljs.core.first(seq15409__$1);
var seq15409__$2 = cljs.core.next(seq15409__$1);
var G__15412 = cljs.core.first(seq15409__$2);
var seq15409__$3 = cljs.core.next(seq15409__$2);
var G__15413 = cljs.core.first(seq15409__$3);
var seq15409__$4 = cljs.core.next(seq15409__$3);
return cljs.core$macros.max.cljs$core$IFn$_invoke$arity$variadic(G__15410,G__15411,G__15412,G__15413,seq15409__$4);
});

cljs.core$macros.max.cljs$lang$maxFixedArity = (4);

cljs.core$macros.max.cljs$lang$macro = true;
cljs.core$macros.min = (function cljs$core$macros$min(var_args){
var args15422 = [];
var len__6932__auto___15430 = arguments.length;
var i__6933__auto___15431 = (0);
while(true){
if((i__6933__auto___15431 < len__6932__auto___15430)){
args15422.push((arguments[i__6933__auto___15431]));

var G__15432 = (i__6933__auto___15431 + (1));
i__6933__auto___15431 = G__15432;
continue;
} else {
}
break;
}

var G__15429 = args15422.length;
switch (G__15429) {
case 3:
return cljs.core$macros.min.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.min.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15422.slice((4)),(0),null));
return cljs.core$macros.min.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.min.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
return x;
});

cljs.core$macros.min.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15420__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15421__auto__),(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),cljs.core._conj(cljs.core.List.EMPTY,"((~{} < ~{}) ? ~{} : ~{})"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15420__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15421__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15420__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$y__15421__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.min.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_min),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_min),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.min.cljs$lang$applyTo = (function (seq15423){
var G__15424 = cljs.core.first(seq15423);
var seq15423__$1 = cljs.core.next(seq15423);
var G__15425 = cljs.core.first(seq15423__$1);
var seq15423__$2 = cljs.core.next(seq15423__$1);
var G__15426 = cljs.core.first(seq15423__$2);
var seq15423__$3 = cljs.core.next(seq15423__$2);
var G__15427 = cljs.core.first(seq15423__$3);
var seq15423__$4 = cljs.core.next(seq15423__$3);
return cljs.core$macros.min.cljs$core$IFn$_invoke$arity$variadic(G__15424,G__15425,G__15426,G__15427,seq15423__$4);
});

cljs.core$macros.min.cljs$lang$maxFixedArity = (4);

cljs.core$macros.min.cljs$lang$macro = true;
cljs.core$macros.js_mod = (function cljs$core$macros$js_mod(_AMPERSAND_form,_AMPERSAND_env,num,div){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = num;
return cljs.core._conj((function (){var x__6696__auto____$1 = div;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} % ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_mod.cljs$lang$macro = true;
cljs.core$macros.bit_not = (function cljs$core$macros$bit_not(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"(~ ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_not.cljs$lang$macro = true;
cljs.core$macros.bit_and = (function cljs$core$macros$bit_and(var_args){
var args15434 = [];
var len__6932__auto___15442 = arguments.length;
var i__6933__auto___15443 = (0);
while(true){
if((i__6933__auto___15443 < len__6932__auto___15442)){
args15434.push((arguments[i__6933__auto___15443]));

var G__15444 = (i__6933__auto___15443 + (1));
i__6933__auto___15443 = G__15444;
continue;
} else {
}
break;
}

var G__15441 = args15434.length;
switch (G__15441) {
case 4:
return cljs.core$macros.bit_and.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15434.slice((4)),(0),null));
return cljs.core$macros.bit_and.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.bit_and.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} & ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_and.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_and),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.bit_and.cljs$lang$applyTo = (function (seq15435){
var G__15436 = cljs.core.first(seq15435);
var seq15435__$1 = cljs.core.next(seq15435);
var G__15437 = cljs.core.first(seq15435__$1);
var seq15435__$2 = cljs.core.next(seq15435__$1);
var G__15438 = cljs.core.first(seq15435__$2);
var seq15435__$3 = cljs.core.next(seq15435__$2);
var G__15439 = cljs.core.first(seq15435__$3);
var seq15435__$4 = cljs.core.next(seq15435__$3);
return cljs.core$macros.bit_and.cljs$core$IFn$_invoke$arity$variadic(G__15436,G__15437,G__15438,G__15439,seq15435__$4);
});

cljs.core$macros.bit_and.cljs$lang$maxFixedArity = (4);

cljs.core$macros.bit_and.cljs$lang$macro = true;
cljs.core$macros.unsafe_bit_and = (function cljs$core$macros$unsafe_bit_and(var_args){
var args15446 = [];
var len__6932__auto___15454 = arguments.length;
var i__6933__auto___15455 = (0);
while(true){
if((i__6933__auto___15455 < len__6932__auto___15454)){
args15446.push((arguments[i__6933__auto___15455]));

var G__15456 = (i__6933__auto___15455 + (1));
i__6933__auto___15455 = G__15456;
continue;
} else {
}
break;
}

var G__15453 = args15446.length;
switch (G__15453) {
case 4:
return cljs.core$macros.unsafe_bit_and.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15446.slice((4)),(0),null));
return cljs.core$macros.unsafe_bit_and.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.unsafe_bit_and.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} & ~{})"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.unsafe_bit_and.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.unsafe_bit_and.cljs$lang$applyTo = (function (seq15447){
var G__15448 = cljs.core.first(seq15447);
var seq15447__$1 = cljs.core.next(seq15447);
var G__15449 = cljs.core.first(seq15447__$1);
var seq15447__$2 = cljs.core.next(seq15447__$1);
var G__15450 = cljs.core.first(seq15447__$2);
var seq15447__$3 = cljs.core.next(seq15447__$2);
var G__15451 = cljs.core.first(seq15447__$3);
var seq15447__$4 = cljs.core.next(seq15447__$3);
return cljs.core$macros.unsafe_bit_and.cljs$core$IFn$_invoke$arity$variadic(G__15448,G__15449,G__15450,G__15451,seq15447__$4);
});

cljs.core$macros.unsafe_bit_and.cljs$lang$maxFixedArity = (4);

cljs.core$macros.unsafe_bit_and.cljs$lang$macro = true;
cljs.core$macros.bit_or = (function cljs$core$macros$bit_or(var_args){
var args15458 = [];
var len__6932__auto___15466 = arguments.length;
var i__6933__auto___15467 = (0);
while(true){
if((i__6933__auto___15467 < len__6932__auto___15466)){
args15458.push((arguments[i__6933__auto___15467]));

var G__15468 = (i__6933__auto___15467 + (1));
i__6933__auto___15467 = G__15468;
continue;
} else {
}
break;
}

var G__15465 = args15458.length;
switch (G__15465) {
case 4:
return cljs.core$macros.bit_or.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15458.slice((4)),(0),null));
return cljs.core$macros.bit_or.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.bit_or.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} | ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_or.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_or),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_or),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.bit_or.cljs$lang$applyTo = (function (seq15459){
var G__15460 = cljs.core.first(seq15459);
var seq15459__$1 = cljs.core.next(seq15459);
var G__15461 = cljs.core.first(seq15459__$1);
var seq15459__$2 = cljs.core.next(seq15459__$1);
var G__15462 = cljs.core.first(seq15459__$2);
var seq15459__$3 = cljs.core.next(seq15459__$2);
var G__15463 = cljs.core.first(seq15459__$3);
var seq15459__$4 = cljs.core.next(seq15459__$3);
return cljs.core$macros.bit_or.cljs$core$IFn$_invoke$arity$variadic(G__15460,G__15461,G__15462,G__15463,seq15459__$4);
});

cljs.core$macros.bit_or.cljs$lang$maxFixedArity = (4);

cljs.core$macros.bit_or.cljs$lang$macro = true;
cljs.core$macros.int$ = (function cljs$core$macros$int(_AMPERSAND_form,_AMPERSAND_env,x){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_or),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
});

cljs.core$macros.int$.cljs$lang$macro = true;
cljs.core$macros.bit_xor = (function cljs$core$macros$bit_xor(var_args){
var args15470 = [];
var len__6932__auto___15478 = arguments.length;
var i__6933__auto___15479 = (0);
while(true){
if((i__6933__auto___15479 < len__6932__auto___15478)){
args15470.push((arguments[i__6933__auto___15479]));

var G__15480 = (i__6933__auto___15479 + (1));
i__6933__auto___15479 = G__15480;
continue;
} else {
}
break;
}

var G__15477 = args15470.length;
switch (G__15477) {
case 4:
return cljs.core$macros.bit_xor.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15470.slice((4)),(0),null));
return cljs.core$macros.bit_xor.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.bit_xor.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} ^ ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_xor.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_xor),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_xor),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.bit_xor.cljs$lang$applyTo = (function (seq15471){
var G__15472 = cljs.core.first(seq15471);
var seq15471__$1 = cljs.core.next(seq15471);
var G__15473 = cljs.core.first(seq15471__$1);
var seq15471__$2 = cljs.core.next(seq15471__$1);
var G__15474 = cljs.core.first(seq15471__$2);
var seq15471__$3 = cljs.core.next(seq15471__$2);
var G__15475 = cljs.core.first(seq15471__$3);
var seq15471__$4 = cljs.core.next(seq15471__$3);
return cljs.core$macros.bit_xor.cljs$core$IFn$_invoke$arity$variadic(G__15472,G__15473,G__15474,G__15475,seq15471__$4);
});

cljs.core$macros.bit_xor.cljs$lang$maxFixedArity = (4);

cljs.core$macros.bit_xor.cljs$lang$macro = true;
cljs.core$macros.bit_and_not = (function cljs$core$macros$bit_and_not(var_args){
var args15482 = [];
var len__6932__auto___15490 = arguments.length;
var i__6933__auto___15491 = (0);
while(true){
if((i__6933__auto___15491 < len__6932__auto___15490)){
args15482.push((arguments[i__6933__auto___15491]));

var G__15492 = (i__6933__auto___15491 + (1));
i__6933__auto___15491 = G__15492;
continue;
} else {
}
break;
}

var G__15489 = args15482.length;
switch (G__15489) {
case 4:
return cljs.core$macros.bit_and_not.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15482.slice((4)),(0),null));
return cljs.core$macros.bit_and_not.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.bit_and_not.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,y){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} & ~~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_and_not.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,y,more){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_and_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_bit_DASH_and_DASH_not),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = y;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([more], 0))));
});

cljs.core$macros.bit_and_not.cljs$lang$applyTo = (function (seq15483){
var G__15484 = cljs.core.first(seq15483);
var seq15483__$1 = cljs.core.next(seq15483);
var G__15485 = cljs.core.first(seq15483__$1);
var seq15483__$2 = cljs.core.next(seq15483__$1);
var G__15486 = cljs.core.first(seq15483__$2);
var seq15483__$3 = cljs.core.next(seq15483__$2);
var G__15487 = cljs.core.first(seq15483__$3);
var seq15483__$4 = cljs.core.next(seq15483__$3);
return cljs.core$macros.bit_and_not.cljs$core$IFn$_invoke$arity$variadic(G__15484,G__15485,G__15486,G__15487,seq15483__$4);
});

cljs.core$macros.bit_and_not.cljs$lang$maxFixedArity = (4);

cljs.core$macros.bit_and_not.cljs$lang$macro = true;
cljs.core$macros.bit_clear = (function cljs$core$macros$bit_clear(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} & ~(1 << ~{}))"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_clear.cljs$lang$macro = true;
cljs.core$macros.bit_flip = (function cljs$core$macros$bit_flip(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} ^ (1 << ~{}))"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_flip.cljs$lang$macro = true;
cljs.core$macros.bit_test = (function cljs$core$macros$bit_test(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core$macros.bool_expr(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"((~{} & (1 << ~{})) != 0)"),cljs.core.cst$sym$js_STAR_));
});

cljs.core$macros.bit_test.cljs$lang$macro = true;
cljs.core$macros.bit_shift_left = (function cljs$core$macros$bit_shift_left(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} << ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_shift_left.cljs$lang$macro = true;
cljs.core$macros.bit_shift_right = (function cljs$core$macros$bit_shift_right(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} >> ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_shift_right.cljs$lang$macro = true;
cljs.core$macros.bit_shift_right_zero_fill = (function cljs$core$macros$bit_shift_right_zero_fill(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} >>> ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_shift_right_zero_fill.cljs$lang$macro = true;
cljs.core$macros.unsigned_bit_shift_right = (function cljs$core$macros$unsigned_bit_shift_right(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} >>> ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.unsigned_bit_shift_right.cljs$lang$macro = true;
cljs.core$macros.bit_set = (function cljs$core$macros$bit_set(_AMPERSAND_form,_AMPERSAND_env,x,n){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = x;
return cljs.core._conj((function (){var x__6696__auto____$1 = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"(~{} | (1 << ~{}))"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bit_set.cljs$lang$macro = true;
cljs.core$macros.mask = (function cljs$core$macros$mask(_AMPERSAND_form,_AMPERSAND_env,hash,shift){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = hash;
return cljs.core._conj((function (){var x__6696__auto____$1 = shift;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),"((~{} >>> ~{}) & 0x01f)"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.mask.cljs$lang$macro = true;
cljs.core$macros.bitpos = (function cljs$core$macros$bitpos(_AMPERSAND_form,_AMPERSAND_env,hash,shift){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_mask),(function (){var x__6696__auto__ = hash;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = shift;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"(1 << ~{})"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.bitpos.cljs$lang$macro = true;
cljs.core$macros.caching_hash = (function cljs$core$macros$caching_hash(_AMPERSAND_form,_AMPERSAND_env,coll,hash_fn,hash_key){
if((hash_key instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("hash-key is substituted twice"),cljs.core.str("\n"),cljs.core.str("(clojure.core/symbol? hash-key)")].join('')));
}

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__),(function (){var x__6696__auto__ = hash_key;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = hash_fn;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = coll;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = hash_key;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$h__15494__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.caching_hash.cljs$lang$macro = true;
cljs.core$macros.do_curried = (function cljs$core$macros$do_curried(name,doc,meta,args,body){
var cargs = cljs.core.vec(cljs.core.butlast(args));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defn),(function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = doc;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = meta;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cargs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15495__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cargs,cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15495__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = args;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),body)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
/**
 * Builds another arity of the fn that returns a fn awaiting the last
 *   param
 */
cljs.core$macros.defcurried = (function cljs$core$macros$defcurried(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15503 = arguments.length;
var i__6933__auto___15504 = (0);
while(true){
if((i__6933__auto___15504 < len__6932__auto___15503)){
args__6939__auto__.push((arguments[i__6933__auto___15504]));

var G__15505 = (i__6933__auto___15504 + (1));
i__6933__auto___15504 = G__15505;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((6) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((6)),(0),null)):null);
return cljs.core$macros.defcurried.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),argseq__6940__auto__);
});

cljs.core$macros.defcurried.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,doc,meta,args,body){
return cljs.core$macros.do_curried(name,doc,meta,args,body);
});

cljs.core$macros.defcurried.cljs$lang$maxFixedArity = (6);

cljs.core$macros.defcurried.cljs$lang$applyTo = (function (seq15496){
var G__15497 = cljs.core.first(seq15496);
var seq15496__$1 = cljs.core.next(seq15496);
var G__15498 = cljs.core.first(seq15496__$1);
var seq15496__$2 = cljs.core.next(seq15496__$1);
var G__15499 = cljs.core.first(seq15496__$2);
var seq15496__$3 = cljs.core.next(seq15496__$2);
var G__15500 = cljs.core.first(seq15496__$3);
var seq15496__$4 = cljs.core.next(seq15496__$3);
var G__15501 = cljs.core.first(seq15496__$4);
var seq15496__$5 = cljs.core.next(seq15496__$4);
var G__15502 = cljs.core.first(seq15496__$5);
var seq15496__$6 = cljs.core.next(seq15496__$5);
return cljs.core$macros.defcurried.cljs$core$IFn$_invoke$arity$variadic(G__15497,G__15498,G__15499,G__15500,G__15501,G__15502,seq15496__$6);
});

cljs.core$macros.defcurried.cljs$lang$macro = true;
cljs.core$macros.do_rfn = (function cljs$core$macros$do_rfn(f1,k,fkv){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = f1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = clojure.walk.postwalk((function (p1__15506_SHARP_){
if(cljs.core.sequential_QMARK_(p1__15506_SHARP_)){
return ((cljs.core.vector_QMARK_(p1__15506_SHARP_))?cljs.core.vec:cljs.core.identity).call(null,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.fromArray([k], true),p1__15506_SHARP_));
} else {
return p1__15506_SHARP_;
}
}),fkv);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = fkv;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
/**
 * Builds 3-arity reducing fn given names of wrapped fn and key, and k/v impl.
 */
cljs.core$macros.rfn = (function cljs$core$macros$rfn(_AMPERSAND_form,_AMPERSAND_env,p__15507,fkv){
var vec__15509 = p__15507;
var f1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15509,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15509,(1),null);
return cljs.core$macros.do_rfn(f1,k,fkv);
});

cljs.core$macros.rfn.cljs$lang$macro = true;
cljs.core$macros.protocol_prefix = (function cljs$core$macros$protocol_prefix(psym){
return [cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str("$")].join('');
});
cljs.core$macros.base_type = new cljs.core.PersistentArrayMap(null, 8, [null,"null",cljs.core.cst$sym$object,"object",cljs.core.cst$sym$string,"string",cljs.core.cst$sym$number,"number",cljs.core.cst$sym$array,"array",cljs.core.cst$sym$function,"function",cljs.core.cst$sym$boolean,"boolean",cljs.core.cst$sym$default,"_"], null);
cljs.core$macros.js_base_type = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$sym$js_SLASH_Boolean,"boolean",cljs.core.cst$sym$js_SLASH_String,"string",cljs.core.cst$sym$js_SLASH_Array,"array",cljs.core.cst$sym$js_SLASH_Object,"object",cljs.core.cst$sym$js_SLASH_Number,"number",cljs.core.cst$sym$js_SLASH_Function,"function"], null);
/**
 * reify is a macro with the following structure:
 * 
 *  (reify options* specs*)
 * 
 *   Currently there are no options.
 * 
 *   Each spec consists of the protocol name followed by zero
 *   or more method bodies:
 * 
 *   protocol
 *   (methodName [args+] body)*
 * 
 *   Methods should be supplied for all methods of the desired
 *   protocol(s). You can also define overrides for Object methods. Note that
 *   the first parameter must be supplied to correspond to the target object
 *   ('this' in JavaScript parlance). Note also that recur calls
 *   to the method head should *not* pass the target object, it will be supplied
 *   automatically and can not be substituted.
 * 
 *   recur works to method heads The method bodies of reify are lexical
 *   closures, and can refer to the surrounding local scope:
 * 
 *   (str (let [f "foo"]
 *     (reify Object
 *       (toString [this] f))))
 *   == "foo"
 * 
 *   (seq (let [f "foo"]
 *     (reify ISeqable
 *       (-seq [this] (-seq f)))))
 *   == (\f \o \o))
 * 
 *   reify always implements IMeta and IWithMeta and transfers meta
 *   data of the form to the created object.
 * 
 *   (meta ^{:k :v} (reify Object (toString [this] "foo")))
 *   == {:k :v}
 */
cljs.core$macros.reify = (function cljs$core$macros$reify(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15513 = arguments.length;
var i__6933__auto___15514 = (0);
while(true){
if((i__6933__auto___15514 < len__6932__auto___15513)){
args__6939__auto__.push((arguments[i__6933__auto___15514]));

var G__15515 = (i__6933__auto___15514 + (1));
i__6933__auto___15514 = G__15515;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.reify.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.reify.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,impls){
var t = cljs.core.with_meta(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1([cljs.core.str("t_"),cljs.core.str(clojure.string.replace([cljs.core.str(cljs.core.munge(cljs.analyzer._STAR_cljs_ns_STAR_))].join(''),".","$"))].join('')),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$anonymous,true], null));
var meta_sym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("meta");
var this_sym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("_");
var locals = cljs.core.keys(cljs.core.cst$kw$locals.cljs$core$IFn$_invoke$arity$1(_AMPERSAND_env));
var ns = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(_AMPERSAND_env));
var munge = cljs.compiler.munge;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_exists_QMARK_),(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(ns)].join(''),[cljs.core.str(t)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_deftype),(function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(locals,(function (){var x__6696__auto__ = meta_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_IWithMeta),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_with_DASH_meta),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = meta_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([locals,(function (){var x__6696__auto__ = meta_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_IMeta),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_meta),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = meta_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),impls], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = t;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([locals,(function (){var x__6696__auto__ = cljs.analyzer.elide_reader_meta(cljs.core.meta(_AMPERSAND_form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.reify.cljs$lang$maxFixedArity = (2);

cljs.core$macros.reify.cljs$lang$applyTo = (function (seq15510){
var G__15511 = cljs.core.first(seq15510);
var seq15510__$1 = cljs.core.next(seq15510);
var G__15512 = cljs.core.first(seq15510__$1);
var seq15510__$2 = cljs.core.next(seq15510__$1);
return cljs.core$macros.reify.cljs$core$IFn$_invoke$arity$variadic(G__15511,G__15512,seq15510__$2);
});

cljs.core$macros.reify.cljs$lang$macro = true;
/**
 * Identical to reify but mutates its first argument.
 */
cljs.core$macros.specify_BANG_ = (function cljs$core$macros$specify_BANG_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15520 = arguments.length;
var i__6933__auto___15521 = (0);
while(true){
if((i__6933__auto___15521 < len__6932__auto___15520)){
args__6939__auto__.push((arguments[i__6933__auto___15521]));

var G__15522 = (i__6933__auto___15521 + (1));
i__6933__auto___15521 = G__15522;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.specify_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.specify_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,impls){
var x = cljs.core.with_meta(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("x"),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$extend,cljs.core.cst$kw$instance], null));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_extend_DASH_type),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([impls], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.specify_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core$macros.specify_BANG_.cljs$lang$applyTo = (function (seq15516){
var G__15517 = cljs.core.first(seq15516);
var seq15516__$1 = cljs.core.next(seq15516);
var G__15518 = cljs.core.first(seq15516__$1);
var seq15516__$2 = cljs.core.next(seq15516__$1);
var G__15519 = cljs.core.first(seq15516__$2);
var seq15516__$3 = cljs.core.next(seq15516__$2);
return cljs.core$macros.specify_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__15517,G__15518,G__15519,seq15516__$3);
});

cljs.core$macros.specify_BANG_.cljs$lang$macro = true;
/**
 * Identical to specify! but does not mutate its first argument. The first
 *   argument must be an ICloneable instance.
 */
cljs.core$macros.specify = (function cljs$core$macros$specify(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15527 = arguments.length;
var i__6933__auto___15528 = (0);
while(true){
if((i__6933__auto___15528 < len__6932__auto___15527)){
args__6939__auto__.push((arguments[i__6933__auto___15528]));

var G__15529 = (i__6933__auto___15528 + (1));
i__6933__auto___15528 = G__15529;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.specify.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.specify.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,expr,impls){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_specify_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_clone),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([impls], 0))));
});

cljs.core$macros.specify.cljs$lang$maxFixedArity = (3);

cljs.core$macros.specify.cljs$lang$applyTo = (function (seq15523){
var G__15524 = cljs.core.first(seq15523);
var seq15523__$1 = cljs.core.next(seq15523);
var G__15525 = cljs.core.first(seq15523__$1);
var seq15523__$2 = cljs.core.next(seq15523__$1);
var G__15526 = cljs.core.first(seq15523__$2);
var seq15523__$3 = cljs.core.next(seq15523__$2);
return cljs.core$macros.specify.cljs$core$IFn$_invoke$arity$variadic(G__15524,G__15525,G__15526,seq15523__$3);
});

cljs.core$macros.specify.cljs$lang$macro = true;
cljs.core$macros.js_this = (function cljs$core$macros$js_this(_AMPERSAND_form,_AMPERSAND_env){
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,"this"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_this.cljs$lang$macro = true;
/**
 * Defines a scope where JavaScript's implicit "this" is bound to the name provided.
 */
cljs.core$macros.this_as = (function cljs$core$macros$this_as(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15534 = arguments.length;
var i__6933__auto___15535 = (0);
while(true){
if((i__6933__auto___15535 < len__6932__auto___15534)){
args__6939__auto__.push((arguments[i__6933__auto___15535]));

var G__15536 = (i__6933__auto___15535 + (1));
i__6933__auto___15535 = G__15536;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.this_as.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.this_as.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_this))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
});

cljs.core$macros.this_as.cljs$lang$maxFixedArity = (3);

cljs.core$macros.this_as.cljs$lang$applyTo = (function (seq15530){
var G__15531 = cljs.core.first(seq15530);
var seq15530__$1 = cljs.core.next(seq15530);
var G__15532 = cljs.core.first(seq15530__$1);
var seq15530__$2 = cljs.core.next(seq15530__$1);
var G__15533 = cljs.core.first(seq15530__$2);
var seq15530__$3 = cljs.core.next(seq15530__$2);
return cljs.core$macros.this_as.cljs$core$IFn$_invoke$arity$variadic(G__15531,G__15532,G__15533,seq15530__$3);
});

cljs.core$macros.this_as.cljs$lang$macro = true;
cljs.core$macros.to_property = (function cljs$core$macros$to_property(sym){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(sym)].join(''));
});
cljs.core$macros.warn_and_update_protocol = (function cljs$core$macros$warn_and_update_protocol(p,type,env){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$Object,p)){
return null;
} else {
var temp__4655__auto__ = cljs.analyzer.resolve_existing_var(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),p);
if(cljs.core.truth_(temp__4655__auto__)){
var var$ = temp__4655__auto__;
if(cljs.core.truth_(cljs.core.cst$kw$protocol_DASH_symbol.cljs$core$IFn$_invoke$arity$1(var$))){
} else {
cljs.analyzer.warning(cljs.core.cst$kw$invalid_DASH_protocol_DASH_symbol,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocol,p], null));
}

if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.cst$kw$protocol_DASH_deprecated.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_);
if(cljs.core.truth_(and__5850__auto__)){
var and__5850__auto____$1 = cljs.core.cst$kw$deprecated.cljs$core$IFn$_invoke$arity$1(var$);
if(cljs.core.truth_(and__5850__auto____$1)){
return cljs.core.not(cljs.core.cst$kw$deprecation_DASH_nowarn.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(p)));
} else {
return and__5850__auto____$1;
}
} else {
return and__5850__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_deprecated,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocol,p], null));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$protocol_DASH_symbol.cljs$core$IFn$_invoke$arity$1(var$))){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces], null),((function (var$,temp__4655__auto__){
return (function (ns){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(ns,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(var$),cljs.core.cst$kw$defs,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(p)),cljs.core.cst$kw$impls], null),cljs.core.conj,type);
});})(var$,temp__4655__auto__))
);
} else {
return null;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$undeclared.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_))){
return cljs.analyzer.warning(cljs.core.cst$kw$undeclared_DASH_protocol_DASH_symbol,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocol,p], null));
} else {
return null;
}
}
}
});
cljs.core$macros.resolve_var = (function cljs$core$macros$resolve_var(env,sym){
var ret = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),sym));
if(cljs.core.truth_(ret)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Can't resolve: "),cljs.core.str(sym)].join('')),cljs.core.str("\n"),cljs.core.str("ret")].join('')));
}

return ret;
});
cljs.core$macros.__GT_impl_map = (function cljs$core$macros$__GT_impl_map(impls){
var ret = cljs.core.PersistentArrayMap.EMPTY;
var s = impls;
while(true){
if(cljs.core.seq(s)){
var G__15537 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ret,cljs.core.first(s),cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(s)));
var G__15538 = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(s));
ret = G__15537;
s = G__15538;
continue;
} else {
return ret;
}
break;
}
});
cljs.core$macros.base_assign_impls = (function cljs$core$macros$base_assign_impls(env,resolve,tsym,type,p__15539){
var vec__15543 = p__15539;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15543,(0),null);
var sigs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15543,(1),null);
cljs.core$macros.warn_and_update_protocol(p,tsym,env);

var psym = (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(p) : resolve.call(null,p));
var pfn_prefix = cljs.core.subs.cljs$core$IFn$_invoke$arity$3([cljs.core.str(psym)].join(''),(0),([cljs.core.str(psym)].join('').indexOf("/") + (1)));
return cljs.core.cons(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = psym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = type;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,true)], 0)))),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (psym,pfn_prefix,vec__15543,p,sigs){
return (function (p__15544){
var vec__15545 = p__15544;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15545,(0),null);
var meths = cljs.core.nthnext(vec__15545,(1));
var form = vec__15545;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(pfn_prefix),cljs.core.str(f)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = type;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),meths))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(psym,pfn_prefix,vec__15543,p,sigs))
,sigs));
});
if(typeof cljs.core$macros.extend_prefix !== 'undefined'){
} else {
cljs.core$macros.extend_prefix = (function (){var method_table__6787__auto__ = (function (){var G__15546 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__15546) : cljs.core.atom.call(null,G__15546));
})();
var prefer_table__6788__auto__ = (function (){var G__15547 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__15547) : cljs.core.atom.call(null,G__15547));
})();
var method_cache__6789__auto__ = (function (){var G__15548 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__15548) : cljs.core.atom.call(null,G__15548));
})();
var cached_hierarchy__6790__auto__ = (function (){var G__15549 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__15549) : cljs.core.atom.call(null,G__15549));
})();
var hierarchy__6791__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("cljs.core$macros","extend-prefix"),((function (method_table__6787__auto__,prefer_table__6788__auto__,method_cache__6789__auto__,cached_hierarchy__6790__auto__,hierarchy__6791__auto__){
return (function (tsym,sym){
return cljs.core.cst$kw$extend.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(tsym));
});})(method_table__6787__auto__,prefer_table__6788__auto__,method_cache__6789__auto__,cached_hierarchy__6790__auto__,hierarchy__6791__auto__))
,cljs.core.cst$kw$default,hierarchy__6791__auto__,method_table__6787__auto__,prefer_table__6788__auto__,method_cache__6789__auto__,cached_hierarchy__6790__auto__));
})();
}
cljs.core$macros.extend_prefix.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$instance,(function (tsym,sym){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$$),(function (){var x__6696__auto__ = tsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.to_property(sym);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}));
cljs.core$macros.extend_prefix.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (tsym,sym){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$$),(function (){var x__6696__auto__ = tsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_prototype),(function (){var x__6696__auto__ = cljs.core$macros.to_property(sym);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}));
cljs.core$macros.adapt_obj_params = (function cljs$core$macros$adapt_obj_params(type,p__15550){
var vec__15553 = p__15550;
var vec__15554 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15553,(0),null);
var this$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15554,(0),null);
var args = cljs.core.nthnext(vec__15554,(1));
var sig = vec__15554;
var body = cljs.core.nthnext(vec__15553,(1));
var x__6696__auto__ = cljs.core.vec(args);
return cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$this_DASH_as,cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(this$,cljs.core.assoc,cljs.core.cst$kw$tag,type),body);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
});
cljs.core$macros.adapt_ifn_params = (function cljs$core$macros$adapt_ifn_params(type,p__15555){
var vec__15558 = p__15555;
var vec__15559 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15558,(0),null);
var this$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15559,(0),null);
var args = cljs.core.nthnext(vec__15559,(1));
var sig = vec__15559;
var body = cljs.core.nthnext(vec__15558,(1));
var self_sym = cljs.core.with_meta(cljs.core.cst$sym$self__,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,type], null));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(cljs.core.cons(self_sym,args));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_this_DASH_as),(function (){var x__6696__auto__ = self_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = this$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = self_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});
cljs.core$macros.adapt_ifn_invoke_params = (function cljs$core$macros$adapt_ifn_invoke_params(type,p__15560){
var vec__15563 = p__15560;
var vec__15564 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15563,(0),null);
var this$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15564,(0),null);
var args = cljs.core.nthnext(vec__15564,(1));
var sig = vec__15564;
var body = cljs.core.nthnext(vec__15563,(1));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(args);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_this_DASH_as),(function (){var x__6696__auto__ = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(this$,cljs.core.assoc,cljs.core.cst$kw$tag,type);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});
cljs.core$macros.adapt_proto_params = (function cljs$core$macros$adapt_proto_params(type,p__15565){
var vec__15568 = p__15565;
var vec__15569 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15568,(0),null);
var this$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15569,(0),null);
var args = cljs.core.nthnext(vec__15569,(1));
var sig = vec__15569;
var body = cljs.core.nthnext(vec__15568,(1));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(cljs.core.cons(cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(this$,cljs.core.assoc,cljs.core.cst$kw$tag,type),args));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_this_DASH_as),(function (){var x__6696__auto__ = this$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});
cljs.core$macros.add_obj_methods = (function cljs$core$macros$add_obj_methods(type,type_sym,sigs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__15574){
var vec__15575 = p__15574;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15575,(0),null);
var meths = cljs.core.nthnext(vec__15575,(1));
var form = vec__15575;
var vec__15576 = ((cljs.core.vector_QMARK_(cljs.core.first(meths)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.rest(form)], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,meths], null));
var f__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15576,(0),null);
var meths__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15576,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(type_sym,f__$1) : cljs.core$macros.extend_prefix.call(null,type_sym,f__$1));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15576,f__$1,meths__$1,vec__15575,f,meths,form){
return (function (p1__15570_SHARP_){
return cljs.core$macros.adapt_obj_params(type,p1__15570_SHARP_);
});})(vec__15576,f__$1,meths__$1,vec__15575,f,meths,form))
,meths__$1)))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}),sigs);
});
cljs.core$macros.ifn_invoke_methods = (function cljs$core$macros$ifn_invoke_methods(type,type_sym,p__15578){
var vec__15584 = p__15578;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15584,(0),null);
var meths = cljs.core.nthnext(vec__15584,(1));
var form = vec__15584;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15584,f,meths,form){
return (function (meth){
var arity = cljs.core.count(cljs.core.first(meth));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (function (){var G__15587 = type_sym;
var G__15588 = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''));
return (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(G__15587,G__15588) : cljs.core$macros.extend_prefix.call(null,G__15587,G__15588));
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = meth;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(vec__15584,f,meths,form))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15584,f,meths,form){
return (function (p1__15577_SHARP_){
return cljs.core$macros.adapt_ifn_invoke_params(type,p1__15577_SHARP_);
});})(vec__15584,f,meths,form))
,meths));
});
cljs.core$macros.add_ifn_methods = (function cljs$core$macros$add_ifn_methods(type,type_sym,p__15590){
var vec__15592 = p__15590;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15592,(0),null);
var meths = cljs.core.nthnext(vec__15592,(1));
var form = vec__15592;
var meths__$1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15592,f,meths,form){
return (function (p1__15589_SHARP_){
return cljs.core$macros.adapt_ifn_params(type,p1__15589_SHARP_);
});})(vec__15592,f,meths,form))
,meths);
var this_sym = cljs.core.with_meta(cljs.core.cst$sym$self__,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,type], null));
var argsym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("args");
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(type_sym,cljs.core.cst$sym$call) : cljs.core$macros.extend_prefix.call(null,type_sym,cljs.core.cst$sym$call));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),meths__$1))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(type_sym,cljs.core.cst$sym$apply) : cljs.core$macros.extend_prefix.call(null,type_sym,cljs.core.cst$sym$apply));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [this_sym,argsym], null);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_this_DASH_as),(function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$apply),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_call),(function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$concat),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),(function (){var x__6696__auto__ = this_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_aclone),(function (){var x__6696__auto__ = argsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null),cljs.core$macros.ifn_invoke_methods(type,type_sym,form));
});
cljs.core$macros.add_proto_methods_STAR_ = (function cljs$core$macros$add_proto_methods_STAR_(pprefix,type,type_sym,p__15593){
var vec__15605 = p__15593;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15605,(0),null);
var meths = cljs.core.nthnext(vec__15605,(1));
var form = vec__15605;
var pf = [cljs.core.str(pprefix),cljs.core.str(cljs.core.name(f))].join('');
if(cljs.core.vector_QMARK_(cljs.core.first(meths))){
var meth = meths;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (function (){var G__15608 = type_sym;
var G__15609 = [cljs.core.str(pf),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(cljs.core.first(meth)))].join('');
return (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(G__15608,G__15609) : cljs.core$macros.extend_prefix.call(null,G__15608,G__15609));
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),cljs.core$macros.adapt_proto_params(type,meth)))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null);
} else {
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (pf,vec__15605,f,meths,form){
return (function (p__15610){
var vec__15611 = p__15610;
var sig = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15611,(0),null);
var body = cljs.core.nthnext(vec__15611,(1));
var meth = vec__15611;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (function (){var G__15614 = type_sym;
var G__15615 = [cljs.core.str(pf),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(sig))].join('');
return (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(G__15614,G__15615) : cljs.core$macros.extend_prefix.call(null,G__15614,G__15615));
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core$macros.adapt_proto_params(type,meth);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))),cljs.core.meta(form));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(pf,vec__15605,f,meths,form))
,meths);
}
});
cljs.core$macros.proto_assign_impls = (function cljs$core$macros$proto_assign_impls(env,resolve,type_sym,type,p__15616){
var vec__15618 = p__15616;
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15618,(0),null);
var sigs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15618,(1),null);
cljs.core$macros.warn_and_update_protocol(p,type,env);

var psym = (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(p) : resolve.call(null,p));
var pprefix = cljs.core$macros.protocol_prefix(psym);
var skip_flag = cljs.core.set(cljs.core.cst$kw$skip_DASH_protocol_DASH_flag.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(type_sym)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p,cljs.core.cst$sym$Object)){
return cljs.core$macros.add_obj_methods(type,type_sym,sigs);
} else {
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_((skip_flag.cljs$core$IFn$_invoke$arity$1 ? skip_flag.cljs$core$IFn$_invoke$arity$1(psym) : skip_flag.call(null,psym)))?null:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = (cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2 ? cljs.core$macros.extend_prefix.cljs$core$IFn$_invoke$arity$2(type_sym,pprefix) : cljs.core$macros.extend_prefix.call(null,type_sym,pprefix));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true)], 0))))], null)),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (psym,pprefix,skip_flag,vec__15618,p,sigs){
return (function (sig){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(psym,cljs.core.cst$sym$cljs$core_SLASH_IFn)){
return cljs.core$macros.add_ifn_methods(type,type_sym,sig);
} else {
return cljs.core$macros.add_proto_methods_STAR_(pprefix,type,type_sym,sig);
}
});})(psym,pprefix,skip_flag,vec__15618,p,sigs))
,cljs.core.array_seq([sigs], 0)));
}
});
cljs.core$macros.validate_impl_sigs = (function cljs$core$macros$validate_impl_sigs(env,p,method){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p,cljs.core.cst$sym$Object)){
return null;
} else {
var var$ = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),p);
var minfo = cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$protocol_DASH_info.cljs$core$IFn$_invoke$arity$1(var$));
var method_name = cljs.core.first(method);
var __GT_name = cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol,cljs.core.name);
var vec__15620 = ((cljs.core.vector_QMARK_(cljs.core.second(method)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(__GT_name.cljs$core$IFn$_invoke$arity$1 ? __GT_name.cljs$core$IFn$_invoke$arity$1(method_name) : __GT_name.call(null,method_name)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.second(method)], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(__GT_name.cljs$core$IFn$_invoke$arity$1 ? __GT_name.cljs$core$IFn$_invoke$arity$1(method_name) : __GT_name.call(null,method_name)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.rest(method))], null));
var fname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15620,(0),null);
var sigs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15620,(1),null);
var decmeths = cljs.core.get.cljs$core$IFn$_invoke$arity$3(minfo,fname,cljs.core.cst$kw$cljs$core$macros_SLASH_not_DASH_found);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(decmeths,cljs.core.cst$kw$cljs$core$macros_SLASH_not_DASH_found)){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_invalid_DASH_method,env,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$protocol,p,cljs.core.cst$kw$fname,fname,cljs.core.cst$kw$no_DASH_such_DASH_method,true], null));
} else {
}

if(cljs.core.truth_(cljs.core.namespace(method_name))){
var method_var_15621 = cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),method_name,cljs.analyzer.confirm_var_exist_warning);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(var$),cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(method_var_15621))){
} else {
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_invalid_DASH_method,env,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$protocol,p,cljs.core.cst$kw$fname,method_name,cljs.core.cst$kw$no_DASH_such_DASH_method,true], null));
}
} else {
}

var sigs__$1 = sigs;
var seen = cljs.core.PersistentHashSet.EMPTY;
while(true){
if(cljs.core.seq(sigs__$1)){
var sig = cljs.core.first(sigs__$1);
var c = cljs.core.count(sig);
if(cljs.core.contains_QMARK_(seen,c)){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_duped_DASH_method,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$protocol,p,cljs.core.cst$kw$fname,fname], null));
} else {
}

if((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(decmeths,cljs.core.cst$kw$cljs$core$macros_SLASH_not_DASH_found)) && (cljs.core.not(cljs.core.some(cljs.core.PersistentHashSet.fromArray([c], true),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,decmeths))))){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_invalid_DASH_method,env,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$protocol,p,cljs.core.cst$kw$fname,fname,cljs.core.cst$kw$invalid_DASH_arity,c], null));
} else {
}

var G__15622 = cljs.core.next(sigs__$1);
var G__15623 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(seen,c);
sigs__$1 = G__15622;
seen = G__15623;
continue;
} else {
return null;
}
break;
}
}
});
cljs.core$macros.validate_impls = (function cljs$core$macros$validate_impls(env,impls){
var protos = cljs.core.PersistentHashSet.EMPTY;
var impls__$1 = impls;
while(true){
if(cljs.core.seq(impls__$1)){
var proto = cljs.core.first(impls__$1);
var methods$ = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(impls__$1));
var impls__$2 = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(impls__$1));
if(cljs.core.contains_QMARK_(protos,proto)){
cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_multiple_DASH_impls,env,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$protocol,proto], null));
} else {
}

var seen_15626 = cljs.core.PersistentHashSet.EMPTY;
var methods_15627__$1 = methods$;
while(true){
if(cljs.core.seq(methods_15627__$1)){
var vec__15625_15628 = cljs.core.first(methods_15627__$1);
var fname_15629 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15625_15628,(0),null);
var method_15630 = vec__15625_15628;
if(cljs.core.contains_QMARK_(seen_15626,fname_15629)){
cljs.analyzer.warning(cljs.core.cst$kw$extend_DASH_type_DASH_invalid_DASH_method_DASH_shape,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$protocol,proto,cljs.core.cst$kw$method,fname_15629], null));
} else {
}

cljs.core$macros.validate_impl_sigs(env,proto,method_15630);

var G__15631 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(seen_15626,fname_15629);
var G__15632 = cljs.core.next(methods_15627__$1);
seen_15626 = G__15631;
methods_15627__$1 = G__15632;
continue;
} else {
}
break;
}

var G__15633 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(protos,proto);
var G__15634 = impls__$2;
protos = G__15633;
impls__$1 = G__15634;
continue;
} else {
return null;
}
break;
}
});
cljs.core$macros.type_hint_first_arg = (function cljs$core$macros$type_hint_first_arg(type_sym,argv){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(argv,(0),cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4((argv.cljs$core$IFn$_invoke$arity$1 ? argv.cljs$core$IFn$_invoke$arity$1((0)) : argv.call(null,(0))),cljs.core.assoc,cljs.core.cst$kw$tag,type_sym));
});
cljs.core$macros.type_hint_single_arity_sig = (function cljs$core$macros$type_hint_single_arity_sig(type_sym,sig){
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.first(sig),cljs.core$macros.type_hint_first_arg(type_sym,cljs.core.second(sig)),cljs.core.nnext(sig));
});
cljs.core$macros.type_hint_multi_arity_sig = (function cljs$core$macros$type_hint_multi_arity_sig(type_sym,sig){
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.type_hint_first_arg(type_sym,cljs.core.first(sig)),cljs.core.next(sig));
});
cljs.core$macros.type_hint_multi_arity_sigs = (function cljs$core$macros$type_hint_multi_arity_sigs(type_sym,sigs){
return cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(sigs),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.type_hint_multi_arity_sig,type_sym),cljs.core.rest(sigs)));
});
cljs.core$macros.type_hint_sigs = (function cljs$core$macros$type_hint_sigs(type_sym,sig){
if(cljs.core.vector_QMARK_(cljs.core.second(sig))){
return cljs.core$macros.type_hint_single_arity_sig(type_sym,sig);
} else {
return cljs.core$macros.type_hint_multi_arity_sigs(type_sym,sig);
}
});
cljs.core$macros.type_hint_impl_map = (function cljs$core$macros$type_hint_impl_map(type_sym,impl_map){
return cljs.core.reduce_kv((function (m,proto,sigs){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,proto,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.type_hint_sigs,type_sym),sigs));
}),cljs.core.PersistentArrayMap.EMPTY,impl_map);
});
/**
 * Extend a type to a series of protocols. Useful when you are
 *   supplying the definitions explicitly inline. Propagates the
 *   type as a type hint on the first argument of all fns.
 * 
 *   type-sym may be
 * 
 * * default, meaning the definitions will apply for any value,
 *   unless an extend-type exists for one of the more specific
 *   cases below.
 * * nil, meaning the definitions will apply for the nil value.
 * * any of object, boolean, number, string, array, or function,
 *   indicating the definitions will apply for values of the
 *   associated base JavaScript types. Note that, for example,
 *   string should be used instead of js/String.
 * * a JavaScript type not covered by the previous list, such
 *   as js/RegExp.
 * * a type defined by deftype or defrecord.
 * 
 *   (extend-type MyType
 *  ICounted
 *  (-count [c] ...)
 *  Foo
 *  (bar [x y] ...)
 *  (baz ([x] ...) ([x y & zs] ...))
 */
cljs.core$macros.extend_type = (function cljs$core$macros$extend_type(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15641 = arguments.length;
var i__6933__auto___15642 = (0);
while(true){
if((i__6933__auto___15642 < len__6932__auto___15641)){
args__6939__auto__.push((arguments[i__6933__auto___15642]));

var G__15643 = (i__6933__auto___15642 + (1));
i__6933__auto___15642 = G__15643;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.extend_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.extend_type.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,type_sym,impls){
var env = _AMPERSAND_env;
var _ = cljs.core$macros.validate_impls(env,impls);
var resolve = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.resolve_var,env);
var impl_map = cljs.core$macros.__GT_impl_map(impls);
var impl_map__$1 = (cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$boolean,null,cljs.core.cst$sym$number,null], null), null).call(null,type_sym))?cljs.core$macros.type_hint_impl_map(type_sym,impl_map):impl_map);
var vec__15640 = (function (){var temp__4655__auto__ = (cljs.core$macros.base_type.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.base_type.cljs$core$IFn$_invoke$arity$1(type_sym) : cljs.core$macros.base_type.call(null,type_sym));
if(cljs.core.truth_(temp__4655__auto__)){
var type = temp__4655__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core$macros.base_assign_impls], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(type_sym) : resolve.call(null,type_sym)),cljs.core$macros.proto_assign_impls], null);
}
})();
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15640,(0),null);
var assign_impls = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15640,(1),null);
if(cljs.core.truth_((function (){var and__5850__auto__ = cljs.core.cst$kw$extending_DASH_base_DASH_js_DASH_type.cljs$core$IFn$_invoke$arity$1(cljs.analyzer._STAR_cljs_warnings_STAR_);
if(cljs.core.truth_(and__5850__auto__)){
return (cljs.core$macros.js_base_type.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.js_base_type.cljs$core$IFn$_invoke$arity$1(type_sym) : cljs.core$macros.js_base_type.call(null,type_sym));
} else {
return and__5850__auto__;
}
})())){
cljs.analyzer.warning(cljs.core.cst$kw$extending_DASH_base_DASH_js_DASH_type,env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$current_DASH_symbol,type_sym,cljs.core.cst$kw$suggested_DASH_symbol,(cljs.core$macros.js_base_type.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.js_base_type.cljs$core$IFn$_invoke$arity$1(type_sym) : cljs.core$macros.js_base_type.call(null,type_sym))], null));
} else {
}

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (env,_,resolve,impl_map,impl_map__$1,vec__15640,type,assign_impls){
return (function (p1__15635_SHARP_){
return (assign_impls.cljs$core$IFn$_invoke$arity$5 ? assign_impls.cljs$core$IFn$_invoke$arity$5(env,resolve,type_sym,type,p1__15635_SHARP_) : assign_impls.call(null,env,resolve,type_sym,type,p1__15635_SHARP_));
});})(env,_,resolve,impl_map,impl_map__$1,vec__15640,type,assign_impls))
,cljs.core.array_seq([impl_map__$1], 0)))));
});

cljs.core$macros.extend_type.cljs$lang$maxFixedArity = (3);

cljs.core$macros.extend_type.cljs$lang$applyTo = (function (seq15636){
var G__15637 = cljs.core.first(seq15636);
var seq15636__$1 = cljs.core.next(seq15636);
var G__15638 = cljs.core.first(seq15636__$1);
var seq15636__$2 = cljs.core.next(seq15636__$1);
var G__15639 = cljs.core.first(seq15636__$2);
var seq15636__$3 = cljs.core.next(seq15636__$2);
return cljs.core$macros.extend_type.cljs$core$IFn$_invoke$arity$variadic(G__15637,G__15638,G__15639,seq15636__$3);
});

cljs.core$macros.extend_type.cljs$lang$macro = true;
cljs.core$macros.prepare_protocol_masks = (function cljs$core$macros$prepare_protocol_masks(env,impls){
var resolve = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.resolve_var,env);
var impl_map = cljs.core$macros.__GT_impl_map(impls);
var fpp_pbs = cljs.core.seq(cljs.core.keep.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.fast_path_protocols,cljs.core.map.cljs$core$IFn$_invoke$arity$2(resolve,cljs.core.keys(impl_map))));
if(fpp_pbs){
var fpps = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.contains_QMARK_,cljs.core$macros.fast_path_protocols),cljs.core.map.cljs$core$IFn$_invoke$arity$2(resolve,cljs.core.keys(impl_map))));
var parts = (function (){var parts = cljs.core.group_by(cljs.core.first,fpp_pbs);
var parts__$1 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.map,cljs.core.peek),cljs.core.val)),parts));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.reduce,cljs.core.bit_or),cljs.core.val)),parts__$1));
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fpps,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (fpps,parts,resolve,impl_map,fpp_pbs){
return (function (ps,p){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(ps,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p], null),cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.identity,(0)));
});})(fpps,parts,resolve,impl_map,fpp_pbs))
,parts,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core$macros.fast_path_protocol_partitions_count))], null);
} else {
return null;
}
});
cljs.core$macros.annotate_specs = (function cljs$core$macros$annotate_specs(annots,v,p__15645){
var vec__15647 = p__15645;
var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15647,(0),null);
var sigs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15647,(1),null);
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$3(cljs.core.cons(f,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__15647,f,sigs){
return (function (p1__15644_SHARP_){
return cljs.core.cons(cljs.core.second(p1__15644_SHARP_),cljs.core.nnext(p1__15644_SHARP_));
});})(vec__15647,f,sigs))
,sigs)),cljs.core.merge,annots));
});
cljs.core$macros.dt__GT_et = (function cljs$core$macros$dt__GT_et(var_args){
var args15648 = [];
var len__6932__auto___15651 = arguments.length;
var i__6933__auto___15652 = (0);
while(true){
if((i__6933__auto___15652 < len__6932__auto___15651)){
args15648.push((arguments[i__6933__auto___15652]));

var G__15653 = (i__6933__auto___15652 + (1));
i__6933__auto___15652 = G__15653;
continue;
} else {
}
break;
}

var G__15650 = args15648.length;
switch (G__15650) {
case 3:
return cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15648.length)].join('')));

}
});

cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$3 = (function (type,specs,fields){
return cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$4(type,specs,fields,false);
});

cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$4 = (function (type,specs,fields,inline){
var annots = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$cljs$analyzer_SLASH_type,type,cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_impl,true,cljs.core.cst$kw$cljs$analyzer_SLASH_protocol_DASH_inline,inline], null);
var ret = cljs.core.PersistentVector.EMPTY;
var specs__$1 = specs;
while(true){
if(cljs.core.seq(specs__$1)){
var p = cljs.core.first(specs__$1);
var ret__$1 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,p),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core$macros.annotate_specs,annots),cljs.core.PersistentVector.EMPTY,cljs.core.group_by(cljs.core.first,cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(specs__$1)))));
var specs__$2 = cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.seq_QMARK_,cljs.core.next(specs__$1));
var G__15655 = ret__$1;
var G__15656 = specs__$2;
ret = G__15655;
specs__$1 = G__15656;
continue;
} else {
return ret;
}
break;
}
});

cljs.core$macros.dt__GT_et.cljs$lang$maxFixedArity = 4;
cljs.core$macros.collect_protocols = (function cljs$core$macros$collect_protocols(impls,env){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15657_SHARP_){
return cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),p1__15657_SHARP_));
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.symbol_QMARK_,impls)));
});
cljs.core$macros.build_positional_factory = (function cljs$core$macros$build_positional_factory(rsym,rname,fields){
var fn_name = cljs.core.with_meta(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core.cst$sym$_DASH__GT_),cljs.core.str(rsym)].join('')),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.meta(rsym),cljs.core.cst$kw$factory,cljs.core.cst$kw$positional));
var field_values = (cljs.core.truth_(cljs.core.cst$kw$internal_DASH_ctor.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(rsym)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(fields,null,cljs.core.array_seq([null,null], 0)):fields);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defn),(function (){var x__6696__auto__ = fn_name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(fields))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = rname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([field_values], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
cljs.core$macros.validate_fields = (function cljs$core$macros$validate_fields(case$,name,fields){
if(cljs.core.vector_QMARK_(fields)){
return null;
} else {
throw (new Error([cljs.core.str(case$),cljs.core.str(" "),cljs.core.str(name),cljs.core.str(", no fields vector given.")].join('')));
}
});
/**
 * (deftype name [fields*]  options* specs*)
 * 
 *   Currently there are no options.
 * 
 *   Each spec consists of a protocol or interface name followed by zero
 *   or more method bodies:
 * 
 *   protocol-or-Object
 *   (methodName [args*] body)*
 * 
 *   The type will have the (by default, immutable) fields named by
 *   fields, which can have type hints. Protocols and methods
 *   are optional. The only methods that can be supplied are those
 *   declared in the protocols/interfaces.  Note that method bodies are
 *   not closures, the local environment includes only the named fields,
 *   and those fields can be accessed directly. Fields can be qualified
 *   with the metadata :mutable true at which point (set! afield aval) will be
 *   supported in method bodies. Note well that mutable fields are extremely
 *   difficult to use correctly, and are present only to facilitate the building
 *   of higherlevel constructs, such as ClojureScript's reference types, in
 *   ClojureScript itself. They are for experts only - if the semantics and
 *   implications of :mutable are not immediately apparent to you, you should not
 *   be using them.
 * 
 *   Method definitions take the form:
 * 
 *   (methodname [args*] body)
 * 
 *   The argument and return types can be hinted on the arg and
 *   methodname symbols. If not supplied, they will be inferred, so type
 *   hints should be reserved for disambiguation.
 * 
 *   Methods should be supplied for all methods of the desired
 *   protocol(s). You can also define overrides for methods of Object. Note that
 *   a parameter must be supplied to correspond to the target object
 *   ('this' in JavaScript parlance). Note also that recur calls to the method
 *   head should *not* pass the target object, it will be supplied
 *   automatically and can not be substituted.
 * 
 *   In the method bodies, the (unqualified) name can be used to name the
 *   class (for calls to new, instance? etc).
 * 
 *   One constructor will be defined, taking the designated fields.  Note
 *   that the field names __meta and __extmap are currently reserved and
 *   should not be used when defining your own types.
 * 
 *   Given (deftype TypeName ...), a factory function called ->TypeName
 *   will be defined, taking positional parameters for the fields
 */
cljs.core$macros.deftype = (function cljs$core$macros$deftype(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15667 = arguments.length;
var i__6933__auto___15668 = (0);
while(true){
if((i__6933__auto___15668 < len__6932__auto___15667)){
args__6939__auto__.push((arguments[i__6933__auto___15668]));

var G__15669 = (i__6933__auto___15668 + (1));
i__6933__auto___15668 = G__15669;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.deftype.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.deftype.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,t,fields,impls){
cljs.core$macros.validate_fields("deftype",t,fields);

var env = _AMPERSAND_env;
var r = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(env,cljs.core.cst$kw$locals),t));
var vec__15666 = cljs.core$macros.prepare_protocol_masks(env,impls);
var fpps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15666,(0),null);
var pmasks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15666,(1),null);
var protocols = cljs.core$macros.collect_protocols(impls,env);
var t__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(t,cljs.core.assoc,cljs.core.cst$kw$protocols,protocols,cljs.core.cst$kw$skip_DASH_protocol_DASH_flag,fpps);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$deftype_STAR_),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = fields;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = pmasks;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = ((cljs.core.seq(impls))?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_extend_DASH_type),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$3(t__$1,impls,fields)], 0)))):null);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_getBasis),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$quote),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(fields))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$type),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$ctorStr),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = [cljs.core.str(r)].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$ctorPrWriter),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15658__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15659__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$opt__15660__auto__)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_write),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15659__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = [cljs.core.str(r)].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core$macros.build_positional_factory(t__$1,r,fields);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = t__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.deftype.cljs$lang$maxFixedArity = (4);

cljs.core$macros.deftype.cljs$lang$applyTo = (function (seq15661){
var G__15662 = cljs.core.first(seq15661);
var seq15661__$1 = cljs.core.next(seq15661);
var G__15663 = cljs.core.first(seq15661__$1);
var seq15661__$2 = cljs.core.next(seq15661__$1);
var G__15664 = cljs.core.first(seq15661__$2);
var seq15661__$3 = cljs.core.next(seq15661__$2);
var G__15665 = cljs.core.first(seq15661__$3);
var seq15661__$4 = cljs.core.next(seq15661__$3);
return cljs.core$macros.deftype.cljs$core$IFn$_invoke$arity$variadic(G__15662,G__15663,G__15664,G__15665,seq15661__$4);
});

cljs.core$macros.deftype.cljs$lang$macro = true;
/**
 * Do not use this directly - use defrecord
 */
cljs.core$macros.emit_defrecord = (function cljs$core$macros$emit_defrecord(env,tagname,rname,fields,impls){
var hinted_fields = fields;
var fields__$1 = cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (hinted_fields){
return (function (p1__15670_SHARP_){
return cljs.core.with_meta(p1__15670_SHARP_,null);
});})(hinted_fields))
,fields));
var base_fields = fields__$1;
var pr_open = [cljs.core.str("#"),cljs.core.str(cljs.core.namespace(rname)),cljs.core.str("."),cljs.core.str(cljs.core.name(rname)),cljs.core.str("{")].join('');
var fields__$2 = cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(fields__$1,cljs.core.cst$sym$__meta,cljs.core.array_seq([cljs.core.cst$sym$__extmap,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], 0));
var gs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var ksym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("k");
var impls__$1 = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(impls,new cljs.core.PersistentVector(null, 28, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$IRecord,cljs.core.cst$sym$ICloneable,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_clone),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15671__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = tagname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([fields__$2], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IHash,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_hash),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15672__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_caching_DASH_hash),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15672__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$hash_DASH_imap),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__hash)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IEquiv,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_equiv),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15673__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$other__15674__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$other__15674__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_identical_QMARK_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_constructor),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15673__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_constructor),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$other__15674__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_equiv_DASH_map),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15673__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$other__15674__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IMeta,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_meta),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15675__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__meta)], 0)))),cljs.core.cst$sym$IWithMeta,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_with_DASH_meta),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15676__auto__),(function (){var x__6696__auto__ = gs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = tagname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.replace.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$__meta,gs], null),fields__$2)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$ILookup,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_lookup),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15677__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15678__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_lookup),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15677__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15678__auto__),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_lookup),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15679__auto__),(function (){var x__6696__auto__ = ksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$else__15680__auto__)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_case),(function (){var x__6696__auto__ = ksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2){
return (function (f){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(f),f], null);
});})(gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2))
,cljs.core.array_seq([base_fields], 0)),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_get),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap),cljs.core.array_seq([(function (){var x__6696__auto__ = ksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$else__15680__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$ICounted,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_count),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15681__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__PLUS_),(function (){var x__6696__auto__ = cljs.core.count(base_fields);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_count),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$ICollection,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_conj),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15682__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$entry__15683__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$entry__15683__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_assoc),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15682__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_nth),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$entry__15683__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_nth),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$entry__15683__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(1))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_reduce),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_conj),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15682__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$entry__15683__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IAssociative,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_assoc),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15684__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15685__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = gs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_condp),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_keyword_DASH_identical_QMARK_),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15685__auto__),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2){
return (function (fld){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(fld),cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$new,tagname,cljs.core.replace.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.fromArray([fld,gs,cljs.core.cst$sym$__hash,null], true, false),fields__$2))], null);
});})(gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2))
,cljs.core.array_seq([base_fields], 0)),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = tagname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$__hash,null,cljs.core.cst$sym$__extmap,null], null), null),fields__$2),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_assoc),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15685__auto__),(function (){var x__6696__auto__ = gs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IMap,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_dissoc),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15686__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15687__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_set,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,base_fields)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15687__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_dissoc),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_with_DASH_meta),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_into),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15686__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__meta)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15687__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = tagname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$sym$__hash,null,cljs.core.cst$sym$__extmap,null], null), null),fields__$2),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_not_DASH_empty),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_dissoc),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$k__15687__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$ISeqable,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_seq),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15689__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_concat),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2){
return (function (p1__15688_SHARP_){
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__15688_SHARP_);
return cljs.core._conj((function (){var x__6696__auto____$1 = p1__15688_SHARP_;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core$macros_SLASH_vector);
});})(gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2))
,base_fields)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IIterable,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_iterator),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = gs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$RecordIter$),cljs.core._conj(cljs.core.List.EMPTY,(0)),cljs.core.array_seq([(function (){var x__6696__auto__ = gs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.count(base_fields);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,base_fields)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_iterator),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.cst$sym$IPrintWithWriter,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_pr_DASH_writer),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15691__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15692__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$opts__15693__auto__)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$pr_DASH_pair__15694__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$keyval__15695__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_pr_DASH_sequential_DASH_writer),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15692__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_pr_DASH_writer),cljs.core._conj(cljs.core.List.EMPTY,""),cljs.core._conj(cljs.core.List.EMPTY," "),cljs.core._conj(cljs.core.List.EMPTY,""),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$opts__15693__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$keyval__15695__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_pr_DASH_sequential_DASH_writer),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15692__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$pr_DASH_pair__15694__auto__),(function (){var x__6696__auto__ = pr_open;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,", "),cljs.core._conj(cljs.core.List.EMPTY,"}"),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$opts__15693__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_concat),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2){
return (function (p1__15690_SHARP_){
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(p1__15690_SHARP_);
return cljs.core._conj((function (){var x__6696__auto____$1 = p1__15690_SHARP_;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core$macros_SLASH_vector);
});})(gs,ksym,hinted_fields,fields__$1,base_fields,pr_open,fields__$2))
,base_fields)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$__extmap)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null));
var vec__15697 = cljs.core$macros.prepare_protocol_masks(env,impls__$1);
var fpps = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15697,(0),null);
var pmasks = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15697,(1),null);
var protocols = cljs.core$macros.collect_protocols(impls__$1,env);
var tagname__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(tagname,cljs.core.assoc,cljs.core.cst$kw$protocols,protocols,cljs.core.cst$kw$skip_DASH_protocol_DASH_flag,fpps);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$defrecord_STAR_),(function (){var x__6696__auto__ = tagname__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = hinted_fields;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = pmasks;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_extend_DASH_type),(function (){var x__6696__auto__ = tagname__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core$macros.dt__GT_et.cljs$core$IFn$_invoke$arity$4(tagname__$1,impls__$1,fields__$2,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});
cljs.core$macros.build_map_factory = (function cljs$core$macros$build_map_factory(rsym,rname,fields){
var fn_name = cljs.core.with_meta(cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(cljs.core.cst$sym$map_DASH__GT_),cljs.core.str(rsym)].join('')),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.meta(rsym),cljs.core.cst$kw$factory,cljs.core.cst$kw$map));
var ms = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var ks = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,fields);
var getters = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (fn_name,ms,ks){
return (function (k){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = k;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = ms;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});})(fn_name,ms,ks))
,ks);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defn),(function (){var x__6696__auto__ = fn_name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = ms;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = rname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([getters,cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_dissoc),(function (){var x__6696__auto__ = ms;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([ks], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
/**
 * (defrecord name [fields*]  options* specs*)
 * 
 *   Currently there are no options.
 * 
 *   Each spec consists of a protocol or interface name followed by zero
 *   or more method bodies:
 * 
 *   protocol-or-Object
 *   (methodName [args*] body)*
 * 
 *   The record will have the (immutable) fields named by
 *   fields, which can have type hints. Protocols and methods
 *   are optional. The only methods that can be supplied are those
 *   declared in the protocols.  Note that method bodies are
 *   not closures, the local environment includes only the named fields,
 *   and those fields can be accessed directly.
 * 
 *   Method definitions take the form:
 * 
 *   (methodname [args*] body)
 * 
 *   The argument and return types can be hinted on the arg and
 *   methodname symbols. If not supplied, they will be inferred, so type
 *   hints should be reserved for disambiguation.
 * 
 *   Methods should be supplied for all methods of the desired
 *   protocol(s). You can also define overrides for
 *   methods of Object. Note that a parameter must be supplied to
 *   correspond to the target object ('this' in JavaScript parlance). Note also
 *   that recur calls to the method head should *not* pass the target object, it
 *   will be supplied automatically and can not be substituted.
 * 
 *   In the method bodies, the (unqualified) name can be used to name the
 *   class (for calls to new, instance? etc).
 * 
 *   The type will have implementations of several ClojureScript
 *   protocol generated automatically: IMeta/IWithMeta (metadata support) and
 *   IMap, etc.
 * 
 *   In addition, defrecord will define type-and-value-based =,
 *   and will define ClojureScript IHash and IEquiv.
 * 
 *   Two constructors will be defined, one taking the designated fields
 *   followed by a metadata map (nil for none) and an extension field
 *   map (nil for none), and one taking only the fields (using nil for
 *   meta and extension fields). Note that the field names __meta
 *   and __extmap are currently reserved and should not be used when
 *   defining your own records.
 * 
 *   Given (defrecord TypeName ...), two factory functions will be
 *   defined: ->TypeName, taking positional parameters for the fields,
 *   and map->TypeName, taking a map of keywords to field values.
 */
cljs.core$macros.defrecord = (function cljs$core$macros$defrecord(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15705 = arguments.length;
var i__6933__auto___15706 = (0);
while(true){
if((i__6933__auto___15706 < len__6932__auto___15705)){
args__6939__auto__.push((arguments[i__6933__auto___15706]));

var G__15707 = (i__6933__auto___15706 + (1));
i__6933__auto___15706 = G__15707;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.defrecord.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.defrecord.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,rsym,fields,impls){
cljs.core$macros.validate_fields("defrecord",rsym,fields);

var rsym__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(rsym,cljs.core.assoc,cljs.core.cst$kw$internal_DASH_ctor,true);
var r = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,cljs.core.cst$kw$locals),rsym__$1)),cljs.core.assoc,cljs.core.cst$kw$internal_DASH_ctor,true);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.emit_defrecord(_AMPERSAND_env,rsym__$1,r,fields,impls);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_getBasis),(function (){var x__6696__auto__ = r;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$quote),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(fields))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$type),(function (){var x__6696__auto__ = r;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$ctorPrSeq),(function (){var x__6696__auto__ = r;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15698__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_list),(function (){var x__6696__auto__ = [cljs.core.str(r)].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_cljs$lang$ctorPrWriter),(function (){var x__6696__auto__ = r;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__15698__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15699__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_write),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$writer__15699__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = [cljs.core.str(r)].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core$macros.build_positional_factory(rsym__$1,r,fields);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core$macros.build_map_factory(rsym__$1,r,fields);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = r;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.defrecord.cljs$lang$maxFixedArity = (4);

cljs.core$macros.defrecord.cljs$lang$applyTo = (function (seq15700){
var G__15701 = cljs.core.first(seq15700);
var seq15700__$1 = cljs.core.next(seq15700);
var G__15702 = cljs.core.first(seq15700__$1);
var seq15700__$2 = cljs.core.next(seq15700__$1);
var G__15703 = cljs.core.first(seq15700__$2);
var seq15700__$3 = cljs.core.next(seq15700__$2);
var G__15704 = cljs.core.first(seq15700__$3);
var seq15700__$4 = cljs.core.next(seq15700__$3);
return cljs.core$macros.defrecord.cljs$core$IFn$_invoke$arity$variadic(G__15701,G__15702,G__15703,G__15704,seq15700__$4);
});

cljs.core$macros.defrecord.cljs$lang$macro = true;
/**
 * A protocol is a named set of named methods and their signatures:
 * 
 *   (defprotocol AProtocolName
 *  ;optional doc string
 *  "A doc string for AProtocol abstraction"
 * 
 *   ;method signatures
 *  (bar [this a b] "bar docs")
 *  (baz [this a] [this a b] [this a b c] "baz docs"))
 * 
 *   No implementations are provided. Docs can be specified for the
 *   protocol overall and for each method. The above yields a set of
 *   polymorphic functions and a protocol object. All are
 *   namespace-qualified by the ns enclosing the definition The resulting
 *   functions dispatch on the type of their first argument, which is
 *   required and corresponds to the implicit target object ('this' in
 *   JavaScript parlance). defprotocol is dynamic, has no special compile-time
 *   effect, and defines no new types.
 * 
 *   (defprotocol P
 *  (foo [this])
 *  (bar-me [this] [this y]))
 * 
 *   (deftype Foo [a b c]
 *  P
 *  (foo [this] a)
 *  (bar-me [this] b)
 *  (bar-me [this y] (+ c y)))
 * 
 *   (bar-me (Foo. 1 2 3) 42)
 *   => 45
 * 
 *   (foo
 *  (let [x 42]
 *    (reify P
 *      (foo [this] 17)
 *      (bar-me [this] x)
 *      (bar-me [this y] x))))
 *   => 17
 */
cljs.core$macros.defprotocol = (function cljs$core$macros$defprotocol(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15725 = arguments.length;
var i__6933__auto___15726 = (0);
while(true){
if((i__6933__auto___15726 < len__6932__auto___15725)){
args__6939__auto__.push((arguments[i__6933__auto___15726]));

var G__15727 = (i__6933__auto___15726 + (1));
i__6933__auto___15726 = G__15727;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.defprotocol.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.defprotocol.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,psym,doc_PLUS_methods){
var p = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,cljs.core.cst$kw$locals),psym));
var vec__15714 = ((typeof cljs.core.first(doc_PLUS_methods) === 'string')?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(doc_PLUS_methods),cljs.core.next(doc_PLUS_methods)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,doc_PLUS_methods], null));
var doc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15714,(0),null);
var methods$ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15714,(1),null);
var psym__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(psym,cljs.core.assoc,cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$protocol_DASH_symbol,true);
var ns_name = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(_AMPERSAND_env));
var fqn = ((function (p,vec__15714,doc,methods$,psym__$1,ns_name){
return (function (n){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(ns_name),cljs.core.str("."),cljs.core.str(n)].join(''));
});})(p,vec__15714,doc,methods$,psym__$1,ns_name))
;
var prefix = cljs.core$macros.protocol_prefix(p);
var _ = (function (){var seq__15715 = cljs.core.seq(methods$);
var chunk__15716 = null;
var count__15717 = (0);
var i__15718 = (0);
while(true){
if((i__15718 < count__15717)){
var vec__15719 = chunk__15716.cljs$core$IIndexed$_nth$arity$2(null,i__15718);
var mname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15719,(0),null);
var arities = cljs.core.nthnext(vec__15719,(1));
if(cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [(0),null], null), null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.vector_QMARK_,arities))))){
throw (new Error([cljs.core.str("Invalid protocol, "),cljs.core.str(psym__$1),cljs.core.str(" defines method "),cljs.core.str(mname),cljs.core.str(" with arity 0")].join('')));
} else {
}

var G__15728 = seq__15715;
var G__15729 = chunk__15716;
var G__15730 = count__15717;
var G__15731 = (i__15718 + (1));
seq__15715 = G__15728;
chunk__15716 = G__15729;
count__15717 = G__15730;
i__15718 = G__15731;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq(seq__15715);
if(temp__4657__auto__){
var seq__15715__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__15715__$1)){
var c__6673__auto__ = cljs.core.chunk_first(seq__15715__$1);
var G__15732 = cljs.core.chunk_rest(seq__15715__$1);
var G__15733 = c__6673__auto__;
var G__15734 = cljs.core.count(c__6673__auto__);
var G__15735 = (0);
seq__15715 = G__15732;
chunk__15716 = G__15733;
count__15717 = G__15734;
i__15718 = G__15735;
continue;
} else {
var vec__15720 = cljs.core.first(seq__15715__$1);
var mname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15720,(0),null);
var arities = cljs.core.nthnext(vec__15720,(1));
if(cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [(0),null], null), null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.vector_QMARK_,arities))))){
throw (new Error([cljs.core.str("Invalid protocol, "),cljs.core.str(psym__$1),cljs.core.str(" defines method "),cljs.core.str(mname),cljs.core.str(" with arity 0")].join('')));
} else {
}

var G__15736 = cljs.core.next(seq__15715__$1);
var G__15737 = null;
var G__15738 = (0);
var G__15739 = (0);
seq__15715 = G__15736;
chunk__15716 = G__15737;
count__15717 = G__15738;
i__15718 = G__15739;
continue;
}
} else {
return null;
}
}
break;
}
})();
var expand_sig = ((function (p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_){
return (function (fname,slot,sig){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = sig;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(slot)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = slot;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),sig], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15708__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aget),(function (){var x__6696__auto__ = fqn(fname);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$goog_SLASH_typeOf),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15708__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__),sig)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aget),(function (){var x__6696__auto__ = fqn(fname);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,"_")], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$m__15709__auto__),sig)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_missing_DASH_protocol),(function (){var x__6696__auto__ = [cljs.core.str(psym__$1),cljs.core.str("."),cljs.core.str(fname)].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.first(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});})(p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_))
;
var psym__$2 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$5(psym__$1,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$jsdoc], null),cljs.core.conj,"@interface"),cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$protocol_DASH_info,cljs.core.cst$kw$methods], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig){
return (function (p__15721){
var vec__15722 = p__15721;
var fname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15722,(0),null);
var sigs = cljs.core.nthnext(vec__15722,(1));
var doc__$1 = (function (){var doc__$1 = cljs.core.last(sigs);
if(typeof doc__$1 === 'string'){
return doc__$1;
} else {
return null;
}
})();
var sigs__$1 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.vector_QMARK_,sigs);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(fname,cljs.core.assoc,cljs.core.cst$kw$doc,doc__$1),cljs.core.vec(sigs__$1)], null);
});})(p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig))
,methods$)));
var method = ((function (p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig,psym__$2){
return (function (p__15723){
var vec__15724 = p__15723;
var fname = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15724,(0),null);
var sigs = cljs.core.nthnext(vec__15724,(1));
var doc__$1 = (function (){var doc__$1 = cljs.core.last(sigs);
if(typeof doc__$1 === 'string'){
return doc__$1;
} else {
return null;
}
})();
var sigs__$1 = cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(cljs.core.vector_QMARK_,sigs);
var amp = (cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,sigs__$1)))?cljs.analyzer.warning(cljs.core.cst$kw$protocol_DASH_with_DASH_variadic_DASH_method,_AMPERSAND_env,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$protocol,psym__$2,cljs.core.cst$kw$name,fname], null)):null);
var slot = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(prefix),cljs.core.str(cljs.core.name(fname))].join(''));
var fname__$1 = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(fname,cljs.core.assoc,cljs.core.cst$kw$protocol,p,cljs.core.cst$kw$doc,doc__$1);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defn),(function (){var x__6696__auto__ = fname__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (doc__$1,sigs__$1,amp,slot,fname__$1,vec__15724,fname,sigs,p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig,psym__$2){
return (function (sig){
return expand_sig(fname__$1,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(slot),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count(sig))].join('')),sig);
});})(doc__$1,sigs__$1,amp,slot,fname__$1,vec__15724,fname,sigs,p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig,psym__$2))
,sigs__$1)], 0))));
});})(p,vec__15714,doc,methods$,psym__$1,ns_name,fqn,prefix,_,expand_sig,psym__$2))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$def),(function (){var x__6696__auto__ = psym__$2;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_STAR_),cljs.core._conj(cljs.core.List.EMPTY,"function(){}"))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(method,methods$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.defprotocol.cljs$lang$maxFixedArity = (3);

cljs.core$macros.defprotocol.cljs$lang$applyTo = (function (seq15710){
var G__15711 = cljs.core.first(seq15710);
var seq15710__$1 = cljs.core.next(seq15710);
var G__15712 = cljs.core.first(seq15710__$1);
var seq15710__$2 = cljs.core.next(seq15710__$1);
var G__15713 = cljs.core.first(seq15710__$2);
var seq15710__$3 = cljs.core.next(seq15710__$2);
return cljs.core$macros.defprotocol.cljs$core$IFn$_invoke$arity$variadic(G__15711,G__15712,G__15713,seq15710__$3);
});

cljs.core$macros.defprotocol.cljs$lang$macro = true;
/**
 * EXPERIMENTAL
 */
cljs.core$macros.implements_QMARK_ = (function cljs$core$macros$implements_QMARK_(_AMPERSAND_form,_AMPERSAND_env,psym,x){
var p = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,cljs.core.cst$kw$locals),psym));
var prefix = cljs.core$macros.protocol_prefix(p);
var xsym = cljs.core$macros.bool_expr(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var vec__15741 = (cljs.core$macros.fast_path_protocols.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.fast_path_protocols.cljs$core$IFn$_invoke$arity$1(p) : cljs.core$macros.fast_path_protocols.call(null,p));
var part = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15741,(0),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15741,(1),null);
var msym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-cljs$lang$protocol_mask$partition"),cljs.core.str(part),cljs.core.str("$")].join(''));
if(!((x instanceof cljs.core.Symbol))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_or),(function (){var x__6696__auto__ = (cljs.core.truth_(bit)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = bit;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))):false);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(prefix)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_or),(function (){var x__6696__auto__ = (cljs.core.truth_(bit)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = bit;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))):false);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(prefix)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
}
});

cljs.core$macros.implements_QMARK_.cljs$lang$macro = true;
/**
 * Returns true if x satisfies the protocol
 */
cljs.core$macros.satisfies_QMARK_ = (function cljs$core$macros$satisfies_QMARK_(_AMPERSAND_form,_AMPERSAND_env,psym,x){
var p = cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,cljs.core.cst$kw$locals),psym));
var prefix = cljs.core$macros.protocol_prefix(p);
var xsym = cljs.core$macros.bool_expr(cljs.core.gensym.cljs$core$IFn$_invoke$arity$0());
var vec__15743 = (cljs.core$macros.fast_path_protocols.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.fast_path_protocols.cljs$core$IFn$_invoke$arity$1(p) : cljs.core$macros.fast_path_protocols.call(null,p));
var part = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15743,(0),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15743,(1),null);
var msym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-cljs$lang$protocol_mask$partition"),cljs.core.str(part),cljs.core.str("$")].join(''));
if(!((x instanceof cljs.core.Symbol))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_or),(function (){var x__6696__auto__ = (cljs.core.truth_(bit)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = bit;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))):false);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(prefix)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_coercive_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_native_DASH_satisfies_QMARK_),(function (){var x__6696__auto__ = psym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_native_DASH_satisfies_QMARK_),(function (){var x__6696__auto__ = psym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = xsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_nil_QMARK_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_or),(function (){var x__6696__auto__ = (cljs.core.truth_(bit)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unsafe_DASH_bit_DASH_and),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = bit;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))):false);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.bool_expr(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(prefix)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_coercive_DASH_not),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = msym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_native_DASH_satisfies_QMARK_),(function (){var x__6696__auto__ = psym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_native_DASH_satisfies_QMARK_),(function (){var x__6696__auto__ = psym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.satisfies_QMARK_.cljs$lang$macro = true;
/**
 * Takes a body of expressions that returns an ISeq or nil, and yields
 *   a ISeqable object that will invoke the body only the first time seq
 *   is called, and will cache the result and return it on all subsequent
 *   seq calls.
 */
cljs.core$macros.lazy_seq = (function cljs$core$macros$lazy_seq(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15747 = arguments.length;
var i__6933__auto___15748 = (0);
while(true){
if((i__6933__auto___15748 < len__6932__auto___15747)){
args__6939__auto__.push((arguments[i__6933__auto___15748]));

var G__15749 = (i__6933__auto___15748 + (1));
i__6933__auto___15748 = G__15749;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.lazy_seq.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.lazy_seq.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_LazySeq),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.lazy_seq.cljs$lang$maxFixedArity = (2);

cljs.core$macros.lazy_seq.cljs$lang$applyTo = (function (seq15744){
var G__15745 = cljs.core.first(seq15744);
var seq15744__$1 = cljs.core.next(seq15744);
var G__15746 = cljs.core.first(seq15744__$1);
var seq15744__$2 = cljs.core.next(seq15744__$1);
return cljs.core$macros.lazy_seq.cljs$core$IFn$_invoke$arity$variadic(G__15745,G__15746,seq15744__$2);
});

cljs.core$macros.lazy_seq.cljs$lang$macro = true;
/**
 * Takes a body of expressions and yields a Delay object that will
 *   invoke the body only the first time it is forced (with force or deref/@), and
 *   will cache the result and return it on all subsequent force
 *   calls.
 */
cljs.core$macros.delay = (function cljs$core$macros$delay(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15753 = arguments.length;
var i__6933__auto___15754 = (0);
while(true){
if((i__6933__auto___15754 < len__6932__auto___15753)){
args__6939__auto__.push((arguments[i__6933__auto___15754]));

var G__15755 = (i__6933__auto___15754 + (1));
i__6933__auto___15754 = G__15755;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.delay.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.delay.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_Delay),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
});

cljs.core$macros.delay.cljs$lang$maxFixedArity = (2);

cljs.core$macros.delay.cljs$lang$applyTo = (function (seq15750){
var G__15751 = cljs.core.first(seq15750);
var seq15750__$1 = cljs.core.next(seq15750);
var G__15752 = cljs.core.first(seq15750__$1);
var seq15750__$2 = cljs.core.next(seq15750__$1);
return cljs.core$macros.delay.cljs$core$IFn$_invoke$arity$variadic(G__15751,G__15752,seq15750__$2);
});

cljs.core$macros.delay.cljs$lang$macro = true;
/**
 * binding => var-symbol temp-value-expr
 * 
 *   Temporarily redefines vars while executing the body.  The
 *   temp-value-exprs will be evaluated and each resulting value will
 *   replace in parallel the root value of its var.  After the body is
 *   executed, the root values of all the vars will be set back to their
 *   old values. Useful for mocking out functions during testing.
 */
cljs.core$macros.with_redefs = (function cljs$core$macros$with_redefs(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15762 = arguments.length;
var i__6933__auto___15763 = (0);
while(true){
if((i__6933__auto___15763 < len__6932__auto___15762)){
args__6939__auto__.push((arguments[i__6933__auto___15763]));

var G__15764 = (i__6933__auto___15763 + (1));
i__6933__auto___15763 = G__15764;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.with_redefs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.with_redefs.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
var names = cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),bindings);
var vals = cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),bindings));
var tempnames = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.gensym,cljs.core.name),names);
var binds = cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,names,vals);
var resets = cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,names,tempnames));
var bind_value = ((function (names,vals,tempnames,binds,resets){
return (function (p__15760){
var vec__15761 = p__15760;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15761,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15761,(1),null);
return cljs.core._conj((function (){var x__6696__auto__ = k;
return cljs.core._conj((function (){var x__6696__auto____$1 = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$set_BANG_);
});})(names,vals,tempnames,binds,resets))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(tempnames,names)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(bind_value,binds),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$try),body,cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$finally),cljs.core.map.cljs$core$IFn$_invoke$arity$2(bind_value,resets))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.with_redefs.cljs$lang$maxFixedArity = (3);

cljs.core$macros.with_redefs.cljs$lang$applyTo = (function (seq15756){
var G__15757 = cljs.core.first(seq15756);
var seq15756__$1 = cljs.core.next(seq15756);
var G__15758 = cljs.core.first(seq15756__$1);
var seq15756__$2 = cljs.core.next(seq15756__$1);
var G__15759 = cljs.core.first(seq15756__$2);
var seq15756__$3 = cljs.core.next(seq15756__$2);
return cljs.core$macros.with_redefs.cljs$core$IFn$_invoke$arity$variadic(G__15757,G__15758,G__15759,seq15756__$3);
});

cljs.core$macros.with_redefs.cljs$lang$macro = true;
/**
 * binding => var-symbol init-expr
 * 
 *   Creates new bindings for the (already-existing) vars, with the
 *   supplied initial values, executes the exprs in an implicit do, then
 *   re-establishes the bindings that existed before.  The new bindings
 *   are made in parallel (unlike let); all init-exprs are evaluated
 *   before the vars are bound to their new values.
 */
cljs.core$macros.binding = (function cljs$core$macros$binding(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15769 = arguments.length;
var i__6933__auto___15770 = (0);
while(true){
if((i__6933__auto___15770 < len__6932__auto___15769)){
args__6939__auto__.push((arguments[i__6933__auto___15770]));

var G__15771 = (i__6933__auto___15770 + (1));
i__6933__auto___15770 = G__15771;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.binding.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.binding.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
var names = cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),bindings);
cljs.analyzer.confirm_bindings(_AMPERSAND_env,names);

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_with_DASH_redefs),(function (){var x__6696__auto__ = bindings;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
});

cljs.core$macros.binding.cljs$lang$maxFixedArity = (3);

cljs.core$macros.binding.cljs$lang$applyTo = (function (seq15765){
var G__15766 = cljs.core.first(seq15765);
var seq15765__$1 = cljs.core.next(seq15765);
var G__15767 = cljs.core.first(seq15765__$1);
var seq15765__$2 = cljs.core.next(seq15765__$1);
var G__15768 = cljs.core.first(seq15765__$2);
var seq15765__$3 = cljs.core.next(seq15765__$2);
return cljs.core$macros.binding.cljs$core$IFn$_invoke$arity$variadic(G__15766,G__15767,G__15768,seq15765__$3);
});

cljs.core$macros.binding.cljs$lang$macro = true;
/**
 * Takes a binary predicate, an expression, and a set of clauses.
 *   Each clause can take the form of either:
 * 
 *   test-expr result-expr
 * 
 *   test-expr :>> result-fn
 * 
 *   Note :>> is an ordinary keyword.
 * 
 *   For each clause, (pred test-expr expr) is evaluated. If it returns
 *   logical true, the clause is a match. If a binary clause matches, the
 *   result-expr is returned, if a ternary clause matches, its result-fn,
 *   which must be a unary function, is called with the result of the
 *   predicate as its argument, the result of that call being the return
 *   value of condp. A single default expression can follow the clauses,
 *   and its value will be returned if no clause matches. If no default
 *   expression is provided and no clause matches, an
 *   IllegalArgumentException is thrown.
 */
cljs.core$macros.condp = (function cljs$core$macros$condp(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15782 = arguments.length;
var i__6933__auto___15783 = (0);
while(true){
if((i__6933__auto___15783 < len__6932__auto___15782)){
args__6939__auto__.push((arguments[i__6933__auto___15783]));

var G__15784 = (i__6933__auto___15783 + (1));
i__6933__auto___15783 = G__15784;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.condp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.condp.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,pred,expr,clauses){
var gpred = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("pred__");
var gexpr = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("expr__");
var emit = ((function (gpred,gexpr){
return (function cljs$core$macros$emit(pred__$1,expr__$1,args){
var vec__15780 = cljs.core.split_at(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$_GT__GT_,cljs.core.second(args)))?(3):(2)),args);
var vec__15781 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15780,(0),null);
var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15781,(0),null);
var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15781,(1),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15781,(2),null);
var clause = vec__15781;
var more = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15780,(1),null);
var n = cljs.core.count(clause);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),n)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"No matching clause: "),cljs.core.array_seq([(function (){var x__6696__auto__ = expr__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),n)){
return a;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((2),n)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = pred__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = expr__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = b;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs$core$macros$emit(pred__$1,expr__$1,more);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_if_DASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$p__15772__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = pred__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = expr__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$p__15772__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs$core$macros$emit(pred__$1,expr__$1,more);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));

}
}
}
});})(gpred,gexpr))
;
var gres = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("res__");
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = gpred;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = pred;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = gexpr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = emit(gpred,gexpr,clauses);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.condp.cljs$lang$maxFixedArity = (4);

cljs.core$macros.condp.cljs$lang$applyTo = (function (seq15773){
var G__15774 = cljs.core.first(seq15773);
var seq15773__$1 = cljs.core.next(seq15773);
var G__15775 = cljs.core.first(seq15773__$1);
var seq15773__$2 = cljs.core.next(seq15773__$1);
var G__15776 = cljs.core.first(seq15773__$2);
var seq15773__$3 = cljs.core.next(seq15773__$2);
var G__15777 = cljs.core.first(seq15773__$3);
var seq15773__$4 = cljs.core.next(seq15773__$3);
return cljs.core$macros.condp.cljs$core$IFn$_invoke$arity$variadic(G__15774,G__15775,G__15776,G__15777,seq15773__$4);
});

cljs.core$macros.condp.cljs$lang$macro = true;
cljs.core$macros.assoc_test = (function cljs$core$macros$assoc_test(m,test,expr,env){
if(cljs.core.contains_QMARK_(m,test)){
throw (new Error([cljs.core.str("Duplicate case test constant '"),cljs.core.str(test),cljs.core.str("'"),cljs.core.str((cljs.core.truth_(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env))?[cljs.core.str(" on line "),cljs.core.str(cljs.core.cst$kw$line.cljs$core$IFn$_invoke$arity$1(env)),cljs.core.str(" "),cljs.core.str(cljs.analyzer._STAR_cljs_file_STAR_)].join(''):null))].join('')));
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,test,expr);
}
});
cljs.core$macros.const_QMARK_ = (function cljs$core$macros$const_QMARK_(env,x){
var m = (function (){var and__5850__auto__ = cljs.core.list_QMARK_(x);
if(and__5850__auto__){
return cljs.analyzer.resolve_var.cljs$core$IFn$_invoke$arity$2(env,cljs.core.last(x));
} else {
return and__5850__auto__;
}
})();
if(cljs.core.truth_(m)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,cljs.core.cst$kw$const);
} else {
return null;
}
});
/**
 * Takes an expression, and a set of clauses.
 * 
 *   Each clause can take the form of either:
 * 
 *   test-constant result-expr
 * 
 *   (test-constant1 ... test-constantN)  result-expr
 * 
 *   The test-constants are not evaluated. They must be compile-time
 *   literals, and need not be quoted.  If the expression is equal to a
 *   test-constant, the corresponding result-expr is returned. A single
 *   default expression can follow the clauses, and its value will be
 *   returned if no clause matches. If no default expression is provided
 *   and no clause matches, an Error is thrown.
 * 
 *   Unlike cond and condp, case does a constant-time dispatch, the
 *   clauses are not considered sequentially.  All manner of constant
 *   expressions are acceptable in case, including numbers, strings,
 *   symbols, keywords, and (ClojureScript) composites thereof. Note that since
 *   lists are used to group multiple constants that map to the same
 *   expression, a vector can be used to match a list if needed. The
 *   test-constants need not be all of the same type.
 */
cljs.core$macros.case$ = (function cljs$core$macros$case(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15799 = arguments.length;
var i__6933__auto___15800 = (0);
while(true){
if((i__6933__auto___15800 < len__6932__auto___15799)){
args__6939__auto__.push((arguments[i__6933__auto___15800]));

var G__15801 = (i__6933__auto___15800 + (1));
i__6933__auto___15800 = G__15801;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.case$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.case$.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,e,clauses){
var default$ = ((cljs.core.odd_QMARK_(cljs.core.count(clauses)))?cljs.core.last(clauses):cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"No matching clause: "),cljs.core.array_seq([(function (){var x__6696__auto__ = e;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
var env = _AMPERSAND_env;
var pairs = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (default$,env){
return (function (m,p__15793){
var vec__15794 = p__15793;
var test = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15794,(0),null);
var expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15794,(1),null);
if(cljs.core.seq_QMARK_(test)){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (vec__15794,test,expr,default$,env){
return (function (m__$1,test__$1){
var test__$2 = (((test__$1 instanceof cljs.core.Symbol))?cljs.core._conj((function (){var x__6696__auto__ = test__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$quote):test__$1);
return cljs.core$macros.assoc_test(m__$1,test__$2,expr,env);
});})(vec__15794,test,expr,default$,env))
,m,test);
} else {
if((test instanceof cljs.core.Symbol)){
return cljs.core$macros.assoc_test(m,cljs.core._conj((function (){var x__6696__auto__ = test;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$quote),expr,env);
} else {
return cljs.core$macros.assoc_test(m,test,expr,env);

}
}
});})(default$,env))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),clauses));
var esym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$0();
var tests = cljs.core.keys(pairs);
if(cljs.core.every_QMARK_(cljs.core.some_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.number_QMARK_,cljs.core.string_QMARK_,cljs.core.fnil.cljs$core$IFn$_invoke$arity$2(cljs.core.char_QMARK_,cljs.core.cst$kw$nonchar),cljs.core.array_seq([((function (default$,env,pairs,esym,tests){
return (function (p1__15785_SHARP_){
return cljs.core$macros.const_QMARK_(env,p1__15785_SHARP_);
});})(default$,env,pairs,esym,tests))
], 0)),tests)){
var no_default = ((cljs.core.odd_QMARK_(cljs.core.count(clauses)))?cljs.core.butlast(clauses):clauses);
var tests__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (no_default,default$,env,pairs,esym,tests){
return (function (p1__15786_SHARP_){
if(cljs.core.seq_QMARK_(p1__15786_SHARP_)){
return cljs.core.vec(p1__15786_SHARP_);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15786_SHARP_], null);
}
});})(no_default,default$,env,pairs,esym,tests))
,cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),no_default));
var thens = cljs.core.vec(cljs.core.take_nth.cljs$core$IFn$_invoke$arity$2((2),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((1),no_default)));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = e;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$case_STAR_),(function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = tests__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = thens;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = default$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if(cljs.core.every_QMARK_(cljs.core.keyword_QMARK_,tests)){
var tests__$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (default$,env,pairs,esym,tests){
return (function (p1__15788_SHARP_){
if(cljs.core.seq_QMARK_(p1__15788_SHARP_)){
return cljs.core.vec(p1__15788_SHARP_);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__15788_SHARP_], null);
}
});})(default$,env,pairs,esym,tests))
,cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (default$,env,pairs,esym,tests){
return (function (p1__15787_SHARP_){
return [cljs.core.str(p1__15787_SHARP_)].join('').substring((1));
});})(default$,env,pairs,esym,tests))
,tests)));
var thens = cljs.core.vec(cljs.core.vals(pairs));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_keyword_QMARK_),(function (){var x__6696__auto__ = e;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_fqn),(function (){var x__6696__auto__ = e;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$case_STAR_),(function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = tests__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = thens;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = default$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = e;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_cond),cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (default$,env,pairs,esym,tests){
return (function (p__15797){
var vec__15798 = p__15797;
var m = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15798,(0),null);
var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15798,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__EQ_),(function (){var x__6696__auto__ = m;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = esym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = c;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});})(default$,env,pairs,esym,tests))
,cljs.core.array_seq([pairs], 0)),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$else),(function (){var x__6696__auto__ = default$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));

}
}
});

cljs.core$macros.case$.cljs$lang$maxFixedArity = (3);

cljs.core$macros.case$.cljs$lang$applyTo = (function (seq15789){
var G__15790 = cljs.core.first(seq15789);
var seq15789__$1 = cljs.core.next(seq15789);
var G__15791 = cljs.core.first(seq15789__$1);
var seq15789__$2 = cljs.core.next(seq15789__$1);
var G__15792 = cljs.core.first(seq15789__$2);
var seq15789__$3 = cljs.core.next(seq15789__$2);
return cljs.core$macros.case$.cljs$core$IFn$_invoke$arity$variadic(G__15790,G__15791,G__15792,seq15789__$3);
});

cljs.core$macros.case$.cljs$lang$macro = true;
/**
 * Evaluates expr and throws an exception if it does not evaluate to
 *   logical true.
 */
cljs.core$macros.assert = (function cljs$core$macros$assert(var_args){
var args15802 = [];
var len__6932__auto___15805 = arguments.length;
var i__6933__auto___15806 = (0);
while(true){
if((i__6933__auto___15806 < len__6932__auto___15805)){
args15802.push((arguments[i__6933__auto___15806]));

var G__15807 = (i__6933__auto___15806 + (1));
i__6933__auto___15806 = G__15807;
continue;
} else {
}
break;
}

var G__15804 = args15802.length;
switch (G__15804) {
case 3:
return cljs.core$macros.assert.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.assert.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str((args15802.length - (2)))].join('')));

}
});

cljs.core$macros.assert.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,x){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_not),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = [cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x], 0)))].join('');
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return null;
}
});

cljs.core$macros.assert.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,x,message){
if(cljs.core.truth_(cljs.core._STAR_assert_STAR_)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_not),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"Assert failed: "),cljs.core.array_seq([(function (){var x__6696__auto__ = message;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,"\n"),(function (){var x__6696__auto__ = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([x], 0));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return null;
}
});

cljs.core$macros.assert.cljs$lang$maxFixedArity = 4;

cljs.core$macros.assert.cljs$lang$macro = true;
/**
 * List comprehension. Takes a vector of one or more
 * binding-form/collection-expr pairs, each followed by zero or more
 * modifiers, and yields a lazy sequence of evaluations of expr.
 * Collections are iterated in a nested fashion, rightmost fastest,
 * and nested coll-exprs can refer to bindings created in prior
 * binding-forms.  Supported modifiers are: :let [binding-form expr ...],
 * :while test, :when test.
 * 
 *   (take 100 (for [x (range 100000000) y (range 1000000) :while (< y x)]  [x y]))
 */
cljs.core$macros.for$ = (function cljs$core$macros$for(_AMPERSAND_form,_AMPERSAND_env,seq_exprs,body_expr){
if(cljs.core.vector_QMARK_(seq_exprs)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("for requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.even_QMARK_(cljs.core.count(seq_exprs))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("for requires an even number of forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var to_groups = (function (seq_exprs__$1){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (groups,p__15845){
var vec__15846 = p__15845;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15846,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15846,(1),null);
if((k instanceof cljs.core.Keyword)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(groups),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.peek(groups),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null)));
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(groups,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
}
}),cljs.core.PersistentVector.EMPTY,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),seq_exprs__$1));
});
var err = ((function (to_groups){
return (function() { 
var G__15876__delegate = function (msg){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,msg),cljs.core.PersistentArrayMap.EMPTY);
};
var G__15876 = function (var_args){
var msg = null;
if (arguments.length > 0) {
var G__15877__i = 0, G__15877__a = new Array(arguments.length -  0);
while (G__15877__i < G__15877__a.length) {G__15877__a[G__15877__i] = arguments[G__15877__i + 0]; ++G__15877__i;}
  msg = new cljs.core.IndexedSeq(G__15877__a,0);
} 
return G__15876__delegate.call(this,msg);};
G__15876.cljs$lang$maxFixedArity = 0;
G__15876.cljs$lang$applyTo = (function (arglist__15878){
var msg = cljs.core.seq(arglist__15878);
return G__15876__delegate(msg);
});
G__15876.cljs$core$IFn$_invoke$arity$variadic = G__15876__delegate;
return G__15876;
})()
;})(to_groups))
;
var emit_bind = ((function (to_groups,err){
return (function cljs$core$macros$for_$_emit_bind(p__15847){
var vec__15862 = p__15847;
var vec__15863 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15862,(0),null);
var bind = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15863,(0),null);
var expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15863,(1),null);
var mod_pairs = cljs.core.nthnext(vec__15863,(2));
var vec__15864 = cljs.core.nthnext(vec__15862,(1));
var vec__15865 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15864,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15865,(0),null);
var next_expr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15865,(1),null);
var next_groups = vec__15864;
var giter = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("iter__");
var gxs = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("s__");
var do_mod = ((function (giter,gxs,vec__15862,vec__15863,bind,expr,mod_pairs,vec__15864,vec__15865,_,next_expr,next_groups,to_groups,err){
return (function cljs$core$macros$for_$_emit_bind_$_do_mod(p__15866){
var vec__15869 = p__15866;
var vec__15870 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15869,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15870,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15870,(1),null);
var pair = vec__15870;
var etc = cljs.core.nthnext(vec__15869,(1));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$let)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_mod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$while)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_mod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$when)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_mod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_rest),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if((k instanceof cljs.core.Keyword)){
return err.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Invalid 'for' keyword ",k], 0));
} else {
if(cljs.core.truth_(next_groups)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$iterys__15809__auto__),(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind(next_groups);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$fs__15810__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$iterys__15809__auto__),(function (){var x__6696__auto__ = next_expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$fs__15810__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_concat),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$fs__15810__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = giter;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_rest),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_rest),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_cons),(function (){var x__6696__auto__ = body_expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = giter;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_rest),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));

}
}
}
}
}
});})(giter,gxs,vec__15862,vec__15863,bind,expr,mod_pairs,vec__15864,vec__15865,_,next_expr,next_groups,to_groups,err))
;
if(cljs.core.truth_(next_groups)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = giter;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_lazy_DASH_seq),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_first),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = bind;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = do_mod(mod_pairs);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
var gi = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("i__");
var gb = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("b__");
var do_cmod = ((function (gi,gb,giter,gxs,do_mod,vec__15862,vec__15863,bind,expr,mod_pairs,vec__15864,vec__15865,_,next_expr,next_groups,to_groups,err){
return (function cljs$core$macros$for_$_emit_bind_$_do_cmod(p__15871){
var vec__15874 = p__15871;
var vec__15875 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15874,(0),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15875,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15875,(1),null);
var pair = vec__15875;
var etc = cljs.core.nthnext(vec__15874,(1));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$let)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_cmod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$while)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_cmod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$when)){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs$core$macros$for_$_emit_bind_$_do_cmod(etc);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unchecked_DASH_inc),(function (){var x__6696__auto__ = gi;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
if((k instanceof cljs.core.Keyword)){
return err.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Invalid 'for' keyword ",k], 0));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_append),(function (){var x__6696__auto__ = gb;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = body_expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unchecked_DASH_inc),(function (){var x__6696__auto__ = gi;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));

}
}
}
}
});})(gi,gb,giter,gxs,do_mod,vec__15862,vec__15863,bind,expr,mod_pairs,vec__15864,vec__15865,_,next_expr,next_groups,to_groups,err))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = giter;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_lazy_DASH_seq),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunked_DASH_seq_QMARK_),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15811__auto__),(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_first),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$file),cljs.core._conj(cljs.core.List.EMPTY,"/home/david/ora/rune_cljs/rune_cljs/cljs/core.cljc"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$line),cljs.core._conj(cljs.core.List.EMPTY,2279),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$column),cljs.core._conj(cljs.core.List.EMPTY,52),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_line),cljs.core._conj(cljs.core.List.EMPTY,2279),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_column),cljs.core._conj(cljs.core.List.EMPTY,82),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$tag),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_not_DASH_native)], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$size__15812__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_count),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15811__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = gb;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_buffer),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$size__15812__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_coercive_DASH_boolean),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = gi;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = gi;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$size__15812__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = bind;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_nth),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15811__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = gi;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = do_cmod(mod_pairs);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_cons),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk),(function (){var x__6696__auto__ = gb;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = giter;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_rest),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_cons),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk),(function (){var x__6696__auto__ = gb;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = bind;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_first),(function (){var x__6696__auto__ = gxs;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = do_mod(mod_pairs);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});})(to_groups,err))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$iter__15813__auto__),(function (){var x__6696__auto__ = emit_bind(to_groups(seq_exprs));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$iter__15813__auto__),(function (){var x__6696__auto__ = cljs.core.second(seq_exprs);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.for$.cljs$lang$macro = true;
/**
 * Repeatedly executes body (presumably for side-effects) with
 *   bindings and filtering as provided by "for".  Does not retain
 *   the head of the sequence. Returns nil.
 */
cljs.core$macros.doseq = (function cljs$core$macros$doseq(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15888 = arguments.length;
var i__6933__auto___15889 = (0);
while(true){
if((i__6933__auto___15889 < len__6932__auto___15888)){
args__6939__auto__.push((arguments[i__6933__auto___15889]));

var G__15890 = (i__6933__auto___15889 + (1));
i__6933__auto___15889 = G__15890;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.doseq.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.doseq.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,seq_exprs,body){
if(cljs.core.vector_QMARK_(seq_exprs)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("doseq requires a vector for its binding",cljs.core.PersistentArrayMap.EMPTY);
}

if(cljs.core.even_QMARK_(cljs.core.count(seq_exprs))){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("doseq requires an even number of forms in binding vector",cljs.core.PersistentArrayMap.EMPTY);
}


var err = (function() { 
var G__15891__delegate = function (msg){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,msg),cljs.core.PersistentArrayMap.EMPTY);
};
var G__15891 = function (var_args){
var msg = null;
if (arguments.length > 0) {
var G__15892__i = 0, G__15892__a = new Array(arguments.length -  0);
while (G__15892__i < G__15892__a.length) {G__15892__a[G__15892__i] = arguments[G__15892__i + 0]; ++G__15892__i;}
  msg = new cljs.core.IndexedSeq(G__15892__a,0);
} 
return G__15891__delegate.call(this,msg);};
G__15891.cljs$lang$maxFixedArity = 0;
G__15891.cljs$lang$applyTo = (function (arglist__15893){
var msg = cljs.core.seq(arglist__15893);
return G__15891__delegate(msg);
});
G__15891.cljs$core$IFn$_invoke$arity$variadic = G__15891__delegate;
return G__15891;
})()
;
var step = ((function (err){
return (function cljs$core$macros$step(recform,exprs){
if(cljs.core.not(exprs)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),body)))], null);
} else {
var k = cljs.core.first(exprs);
var v = cljs.core.second(exprs);
var seqsym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("seq__");
var recform__$1 = (((k instanceof cljs.core.Keyword))?recform:cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_next),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core._conj(cljs.core.List.EMPTY,(0)),cljs.core._conj(cljs.core.List.EMPTY,(0))], 0)))));
var steppair = cljs$core$macros$step(recform__$1,cljs.core.nnext(exprs));
var needrec = (steppair.cljs$core$IFn$_invoke$arity$1 ? steppair.cljs$core$IFn$_invoke$arity$1((0)) : steppair.call(null,(0)));
var subform = (steppair.cljs$core$IFn$_invoke$arity$1 ? steppair.cljs$core$IFn$_invoke$arity$1((1)) : steppair.call(null,(1)));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$let)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [needrec,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = subform;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$while)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = subform;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(cljs.core.truth_(needrec)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [recform__$1], null):null)], 0))))], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,cljs.core.cst$kw$when)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = subform;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(cljs.core.truth_(needrec)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [recform__$1], null):null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = recform__$1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null);
} else {
if((k instanceof cljs.core.Keyword)){
return err.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Invalid 'doseq' keyword",k], 0));
} else {
var chunksym = cljs.core.with_meta(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("chunk__"),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$not_DASH_native], null));
var countsym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("count__");
var isym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("i__");
var recform_chunk = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = chunksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = countsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_unchecked_DASH_inc),(function (){var x__6696__auto__ = isym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
var steppair_chunk = cljs$core$macros$step(recform_chunk,cljs.core.nnext(exprs));
var subform_chunk = (steppair_chunk.cljs$core$IFn$_invoke$arity$1 ? steppair_chunk.cljs$core$IFn$_invoke$arity$1((1)) : steppair_chunk.call(null,(1)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = chunksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null),(function (){var x__6696__auto__ = countsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0)),(function (){var x__6696__auto__ = isym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0))], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_coercive_DASH_boolean),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = isym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = countsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = k;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_nth),(function (){var x__6696__auto__ = chunksym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = isym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = subform_chunk;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(cljs.core.truth_(needrec)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [recform_chunk], null):null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when_DASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunked_DASH_seq_QMARK_),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15879__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_first),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_chunk_DASH_rest),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15879__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_count),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$c__15879__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = k;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_first),(function (){var x__6696__auto__ = seqsym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = subform;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(cljs.core.truth_(needrec)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [recform__$1], null):null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null);

}
}
}
}
}
});})(err))
;
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(step(null,cljs.core.seq(seq_exprs)),(1));
});

cljs.core$macros.doseq.cljs$lang$maxFixedArity = (3);

cljs.core$macros.doseq.cljs$lang$applyTo = (function (seq15880){
var G__15881 = cljs.core.first(seq15880);
var seq15880__$1 = cljs.core.next(seq15880);
var G__15882 = cljs.core.first(seq15880__$1);
var seq15880__$2 = cljs.core.next(seq15880__$1);
var G__15883 = cljs.core.first(seq15880__$2);
var seq15880__$3 = cljs.core.next(seq15880__$2);
return cljs.core$macros.doseq.cljs$core$IFn$_invoke$arity$variadic(G__15881,G__15882,G__15883,seq15880__$3);
});

cljs.core$macros.doseq.cljs$lang$macro = true;
cljs.core$macros.array = (function cljs$core$macros$array(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15897 = arguments.length;
var i__6933__auto___15898 = (0);
while(true){
if((i__6933__auto___15898 < len__6932__auto___15897)){
args__6939__auto__.push((arguments[i__6933__auto___15898]));

var G__15899 = (i__6933__auto___15898 + (1));
i__6933__auto___15898 = G__15899;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.array.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.array.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,rest){
var xs_str = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(rest),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("~{}"))));
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$js_STAR_,[cljs.core.str("["),cljs.core.str(xs_str),cljs.core.str("]")].join(''),rest),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$array);
});

cljs.core$macros.array.cljs$lang$maxFixedArity = (2);

cljs.core$macros.array.cljs$lang$applyTo = (function (seq15894){
var G__15895 = cljs.core.first(seq15894);
var seq15894__$1 = cljs.core.next(seq15894);
var G__15896 = cljs.core.first(seq15894__$1);
var seq15894__$2 = cljs.core.next(seq15894__$1);
return cljs.core$macros.array.cljs$core$IFn$_invoke$arity$variadic(G__15895,G__15896,seq15894__$2);
});

cljs.core$macros.array.cljs$lang$macro = true;
cljs.core$macros.make_array = (function cljs$core$macros$make_array(var_args){
var args15903 = [];
var len__6932__auto___15911 = arguments.length;
var i__6933__auto___15912 = (0);
while(true){
if((i__6933__auto___15912 < len__6932__auto___15911)){
args15903.push((arguments[i__6933__auto___15912]));

var G__15913 = (i__6933__auto___15912 + (1));
i__6933__auto___15912 = G__15913;
continue;
} else {
}
break;
}

var G__15910 = args15903.length;
switch (G__15910) {
case 3:
return cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15903.slice((4)),(0),null));
return cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6951__auto__);

}
});

cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$3 = (function (_AMPERSAND_form,_AMPERSAND_env,size){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(((typeof size === 'number')?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),cljs.core.take.cljs$core$IFn$_invoke$arity$2(size,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null))))):cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Array$),(function (){var x__6696__auto__ = size;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())))),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$array);
});

cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$4 = (function (_AMPERSAND_form,_AMPERSAND_env,type,size){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_make_DASH_array),(function (){var x__6696__auto__ = size;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,type,size,more_sizes){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dims__15900__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_list),more_sizes)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dimarray__15901__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_make_DASH_array),(function (){var x__6696__auto__ = size;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_dotimes),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__15902__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dimarray__15901__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dimarray__15901__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__15902__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_apply),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_make_DASH_array),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dims__15900__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$dimarray__15901__auto__)], 0)))),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$array);
});

cljs.core$macros.make_array.cljs$lang$applyTo = (function (seq15904){
var G__15905 = cljs.core.first(seq15904);
var seq15904__$1 = cljs.core.next(seq15904);
var G__15906 = cljs.core.first(seq15904__$1);
var seq15904__$2 = cljs.core.next(seq15904__$1);
var G__15907 = cljs.core.first(seq15904__$2);
var seq15904__$3 = cljs.core.next(seq15904__$2);
var G__15908 = cljs.core.first(seq15904__$3);
var seq15904__$4 = cljs.core.next(seq15904__$3);
return cljs.core$macros.make_array.cljs$core$IFn$_invoke$arity$variadic(G__15905,G__15906,G__15907,G__15908,seq15904__$4);
});

cljs.core$macros.make_array.cljs$lang$maxFixedArity = (4);

cljs.core$macros.make_array.cljs$lang$macro = true;
cljs.core$macros.list = (function cljs$core$macros$list(var_args){
var args15916 = [];
var len__6932__auto___15923 = arguments.length;
var i__6933__auto___15924 = (0);
while(true){
if((i__6933__auto___15924 < len__6932__auto___15923)){
args15916.push((arguments[i__6933__auto___15924]));

var G__15925 = (i__6933__auto___15924 + (1));
i__6933__auto___15924 = G__15925;
continue;
} else {
}
break;
}

var G__15922 = args15916.length;
switch (G__15922) {
case 2:
return cljs.core$macros.list.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15916.slice((3)),(0),null));
return cljs.core$macros.list.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6951__auto__);

}
});

cljs.core$macros.list.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.list(cljs.core.cst$sym$$_DASH_EMPTY,cljs.core.cst$sym$cljs$core_SLASH_List);
});

cljs.core$macros.list.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,x,xs){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$constant,cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,x)))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_conj),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_list),xs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15915__auto__),(function (){var x__6696__auto__ = x;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_conj),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_list),xs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__15915__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.list.cljs$lang$applyTo = (function (seq15917){
var G__15918 = cljs.core.first(seq15917);
var seq15917__$1 = cljs.core.next(seq15917);
var G__15919 = cljs.core.first(seq15917__$1);
var seq15917__$2 = cljs.core.next(seq15917__$1);
var G__15920 = cljs.core.first(seq15917__$2);
var seq15917__$3 = cljs.core.next(seq15917__$2);
return cljs.core$macros.list.cljs$core$IFn$_invoke$arity$variadic(G__15918,G__15919,G__15920,seq15917__$3);
});

cljs.core$macros.list.cljs$lang$maxFixedArity = (3);

cljs.core$macros.list.cljs$lang$macro = true;
cljs.core$macros.vector = (function cljs$core$macros$vector(var_args){
var args15927 = [];
var len__6932__auto___15933 = arguments.length;
var i__6933__auto___15934 = (0);
while(true){
if((i__6933__auto___15934 < len__6932__auto___15933)){
args15927.push((arguments[i__6933__auto___15934]));

var G__15935 = (i__6933__auto___15934 + (1));
i__6933__auto___15934 = G__15935;
continue;
} else {
}
break;
}

var G__15932 = args15927.length;
switch (G__15932) {
case 2:
return cljs.core$macros.vector.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15927.slice((2)),(0),null));
return cljs.core$macros.vector.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6951__auto__);

}
});

cljs.core$macros.vector.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.list(cljs.core.cst$sym$$_DASH_EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentVector);
});

cljs.core$macros.vector.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
var cnt = cljs.core.count(xs);
if((cnt < (32))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentVector$),cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core.array_seq([(function (){var x__6696__auto__ = cnt;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(5)),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_EMPTY_DASH_NODE),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentVector))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),xs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
} else {
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$fromArray),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentVector),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),xs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,true)], 0)))),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_PersistentVector);
}
});

cljs.core$macros.vector.cljs$lang$applyTo = (function (seq15928){
var G__15929 = cljs.core.first(seq15928);
var seq15928__$1 = cljs.core.next(seq15928);
var G__15930 = cljs.core.first(seq15928__$1);
var seq15928__$2 = cljs.core.next(seq15928__$1);
return cljs.core$macros.vector.cljs$core$IFn$_invoke$arity$variadic(G__15929,G__15930,seq15928__$2);
});

cljs.core$macros.vector.cljs$lang$maxFixedArity = (2);

cljs.core$macros.vector.cljs$lang$macro = true;
cljs.core$macros.array_map = (function cljs$core$macros$array_map(var_args){
var args15939 = [];
var len__6932__auto___15945 = arguments.length;
var i__6933__auto___15946 = (0);
while(true){
if((i__6933__auto___15946 < len__6932__auto___15945)){
args15939.push((arguments[i__6933__auto___15946]));

var G__15947 = (i__6933__auto___15946 + (1));
i__6933__auto___15946 = G__15947;
continue;
} else {
}
break;
}

var G__15944 = args15939.length;
switch (G__15944) {
case 2:
return cljs.core$macros.array_map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15939.slice((2)),(0),null));
return cljs.core$macros.array_map.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6951__auto__);

}
});

cljs.core$macros.array_map.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.list(cljs.core.cst$sym$$_DASH_EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentArrayMap);
});

cljs.core$macros.array_map.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,kvs){
var keys = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs));
if((cljs.core.every_QMARK_(((function (keys){
return (function (p1__15937_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__15937_SHARP_),cljs.core.cst$kw$constant);
});})(keys))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (keys){
return (function (p1__15938_SHARP_){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,p1__15938_SHARP_);
});})(keys))
,keys))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count(keys)))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentArrayMap$),cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core.array_seq([(function (){var x__6696__auto__ = (cljs.core.count(kvs) / (2));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),kvs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$fromArray),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentArrayMap),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),kvs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,true),cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
}
});

cljs.core$macros.array_map.cljs$lang$applyTo = (function (seq15940){
var G__15941 = cljs.core.first(seq15940);
var seq15940__$1 = cljs.core.next(seq15940);
var G__15942 = cljs.core.first(seq15940__$1);
var seq15940__$2 = cljs.core.next(seq15940__$1);
return cljs.core$macros.array_map.cljs$core$IFn$_invoke$arity$variadic(G__15941,G__15942,seq15940__$2);
});

cljs.core$macros.array_map.cljs$lang$maxFixedArity = (2);

cljs.core$macros.array_map.cljs$lang$macro = true;
cljs.core$macros.hash_map = (function cljs$core$macros$hash_map(var_args){
var args15949 = [];
var len__6932__auto___15955 = arguments.length;
var i__6933__auto___15956 = (0);
while(true){
if((i__6933__auto___15956 < len__6932__auto___15955)){
args15949.push((arguments[i__6933__auto___15956]));

var G__15957 = (i__6933__auto___15956 + (1));
i__6933__auto___15956 = G__15957;
continue;
} else {
}
break;
}

var G__15954 = args15949.length;
switch (G__15954) {
case 2:
return cljs.core$macros.hash_map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15949.slice((2)),(0),null));
return cljs.core$macros.hash_map.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6951__auto__);

}
});

cljs.core$macros.hash_map.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_EMPTY),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashMap))));
});

cljs.core$macros.hash_map.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,kvs){
var pairs = cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),kvs);
var ks = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,pairs);
var vs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,pairs);
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$fromArrays),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashMap),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),ks)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),vs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashMap);
});

cljs.core$macros.hash_map.cljs$lang$applyTo = (function (seq15950){
var G__15951 = cljs.core.first(seq15950);
var seq15950__$1 = cljs.core.next(seq15950);
var G__15952 = cljs.core.first(seq15950__$1);
var seq15950__$2 = cljs.core.next(seq15950__$1);
return cljs.core$macros.hash_map.cljs$core$IFn$_invoke$arity$variadic(G__15951,G__15952,seq15950__$2);
});

cljs.core$macros.hash_map.cljs$lang$maxFixedArity = (2);

cljs.core$macros.hash_map.cljs$lang$macro = true;
cljs.core$macros.hash_set = (function cljs$core$macros$hash_set(var_args){
var args15961 = [];
var len__6932__auto___15967 = arguments.length;
var i__6933__auto___15968 = (0);
while(true){
if((i__6933__auto___15968 < len__6932__auto___15967)){
args15961.push((arguments[i__6933__auto___15968]));

var G__15969 = (i__6933__auto___15968 + (1));
i__6933__auto___15968 = G__15969;
continue;
} else {
}
break;
}

var G__15966 = args15961.length;
switch (G__15966) {
case 2:
return cljs.core$macros.hash_set.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__6951__auto__ = (new cljs.core.IndexedSeq(args15961.slice((2)),(0),null));
return cljs.core$macros.hash_set.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6951__auto__);

}
});

cljs.core$macros.hash_set.cljs$core$IFn$_invoke$arity$2 = (function (_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_EMPTY),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashSet))));
});

cljs.core$macros.hash_set.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,xs){
if(((cljs.core.count(xs) <= (8))) && (cljs.core.every_QMARK_((function (p1__15959_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$op.cljs$core$IFn$_invoke$arity$1(p1__15959_SHARP_),cljs.core.cst$kw$constant);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15960_SHARP_){
return cljs.analyzer.analyze.cljs$core$IFn$_invoke$arity$2(_AMPERSAND_env,p1__15960_SHARP_);
}),xs))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,xs)),cljs.core.count(xs)))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashSet$),cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentArrayMap$),cljs.core._conj(cljs.core.List.EMPTY,null),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.count(xs);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(xs,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(null)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
} else {
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$fromArray),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashSet),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array),xs)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,true)], 0)))),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_PersistentHashSet);
}
});

cljs.core$macros.hash_set.cljs$lang$applyTo = (function (seq15962){
var G__15963 = cljs.core.first(seq15962);
var seq15962__$1 = cljs.core.next(seq15962);
var G__15964 = cljs.core.first(seq15962__$1);
var seq15962__$2 = cljs.core.next(seq15962__$1);
return cljs.core$macros.hash_set.cljs$core$IFn$_invoke$arity$variadic(G__15963,G__15964,seq15962__$2);
});

cljs.core$macros.hash_set.cljs$lang$maxFixedArity = (2);

cljs.core$macros.hash_set.cljs$lang$macro = true;
cljs.core$macros.js_obj_STAR_ = (function cljs$core$macros$js_obj_STAR_(kvs){
var kvs_str = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(",",cljs.core.take.cljs$core$IFn$_invoke$arity$2(cljs.core.count(kvs),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1("~{}:~{}"))));
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$js_STAR_,[cljs.core.str("{"),cljs.core.str(kvs_str),cljs.core.str("}")].join(''),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,kvs)),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$object);
});
cljs.core$macros.js_obj = (function cljs$core$macros$js_obj(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15980 = arguments.length;
var i__6933__auto___15981 = (0);
while(true){
if((i__6933__auto___15981 < len__6932__auto___15980)){
args__6939__auto__.push((arguments[i__6933__auto___15981]));

var G__15982 = (i__6933__auto___15981 + (1));
i__6933__auto___15981 = G__15982;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.js_obj.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.js_obj.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,rest){
var sym_or_str_QMARK_ = (function (x){
return ((x instanceof cljs.core.Symbol)) || (typeof x === 'string');
});
var filter_on_keys = ((function (sym_or_str_QMARK_){
return (function (f,coll){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (sym_or_str_QMARK_){
return (function (p__15974){
var vec__15975 = p__15974;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15975,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15975,(1),null);
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(k) : f.call(null,k));
});})(sym_or_str_QMARK_))
,coll));
});})(sym_or_str_QMARK_))
;
var kvs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,cljs.core.partition.cljs$core$IFn$_invoke$arity$2((2),rest)));
var sym_pairs = filter_on_keys(cljs.core.symbol_QMARK_,kvs);
var expr__GT_local = cljs.core.zipmap(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(sym_or_str_QMARK_),cljs.core.keys(kvs)),cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym));
var obj = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("obj");
if(cljs.core.empty_QMARK_(rest)){
return cljs.core$macros.js_obj_STAR_(cljs.core.List.EMPTY);
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,clojure.set.map_invert(expr__GT_local)),(function (){var x__6696__auto__ = obj;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.js_obj_STAR_(filter_on_keys(cljs.core.string_QMARK_,kvs));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (sym_or_str_QMARK_,filter_on_keys,kvs,sym_pairs,expr__GT_local,obj){
return (function (p__15976){
var vec__15977 = p__15976;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15977,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15977,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = obj;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = k;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(sym_or_str_QMARK_,filter_on_keys,kvs,sym_pairs,expr__GT_local,obj))
,sym_pairs),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (sym_or_str_QMARK_,filter_on_keys,kvs,sym_pairs,expr__GT_local,obj){
return (function (p__15978){
var vec__15979 = p__15978;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15979,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__15979,(1),null);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = obj;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = v;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(kvs,k);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(sym_or_str_QMARK_,filter_on_keys,kvs,sym_pairs,expr__GT_local,obj))
,expr__GT_local),(function (){var x__6696__auto__ = obj;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});

cljs.core$macros.js_obj.cljs$lang$maxFixedArity = (2);

cljs.core$macros.js_obj.cljs$lang$applyTo = (function (seq15971){
var G__15972 = cljs.core.first(seq15971);
var seq15971__$1 = cljs.core.next(seq15971);
var G__15973 = cljs.core.first(seq15971__$1);
var seq15971__$2 = cljs.core.next(seq15971__$1);
return cljs.core$macros.js_obj.cljs$core$IFn$_invoke$arity$variadic(G__15972,G__15973,seq15971__$2);
});

cljs.core$macros.js_obj.cljs$lang$macro = true;
cljs.core$macros.alength = (function cljs$core$macros$alength(_AMPERSAND_form,_AMPERSAND_env,a){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"~{}.length"),cljs.core.cst$sym$js_STAR_),cljs.core.assoc,cljs.core.cst$kw$tag,cljs.core.cst$sym$number);
});

cljs.core$macros.alength.cljs$lang$macro = true;
/**
 * Maps an expression across an array a, using an index named idx, and
 *   return value named ret, initialized to a clone of a, then setting
 *   each element of ret to the evaluation of expr, returning the new
 *   array ret.
 */
cljs.core$macros.amap = (function cljs$core$macros$amap(_AMPERSAND_form,_AMPERSAND_env,a,idx,ret,expr){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$a__15983__auto__),(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = ret;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_aclone),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$a__15983__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$a__15983__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = ret;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = ret;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.amap.cljs$lang$macro = true;
/**
 * Reduces an expression across an array a, using an index named idx,
 *   and return value named ret, initialized to init, setting ret to the
 *   evaluation of expr at each step, returning ret.
 */
cljs.core$macros.areduce = (function cljs$core$macros$areduce(_AMPERSAND_form,_AMPERSAND_env,a,idx,ret,init,expr){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$a__15984__auto__),(function (){var x__6696__auto__ = a;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0)),cljs.core.array_seq([(function (){var x__6696__auto__ = ret;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = init;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$a__15984__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),(function (){var x__6696__auto__ = idx;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = ret;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.areduce.cljs$lang$macro = true;
/**
 * bindings => name n
 * 
 *   Repeatedly executes body (presumably for side-effects) with name
 *   bound to integers from 0 through n-1.
 */
cljs.core$macros.dotimes = (function cljs$core$macros$dotimes(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15990 = arguments.length;
var i__6933__auto___15991 = (0);
while(true){
if((i__6933__auto___15991 < len__6932__auto___15990)){
args__6939__auto__.push((arguments[i__6933__auto___15991]));

var G__15992 = (i__6933__auto___15991 + (1));
i__6933__auto___15991 = G__15992;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.dotimes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.dotimes.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,body){
var i = cljs.core.first(bindings);
var n = cljs.core.second(bindings);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$n__15985__auto__),(function (){var x__6696__auto__ = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = i;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = i;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$n__15985__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body,(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),(function (){var x__6696__auto__ = i;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.dotimes.cljs$lang$maxFixedArity = (3);

cljs.core$macros.dotimes.cljs$lang$applyTo = (function (seq15986){
var G__15987 = cljs.core.first(seq15986);
var seq15986__$1 = cljs.core.next(seq15986);
var G__15988 = cljs.core.first(seq15986__$1);
var seq15986__$2 = cljs.core.next(seq15986__$1);
var G__15989 = cljs.core.first(seq15986__$2);
var seq15986__$3 = cljs.core.next(seq15986__$2);
return cljs.core$macros.dotimes.cljs$core$IFn$_invoke$arity$variadic(G__15987,G__15988,G__15989,seq15986__$3);
});

cljs.core$macros.dotimes.cljs$lang$macro = true;
/**
 * Throws an exception if the given option map contains keys not listed
 *   as valid, else returns nil.
 */
cljs.core$macros.check_valid_options = (function cljs$core$macros$check_valid_options(var_args){
var args__6939__auto__ = [];
var len__6932__auto___15996 = arguments.length;
var i__6933__auto___15997 = (0);
while(true){
if((i__6933__auto___15997 < len__6932__auto___15996)){
args__6939__auto__.push((arguments[i__6933__auto___15997]));

var G__15998 = (i__6933__auto___15997 + (1));
i__6933__auto___15997 = G__15998;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((1) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((1)),(0),null)):null);
return cljs.core$macros.check_valid_options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__6940__auto__);
});

cljs.core$macros.check_valid_options.cljs$core$IFn$_invoke$arity$variadic = (function (options,valid_keys){
if(cljs.core.seq(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.disj,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_set,cljs.core.keys(options)),valid_keys))){
throw cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.str,"Only these options are valid: ",cljs.core.first(valid_keys),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__15993_SHARP_){
return [cljs.core.str(", "),cljs.core.str(p1__15993_SHARP_)].join('');
}),cljs.core.rest(valid_keys)));
} else {
return null;
}
});

cljs.core$macros.check_valid_options.cljs$lang$maxFixedArity = (1);

cljs.core$macros.check_valid_options.cljs$lang$applyTo = (function (seq15994){
var G__15995 = cljs.core.first(seq15994);
var seq15994__$1 = cljs.core.next(seq15994);
return cljs.core$macros.check_valid_options.cljs$core$IFn$_invoke$arity$variadic(G__15995,seq15994__$1);
});
/**
 * Creates a new multimethod with the associated dispatch function.
 *   The docstring and attribute-map are optional.
 * 
 *   Options are key-value pairs and may be one of:
 *  :default    the default dispatch value, defaults to :default
 *  :hierarchy  the isa? hierarchy to use for dispatching
 *              defaults to the global hierarchy
 */
cljs.core$macros.defmulti = (function cljs$core$macros$defmulti(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16008 = arguments.length;
var i__6933__auto___16009 = (0);
while(true){
if((i__6933__auto___16009 < len__6932__auto___16008)){
args__6939__auto__.push((arguments[i__6933__auto___16009]));

var G__16010 = (i__6933__auto___16009 + (1));
i__6933__auto___16009 = G__16010;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.defmulti.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.defmulti.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,mm_name,options){
var docstring = ((typeof cljs.core.first(options) === 'string')?cljs.core.first(options):null);
var options__$1 = ((typeof cljs.core.first(options) === 'string')?cljs.core.next(options):options);
var m = ((cljs.core.map_QMARK_(cljs.core.first(options__$1)))?cljs.core.first(options__$1):cljs.core.PersistentArrayMap.EMPTY);
var options__$2 = ((cljs.core.map_QMARK_(cljs.core.first(options__$1)))?cljs.core.next(options__$1):options__$1);
var dispatch_fn = cljs.core.first(options__$2);
var options__$3 = cljs.core.next(options__$2);
var m__$1 = (cljs.core.truth_(docstring)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,cljs.core.cst$kw$doc,docstring):m);
var m__$2 = (cljs.core.truth_(cljs.core.meta(mm_name))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(mm_name),m__$1):m__$1);
var mm_ns = [cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(_AMPERSAND_env)))].join('');
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(options__$3),(1))){
throw (new Error("The syntax for defmulti has changed. Example: (defmulti name dispatch-fn :default dispatch-value)"));
} else {
}

var options__$4 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,options__$3);
var default$ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(options__$4,cljs.core.cst$kw$default,cljs.core.cst$kw$default);
cljs.core$macros.check_valid_options.cljs$core$IFn$_invoke$arity$variadic(options__$4,cljs.core.array_seq([cljs.core.cst$kw$default,cljs.core.cst$kw$hierarchy], 0));

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defonce),(function (){var x__6696__auto__ = cljs.core.with_meta(mm_name,m__$2);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$method_DASH_table__15999__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_atom),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$prefer_DASH_table__16000__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_atom),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$method_DASH_cache__16001__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_atom),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cached_DASH_hierarchy__16002__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_atom),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$hierarchy__16003__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_get),(function (){var x__6696__auto__ = options__$4;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$hierarchy),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_get_DASH_global_DASH_hierarchy))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_MultiFn$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_symbol),(function (){var x__6696__auto__ = mm_ns;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.name(mm_name);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = dispatch_fn;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = default$;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$hierarchy__16003__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$method_DASH_table__15999__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$prefer_DASH_table__16000__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$method_DASH_cache__16001__auto__),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cached_DASH_hierarchy__16002__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.defmulti.cljs$lang$maxFixedArity = (3);

cljs.core$macros.defmulti.cljs$lang$applyTo = (function (seq16004){
var G__16005 = cljs.core.first(seq16004);
var seq16004__$1 = cljs.core.next(seq16004);
var G__16006 = cljs.core.first(seq16004__$1);
var seq16004__$2 = cljs.core.next(seq16004__$1);
var G__16007 = cljs.core.first(seq16004__$2);
var seq16004__$3 = cljs.core.next(seq16004__$2);
return cljs.core$macros.defmulti.cljs$core$IFn$_invoke$arity$variadic(G__16005,G__16006,G__16007,seq16004__$3);
});

cljs.core$macros.defmulti.cljs$lang$macro = true;
/**
 * Creates and installs a new method of multimethod associated with dispatch-value. 
 */
cljs.core$macros.defmethod = (function cljs$core$macros$defmethod(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16016 = arguments.length;
var i__6933__auto___16017 = (0);
while(true){
if((i__6933__auto___16017 < len__6932__auto___16016)){
args__6939__auto__.push((arguments[i__6933__auto___16017]));

var G__16018 = (i__6933__auto___16017 + (1));
i__6933__auto___16017 = G__16018;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.defmethod.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.defmethod.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,multifn,dispatch_val,fn_tail){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_add_DASH_method),(function (){var x__6696__auto__ = cljs.core.with_meta(multifn,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$tag,cljs.core.cst$sym$cljs$core_SLASH_MultiFn], null));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = dispatch_val;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),fn_tail)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.defmethod.cljs$lang$maxFixedArity = (4);

cljs.core$macros.defmethod.cljs$lang$applyTo = (function (seq16011){
var G__16012 = cljs.core.first(seq16011);
var seq16011__$1 = cljs.core.next(seq16011);
var G__16013 = cljs.core.first(seq16011__$1);
var seq16011__$2 = cljs.core.next(seq16011__$1);
var G__16014 = cljs.core.first(seq16011__$2);
var seq16011__$3 = cljs.core.next(seq16011__$2);
var G__16015 = cljs.core.first(seq16011__$3);
var seq16011__$4 = cljs.core.next(seq16011__$3);
return cljs.core$macros.defmethod.cljs$core$IFn$_invoke$arity$variadic(G__16012,G__16013,G__16014,G__16015,seq16011__$4);
});

cljs.core$macros.defmethod.cljs$lang$macro = true;
/**
 * Evaluates expr and prints the time it took. Returns the value of expr.
 */
cljs.core$macros.time = (function cljs$core$macros$time(_AMPERSAND_form,_AMPERSAND_env,expr){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$start__16019__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_system_DASH_time))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ret__16020__auto__),(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_prn),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"Elapsed time: "),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$toFixed),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_system_DASH_time))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$start__16019__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(6))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY," msecs")], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ret__16020__auto__)], 0))));
});

cljs.core$macros.time.cljs$lang$macro = true;
/**
 * Runs expr iterations times in the context of a let expression with
 *   the given bindings, then prints out the bindings and the expr
 *   followed by number of iterations and total time. The optional
 *   argument print-fn, defaulting to println, sets function used to
 *   print the result. expr's string representation will be produced
 *   using pr-str in any case.
 */
cljs.core$macros.simple_benchmark = (function cljs$core$macros$simple_benchmark(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16035 = arguments.length;
var i__6933__auto___16036 = (0);
while(true){
if((i__6933__auto___16036 < len__6932__auto___16035)){
args__6939__auto__.push((arguments[i__6933__auto___16036]));

var G__16037 = (i__6933__auto___16036 + (1));
i__6933__auto___16036 = G__16037;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((5) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((5)),(0),null)):null);
return cljs.core$macros.simple_benchmark.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__6940__auto__);
});

cljs.core$macros.simple_benchmark.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,bindings,expr,iterations,p__16032){
var map__16033 = p__16032;
var map__16033__$1 = ((((!((map__16033 == null)))?((((map__16033.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16033.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__16033):map__16033);
var print_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__16033__$1,cljs.core.cst$kw$print_DASH_fn,cljs.core.cst$sym$println);
var bs_str = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([bindings], 0));
var expr_str = cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([expr], 0));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = bindings;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$start__16021__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$getTime),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Date$))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$ret__16022__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_dotimes),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$___16023__auto__),(function (){var x__6696__auto__ = iterations;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = expr;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$end__16024__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$getTime),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Date$))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$elapsed__16025__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$end__16024__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$start__16021__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = print_fn;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_str),(function (){var x__6696__auto__ = bs_str;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,", "),(function (){var x__6696__auto__ = expr_str;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,", "),(function (){var x__6696__auto__ = iterations;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY," runs, "),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$elapsed__16025__auto__),cljs.core._conj(cljs.core.List.EMPTY," msecs")], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.simple_benchmark.cljs$lang$maxFixedArity = (5);

cljs.core$macros.simple_benchmark.cljs$lang$applyTo = (function (seq16026){
var G__16027 = cljs.core.first(seq16026);
var seq16026__$1 = cljs.core.next(seq16026);
var G__16028 = cljs.core.first(seq16026__$1);
var seq16026__$2 = cljs.core.next(seq16026__$1);
var G__16029 = cljs.core.first(seq16026__$2);
var seq16026__$3 = cljs.core.next(seq16026__$2);
var G__16030 = cljs.core.first(seq16026__$3);
var seq16026__$4 = cljs.core.next(seq16026__$3);
var G__16031 = cljs.core.first(seq16026__$4);
var seq16026__$5 = cljs.core.next(seq16026__$4);
return cljs.core$macros.simple_benchmark.cljs$core$IFn$_invoke$arity$variadic(G__16027,G__16028,G__16029,G__16030,G__16031,seq16026__$5);
});

cljs.core$macros.simple_benchmark.cljs$lang$macro = true;
cljs.core$macros.cs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$3(cljs.core.gensym,cljs.core.str,cljs.core.char$),cljs.core.range.cljs$core$IFn$_invoke$arity$2((97),(118))));
cljs.core$macros.gen_apply_to_helper = (function cljs$core$macros$gen_apply_to_helper(var_args){
var args16038 = [];
var len__6932__auto___16045 = arguments.length;
var i__6933__auto___16046 = (0);
while(true){
if((i__6933__auto___16046 < len__6932__auto___16045)){
args16038.push((arguments[i__6933__auto___16046]));

var G__16047 = (i__6933__auto___16046 + (1));
i__6933__auto___16046 = G__16047;
continue;
} else {
}
break;
}

var G__16040 = args16038.length;
switch (G__16040) {
case 0:
return cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16038.length)].join('')));

}
});

cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$1((1));
});

cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$1 = (function (n){
var prop = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-cljs$core$IFn$_invoke$arity$"),cljs.core.str(n)].join(''));
var f = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("cljs$core$IFn$_invoke$arity$"),cljs.core.str(n)].join(''));
if((n <= (20))){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = (function (){var G__16044 = (n - (1));
return (cljs.core$macros.cs.cljs$core$IFn$_invoke$arity$1 ? cljs.core$macros.cs.cljs$core$IFn$_invoke$arity$1(G__16044) : cljs.core$macros.cs.call(null,G__16044));
})();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_first),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_rest),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__EQ__EQ_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argc),cljs.core.array_seq([(function (){var x__6696__auto__ = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$f),cljs.core.array_seq([(function (){var x__6696__auto__ = prop;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$f),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = f;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,cljs.core$macros.cs))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$f),cljs.core.take.cljs$core$IFn$_invoke$arity$2(n,cljs.core$macros.cs))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$1((n + (1)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),cljs.core._conj(cljs.core.List.EMPTY,"Only up to 20 arguments supported on functions"))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
}
});

cljs.core$macros.gen_apply_to_helper.cljs$lang$maxFixedArity = 1;
cljs.core$macros.gen_apply_to = (function cljs$core$macros$gen_apply_to(_AMPERSAND_form,_AMPERSAND_env){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,true)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_defn),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$apply_DASH_to),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$f),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argc),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args)], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$if),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_zero_QMARK_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argc))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$f))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core$macros.gen_apply_to_helper.cljs$core$IFn$_invoke$arity$0();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_STAR_unchecked_DASH_if_STAR_),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,false)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.gen_apply_to.cljs$lang$macro = true;
/**
 * Evaluates exprs in a context in which *print-fn* is bound to .append
 *   on a fresh StringBuffer.  Returns the string created by any nested
 *   printing calls.
 */
cljs.core$macros.with_out_str = (function cljs$core$macros$with_out_str(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16054 = arguments.length;
var i__6933__auto___16055 = (0);
while(true){
if((i__6933__auto___16055 < len__6932__auto___16054)){
args__6939__auto__.push((arguments[i__6933__auto___16055]));

var G__16056 = (i__6933__auto___16055 + (1));
i__6933__auto___16055 = G__16056;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.with_out_str.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.with_out_str.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,body){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sb__16049__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_goog$string$StringBuffer$))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_binding),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__STAR_print_DASH_newline_STAR_),cljs.core._conj(cljs.core.List.EMPTY,true),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__STAR_print_DASH_fn_STAR_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__16050__auto__)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$append),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sb__16049__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$x__16050__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([body], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$sb__16049__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.with_out_str.cljs$lang$maxFixedArity = (2);

cljs.core$macros.with_out_str.cljs$lang$applyTo = (function (seq16051){
var G__16052 = cljs.core.first(seq16051);
var seq16051__$1 = cljs.core.next(seq16051);
var G__16053 = cljs.core.first(seq16051__$1);
var seq16051__$2 = cljs.core.next(seq16051__$1);
return cljs.core$macros.with_out_str.cljs$core$IFn$_invoke$arity$variadic(G__16052,G__16053,seq16051__$2);
});

cljs.core$macros.with_out_str.cljs$lang$macro = true;
/**
 * Expands to code which yields a lazy sequence of the concatenation
 *   of the supplied colls.  Each coll expr is not evaluated until it is
 *   needed.
 * 
 *   (lazy-cat xs ys zs) === (concat (lazy-seq xs) (lazy-seq ys) (lazy-seq zs))
 */
cljs.core$macros.lazy_cat = (function cljs$core$macros$lazy_cat(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16061 = arguments.length;
var i__6933__auto___16062 = (0);
while(true){
if((i__6933__auto___16062 < len__6932__auto___16061)){
args__6939__auto__.push((arguments[i__6933__auto___16062]));

var G__16063 = (i__6933__auto___16062 + (1));
i__6933__auto___16062 = G__16063;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((2) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((2)),(0),null)):null);
return cljs.core$macros.lazy_cat.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__6940__auto__);
});

cljs.core$macros.lazy_cat.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,colls){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_concat),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__16057_SHARP_){
return cljs.core._conj((function (){var x__6696__auto__ = p1__16057_SHARP_;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$cljs$core$macros_SLASH_lazy_DASH_seq);
}),colls))));
});

cljs.core$macros.lazy_cat.cljs$lang$maxFixedArity = (2);

cljs.core$macros.lazy_cat.cljs$lang$applyTo = (function (seq16058){
var G__16059 = cljs.core.first(seq16058);
var seq16058__$1 = cljs.core.next(seq16058);
var G__16060 = cljs.core.first(seq16058__$1);
var seq16058__$2 = cljs.core.next(seq16058__$1);
return cljs.core$macros.lazy_cat.cljs$core$IFn$_invoke$arity$variadic(G__16059,G__16060,seq16058__$2);
});

cljs.core$macros.lazy_cat.cljs$lang$macro = true;
cljs.core$macros.js_str = (function cljs$core$macros$js_str(_AMPERSAND_form,_AMPERSAND_env,s){
return cljs.core._conj(cljs.core._conj((function (){var x__6696__auto__ = s;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),"''+~{}"),cljs.core.cst$sym$js_STAR_);
});

cljs.core$macros.js_str.cljs$lang$macro = true;
cljs.core$macros.es6_iterable = (function cljs$core$macros$es6_iterable(_AMPERSAND_form,_AMPERSAND_env,ty){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aset),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$_DASH_prototype),(function (){var x__6696__auto__ = ty;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_ITER_SYMBOL),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_this_DASH_as),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__16064__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_es6_DASH_iterator),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$this__16064__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.es6_iterable.cljs$lang$macro = true;
/**
 * Returns a map of the intern mappings for the namespace.
 */
cljs.core$macros.ns_interns = (function cljs$core$macros$ns_interns(_AMPERSAND_form,_AMPERSAND_env,p__16065){
var vec__16071 = p__16065;
var quote = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16071,(0),null);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16071,(1),null);
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(quote,cljs.core.cst$sym$quote)) && ((ns instanceof cljs.core.Symbol))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Argument to ns-interns must be a quoted symbol"),cljs.core.str("\n"),cljs.core.str("(core/and (= quote (quote quote)) (core/symbol? ns))")].join('')));
}

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_into),(function (){var x__6696__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$0())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__16071,quote,ns){
return (function (p__16074){
var vec__16075 = p__16074;
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16075,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16075,(1),null);
return cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_symbol),(function (){var x__6696__auto__ = cljs.core.name(sym);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$var),(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.name(ns),cljs.core.name(sym));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
});})(vec__16071,quote,ns))
,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.env._STAR_compiler_STAR_) : cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null)))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.ns_interns.cljs$lang$macro = true;
/**
 * Removes the mappings for the symbol from the namespace.
 */
cljs.core$macros.ns_unmap = (function cljs$core$macros$ns_unmap(_AMPERSAND_form,_AMPERSAND_env,p__16076,p__16077){
var vec__16080 = p__16076;
var quote0 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16080,(0),null);
var ns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16080,(1),null);
var vec__16081 = p__16077;
var quote1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16081,(0),null);
var sym = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16081,(1),null);
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(quote0,cljs.core.cst$sym$quote)) && ((ns instanceof cljs.core.Symbol)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(quote1,cljs.core.cst$sym$quote)) && ((sym instanceof cljs.core.Symbol))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Arguments to ns-unmap must be quoted symbols"),cljs.core.str("\n"),cljs.core.str("(core/and (= quote0 (quote quote)) (core/symbol? ns) (= quote1 (quote quote)) (core/symbol? sym))")].join('')));
}

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.env._STAR_compiler_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$analyzer_SLASH_namespaces,ns,cljs.core.cst$kw$defs], null),cljs.core.dissoc,cljs.core.array_seq([sym], 0));

return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_delete),(function (){var x__6696__auto__ = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1(ns);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1([cljs.core.str(sym)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.ns_unmap.cljs$lang$macro = true;
/**
 * Non-atomically swaps the value of the volatile as if:
 * (apply f current-value-of-vol args). Returns the value that
 * was swapped in.
 */
cljs.core$macros.vswap_BANG_ = (function cljs$core$macros$vswap_BANG_(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16087 = arguments.length;
var i__6933__auto___16088 = (0);
while(true){
if((i__6933__auto___16088 < len__6932__auto___16087)){
args__6939__auto__.push((arguments[i__6933__auto___16088]));

var G__16089 = (i__6933__auto___16088 + (1));
i__6933__auto___16088 = G__16089;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((4) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((4)),(0),null)):null);
return cljs.core$macros.vswap_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),argseq__6940__auto__);
});

cljs.core$macros.vswap_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,vol,f,args){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_vreset_BANG_),(function (){var x__6696__auto__ = vol;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = f;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH__DASH_deref),(function (){var x__6696__auto__ = vol;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([args], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.vswap_BANG_.cljs$lang$maxFixedArity = (4);

cljs.core$macros.vswap_BANG_.cljs$lang$applyTo = (function (seq16082){
var G__16083 = cljs.core.first(seq16082);
var seq16082__$1 = cljs.core.next(seq16082);
var G__16084 = cljs.core.first(seq16082__$1);
var seq16082__$2 = cljs.core.next(seq16082__$1);
var G__16085 = cljs.core.first(seq16082__$2);
var seq16082__$3 = cljs.core.next(seq16082__$2);
var G__16086 = cljs.core.first(seq16082__$3);
var seq16082__$4 = cljs.core.next(seq16082__$3);
return cljs.core$macros.vswap_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16083,G__16084,G__16085,G__16086,seq16082__$4);
});

cljs.core$macros.vswap_BANG_.cljs$lang$macro = true;
cljs.core$macros.load_file_STAR_ = (function cljs$core$macros$load_file_STAR_(_AMPERSAND_form,_AMPERSAND_env,f){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_goog),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$nodeGlobalRequire),(function (){var x__6696__auto__ = f;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.load_file_STAR_.cljs$lang$macro = true;
/**
 * If form represents a macro form, returns its expansion,
 *   else returns form.
 */
cljs.core$macros.macroexpand_1 = (function cljs$core$macros$macroexpand_1(_AMPERSAND_form,_AMPERSAND_env,quoted){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(quoted),cljs.core.cst$sym$quote)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Argument to macroexpand-1 must be quoted"),cljs.core.str("\n"),cljs.core.str("(core/= (core/first quoted) (quote quote))")].join('')));
}

var form = cljs.core.second(quoted);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$quote),(function (){var x__6696__auto__ = cljs.analyzer.macroexpand_1(_AMPERSAND_env,form);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
});

cljs.core$macros.macroexpand_1.cljs$lang$macro = true;
/**
 * Repeatedly calls macroexpand-1 on form until it no longer
 *   represents a macro form, then returns it.  Note neither
 *   macroexpand-1 nor macroexpand expand macros in subforms.
 */
cljs.core$macros.macroexpand = (function cljs$core$macros$macroexpand(_AMPERSAND_form,_AMPERSAND_env,quoted){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(quoted),cljs.core.cst$sym$quote)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Argument to macroexpand must be quoted"),cljs.core.str("\n"),cljs.core.str("(core/= (core/first quoted) (quote quote))")].join('')));
}

var form = cljs.core.second(quoted);
var env = _AMPERSAND_env;
var form__$1 = form;
var form_SINGLEQUOTE_ = cljs.analyzer.macroexpand_1(env,form__$1);
while(true){
if(!((form__$1 === form_SINGLEQUOTE_))){
var G__16090 = form_SINGLEQUOTE_;
var G__16091 = cljs.analyzer.macroexpand_1(env,form_SINGLEQUOTE_);
form__$1 = G__16090;
form_SINGLEQUOTE_ = G__16091;
continue;
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$quote),(function (){var x__6696__auto__ = form_SINGLEQUOTE_;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
}
break;
}
});

cljs.core$macros.macroexpand.cljs$lang$macro = true;
cljs.core$macros.multi_arity_fn_QMARK_ = (function cljs$core$macros$multi_arity_fn_QMARK_(fdecl){
return ((1) < cljs.core.count(fdecl));
});
cljs.core$macros.variadic_fn_QMARK_ = (function cljs$core$macros$variadic_fn_QMARK_(fdecl){
var and__5850__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(fdecl));
if(and__5850__auto__){
return cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),cljs.core.ffirst(fdecl));
} else {
return and__5850__auto__;
}
});
cljs.core$macros.variadic_fn_STAR_ = (function cljs$core$macros$variadic_fn_STAR_(var_args){
var args16092 = [];
var len__6932__auto___16097 = arguments.length;
var i__6933__auto___16098 = (0);
while(true){
if((i__6933__auto___16098 < len__6932__auto___16097)){
args16092.push((arguments[i__6933__auto___16098]));

var G__16099 = (i__6933__auto___16098 + (1));
i__6933__auto___16098 = G__16099;
continue;
} else {
}
break;
}

var G__16094 = args16092.length;
switch (G__16094) {
case 2:
return cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args16092.length)].join('')));

}
});

cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (sym,method){
return cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$3(sym,method,true);
});

cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (sym,p__16095,solo){
var vec__16096 = p__16095;
var arglist = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16096,(0),null);
var body = cljs.core.nthnext(vec__16096,(1));
var method = vec__16096;
var sig = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),arglist);
var restarg = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("seq");
var get_delegate = ((function (sig,restarg,vec__16096,arglist,body,method){
return (function cljs$core$macros$get_delegate(){
return cljs.core.cst$sym$cljs$core$IFn$_invoke$arity$variadic;
});})(sig,restarg,vec__16096,arglist,body,method))
;
var get_delegate_prop = ((function (sig,restarg,vec__16096,arglist,body,method){
return (function cljs$core$macros$get_delegate_prop(){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-"),cljs.core.str(get_delegate())].join(''));
});})(sig,restarg,vec__16096,arglist,body,method))
;
var param_bind = ((function (sig,restarg,vec__16096,arglist,body,method){
return (function cljs$core$macros$param_bind(param){
return cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = param;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.cst$sym$cljs$core_SLASH_first,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$file),cljs.core._conj(cljs.core.List.EMPTY,"/home/david/ora/rune_cljs/rune_cljs/cljs/core.cljc"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$line),cljs.core._conj(cljs.core.List.EMPTY,2725),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$column),cljs.core._conj(cljs.core.List.EMPTY,49),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_line),cljs.core._conj(cljs.core.List.EMPTY,2725),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_column),cljs.core._conj(cljs.core.List.EMPTY,54),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve),cljs.core._conj(cljs.core.List.EMPTY,true)], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.cst$sym$cljs$core_SLASH_next,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$file),cljs.core._conj(cljs.core.List.EMPTY,"/home/david/ora/rune_cljs/rune_cljs/cljs/core.cljc"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$line),cljs.core._conj(cljs.core.List.EMPTY,2726),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$column),cljs.core._conj(cljs.core.List.EMPTY,51),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_line),cljs.core._conj(cljs.core.List.EMPTY,2726),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_column),cljs.core._conj(cljs.core.List.EMPTY,55),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve),cljs.core._conj(cljs.core.List.EMPTY,true)], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))));
});})(sig,restarg,vec__16096,arglist,body,method))
;
var apply_to = ((function (sig,restarg,vec__16096,arglist,body,method){
return (function cljs$core$macros$apply_to(){
if(((1) < cljs.core.count(sig))){
var params = cljs.core.repeatedly.cljs$core$IFn$_invoke$arity$2((cljs.core.count(sig) - (1)),cljs.core.gensym);
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(param_bind,cljs.core.array_seq([params], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((function (){var x__6696__auto__ = get_delegate();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),params,cljs.core.array_seq([(function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = get_delegate();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core_SLASH_seq),(function (){var x__6696__auto__ = restarg;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
}
});})(sig,restarg,vec__16096,arglist,body,method))
;
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = get_delegate_prop();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.vec(sig);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),body)));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(cljs.core.truth_(solo)?cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_cljs$lang$maxFixedArity)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = (cljs.core.count(sig) - (1));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())))):null),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_cljs$lang$applyTo)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = apply_to();
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.variadic_fn_STAR_.cljs$lang$maxFixedArity = 3;
cljs.core$macros.copy_arguments = (function cljs$core$macros$copy_arguments(_AMPERSAND_form,_AMPERSAND_env,dest){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$len__16101__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_arguments))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_loop),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__16102__auto__),cljs.core._conj(cljs.core.List.EMPTY,(0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__16102__auto__),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$len__16101__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$push),(function (){var x__6696__auto__ = dest;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aget),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_arguments))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__16102__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$recur),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_inc),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$i__16102__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});

cljs.core$macros.copy_arguments.cljs$lang$macro = true;
cljs.core$macros.variadic_fn = (function cljs$core$macros$variadic_fn(name,meta,p__16105){
var vec__16108 = p__16105;
var vec__16109 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16108,(0),null);
var arglist = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16109,(0),null);
var body = cljs.core.nthnext(vec__16109,(1));
var method = vec__16109;
var fdecl = vec__16108;
var dest_args = ((function (vec__16108,vec__16109,arglist,body,method,fdecl){
return (function cljs$core$macros$variadic_fn_$_dest_args(c){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (vec__16108,vec__16109,arglist,body,method,fdecl){
return (function (n){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aget),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_arguments))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});})(vec__16108,vec__16109,arglist,body,method,fdecl))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(c));
});})(vec__16108,vec__16109,arglist,body,method,fdecl))
;
var rname = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_)].join(''),[cljs.core.str(name)].join(''));
var sig = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),arglist);
var c_1 = (cljs.core.count(sig) - (1));
var meta__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(meta,cljs.core.cst$kw$top_DASH_fn,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$variadic,true,cljs.core.cst$kw$max_DASH_fixed_DASH_arity,c_1,cljs.core.cst$kw$method_DASH_params,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [sig], null),cljs.core.cst$kw$arglists,(function (){var x__6696__auto__ = arglist;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$kw$arglists_DASH_meta,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(meta,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [arglist], null)))], null));
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$def),(function (){var x__6696__auto__ = cljs.core.with_meta(name,meta__$1);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$var_args)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args__16103__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_copy_DASH_arguments),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args__16103__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argseq__16104__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_when),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__LT_),(function (){var x__6696__auto__ = c_1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args__16103__auto__))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.cst$sym$cljs$core_SLASH_IndexedSeq,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$file),cljs.core._conj(cljs.core.List.EMPTY,"/home/david/ora/rune_cljs/rune_cljs/cljs/core.cljc"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$line),cljs.core._conj(cljs.core.List.EMPTY,2773),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$column),cljs.core._conj(cljs.core.List.EMPTY,55),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_line),cljs.core._conj(cljs.core.List.EMPTY,2773),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_column),cljs.core._conj(cljs.core.List.EMPTY,75),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve),cljs.core._conj(cljs.core.List.EMPTY,true)], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$slice),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$args__16103__auto__),cljs.core.array_seq([(function (){var x__6696__auto__ = c_1;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0)),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = rname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$IFn$_invoke$arity$variadic),dest_args(c_1),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argseq__16104__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$2(rname,method);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
cljs.core$macros.multi_arity_fn = (function cljs$core$macros$multi_arity_fn(name,meta,fdecl){
var dest_args = (function cljs$core$macros$multi_arity_fn_$_dest_args(c){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (n){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_aget),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_js_DASH_arguments))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = n;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(c));
});
var fixed_arity = (function cljs$core$macros$multi_arity_fn_$_fixed_arity(rname,sig){
var c = cljs.core.count(sig);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = rname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("cljs$core$IFn$_invoke$arity$"),cljs.core.str(c)].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),dest_args(c))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))))], null);
});
var fn_method = (function cljs$core$macros$multi_arity_fn_$_fn_method(p__16122){
var vec__16124 = p__16122;
var sig = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__16124,(0),null);
var body = cljs.core.nthnext(vec__16124,(1));
var method = vec__16124;
if(cljs.core.truth_(cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),sig))){
return cljs.core$macros.variadic_fn_STAR_.cljs$core$IFn$_invoke$arity$3(name,method,false);
} else {
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str("-cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count(sig))].join(''));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = method;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
}
});
var rname = cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.analyzer._STAR_cljs_ns_STAR_)].join(''),[cljs.core.str(name)].join(''));
var arglists = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,fdecl);
var varsig_QMARK_ = ((function (rname,arglists){
return (function (p1__16110_SHARP_){
return cljs.core.some(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$sym$_AMPERSAND_,null], null), null),p1__16110_SHARP_);
});})(rname,arglists))
;
var variadic = cljs.core.boolean$(cljs.core.some(varsig_QMARK_,arglists));
var sigs = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(varsig_QMARK_,arglists);
var maxfa = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,sigs),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.count(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(varsig_QMARK_,arglists))) - (2))], null)));
var meta__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(meta,cljs.core.cst$kw$top_DASH_fn,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$variadic,variadic,cljs.core.cst$kw$max_DASH_fixed_DASH_arity,maxfa,cljs.core.cst$kw$method_DASH_params,sigs,cljs.core.cst$kw$arglists,arglists,cljs.core.cst$kw$arglists_DASH_meta,cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(meta,arglists))], null));
var args_sym = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("args");
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$do),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$def),(function (){var x__6696__auto__ = cljs.core.with_meta(name,meta__$1);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_fn),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$var_args)))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_array))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_copy_DASH_arguments),(function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_case),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),(function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (rname,arglists,varsig_QMARK_,variadic,sigs,maxfa,meta__$1,args_sym){
return (function (p1__16111_SHARP_){
return fixed_arity(rname,p1__16111_SHARP_);
});})(rname,arglists,varsig_QMARK_,variadic,sigs,maxfa,meta__$1,args_sym))
,cljs.core.array_seq([sigs], 0)),(function (){var x__6696__auto__ = ((variadic)?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_let),(function (){var x__6696__auto__ = cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argseq__16112__auto__),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$new),(function (){var x__6696__auto__ = cljs.core.with_meta(cljs.core.cst$sym$cljs$core_SLASH_IndexedSeq,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$file),cljs.core._conj(cljs.core.List.EMPTY,"/home/david/ora/rune_cljs/rune_cljs/cljs/core.cljc"),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$line),cljs.core._conj(cljs.core.List.EMPTY,2830),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$column),cljs.core._conj(cljs.core.List.EMPTY,58),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_line),cljs.core._conj(cljs.core.List.EMPTY,2830),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$end_DASH_column),cljs.core._conj(cljs.core.List.EMPTY,78),cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$kw$cljs$analyzer_SLASH_no_DASH_resolve),cljs.core._conj(cljs.core.List.EMPTY,true)], 0))))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$$slice),(function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = maxfa;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core._conj(cljs.core.List.EMPTY,(0)),cljs.core._conj(cljs.core.List.EMPTY,null)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = rname;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$IFn$_invoke$arity$variadic),dest_args(maxfa),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$argseq__16112__auto__)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0)))):(cljs.core.truth_(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(meta__$1))?cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"Invalid arity: "),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH__DASH_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),(function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,(2))], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()))):cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$throw),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$js_SLASH_Error$),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_str),cljs.core._conj(cljs.core.List.EMPTY,"Invalid arity: "),cljs.core.array_seq([(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$cljs$core$macros_SLASH_alength),(function (){var x__6696__auto__ = args_sym;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})())))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core.map.cljs$core$IFn$_invoke$arity$2(fn_method,fdecl),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$set_BANG_),(function (){var x__6696__auto__ = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto__ = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_cljs$lang$maxFixedArity)], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.array_seq([(function (){var x__6696__auto__ = maxfa;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})()], 0))));
});
/**
 * Same as (def name (core/fn [params* ] exprs*)) or (def
 *  name (core/fn ([params* ] exprs*)+)) with any doc-string or attrs added
 *  to the var metadata. prepost-map defines a map with optional keys
 *  :pre and :post that contain collections of pre or post conditions.
 * @param {...*} var_args
 */
cljs.core$macros.defn = (function() { 
var cljs$core$macros$defn__delegate = function (_AMPERSAND_form,_AMPERSAND_env,name,fdecl){
if((name instanceof cljs.core.Symbol)){
} else {
throw (new Error("First argument to defn must be a symbol"));
}

var m = ((typeof cljs.core.first(fdecl) === 'string')?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$doc,cljs.core.first(fdecl)], null):cljs.core.PersistentArrayMap.EMPTY);
var fdecl__$1 = ((typeof cljs.core.first(fdecl) === 'string')?cljs.core.next(fdecl):fdecl);
var m__$1 = ((cljs.core.map_QMARK_(cljs.core.first(fdecl__$1)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(m,cljs.core.first(fdecl__$1)):m);
var fdecl__$2 = ((cljs.core.map_QMARK_(cljs.core.first(fdecl__$1)))?cljs.core.next(fdecl__$1):fdecl__$1);
var fdecl__$3 = ((cljs.core.vector_QMARK_(cljs.core.first(fdecl__$2)))?(function (){var x__6696__auto__ = fdecl__$2;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})():fdecl__$2);
var m__$2 = ((cljs.core.map_QMARK_(cljs.core.last(fdecl__$3)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(m__$1,cljs.core.last(fdecl__$3)):m__$1);
var fdecl__$4 = ((cljs.core.map_QMARK_(cljs.core.last(fdecl__$3)))?cljs.core.butlast(fdecl__$3):fdecl__$3);
var m__$3 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$arglists,cljs.core._conj((function (){var x__6696__auto__ = cljs.core$macros.sigs(fdecl__$4);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})(),cljs.core.cst$sym$quote)], null),m__$2);
var m__$4 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2((cljs.core.truth_(cljs.core.meta(name))?cljs.core.meta(name):cljs.core.PersistentArrayMap.EMPTY),m__$3);
if(cljs.core.truth_(cljs.core$macros.multi_arity_fn_QMARK_(fdecl__$4))){
return cljs.core$macros.multi_arity_fn(name,(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(m__$4,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$jsdoc], null),cljs.core.conj,"@param {...*} var_args"):m__$4),fdecl__$4);
} else {
if(cljs.core.truth_(cljs.core$macros.variadic_fn_QMARK_(fdecl__$4))){
return cljs.core$macros.variadic_fn(name,(cljs.core.truth_(cljs.compiler.checking_types_QMARK_())?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(m__$4,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$jsdoc], null),cljs.core.conj,"@param {...*} var_args"):m__$4),fdecl__$4);
} else {
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.with_meta(name,m__$4);
return cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core.cons(cljs.core.cst$sym$cljs$core$macros_SLASH_fn,fdecl__$4);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$def);

}
}
};
var cljs$core$macros$defn = function (_AMPERSAND_form,_AMPERSAND_env,name,var_args){
var fdecl = null;
if (arguments.length > 3) {
var G__16125__i = 0, G__16125__a = new Array(arguments.length -  3);
while (G__16125__i < G__16125__a.length) {G__16125__a[G__16125__i] = arguments[G__16125__i + 3]; ++G__16125__i;}
  fdecl = new cljs.core.IndexedSeq(G__16125__a,0);
} 
return cljs$core$macros$defn__delegate.call(this,_AMPERSAND_form,_AMPERSAND_env,name,fdecl);};
cljs$core$macros$defn.cljs$lang$maxFixedArity = 3;
cljs$core$macros$defn.cljs$lang$applyTo = (function (arglist__16126){
var _AMPERSAND_form = cljs.core.first(arglist__16126);
arglist__16126 = cljs.core.next(arglist__16126);
var _AMPERSAND_env = cljs.core.first(arglist__16126);
arglist__16126 = cljs.core.next(arglist__16126);
var name = cljs.core.first(arglist__16126);
var fdecl = cljs.core.rest(arglist__16126);
return cljs$core$macros$defn__delegate(_AMPERSAND_form,_AMPERSAND_env,name,fdecl);
});
cljs$core$macros$defn.cljs$core$IFn$_invoke$arity$variadic = cljs$core$macros$defn__delegate;
return cljs$core$macros$defn;
})()
;
cljs.core$macros.defn.cljs$lang$macro = true;
/**
 * Like defn, but the resulting function name is declared as a
 *   macro and will be used as a macro by the compiler when it is
 *   called.
 */
cljs.core$macros.defmacro = (function cljs$core$macros$defmacro(var_args){
var args__6939__auto__ = [];
var len__6932__auto___16131 = arguments.length;
var i__6933__auto___16132 = (0);
while(true){
if((i__6933__auto___16132 < len__6932__auto___16131)){
args__6939__auto__.push((arguments[i__6933__auto___16132]));

var G__16133 = (i__6933__auto___16132 + (1));
i__6933__auto___16132 = G__16133;
continue;
} else {
}
break;
}

var argseq__6940__auto__ = ((((3) < args__6939__auto__.length))?(new cljs.core.IndexedSeq(args__6939__auto__.slice((3)),(0),null)):null);
return cljs.core$macros.defmacro.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__6940__auto__);
});

cljs.core$macros.defmacro.cljs$core$IFn$_invoke$arity$variadic = (function (_AMPERSAND_form,_AMPERSAND_env,name,args){
var prefix = (function (){var p = (function (){var x__6696__auto__ = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(name,cljs.core.assoc,cljs.core.cst$kw$macro,true);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})();
var args__$1 = args;
while(true){
var f = cljs.core.first(args__$1);
if(typeof f === 'string'){
var G__16134 = cljs.core.cons(f,p);
var G__16135 = cljs.core.next(args__$1);
p = G__16134;
args__$1 = G__16135;
continue;
} else {
if(cljs.core.map_QMARK_(f)){
var G__16136 = cljs.core.cons(f,p);
var G__16137 = cljs.core.next(args__$1);
p = G__16136;
args__$1 = G__16137;
continue;
} else {
return p;
}
}
break;
}
})();
var fdecl = (function (){var fd = args;
while(true){
if(typeof cljs.core.first(fd) === 'string'){
var G__16138 = cljs.core.next(fd);
fd = G__16138;
continue;
} else {
if(cljs.core.map_QMARK_(cljs.core.first(fd))){
var G__16139 = cljs.core.next(fd);
fd = G__16139;
continue;
} else {
return fd;
}
}
break;
}
})();
var fdecl__$1 = ((cljs.core.vector_QMARK_(cljs.core.first(fdecl)))?(function (){var x__6696__auto__ = fdecl;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto__);
})():fdecl);
var add_implicit_args = ((function (prefix,fdecl,fdecl__$1){
return (function (fd){
var args__$1 = cljs.core.first(fd);
return cljs.core.cons(cljs.core.vec(cljs.core.cons(cljs.core.cst$sym$_AMPERSAND_form,cljs.core.cons(cljs.core.cst$sym$_AMPERSAND_env,args__$1))),cljs.core.next(fd));
});})(prefix,fdecl,fdecl__$1))
;
var add_args = ((function (prefix,fdecl,fdecl__$1,add_implicit_args){
return (function (acc,ds){
while(true){
if((ds == null)){
return acc;
} else {
var d = cljs.core.first(ds);
if(cljs.core.map_QMARK_(d)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,d);
} else {
var G__16140 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,add_implicit_args(d));
var G__16141 = cljs.core.next(ds);
acc = G__16140;
ds = G__16141;
continue;
}
}
break;
}
});})(prefix,fdecl,fdecl__$1,add_implicit_args))
;
var fdecl__$2 = cljs.core.seq(add_args(cljs.core.PersistentVector.EMPTY,fdecl__$1));
var decl = (function (){var p = prefix;
var d = fdecl__$2;
while(true){
if(cljs.core.truth_(p)){
var G__16142 = cljs.core.next(p);
var G__16143 = cljs.core.cons(cljs.core.first(p),d);
p = G__16142;
d = G__16143;
continue;
} else {
return d;
}
break;
}
})();
return cljs.core._conj((function (){var x__6696__auto__ = cljs.core.cons(cljs.core.cst$sym$cljs$core$macros_SLASH_defn,decl);
return cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core._conj((function (){var x__6696__auto____$1 = cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DOT_),(function (){var x__6696__auto____$1 = name;
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),cljs.core.array_seq([cljs.core._conj(cljs.core.List.EMPTY,cljs.core.cst$sym$_DASH_cljs$lang$macro)], 0))));
return cljs.core._conj(cljs.core._conj(cljs.core.List.EMPTY,true),x__6696__auto____$1);
})(),cljs.core.cst$sym$set_BANG_);
return cljs.core._conj(cljs.core.List.EMPTY,x__6696__auto____$1);
})(),x__6696__auto__);
})(),cljs.core.cst$sym$do);
});

cljs.core$macros.defmacro.cljs$lang$maxFixedArity = (3);

cljs.core$macros.defmacro.cljs$lang$applyTo = (function (seq16127){
var G__16128 = cljs.core.first(seq16127);
var seq16127__$1 = cljs.core.next(seq16127);
var G__16129 = cljs.core.first(seq16127__$1);
var seq16127__$2 = cljs.core.next(seq16127__$1);
var G__16130 = cljs.core.first(seq16127__$2);
var seq16127__$3 = cljs.core.next(seq16127__$2);
return cljs.core$macros.defmacro.cljs$core$IFn$_invoke$arity$variadic(G__16128,G__16129,G__16130,seq16127__$3);
});
cljs.core$macros.defmacro.cljs$lang$macro = true;
