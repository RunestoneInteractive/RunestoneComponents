; :orphan:
;
; .. highlight:: nasm
;
; ***********************************************************************
; |docname| -- Check that the lp extension correctly interprets this file
; ***********************************************************************
.bss
; Define a variable named ``_u16_b``, which occupies two bytes of memory. Make it visible to C.
; SOLUTION_BEGIN
_u16_b: .space 2
.global _u16_b
; SOLUTION_END

; The variable below is used by the test code; you may ignore it.
_u8_test: .space 1
.global _u8_test
;
; Code
; ====
.text
_naming_variables_ex_1:
.global _naming_variables_ex_1

; Assign the value 0xA15F to ``_u16_b``, then ``return``.
; SOLUTION_BEGIN
    mov #0xA15F, W0
    mov W0, _u16_b
    return
; SOLUTION_END

; .. lp_build:: e1
;   :builder: pic24-xc16-bullylib
