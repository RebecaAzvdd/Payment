$(document).ready(function () { //inicia apartir do documento
    $('#btn_pix').on('click', function () { // função sendo ativada pelo click do botao
        $('#pix_panel').show(); //anotaçoes mostra o painel de pix
        $('#card_panel').hide(); // esconde o painel de credito
        $('#pix_image').addClass('active');
        $('#card_image').removeClass('active');
    });

    $('#btn_card').on('click', function () {
        $('#pix_panel').hide();
        $('#card_panel').show();
        $('#pix_image').removeClass('active');
        $('#card_image').addClass('active');
    });

    $('#inform_data_button').on('click', function () { //ativa botao de dados
        let value = $('#value').val();  //pega valor do input
        if (value === '') {
            $('#mensagem-alerta').text('O campo valor deve ser preenchido.'); //validação de campo vazio
            $('#alerta').show();
        } else {
            $('#alerta').hide(); //mostra alerta
            if ($('#pix_panel').is(':visible')) {
                let totalValue = value * 0.9; //validaçao para se painel de pix estiver ativo ele dar 10% de desconto
                $('#total_value_pix').text(totalValue.toFixed(2)); //mostra valor
            } else if ($('#card_panel').is(':visible')) {
                calculateInstallments(value); //se for o painel de cartao ele mostra os valores e calcula a parcela
            }
        }
    });

    $('#card_number').on('input', function () {
        let cardNumber = $(this).val(); //pegando valor inicial do input
        if (cardNumber.startsWith('1234')) {
            $('#icon_1234').show(); //monstrando e esconndo icones dependendo do inicio e se nao começar com nenhum cartao invalido
            $('#icon_4321').hide();
            $('#invalid_card_number').hide();
        } else if (cardNumber.startsWith('4321')) {
            $('#icon_1234').hide();
            $('#icon_4321').show();
            $('#invalid_card_number').hide();
        } else {
            $('#icon_1234').hide();
            $('#icon_4321').hide();
            $('#invalid_card_number').show();
        }
    });

    $('#installments').on('change', function () {
        let value = $('#value').val();
        calculateInstallments(value); //pegando valor do campo de valor se parcelas alterada
    });

    function calculateInstallments(value) {
        let installments = $('#installments').val(); //pegando valor de parcelas
        let totalValue = 0;
        if (installments == 1 || installments == 2 || installments == 3) {
            totalValue = value;
        } else if (installments == 4) {
            totalValue = value * 1.05;
        } else if (installments == 5) {
            totalValue = value * 1.10; //calculo para a opçoes de parcelas
        }
        $('#total_value_card').text(totalValue.toFixed(2));
    }

    $('.pay_button').on('click', function () {
        $('#mensagem_sucesso').show(); //mensagem de sucesso
    });
});
