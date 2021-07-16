const visitorCountUrl = 'https://s-pos-prod.azurewebsites.net/Reports/GetVisitorCount';
termSensorsUrl = 'https://thermo-sensor.azurewebsites.net/api/Thermo/6164FB7E?id=1&id=2&id=3&id=4&id=5'

$(function() {
    var g = new JustGage({
        id: 'gauge',
        value: 0,
        min: 0,
        max: 100,
        label: 'Visitors now',
        labelFontColor: '#000000',
        hideMinMax: true
    });

    $.get(visitorCountUrl)
        .done(function(d) {
            g.refresh(d.data);
            $('#gauge').show(2000);
        })
        .fail(function() {
            $('#gauge').hide();
        });

    var initParam = {
        gaugeType: steelseries.GaugeType.TYPE4,
        size: 80,
        area: [steelseries.Section(100, 125, 'rgba(220, 0, 0, 0.3)')],
        unitString: '°C',
        maxValue: 120,
        minValue: 10
    };
    var radials = [
        new steelseries.Radial(
            'canvasRadial0',
            $.extend(initParam, {
                titleString: 'Small Banya',
                area: [steelseries.Section(90, 120, 'rgba(220, 0, 0, 0.3)')],
            })
        ),
        new steelseries.Radial(
            'canvasRadial1',
            $.extend(initParam, {
                titleString: 'Big Banya',
                area: [steelseries.Section(90, 100, 'rgba(220, 0, 0, 0.3)')],
            })
        ),
        new steelseries.Radial(
            'canvasRadial2',
            $.extend(initParam, {
                titleString: 'Big Sauna',
                area: [steelseries.Section(80, 90, 'rgba(220, 0, 0, 0.3)')],
            })
        ),
        new steelseries.Radial(
            'canvasRadial3',
            $.extend(initParam, {
                titleString: 'Small Sauna',
                area: [steelseries.Section(50, 70, 'rgba(220, 0, 0, 0.3)')],
            })
        ),
        new steelseries.Radial('canvasRadial4',
            $.extend(initParam, {
                titleString: 'Steam Room',
                area: [steelseries.Section(80, 90, 'rgba(220, 0, 0, 0.3)')],
            }))
    ];
    $.each(radials, function(index, element) {
        element.setBackgroundColor(steelseries.BackgroundColor.BROWN);
        element.setPointerType(steelseries.PointerType.TYPE11);
        element.setFrameDesign(steelseries.FrameDesign.GLOSSY_METAL);
    });

    $.get({
        url: termSensorsUrl,
        success: function(d) {
            radials[0].setValueAnimated(d.find((e)=>e.id==1).v);
            radials[1].setValueAnimated(d.find((e)=>e.id==2).v);
            radials[2].setValueAnimated(d.find((e)=>e.id==3).v);
            radials[3].setValueAnimated(d.find((e)=>e.id==4).v);
            radials[4].setValueAnimated(d.find((e)=>e.id==5).v);
        }
    });
});
