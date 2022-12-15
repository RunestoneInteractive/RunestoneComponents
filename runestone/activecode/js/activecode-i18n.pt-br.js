$.i18n().load({
    "pt-br": {
        msg_activecode_load_history: "Carregar histórico",
        msg_activecode_audio_tour: "Tour de áudio",
        msg_activecode_loaded_code: "Código salvo carregado.",
        msg_activecode_no_saved_code: "Não há código salvo.",
        msg_activecode_run_code: "Executar",
        msg_activecode_show_feedback: "Exibir Feedbacks",
        msg_activecode_show_code: "Mostrar Código",
        msg_activecode_hide_code: "Ocultar Código",
        msg_activecode_show_codelens: "Mostrar CodeLens",
        msg_activecode_show_in_codelens: "Mostrar em CodeLens",
        msg_activecode_hide_codelens: "Ocultar Codelens",

        msg_activecode_parse_error:
            "Um erro de Parse significa que Python não entende a sintaxe da linha que a mensagem de erro aponta. Exemplos comuns são esquecer vírgulas entre argumentos ou esquecer ':' em um comando for.",
        msg_activecode_parse_error_fix:
            "Para corrigir um erro de Parse, você só precisa olhar cuidadosamente a linha com o erro e possivelmente a linha antes dela. Tenha certeza que estão de acordo com todas as regras de Python.",
        msg_activecode_type_error:
            "Erros de tipagem ocorrem mais frequentemente quando uma expressão tenta combinar dois objetos com tipos que não deveriam ser combinados. Como elevar uma String a uma potência.",
        msg_activecode_type_error_fix:
            "Para corrigir um erro de tipagem você provavelmente precisará percorrer seu código e ter certeza de que as variáveis possuem os tipos que você espera que elas tenham. Pode ser útil imprimir cada variável ao longo do caminho para checar se elas possuem o valor que você acha que deveriam ter.",
        msg_activecode_name_error:
            "Um erro de nome quase sempre significa que você usou uma variável antes dela ter um valor. Frequentemente isso pode ser um erro de digitação, então cheque a ortografia cuidadosamente.",
        msg_activecode_name_error_fix:
            "Cheque o lado direito das atribuições e suas chamadas de funções, são os lugares mais prováveis de encontrar um erro de nome.",
        msg_activecode_value_error:
            "Um erro de valor ocorre mais frequentemente quando uma função está esperando um tipo mas você passa um parâmetro de outro tipo.",
        msg_activecode_value_error_fix:
            "A mensagem de erro te dá uma boa dica sobre o nome da função e o valor incorreto. Leia atentamente a mensagem de erro e volte à variável que contém o valor problemático.",
        msg_activecode_attribute_error:
            "Essa mensagem de erro está te dizendo que o objeto do lado esquerdo do ponto não tem o atributo ou método do seu lado direito.",
        msg_activecode_attribute_error_fix:
            "A variante mais comum dessa mensagem é que o objeto indefinido não tem o atributo X. Isso diz que o objeto do lado esquerdo do ponto não é o que você pensa. Rastreie essa variável e imprima-a em vários lugares até descobrir onde ela se torna indefinida. Caso contrário, cheque se há erro de digitação no atributo do lado direito do ponto.",
        msg_activecode_token_error:
            "Na maioria das vezes este erro indica que você esqueceu de fechar um parênteses ou aspas.",
        msg_activecode_token_error_fix:
            "Cheque cada linha do seu programa e certifique-se de que todos os parênteses estão fechados.",
        msg_activecode_time_limit_error:
            "Seu programa está demorando muito. Os programas deste livro deveriam rodar em menos de 10 segundos. Isso provavelmente indica que seu programa está em um loop infinito.",
        msg_activecode_time_limit_error_fix:
            "Imprima mensagens em algumas linhas para descobrir se seu programa está em um loop infinito. Caso não esteja, você pode aumentar o tempo limite de execução com o comando sys.setExecutionLimit(ms)",
        msg_activecode_general_error:
            "Seu programa está demorando muito. Os programas deste livro deveriam rodar em menos de 30 segundos. Isso provavelmente indica que seu programa está em um loop infinito.",
        msg_activecode_general_error_fix:
            "Imprima mensagens em algumas linhas para descobrir se seu programa está em um loop infinito. Caso não esteja, você pode aumentar o tempo limite de execução com o comando sys.setExecutionLimit(ms)",
        msg_activecode_syntax_error:
            "Esta mensagem indica que Python não entendeu a sintaxe de um comando. Alguns exemplos são atribuição de um literal, ou uma chamada de função",
        msg_activecode_syntax_error_fix:
            "Cheque as atribuições de seu programa e certifique-se de que o lado esquerdo é uma variável, e não um literal ou função.",
        msg_activecode_key_error:
            "Esta mensagem indica que você está tentando acessar um elemento cuja chave não existe no dicionário.",
        msg_activecode_key_error_fix:
            "Você pode ter um erro de digitação no nome da sua chave. É uma boa prática checar se a chave existe usando um comando 'if (chave) in meu_dicionario'. Você também pode usar o comando 'meu_dicionario.get(chave, valorPadrão)' para obter o valor padrão ao invés de um erro caso a chave não exista.",
        msg_activecode_index_error:
            "Você está tentando acessar um índice além do final de uma string ou lista. Por exemplo, se sua lista possui 3 elementos nela e você tenta acessar o item na posição 3 ou mais.",
        msg_activecode_index_error_fix:
            "Lembre-se que o primeiro elemento de uma lista ou string está no índice 0, normalmente esta mensagem é exibida porque você errou o índice por 1. Em uma lista de tamanho 3, o último índice válido é 2",
        msg_activecode_uri_error: "",
        msg_activecode_uri_error_fix: "",
        msg_activecode_import_error:
            "Esta mensagem indica que você está tentando importar um módulo que não existe",
        msg_activecode_import_error_fix:
            "Um problema pode ser apenas um erro de digitação. Também pode ser que você está tentando importar um módulo que existe em Python 'real', mas não existe neste livro. Se este é o caso, por favor envie um pedido para ter esse módulo adicionado.",
        msg_activecode_reference_error:
            "Isso parece ser um erro interno, especialmente se a mensagem faz referência ao console.",
        msg_activecode_reference_error_fix:
            "Tente atualizar a página. Se o erro persistir, envie um relatório de bug junto com seu código",
        msg_activecode_zero_division_error:
            "Isso diz que você está tentando dividir por 0. Normalmente é porque o valor da variável no denominador de uma divisão tem o valor 0",
        msg_activecode_zero_division_error_fix:
            "Você pode proteger contra dividir por 0 com um comando 'if', ou você pode precisar reavaliar suas suposições sobre os valores das variáveis, pois um comando anterior pode ter inesperadamente atribuído o valor 0 a essa variável.",
        msg_activecode_range_error:
            "Esta mensagem quase sempre aparece na forma de 'Tamanho máximo da pilha de chamadas excedido'.",
        msg_activecode_range_error_fix:
            "Isso sempre ocorre quando uma função chama ela mesma. Provavelmente você não está fazendo isso de propósito, exceto no capítulo sobre recursão. Se você está nesse capítulo, então provavelmente ainda não identificou um bom caso base.",
        msg_activecode_internal_error:
            "Um erro interno pode significar que você desencadeou um bug no nosso Python",
        msg_activecode_internal_error_fix:
            "Reporte este erro como um bug, juntamente com seu código",
        msg_activecode_indentation_error:
            "Este erro ocorre quando você não indentou seu código devidamente. Isso é mais provável de ocorrer como parte de um comando if, for, while ou def.",
        msg_activecode_indentation_error_fix:
            "Cheque seus comandos if, def, for e while para ter certeza de que as linhas estão devidamente indentadas abaixo delas. Outra fonte deste erro é copiar e colar código em que você acidentalmente deixou restos de código que não pertencem mais ali.",
        msg_activecode_not_implemented_error:
            "Este erro ocorre quando você tenta usar uma função embutida de Python que não foi implementada nesta versão browser de Python.",
        msg_activecode_not_implemented_error_fix:
            "Por enquanto a única maneira de consertar isso é não usando a função. Podem haver soluções alternativas. Se você realmente precisa desta função embutida, envie-nos um relatório de bug e digac omo está tentando usar a função.",

        msg_activecode_file_not_found: "Arquivo não encontrado: '$1'",
        msg_activecode_no_file_or_dir:
            "[Erro nº 2] Arquivo ou diretório inexistente: '$1'",
        msg_activecode_starting: "Clique no botão de execução para começar $1",
        msg_activecode_playing: "Executando $1",
        msg_activecode_loading_audio:
            "Carregando áudio. Por favor, espere. Se o tour não começar logo, clique em 'Stop Tour' e tente novamente.",
        msg_activecode_pause_current_audio: "Pausar áudio atual",
        msg_activecode_pause_audio: "Pausar áudio",
        msg_activecode_play_paused_audio: "Reproduzir áudio pausado",
        msg_activecode_audio_paused:
            "$1 foi pausado. Clique no botão de execução para retomar o tour.",
        msg_activecode_input_prg: "Entrada para o programa",
        msg_activecode_were_compiling_err:
            "Houveram erros ao compilar seu código. Veja abaixo.",
        msg_activecode_time_limit_exc: "Limite de tempo excedido no seu programa",
        msg_activecode_server_err: "Um erro de servidor ocorreu: $1 $2",
        msg_activecode_compiling_running:
            "Compilando e executando seu código...",
        msg_activecode_server_comm_err: "Erro ao comunicar com o servidor.",
        msg_activecode_save_run: "Salvar & Executar",
        msg_activecode_render: "Salvar & Renderizar",
        msg_activecode_assertion_error:
            "Um erro de asserção ocorre quando python encontra um comando 'assert'. Python avalia a expressão do lado direito; se é verdadeira, o programa continua normalmente. Se é falsa, python gera um erro e para a execução." ,
        msg_activecode_assertion_error_fix:
            "Cheque a expressão do lado direito de 'assert'. Essa expressão é falsa e é preciso verificar o motivo. Você pode querer imprimir cada parte da expressão e entender porque é falsa.",
        msg_activecode_load_db: "Carregando banco de dados...",
    },
});
