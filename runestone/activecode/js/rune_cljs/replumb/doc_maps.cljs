(ns replumb.doc-maps
  "Namespace containing special and repl-special doc maps and utils" )

(def special-doc-map
  '{.     {:forms [(.instanceMethod instance args*)
                   (.-instanceField instance)]
           :doc   "The instance member form works for methods and fields.
  They all expand into calls to the dot operator at macroexpansion time."}
    ns    {:forms [(name docstring? attr-map? references*)]
           :doc   "You must currently use the ns form only with the following caveats

    * You must use the :only form of :use
    * :require supports :as and :refer
      - both options can be skipped
      - in this case a symbol can be used as a libspec directly
        - that is, (:require lib.foo) and (:require [lib.foo]) are both
          supported and mean the same thing
      - prefix lists are not supported
    * The only option for :refer-clojure is :exclude
    * :import is available for importing Google Closure classes
      - ClojureScript types and records should be brought in with :use
        or :require :refer, not :import ed
    * Macros are written in Clojure, and are referenced via the new
      :require-macros / :use-macros options to ns
      - :require-macros and :use-macros support the same forms that
        :require and :use do

  Implicit macro loading: If a namespace is required or used, and that
  namespace itself requires or uses macros from its own namespace, then
  the macros will be implicitly required or used using the same
  specifications. This oftentimes leads to simplified library usage,
  such that the consuming namespace need not be concerned about
  explicitly distinguishing between whether certain vars are functions
  or macros.

  Inline macro specification: As a convenience, :require can be given
  either :include-macros true or :refer-macros [syms...]. Both desugar
  into forms which explicitly load the matching Clojure file containing
  macros. (This works independently of whether the namespace being
  required internally requires or uses its own macros.) For example:

  (ns testme.core
  (:require [foo.core :as foo :refer [foo-fn] :include-macros true]
            [woz.core :as woz :refer [woz-fn] :refer-macros [app jx]]))

  is sugar for

  (ns testme.core
  (:require [foo.core :as foo :refer [foo-fn]]
            [woz.core :as woz :refer [woz-fn]])
  (:require-macros [foo.core :as foo]
                   [woz.core :as woz :refer [app jx]]))"}
    def   {:forms [(def symbol doc-string? init?)]
           :doc   "Creates and interns a global var with the name
  of symbol in the current namespace (*ns*) or locates such a var if
  it already exists.  If init is supplied, it is evaluated, and the
  root binding of the var is set to the resulting value.  If init is
  not supplied, the root binding of the var is unaffected."}
    do    {:forms [(do exprs*)]
           :doc   "Evaluates the expressions in order and returns the value of
  the last. If no expressions are supplied, returns nil."}
    if    {:forms [(if test then else?)]
           :doc   "Evaluates test. If not the singular values nil or false,
  evaluates and yields then, otherwise, evaluates and yields else. If
  else is not supplied it defaults to nil."}
    new   {:forms [(Constructor. args*) (new Constructor args*)]
           :url   "java_interop#new"
           :doc   "The args, if any, are evaluated from left to right, and
  passed to the JavaScript constructor. The constructed object is
  returned."}
    quote {:forms [(quote form)]
           :doc   "Yields the unevaluated form."}
    recur {:forms [(recur exprs*)]
           :doc   "Evaluates the exprs in order, then, in parallel, rebinds
  the bindings of the recursion point to the values of the exprs.
  Execution then jumps back to the recursion point, a loop or fn method."}
    set!  {:forms [(set! var-symbol expr)
                   (set! (.- instance-expr instanceFieldName-symbol) expr)]
           :url   "vars#set"
           :doc   "Used to set vars and JavaScript object fields"}
    throw {:forms [(throw expr)]
           :doc   "The expr is evaluated and thrown."}
    try   {:forms [(try expr* catch-clause* finally-clause?)]
           :doc   "catch-clause => (catch classname name expr*)
  finally-clause => (finally expr*)
  Catches and handles JavaScript exceptions."}
    var   {:forms [(var symbol)]
           :doc   "The symbol must resolve to a var, and the Var object
itself (not its value) is returned. The reader macro #'x expands to (var x)."}})

(def repl-special-doc-map
  '{in-ns          {:arglists ([name])
                    :doc      "Sets *cljs-ns* to the namespace named by the symbol, creating it if needed."}
    require        {:arglists ([& args])
                    :doc      "  Loads libs, skipping any that are already loaded. Each argument is
  either a libspec that identifies a lib or a flag that modifies how all the identified
  libs are loaded. Use :require in the ns macro in preference to calling this
  directly.

  Libs

  A 'lib' is a named set of resources in classpath whose contents define a
  library of ClojureScript code. Lib names are symbols and each lib is associated
  with a ClojureScript namespace. A lib's name also locates its root directory
  within classpath using Java's package name to classpath-relative path mapping.
  All resources in a lib should be contained in the directory structure under its
  root directory. All definitions a lib makes should be in its associated namespace.

  'require loads a lib by loading its root resource. The root resource path
  is derived from the lib name in the following manner:
  Consider a lib named by the symbol 'x.y.z; it has the root directory
  <classpath>/x/y/, and its root resource is <classpath>/x/y/z.clj. The root
  resource should contain code to create the lib's namespace (usually by using
  the ns macro) and load any additional lib resources.

  Libspecs

  A libspec is a lib name or a vector containing a lib name followed by
  options expressed as sequential keywords and arguments.

  Recognized options:
  :as takes a symbol as its argument and makes that symbol an alias to the
    lib's namespace in the current namespace.
  :refer takes a list of symbols to refer from the namespace..
  :refer-macros takes a list of macro symbols to refer from the namespace.
  :include-macros true causes macros from the namespace to be required.

  Flags

  A flag is a keyword.
  Recognized flags: :reload, :reload-all, :verbose
  :reload forces loading of all the identified libs even if they are
    already loaded
  :reload-all implies :reload and also forces loading of all libs that the
    identified libs directly or indirectly load via require or use
  :verbose triggers printing information about each load, alias, and refer

  Example:

  The following would load the library clojure.string :as string.

  (require '[clojure/string :as string])"}
    require-macros {:arglists ([& args])
                    :doc      "Similar to the require REPL special function but
    only for macros."}
    import         {:arglists ([& import-symbols-or-lists])
                    :doc      "import-list => (closure-namespace constructor-name-symbols*)

  For each name in constructor-name-symbols, adds a mapping from name to the
  constructor named by closure-namespace to the current namespace. Use :import in the ns
  macro in preference to calling this directly."}
    load-file      {:arglists ([name])
                    :doc "Sequentially read and evaluate the set of forms
                          contained in the file." }

    ;; AR - from here they have been manually added as they are cljs.repl macros.
    doc {:arglists ([name])
         :doc "Prints documentation for a var or special form given its name"}
    source {:arglists ([name])
            :doc "Prints the source code for the given symbol, if it can find it.
  This requires that the symbol resolve to a Var defined in a
  namespace for which the source is available.

  Example: (source filter)"}
    pst {:arglists ([] [e])
         :doc "Prints a stack trace of the exception.

  If none supplied, uses the root cause of the most recent repl exception (*e)"}
    apropos {:arglists ([str-or-pattern])
             :doc "Given a regular expression or stringable thing, return a seq of all
  public definitions in all currently-loaded namespaces that match the
  str-or-pattern." }
    find-doc {:arglists ([re-string-or-pattern])
              :doc "Prints documentation for any var whose documentation or name
  contains a match for re-string-or-pattern"}
    dir {:arglists ([ns])
         :doc "Prints a sorted directory of public vars in a namespace"}})

(defn special-doc
  [name-symbol]
  (assoc (special-doc-map name-symbol)
         :name name-symbol
         :special-form true))

(defn repl-special-doc
  [name-symbol]
  (assoc (repl-special-doc-map name-symbol)
    :name name-symbol
    :repl-special-function true))

(defn repl-special?
  [form]
  (and (seq? form) (repl-special-doc-map (first form))))
