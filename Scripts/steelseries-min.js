/*!
 * Name          : steelseries.js
 * Authors       : Gerrit Grunwald, Mark Crossley
 * Last modified : 31.03.2015
 * Revision      : 0.14.15
 *
 * Copyright (c) 2011, Gerrit Grunwald, Mark Crossley
 * All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without modification, are permitted
 *  provided that the following conditions are met:
 *
 *  # Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *  # Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
 *   BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *   SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 *   DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *   INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 *   OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var steelseries = function() {
        function c(n, t) {
            var i = "#" === n.charAt(0) ? n.substring(1, 7) : n,
                r = parseInt(i.substring(0, 2), 16),
                u = parseInt(i.substring(2, 4), 16),
                f = parseInt(i.substring(4, 6), 16);
            return "rgba(" + r + "," + u + "," + f + "," + t + ")"
        }

        function ui(t, i, r, u, f) {
            var c = 1 / 255,
                e = t.getRed(),
                o = t.getGreen(),
                s = t.getBlue(),
                h = t.getAlpha(),
                p = i.getRed() - e,
                w = i.getGreen() - o,
                b = i.getBlue() - s,
                k = i.getAlpha() * c - h * c,
                l = p / r * u,
                a = w / r * u,
                v = b / r * u,
                y = k / r * u;
            return f = f || !1, f ? [(e + l).toFixed(0), (o + a).toFixed(0), (s + v).toFixed(0), h + y] : new n((e + l).toFixed(0), (o + a).toFixed(0), (s + v).toFixed(0), h + y)
        }

        function kr(n, t, i) {
            return {
                start: n,
                stop: t,
                color: i
            }
        }

        function v(n, t) {
            var r = Math.floor(Math.log10(n)),
                i = n / Math.pow(10, r),
                u;
            return u = t ? 1.5 > i ? 1 : 3 > i ? 2 : 7 > i ? 5 : 10 : 1 >= i ? 1 : 2 >= i ? 2 : 5 >= i ? 5 : 10, u * Math.pow(10, r)
        }

        function p(n, t, i, r, u, f) {
            var e = t + r,
                o = i + u;
            n.beginPath();
            n.moveTo(t + f, i);
            n.lineTo(e - f, i);
            n.quadraticCurveTo(e, i, e, i + f);
            n.lineTo(e, i + u - f);
            n.quadraticCurveTo(e, o, e - f, o);
            n.lineTo(t + f, o);
            n.quadraticCurveTo(t, o, t, o - f);
            n.lineTo(t, i + f);
            n.quadraticCurveTo(t, i, t + f, i);
            n.closePath()
        }

        function t(n, t) {
            var i = o.createElement("canvas");
            return i.width = n, i.height = t, i
        }

        function si(n, t, i) {
            var r = o.createElement("canvas");
            return r.width = n, r.height = t, i(r.getContext("2d")), r
        }

        function ct(n) {
            var t, i = si(1, 1, function(t) {
                t.fillStyle = n;
                t.beginPath();
                t.rect(0, 0, 1, 1);
                t.fill()
            });
            return t = i.getContext("2d").getImageData(0, 0, 2, 2).data, [t[0], t[1], t[2], t[3]]
        }

        function gt(t) {
            var u, f, e, o, s, r = ct(t),
                i = new n(r[0], r[1], r[2], r[3]);
            return u = wi(i, .32), f = wi(i, .62), e = hi(i, .84), o = hi(i, .94), s = hi(i, 1), new it(u, f, i, e, o, s)
        }

        function dr(n, t, i) {
            var u, r, f, o, s, e;
            if (n /= 255, t /= 255, i /= 255, r = Math.max(n, t, i), u = Math.min(n, t, i), s = (r + u) / 2, r === u) f = o = 0;
            else {
                e = r - u;
                o = s > .5 ? e / (2 - r - u) : e / (r + u);
                switch (r) {
                    case n:
                        f = (t - i) / e + (t < i ? 6 : 0);
                        break;
                    case t:
                        f = (i - n) / e + 2;
                        break;
                    case i:
                        f = (n - t) / e + 4
                }
                f /= 6
            }
            return [f, o, s]
        }

        function bt(n, t, i) {
            var r, u, f, h = Math.floor(n * 6),
                c = n * 6 - h,
                e = i * (1 - t),
                o = i * (1 - c * t),
                s = i * (1 - (1 - c) * t);
            switch (h % 6) {
                case 0:
                    r = i;
                    u = s;
                    f = e;
                    break;
                case 1:
                    r = o;
                    u = i;
                    f = e;
                    break;
                case 2:
                    r = e;
                    u = i;
                    f = s;
                    break;
                case 3:
                    r = e;
                    u = o;
                    f = i;
                    break;
                case 4:
                    r = s;
                    u = e;
                    f = i;
                    break;
                case 5:
                    r = i;
                    u = e;
                    f = o
            }
            return [Math.floor(r * 255), Math.floor(u * 255), Math.floor(f * 255)]
        }

        function wt(n, t, i) {
            var e, r, u, o, s, f;
            if (n = n / 255, t = t / 255, i = i / 255, r = Math.max(n, t, i), e = Math.min(n, t, i), s = r, f = r - e, o = r === 0 ? 0 : f / r, r === e) u = 0;
            else {
                switch (r) {
                    case n:
                        u = (t - i) / f + (t < i ? 6 : 0);
                        break;
                    case t:
                        u = (i - n) / f + 2;
                        break;
                    case i:
                        u = (n - t) / f + 4
                }
                u /= 6
            }
            return [u, o, s]
        }

        function rt(n, t) {
            return n < 0 ? 0 : n > t ? t : n
        }

        function wi(t, i) {
            var r = Math.floor(t.getRed() * (1 - i)),
                u = Math.floor(t.getGreen() * (1 - i)),
                f = Math.floor(t.getBlue() * (1 - i));
            return r = rt(r, 255), u = rt(u, 255), f = rt(f, 255), new n(r, u, f, t.getAlpha())
        }

        function hi(t, i) {
            var r = Math.round(t.getRed() * (1 + i)),
                u = Math.round(t.getGreen() * (1 + i)),
                f = Math.round(t.getBlue() * (1 + i));
            return r = rt(r, 255), u = rt(u, 255), f = rt(f, 255), new n(r, u, f, t.getAlpha())
        }

        function gr(n, t, i) {
            var r, u;
            if (i <= t) throw "Rotary bounds are of negative or zero size";
            return r = i - t, u = Math.floor((n - t) / r), n - u * r
        }

        function ci(n, t) {
            return gr(t - n, -180, 180)
        }

        function w(n) {
            var t = typeof n == "string" || n instanceof String ? o.getElementById(n) : n;
            return t.getContext("2d")
        }
        var i = Math.PI * .5,
            r = Math.PI * 2,
            f = Math.PI,
            u = Math.PI / 180,
            ii = 180 / Math.PI,
            o = document,
            et = "LCDMono2Ultra,Arial,Verdana,sans-serif",
            e = "Arial,Verdana,sans-serif",
            gi = function(n, c) {
                var yi;
                c = c || {};
                var wt = undefined === c.gaugeType ? steelseries.GaugeType.TYPE4 : c.gaugeType,
                    l = undefined === c.size ? 0 : c.size,
                    p = undefined === c.minValue ? 0 : c.minValue,
                    rt = undefined === c.maxValue ? p + 100 : c.maxValue,
                    ve = undefined === c.niceScale ? !0 : c.niceScale,
                    ni = undefined === c.threshold ? (rt - p) / 2 + p : c.threshold,
                    ii = undefined === c.thresholdRising ? !0 : c.thresholdRising,
                    ci = undefined === c.section ? null : c.section,
                    li = undefined === c.area ? null : c.area,
                    vu = undefined === c.titleString ? "" : c.titleString,
                    yu = undefined === c.unitString ? "" : c.unitString,
                    pu = undefined === c.frameDesign ? steelseries.FrameDesign.METAL : c.frameDesign,
                    wu = undefined === c.frameVisible ? !0 : c.frameVisible,
                    ai = undefined === c.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : c.backgroundColor,
                    bu = undefined === c.backgroundVisible ? !0 : c.backgroundVisible,
                    oi = undefined === c.pointerType ? steelseries.PointerType.TYPE1 : c.pointerType,
                    ku = undefined === c.pointerColor ? steelseries.ColorDef.RED : c.pointerColor,
                    ye = undefined === c.knobType ? steelseries.KnobType.STANDARD_KNOB : c.knobType,
                    vi = undefined === c.knobStyle ? steelseries.KnobStyle.SILVER : c.knobStyle,
                    di = undefined === c.lcdColor ? steelseries.LcdColor.STANDARD : c.lcdColor,
                    iu = undefined === c.lcdVisible ? !0 : c.lcdVisible,
                    du = undefined === c.lcdDecimals ? 2 : c.lcdDecimals,
                    pe = undefined === c.digitalFont ? !1 : c.digitalFont,
                    gu = undefined === c.fractionalScaleDecimals ? 1 : c.fractionalScaleDecimals,
                    ru = undefined === c.ledColor ? steelseries.LedColor.RED_LED : c.ledColor,
                    uu = undefined === c.ledVisible ? !0 : c.ledVisible,
                    fu = undefined === c.userLedColor ? steelseries.LedColor.GREEN_LED : c.userLedColor,
                    eu = undefined === c.userLedVisible ? !1 : c.userLedVisible,
                    nf = undefined === c.thresholdVisible ? !0 : c.thresholdVisible,
                    ou = undefined === c.minMeasuredValueVisible ? !1 : c.minMeasuredValueVisible,
                    su = undefined === c.maxMeasuredValueVisible ? !1 : c.maxMeasuredValueVisible,
                    tf = undefined === c.foregroundType ? steelseries.ForegroundType.TYPE1 : c.foregroundType,
                    rf = undefined === c.foregroundVisible ? !0 : c.foregroundVisible,
                    uf = undefined === c.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : c.labelNumberFormat,
                    rr = undefined === c.playAlarm ? !1 : c.playAlarm,
                    ff = undefined === c.alarmSound ? !1 : c.alarmSound,
                    we = undefined === c.customLayer ? null : c.customLayer,
                    be = undefined === c.tickLabelOrientation ? wt === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL : c.tickLabelOrientation,
                    hu = undefined === c.trendVisible ? !1 : c.trendVisible,
                    lr = undefined === c.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : c.trendColors,
                    ar = undefined === c.useOdometer ? !1 : c.useOdometer,
                    si = undefined === c.odometerParams ? {} : c.odometerParams,
                    ke = undefined === c.odometerUseValue ? !1 : c.odometerUseValue,
                    ef = undefined === c.fullScaleDeflectionTime ? 2.5 : c.fullScaleDeflectionTime,
                    y = w(n);
                l === 0 && (l = Math.min(y.canvas.width, y.canvas.height));
                y.canvas.width = l;
                y.canvas.height = l;
                rr && ff !== !1 && (yi = o.createElement("audio"), yi.setAttribute("src", ff), yi.setAttribute("preload", "auto"));
                var it = p,
                    vr = p,
                    of = this,
                    pi = rt,
                    wi = p,
                    ot = !1,
                    yr = !1,
                    sf = 0,
                    cu = 0,
                    bi, ki = !1,
                    hf = steelseries.TrendState.OFF,
                    pr = l * .06,
                    wr = l * .29,
                    br = l * .36,
                    gi, bt, kr, kt, dt, lu = bt + (it - p) * dt,
                    k = l,
                    ft = l,
                    lt = k / 2,
                    vt = ft / 2,
                    ri = l * .093457,
                    de = .6 * k,
                    ge = .4 * ft,
                    no = wt === steelseries.GaugeType.TYPE3 ? .6 * k : lt - ri / 2,
                    to = wt === steelseries.GaugeType.TYPE3 ? .72 * ft : .75 * ft,
                    au = Math.floor(k / 10),
                    io = au + "px " + e,
                    ro = au + "px " + et,
                    cf = ft * .13,
                    ur = k * .4,
                    lf = (k - ur) / 2,
                    af = ft * .57,
                    vf, uo = ft * .61,
                    yf = k * .006,
                    pf = !1,
                    dr = p,
                    gr = rt,
                    fr = rt - p,
                    ui = gr - dr,
                    nu = 0,
                    fi = 0,
                    nr = 10,
                    wf = 10,
                    fo = function() {
                        ve ? (fr = v(rt - p, !1), fi = v(fr / (wf - 1), !0), dr = Math.floor(p / fi) * fi, gr = Math.ceil(rt / fi) * fi, nu = v(fi / (nr - 1), !0), p = dr, rt = gr, ui = rt - p) : (fr = rt - p, dr = p, gr = rt, ui = fr, fi = v(fr / (wf - 1), !0), nu = v(fi / (nr - 1), !0));
                        switch (wt.type) {
                            case "type1":
                                gi = 0;
                                bt = f;
                                kr = i;
                                kt = i;
                                dt = kt / ui;
                                break;
                            case "type2":
                                gi = 0;
                                bt = f;
                                kr = i;
                                kt = f;
                                dt = kt / ui;
                                break;
                            case "type3":
                                gi = 0;
                                bt = i;
                                kr = 0;
                                kt = 1.5 * f;
                                dt = kt / ui;
                                break;
                            case "type4":
                            default:
                                gi = 60 * u;
                                bt = i + gi / 2;
                                kr = 0;
                                kt = r - gi;
                                dt = kt / ui
                        }
                        lu = bt + (it - p) * dt
                    },
                    er = t(l, l),
                    bf = er.getContext("2d"),
                    or = t(l, l),
                    yt = or.getContext("2d"),
                    kf, tr = t(ri, ri),
                    df = tr.getContext("2d"),
                    hi = t(ri, ri),
                    gf = hi.getContext("2d"),
                    ir = hi,
                    ei = t(ri, ri),
                    ne = ei.getContext("2d"),
                    ti = t(ri, ri),
                    te = ti.getContext("2d"),
                    gt = ti,
                    ie = t(Math.ceil(l * .028037), Math.ceil(l * .028037)),
                    eo = ie.getContext("2d"),
                    re = t(Math.ceil(l * .028037), Math.ceil(l * .028037)),
                    oo = re.getContext("2d"),
                    sr = t(l, l),
                    ue = sr.getContext("2d"),
                    hr = t(l, l),
                    fe = hr.getContext("2d"),
                    ee, oe, se, he, ce, tu, le;
                ar && iu && (tu = t(10, 10), le = tu.getContext("2d"));
                var so = function(n, t) {
                        n.restore();
                        n.save();
                        n.textAlign = "right";
                        n.strokeStyle = di.textColor;
                        n.fillStyle = di.textColor;
                        (di === steelseries.LcdColor.STANDARD || di === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", n.shadowOffsetX = k * .007, n.shadowOffsetY = k * .007, n.shadowBlur = k * .007);
                        n.font = pe ? ro : io;
                        n.fillText(t.toFixed(du), lf + ur - ur * .05, af + cf * .5 + au * .38, ur * .9);
                        n.restore()
                    },
                    ho = function(n) {
                        n.save();
                        "type1" === wt.type && n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .523364, ft * .130841);
                        ("type1" === wt.type || "type2" === wt.type) && n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .130841, ft * .514018);
                        ("type2" === wt.type || "type3" === wt.type) && n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .831775, ft * .514018);
                        "type3" === wt.type && n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .523364, ft * .831775);
                        "type4" === wt.type && (n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .336448, ft * .803738), n.drawImage(a(Math.ceil(ft * .037383), steelseries.KnobType.STANDARD_KNOB, vi), k * .626168, ft * .803738));
                        n.restore()
                    },
                    co = function() {
                        var t = o.createElement("canvas"),
                            n, i;
                        return t.width = Math.ceil(l * .046728), t.height = Math.ceil(t.width * .9), n = t.getContext("2d"), n.save(), i = n.createLinearGradient(0, .1, 0, t.height * .9), i.addColorStop(0, "#520000"), i.addColorStop(.3, "#fc1d00"), i.addColorStop(.59, "#fc1d00"), i.addColorStop(1, "#520000"), n.fillStyle = i, n.beginPath(), n.moveTo(t.width * .5, .1), n.lineTo(t.width * .9, t.height * .9), n.lineTo(t.width * .1, t.height * .9), n.lineTo(t.width * .5, .1), n.closePath(), n.fill(), n.strokeStyle = "#FFFFFF", n.stroke(), n.restore(), t
                    },
                    ae = function(n, t, i, r, u) {
                        if (t < p ? t = p : t > rt && (t = rt), i < p ? i = p : i > rt && (i = rt), !(t >= i)) {
                            n.save();
                            n.strokeStyle = r;
                            n.fillStyle = r;
                            n.lineWidth = k * .035;
                            var f = kt / ui * t - kt / ui * p,
                                e = f + (i - t) / (ui / kt);
                            n.translate(lt, vt);
                            n.rotate(bt);
                            n.beginPath();
                            u ? (n.moveTo(0, 0), n.arc(0, 0, k * .365 - n.lineWidth / 2, f, e, !1)) : n.arc(0, 0, k * .365, f, e, !1);
                            u ? (n.moveTo(0, 0), n.fill()) : n.stroke();
                            n.translate(-lt, -vt);
                            n.restore()
                        }
                    },
                    lo = function(n, t) {
                        var y = Math.ceil(k * .04),
                            o = bt,
                            r = dt * nu,
                            u, s = p,
                            h = nr - 1,
                            l = k * .38,
                            w = k * .35,
                            b = k * .355,
                            d = k * .36,
                            v = k * .3,
                            c = k * .1,
                            g = nr / 2,
                            nt = parseFloat(rt.toFixed(2)),
                            a;
                        for (ai.labelColor.setAlpha(1), n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = y + "px " + e, n.strokeStyle = ai.labelColor.getRgbaColor(), n.fillStyle = ai.labelColor.getRgbaColor(), n.translate(lt, vt), n.rotate(bt), (wt.type === "type1" || wt.type === "type2") && (c = k * .04), a = p; parseFloat(a.toFixed(2)) <= nt; a += nu) {
                            if (u = r + i, h++, h === nr) {
                                n.lineWidth = 1.5;
                                n.beginPath();
                                n.moveTo(l, 0);
                                n.lineTo(w, 0);
                                n.closePath();
                                n.stroke();
                                n.save();
                                n.translate(v, 0);
                                switch (be.type) {
                                    case "horizontal":
                                        u = -o;
                                        break;
                                    case "tangent":
                                        u = o <= i + f ? f : 0;
                                        break;
                                    case "normal":
                                    default:
                                        u = i
                                }
                                n.rotate(u);
                                switch (t.format) {
                                    case "fractional":
                                        n.fillText(s.toFixed(gu), 0, 0, c);
                                        break;
                                    case "scientific":
                                        n.fillText(s.toPrecision(2), 0, 0, c);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(s.toFixed(0), 0, 0, c)
                                }
                                n.translate(-v, 0);
                                n.restore();
                                s += fi;
                                h = 0;
                                n.rotate(r);
                                o += r;
                                continue
                            }
                            0 == nr % 2 && h === g ? (n.lineWidth = 1, n.beginPath(), n.moveTo(l, 0), n.lineTo(b, 0), n.closePath(), n.stroke()) : (n.lineWidth = .5, n.beginPath(), n.moveTo(l, 0), n.lineTo(d, 0), n.closePath(), n.stroke());
                            n.rotate(r);
                            o += r
                        }
                        n.translate(-lt, -vt);
                        n.restore()
                    },
                    ct = function(n) {
                        var t, r, f;
                        n = n || {};
                        var e = undefined === n.frame ? !1 : n.frame,
                            u = undefined === n.background ? !1 : n.background,
                            o = undefined === n.led ? !1 : n.led,
                            s = undefined === n.userLed ? !1 : n.userLed,
                            c = undefined === n.pointer ? !1 : n.pointer,
                            a = undefined === n.foreground ? !1 : n.foreground,
                            v = undefined === n.trend ? !1 : n.trend,
                            y = undefined === n.odo ? !1 : n.odo;
                        if (pf = !0, fo(), e && wu && d(bf, pu, lt, vt, k, ft), u && bu && (nt(yt, ai, lt, vt, k, ft), ht(yt, we, lt, vt, k, ft)), o && (df.drawImage(h(Math.ceil(l * .093457), 1, ru), 0, 0), gf.drawImage(h(Math.ceil(l * .093457), 0, ru), 0, 0)), s && (ne.drawImage(h(Math.ceil(l * .093457), 1, fu), 0, 0), te.drawImage(h(Math.ceil(l * .093457), 0, fu), 0, 0)), ou && eo.drawImage(b(Math.ceil(l * .028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), !0, !0), 0, 0), su && oo.drawImage(b(Math.ceil(l * .028037), steelseries.ColorDef.RED.medium.getRgbaColor(), !0), 0, 0), u && bu) {
                            if (ho(yt), null !== ci && 0 < ci.length) {
                                t = ci.length;
                                do t--, ae(yt, ci[t].start, ci[t].stop, ci[t].color, !1); while (0 < t)
                            }
                            if (null !== li && 0 < li.length) {
                                r = li.length;
                                do r--, ae(yt, li[r].start, li[r].stop, li[r].color, !0); while (0 < r)
                            }
                            lo(yt, uf);
                            pt(yt, k, ft, vu, yu, ai, !0, !0)
                        }
                        u && nf && (yt.save(), yt.translate(lt, vt), yt.rotate(bt + (ni - p) * dt + i), yt.translate(-lt, -vt), yt.drawImage(co(), k * .475, ft * .13), yt.translate(lt, vt), yt.restore());
                        u && iu && (ar && y ? (ce = new steelseries.Odometer("", {
                            _context: le,
                            height: l * .075,
                            decimals: si.decimals,
                            digits: si.digits === undefined ? 5 : si.digits,
                            valueForeColor: si.valueForeColor,
                            valueBackColor: si.valueBackColor,
                            decimalForeColor: si.decimalForeColor,
                            decimalBackColor: si.decimalBackColor,
                            font: si.font,
                            value: it
                        }), vf = (k - tu.width) / 2) : ar || (kf = tt(ur, cf, di), yt.drawImage(kf, lf, af)));
                        c && st(ue, k, oi, ku, ai.labelColor);
                        a && rf && (f = oi.type === "type15" || oi.type === "type16" ? !1 : !0, g(fe, tf, k, ft, f, ye, vi, wt));
                        v && hu && (ee = ut(pr, steelseries.TrendState.UP, lr), oe = ut(pr, steelseries.TrendState.STEADY, lr), se = ut(pr, steelseries.TrendState.DOWN, lr), he = ut(pr, steelseries.TrendState.OFF, lr))
                    },
                    at = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.led ? !1 : n.led,
                            u = undefined === n.userLed ? !1 : n.userLed,
                            f = undefined === n.pointer ? !1 : n.pointer,
                            e = undefined === n.foreground ? !1 : n.foreground;
                        t && (er.width = l, er.height = l, bf = er.getContext("2d"));
                        i && (or.width = l, or.height = l, yt = or.getContext("2d"));
                        r && (tr.width = Math.ceil(l * .093457), tr.height = Math.ceil(l * .093457), df = tr.getContext("2d"), hi.width = Math.ceil(l * .093457), hi.height = Math.ceil(l * .093457), gf = hi.getContext("2d"), ir = hi);
                        u && (ei.width = Math.ceil(l * .093457), ei.height = Math.ceil(l * .093457), ne = ei.getContext("2d"), ti.width = Math.ceil(l * .093457), ti.height = Math.ceil(l * .093457), te = ti.getContext("2d"), gt = ti);
                        f && (sr.width = l, sr.height = l, ue = sr.getContext("2d"));
                        e && (hr.width = l, hr.height = l, fe = hr.getContext("2d"))
                    },
                    ao = function() {
                        uu && (ir = ir === tr ? hi : tr, ki || (ki = !0, s(of.repaint)))
                    },
                    vo = function() {
                        eu && (gt = gt === ei ? ti : ei, ki || (ki = !0, s(of.repaint)))
                    },
                    cr = function(n) {
                        n ? sf = setInterval(ao, 1e3) : (clearInterval(sf), ir = hi)
                    },
                    yo = function(n) {
                        n ? cu = setInterval(vo, 1e3) : (clearInterval(cu), gt = ti)
                    };
                return this.setValue = function(n) {
                    n = parseFloat(n);
                    var t = n < p ? p : n > rt ? rt : n;
                    return it !== t && (it = t, it > wi && (wi = it), it < pi && (pi = it), it >= ni && !ot && ii || it <= ni && !ot && !ii ? (ot = !0, cr(ot), rr && yi.play()) : (it < ni && ot && ii || it > ni && ot && !ii) && (ot = !1, cr(ot), rr && yi.pause()), this.repaint()), this
                }, this.getValue = function() {
                    return it
                }, this.setOdoValue = function(n) {
                    n = parseFloat(n);
                    var t = n < 0 ? 0 : n;
                    return vr !== t && (vr = t, this.repaint()), this
                }, this.getOdoValue = function() {
                    return vr
                }, this.setValueAnimated = function(n, t) {
                    n = parseFloat(n);
                    var r = n < p ? p : n > rt ? rt : n,
                        u = this,
                        i;
                    return it !== r && (undefined !== bi && bi.isPlaying && bi.stop(), i = ef * Math.abs(r - it) / (rt - p), i = Math.max(i, ef / 5), bi = new Tween({}, "", Tween.regularEaseInOut, it, r, i), bi.onMotionChanged = function(n) {
                        it = n.target._pos;
                        it >= ni && !ot && ii || it <= ni && !ot && !ii ? (ot = !0, cr(ot), rr && yi.play()) : (it < ni && ot && ii || it > ni && ot && !ii) && (ot = !1, cr(ot), rr && yi.pause());
                        it > wi && (wi = it);
                        it < pi && (pi = it);
                        ki || (ki = !0, s(u.repaint))
                    }, t && typeof t == "function" && (bi.onMotionFinished = t), bi.start()), this
                }, this.resetMinMeasuredValue = function() {
                    pi = it;
                    this.repaint()
                }, this.resetMaxMeasuredValue = function() {
                    return wi = it, this.repaint(), this
                }, this.setMinMeasuredValueVisible = function(n) {
                    return ou = !!n, this.repaint(), this
                }, this.setMaxMeasuredValueVisible = function(n) {
                    return su = !!n, this.repaint(), this
                }, this.setMaxMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < p ? p : n > rt ? rt : n;
                    return wi = t, this.repaint(), this
                }, this.setMinMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < p ? p : n > rt ? rt : n;
                    return pi = t, this.repaint(), this
                }, this.setTitleString = function(n) {
                    return vu = n, at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.setUnitString = function(n) {
                    return yu = n, at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.setMinValue = function(n) {
                    return p = parseFloat(n), at({
                        frame: !0,
                        background: !0
                    }), ct({
                        frame: !0,
                        background: !0
                    }), this.repaint(), this
                }, this.getMinValue = function() {
                    return p
                }, this.setMaxValue = function(n) {
                    return rt = parseFloat(n), at({
                        frame: !0,
                        background: !0
                    }), ct({
                        frame: !0,
                        background: !0
                    }), this.repaint(), this
                }, this.getMaxValue = function() {
                    return rt
                }, this.setThreshold = function(n) {
                    n = parseFloat(n);
                    var t = n < p ? p : n > rt ? rt : n;
                    return ni = t, at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.setArea = function(n) {
                    return li = n, at({
                        background: !0,
                        foreground: !0
                    }), ct({
                        background: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setSection = function(n) {
                    return ci = n, at({
                        background: !0,
                        foreground: !0
                    }), ct({
                        background: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setThresholdVisible = function(n) {
                    return nf = !!n, this.repaint(), this
                }, this.setThresholdRising = function(n) {
                    return ii = !!n, ot = !ot, cr(ot), this.repaint(), this
                }, this.setLcdDecimals = function(n) {
                    return du = parseInt(n, 10), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return at({
                        frame: !0
                    }), pu = n, ct({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return at({
                        background: !0,
                        pointer: oi.type === "type2" || oi.type === "type13" ? !0 : !1
                    }), ai = n, ct({
                        background: !0,
                        pointer: oi.type === "type2" || oi.type === "type13" ? !0 : !1
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return at({
                        foreground: !0
                    }), tf = n, ct({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerType = function(n) {
                    return at({
                        pointer: !0,
                        foreground: !0
                    }), oi = n, ct({
                        pointer: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return at({
                        pointer: !0
                    }), ku = n, ct({
                        pointer: !0
                    }), this.repaint(), this
                }, this.setLedColor = function(n) {
                    return at({
                        led: !0
                    }), ru = n, ct({
                        led: !0
                    }), this.repaint(), this
                }, this.setUserLedColor = function(n) {
                    return at({
                        userLed: !0
                    }), fu = n, ct({
                        userLed: !0
                    }), this.repaint(), this
                }, this.toggleUserLed = function() {
                    return gt = gt === ei ? ti : ei, this.repaint(), this
                }, this.setUserLedOnOff = function(n) {
                    return gt = !0 === n ? ei : ti, this.repaint(), this
                }, this.blinkUserLed = function(n) {
                    return n ? yr || (yo(!0), yr = !0) : yr && (clearInterval(cu), yr = !1), this
                }, this.setLedVisible = function(n) {
                    return uu = !!n, this.repaint(), this
                }, this.setUserLedVisible = function(n) {
                    return eu = !!n, this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return di = n, at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.setTrend = function(n) {
                    return hf = n, this.repaint(), this
                }, this.setTrendVisible = function(n) {
                    return hu = !!n, this.repaint(), this
                }, this.setFractionalScaleDecimals = function(n) {
                    return gu = parseInt(n, 10), at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.setLabelNumberFormat = function(n) {
                    return uf = n, at({
                        background: !0
                    }), ct({
                        background: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    if (pf || ct({
                            frame: !0,
                            background: !0,
                            led: !0,
                            userLed: !0,
                            pointer: !0,
                            trend: !0,
                            foreground: !0,
                            odo: !0
                        }), y.clearRect(0, 0, l, l), wu && y.drawImage(er, 0, 0), y.drawImage(or, 0, 0), iu && (ar ? (ce.setValue(ke ? it : vr), y.drawImage(tu, vf, uo)) : so(y, it)), uu && y.drawImage(ir, de, ge), eu && y.drawImage(gt, no, to), hu) switch (hf.state) {
                        case "up":
                            y.drawImage(ee, wr, br);
                            break;
                        case "steady":
                            y.drawImage(oe, wr, br);
                            break;
                        case "down":
                            y.drawImage(se, wr, br);
                            break;
                        case "off":
                            y.drawImage(he, wr, br)
                    }
                    ou && (y.save(), y.translate(lt, vt), y.rotate(bt + i + (pi - p) * dt), y.translate(-lt, -vt), y.drawImage(ie, y.canvas.width * .4865, y.canvas.height * .105), y.restore());
                    su && (y.save(), y.translate(lt, vt), y.rotate(bt + i + (wi - p) * dt), y.translate(-lt, -vt), y.drawImage(re, y.canvas.width * .4865, y.canvas.height * .105), y.restore());
                    lu = bt + i + (it - p) * dt;
                    y.save();
                    y.translate(lt, vt);
                    y.rotate(lu);
                    y.translate(-lt, -vt);
                    y.shadowColor = "rgba(0, 0, 0, 0.8)";
                    y.shadowOffsetX = y.shadowOffsetY = yf;
                    y.shadowBlur = yf * 2;
                    y.drawImage(sr, 0, 0);
                    y.restore();
                    rf && y.drawImage(hr, 0, 0);
                    ki = !1
                }, this.repaint(), this
            },
            nr = function(n, c) {
                var li;
                c = c || {};
                var hi = undefined === c.gaugeType ? steelseries.GaugeType.TYPE4 : c.gaugeType,
                    y = undefined === c.size ? 0 : c.size,
                    l = undefined === c.minValue ? 0 : c.minValue,
                    p = undefined === c.maxValue ? l + 100 : c.maxValue,
                    re = undefined === c.niceScale ? !0 : c.niceScale,
                    ni = undefined === c.threshold ? (p - l) / 2 + l : c.threshold,
                    ti = undefined === c.thresholdRising ? !0 : c.thresholdRising,
                    ci = undefined === c.section ? null : c.section,
                    su = undefined === c.useSectionColors ? !1 : c.useSectionColors,
                    hu = undefined === c.titleString ? "" : c.titleString,
                    cu = undefined === c.unitString ? "" : c.unitString,
                    lu = undefined === c.frameDesign ? steelseries.FrameDesign.METAL : c.frameDesign,
                    au = undefined === c.frameVisible ? !0 : c.frameVisible,
                    yi = undefined === c.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : c.backgroundColor,
                    vu = undefined === c.backgroundVisible ? !0 : c.backgroundVisible,
                    sr = undefined === c.valueColor ? steelseries.ColorDef.RED : c.valueColor,
                    pi = undefined === c.lcdColor ? steelseries.LcdColor.STANDARD : c.lcdColor,
                    yu = undefined === c.lcdVisible ? !0 : c.lcdVisible,
                    pu = undefined === c.lcdDecimals ? 2 : c.lcdDecimals,
                    ue = undefined === c.digitalFont ? !1 : c.digitalFont,
                    wu = undefined === c.fractionalScaleDecimals ? 1 : c.fractionalScaleDecimals,
                    fe = undefined === c.customLayer ? null : c.customLayer,
                    dr = undefined === c.ledColor ? steelseries.LedColor.RED_LED : c.ledColor,
                    gr = undefined === c.ledVisible ? !0 : c.ledVisible,
                    nu = undefined === c.userLedColor ? steelseries.LedColor.GREEN_LED : c.userLedColor,
                    tu = undefined === c.userLedVisible ? !1 : c.userLedVisible,
                    bu = undefined === c.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : c.labelNumberFormat,
                    ku = undefined === c.foregroundType ? steelseries.ForegroundType.TYPE1 : c.foregroundType,
                    du = undefined === c.foregroundVisible ? !0 : c.foregroundVisible,
                    gi = undefined === c.playAlarm ? !1 : c.playAlarm,
                    gu = undefined === c.alarmSound ? !1 : c.alarmSound,
                    nr = undefined === c.valueGradient ? null : c.valueGradient,
                    nf = undefined === c.useValueGradient ? !1 : c.useValueGradient,
                    ee = undefined === c.tickLabelOrientation ? hi === steelseries.GaugeType.TYPE1 ? steelseries.TickLabelOrientation.TANGENT : steelseries.TickLabelOrientation.NORMAL : c.tickLabelOrientation,
                    iu = undefined === c.trendVisible ? !1 : c.trendVisible,
                    hr = undefined === c.trendColors ? [steelseries.LedColor.RED_LED, steelseries.LedColor.GREEN_LED, steelseries.LedColor.CYAN_LED] : c.trendColors,
                    tf = undefined === c.fullScaleDeflectionTime ? 2.5 : c.fullScaleDeflectionTime,
                    k = w(n);
                y === 0 && (y = Math.min(k.canvas.width, k.canvas.height));
                k.canvas.width = y;
                k.canvas.height = y;
                gi && gu !== !1 && (li = o.createElement("audio"), li.setAttribute("src", gu), li.setAttribute("preload", "auto"));
                var ot = l,
                    wt = p - l,
                    rt = !1,
                    rf = 0,
                    cr = !1,
                    ru = 0,
                    ai, uf = this,
                    vi = !1,
                    yt, ct, wi, ei, it, ri, kt, oe, bi = [],
                    lr = !1,
                    uu = !1,
                    a = y,
                    lt = y,
                    st = a / 2,
                    at = lt / 2,
                    fu = Math.floor(a / 10),
                    se = fu + "px " + e,
                    he = fu + "px " + et,
                    eu = lt * .13,
                    tr = a * .4,
                    ff = (a - tr) / 2,
                    ef = lt / 2 - eu / 2,
                    ce = a * .116822,
                    le = a * .485981,
                    b = Math.ceil(y * .093457),
                    of = a * .53,
                    sf = lt * .61,
                    ae = hi === steelseries.GaugeType.TYPE3 ? .7 * a : st - b / 2,
                    ve = hi === steelseries.GaugeType.TYPE3 ? .61 * lt : .75 * lt,
                    hf = steelseries.TrendState.OFF,
                    ar = y * .06,
                    vr = y * .38,
                    yr = y * .57;
                switch (hi.type) {
                    case "type1":
                        yt = 0;
                        ct = f;
                        wi = 0;
                        ei = i;
                        it = i;
                        ri = it * ii;
                        kt = it / wt;
                        break;
                    case "type2":
                        yt = 0;
                        ct = f;
                        wi = 0;
                        ei = i;
                        it = f;
                        ri = it * ii;
                        kt = it / wt;
                        break;
                    case "type3":
                        yt = 0;
                        ct = i;
                        wi = -i;
                        ei = 0;
                        it = 1.5 * f;
                        ri = it * ii;
                        kt = it / wt;
                        break;
                    case "type4":
                    default:
                        yt = 60 * u;
                        ct = i + yt / 2;
                        wi = -r / 6;
                        ei = 0;
                        it = r - yt;
                        ri = it * ii;
                        kt = it / wt
                }
                var ir = t(y, y),
                    cf = ir.getContext("2d"),
                    rr = t(y, y),
                    oi = rr.getContext("2d"),
                    lf, ur = t(Math.ceil(y * .060747), Math.ceil(y * .023364)),
                    ou = ur.getContext("2d"),
                    ki = t(b, b),
                    af = ki.getContext("2d"),
                    si = t(b, b),
                    vf = si.getContext("2d"),
                    di = si,
                    ui = t(b, b),
                    yf = ui.getContext("2d"),
                    dt = t(b, b),
                    pf = dt.getContext("2d"),
                    bt = dt,
                    ye, fr = t(y, y),
                    wf = fr.getContext("2d"),
                    bf, kf, df, gf, ne = !1,
                    pr = l,
                    wr = p,
                    er = p - l;
                wt = wr - pr;
                var br = 0,
                    fi = 0,
                    kr = 10,
                    te = 10,
                    pe = function() {
                        re ? (er = v(p - l, !1), fi = v(er / (te - 1), !0), pr = Math.floor(l / fi) * fi, wr = Math.ceil(p / fi) * fi, br = v(fi / (kr - 1), !0), l = pr, p = wr, wt = p - l) : (er = p - l, pr = l, wr = p, wt = er, fi = v(er / (te - 1), !0), br = v(fi / (kr - 1), !0));
                        switch (hi.type) {
                            case "type1":
                                yt = 0;
                                ct = f;
                                ei = i;
                                it = i;
                                kt = it / wt;
                                break;
                            case "type2":
                                yt = 0;
                                ct = f;
                                ei = i;
                                it = f;
                                kt = it / wt;
                                break;
                            case "type3":
                                yt = 0;
                                ct = i;
                                ei = 0;
                                it = 1.5 * f;
                                kt = it / wt;
                                break;
                            case "type4":
                            default:
                                yt = 60 * u;
                                ct = i + yt / 2;
                                ei = 0;
                                it = r - yt;
                                kt = it / wt
                        }
                        oe = ct + (ot - l) * kt
                    },
                    ft = function(n) {
                        var t;
                        n = n || {};
                        var r = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            u = undefined === n.led ? !1 : n.led,
                            f = undefined === n.userLed ? !1 : n.userLed,
                            e = undefined === n.value ? !1 : n.value,
                            o = undefined === n.foreground ? !1 : n.foreground,
                            s = undefined === n.trend ? !1 : n.trend;
                        if (ne = !0, pe(), r && au && d(cf, lu, st, at, a, lt), i && vu && (nt(oi, yi, st, at, a, lt), ht(oi, fe, st, at, a, lt)), u && (af.drawImage(h(b, 1, dr), 0, 0), vf.drawImage(h(b, 0, dr), 0, 0), ye = oi.getImageData(of, sf, b, b)), f && (yf.drawImage(h(Math.ceil(b), 1, nu), 0, 0), pf.drawImage(h(Math.ceil(b), 0, nu), 0, 0)), i && we(oi), i && vu && (ke(oi, bu), pt(oi, a, lt, hu, cu, yi, !0, !0)), i && yu && (lf = tt(tr, eu, pi), oi.drawImage(lf, ff, ef)), lr = !1, su && null !== ci && 0 < ci.length) {
                            lr = !0;
                            t = ci.length;
                            bi = [];
                            do t--, bi.push({
                                start: (ci[t].start + Math.abs(l)) / (p - l) * ri,
                                stop: (ci[t].stop + Math.abs(l)) / (p - l) * ri,
                                color: gt(ci[t].color)
                            }); while (0 < t)
                        }
                        uu = !1;
                        nf && nr !== null && (lr = !1, uu = !0);
                        e && ie(ou, sr);
                        o && du && g(wf, ku, a, lt, !1);
                        s && iu && (bf = ut(ar, steelseries.TrendState.UP, hr), kf = ut(ar, steelseries.TrendState.STEADY, hr), df = ut(ar, steelseries.TrendState.DOWN, hr), gf = ut(ar, steelseries.TrendState.OFF, hr))
                    },
                    vt = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.led ? !1 : n.led,
                            u = undefined === n.userLed ? !1 : n.userLed,
                            f = undefined === n.value ? !1 : n.value,
                            e = undefined === n.foreground ? !1 : n.foreground;
                        t && (ir.width = y, ir.height = y, cf = ir.getContext("2d"));
                        i && (rr.width = y, rr.height = y, oi = rr.getContext("2d"));
                        f && (ur.width = Math.ceil(y * .060747), ur.height = Math.ceil(y * .023364), ou = ur.getContext("2d"));
                        r && (ki.width = Math.ceil(b), ki.height = Math.ceil(b), af = ki.getContext("2d"), si.width = Math.ceil(b), si.height = Math.ceil(b), vf = si.getContext("2d"), di = si);
                        u && (ui.width = Math.ceil(b), ui.height = Math.ceil(b), yf = ui.getContext("2d"), dt.width = Math.ceil(b), dt.height = Math.ceil(b), pf = dt.getContext("2d"), bt = dt);
                        e && (fr.width = y, fr.height = y, wf = fr.getContext("2d"))
                    },
                    we = function(n) {
                        var t, r, i;
                        n.save();
                        n.save();
                        n.lineWidth = y * .085;
                        n.beginPath();
                        n.translate(st, at);
                        n.rotate(ct - 4 * u);
                        n.translate(-st, -at);
                        n.arc(st, at, a * .35514, 0, it + 8 * u, !1);
                        n.rotate(-ct);
                        t = n.createLinearGradient(0, .107476 * lt, 0, .897195 * lt);
                        t.addColorStop(0, "#000000");
                        t.addColorStop(.22, "#333333");
                        t.addColorStop(.76, "#333333");
                        t.addColorStop(1, "#cccccc");
                        n.strokeStyle = t;
                        n.stroke();
                        n.restore();
                        n.save();
                        n.lineWidth = y * .075;
                        n.beginPath();
                        n.translate(st, at);
                        n.rotate(ct - 4 * u);
                        n.translate(-st, -at);
                        n.arc(st, at, a * .35514, 0, it + 8 * u, !1);
                        n.rotate(-ct);
                        r = n.createLinearGradient(0, .112149 * lt, 0, .892523 * lt);
                        r.addColorStop(0, "#111111");
                        r.addColorStop(1, "#333333");
                        n.strokeStyle = r;
                        n.stroke();
                        n.restore();
                        var e = (a * .116822 + a * .060747) / 2,
                            o = (a * .485981 + a * .023364) / 2,
                            f = n.createRadialGradient(e, o, 0, e, o, .030373 * a);
                        for (f.addColorStop(0, "#3c3c3c"), f.addColorStop(1, "#323232"), i = 0, i = 0; i <= ri; i += 5) n.save(), n.translate(st, at), n.rotate(i * u + wi), n.translate(-st, -at), n.beginPath(), n.rect(a * .116822, a * .485981, a * .060747, a * .023364), n.closePath(), n.fillStyle = f, n.fill(), n.restore();
                        n.restore()
                    },
                    ie = function(n, t) {
                        n.save();
                        n.beginPath();
                        n.rect(0, 0, n.canvas.width, n.canvas.height);
                        n.closePath();
                        var r = n.canvas.width / 2,
                            u = n.canvas.height / 2,
                            i = k.createRadialGradient(r, u, 0, r, u, n.canvas.width / 2);
                        i.addColorStop(0, t.light.getRgbaColor());
                        i.addColorStop(1, t.dark.getRgbaColor());
                        n.fillStyle = i;
                        n.fill();
                        n.restore()
                    },
                    be = function(n, t) {
                        n.save();
                        n.textAlign = "right";
                        n.strokeStyle = pi.textColor;
                        n.fillStyle = pi.textColor;
                        (pi === steelseries.LcdColor.STANDARD || pi === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", n.shadowOffsetX = a * .007, n.shadowOffsetY = a * .007, n.shadowBlur = a * .007);
                        n.font = ue ? he : se;
                        n.fillText(t.toFixed(pu), ff + tr - tr * .05, ef + eu * .5 + fu * .38, tr * .9);
                        n.restore()
                    },
                    ke = function(n, t) {
                        var o = ct,
                            r = kt * br,
                            u, w = Math.ceil(a * .04),
                            s = l,
                            c = kr - 1,
                            y = a * .28,
                            h = a * .1,
                            b = parseFloat(p.toFixed(2)),
                            v;
                        for (yi.labelColor.setAlpha(1), n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = w + "px " + e, n.strokeStyle = yi.labelColor.getRgbaColor(), n.fillStyle = yi.labelColor.getRgbaColor(), n.translate(st, at), n.rotate(ct), (hi.type === "type1" || hi.type === "type2") && (h = a * .0375), v = l; parseFloat(v.toFixed(2)) <= b; v += br) {
                            if (u = +r + i, c++, c === kr) {
                                n.save();
                                n.translate(y, 0);
                                switch (ee.type) {
                                    case "horizontal":
                                        u = -o;
                                        break;
                                    case "tangent":
                                        u = o <= i + f ? f : 0;
                                        break;
                                    case "normal":
                                    default:
                                        u = i
                                }
                                n.rotate(u);
                                switch (t.format) {
                                    case "fractional":
                                        n.fillText(s.toFixed(wu), 0, 0, h);
                                        break;
                                    case "scientific":
                                        n.fillText(s.toPrecision(2), 0, 0, h);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(s.toFixed(0), 0, 0, h)
                                }
                                n.translate(-y, 0);
                                n.restore();
                                s += fi;
                                c = 0;
                                n.rotate(r);
                                o += r;
                                continue
                            }
                            n.rotate(r);
                            o += r
                        }
                        n.translate(-st, -at);
                        n.restore()
                    },
                    or = function(n) {
                        n ? rf = setInterval(ge, 1e3) : (clearInterval(rf), di = si)
                    },
                    de = function(n) {
                        n ? ru = setInterval(no, 1e3) : (clearInterval(ru), bt = dt)
                    },
                    ge = function() {
                        gr && (di = di === ki ? si : ki, vi || (vi = !0, s(uf.repaint)))
                    },
                    no = function() {
                        tu && (bt = bt === ui ? dt : ui, vi || (vi = !0, s(uf.repaint)))
                    };
                return this.setValue = function(n) {
                    n = parseFloat(n);
                    var t = n < l ? l : n > p ? p : n;
                    return ot !== t && (ot = t, ot >= ni && !rt && ti || ot <= ni && !rt && !ti ? (rt = !0, or(rt), gi && li.play()) : (ot < ni && rt && ti || ot > ni && rt && !ti) && (rt = !1, or(rt), gi && li.pause()), this.repaint()), this
                }, this.getValue = function() {
                    return ot
                }, this.setValueAnimated = function(n, t) {
                    n = parseFloat(n);
                    var r = n < l ? l : n > p ? p : n,
                        u = this,
                        i;
                    return ot !== r && (undefined !== ai && ai.isPlaying && ai.stop(), i = tf * Math.abs(r - ot) / (p - l), i = Math.max(i, tf / 5), ai = new Tween({}, "", Tween.regularEaseInOut, ot, r, i), ai.onMotionChanged = function(n) {
                        ot = n.target._pos;
                        ot >= ni && !rt && ti || ot <= ni && !rt && !ti ? (rt = !0, or(rt), gi && li.play()) : (ot < ni && rt && ti || ot > ni && rt && !ti) && (rt = !1, or(rt), gi && li.pause());
                        vi || (vi = !0, s(u.repaint))
                    }, t && typeof t == "function" && (ai.onMotionFinished = t), ai.start()), this
                }, this.setFrameDesign = function(n) {
                    return vt({
                        frame: !0
                    }), lu = n, ft({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return vt({
                        background: !0,
                        led: !0
                    }), yi = n, ft({
                        background: !0,
                        led: !0
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return vt({
                        foreground: !0
                    }), ku = n, ft({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setValueColor = function(n) {
                    return vt({
                        value: !0
                    }), sr = n, ft({
                        value: !0
                    }), this.repaint(), this
                }, this.setLedColor = function(n) {
                    return vt({
                        led: !0
                    }), dr = n, ft({
                        led: !0
                    }), this.repaint(), this
                }, this.setUserLedColor = function(n) {
                    return vt({
                        userLed: !0
                    }), nu = n, ft({
                        userLed: !0
                    }), this.repaint(), this
                }, this.toggleUserLed = function() {
                    return bt = bt === ui ? dt : ui, this.repaint(), this
                }, this.setUserLedOnOff = function(n) {
                    return bt = !0 === n ? ui : dt, this.repaint(), this
                }, this.blinkUserLed = function(n) {
                    return n ? cr || (de(!0), cr = !0) : cr && (clearInterval(ru), cr = !1), this
                }, this.setLedVisible = function(n) {
                    return gr = !!n, this.repaint(), this
                }, this.setUserLedVisible = function(n) {
                    return tu = !!n, this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return pi = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.setLcdDecimals = function(n) {
                    return pu = parseInt(n, 10), this.repaint(), this
                }, this.setSection = function(n) {
                    return ci = n, ft(), this.repaint(), this
                }, this.setSectionActive = function(n) {
                    return su = n, ft(), this.repaint(), this
                }, this.setGradient = function(n) {
                    return nr = n, ft(), this.repaint(), this
                }, this.setGradientActive = function(n) {
                    return nf = n, ft(), this.repaint(), this
                }, this.setMinValue = function(n) {
                    return l = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.getMinValue = function() {
                    return l
                }, this.setMaxValue = function(n) {
                    return p = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.getMaxValue = function() {
                    return p
                }, this.setThreshold = function(n) {
                    n = parseFloat(n);
                    var t = n < l ? l : n > p ? p : n;
                    return ni = t, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.setThresholdRising = function(n) {
                    return ti = !!n, rt = !rt, or(rt), this.repaint(), this
                }, this.setTitleString = function(n) {
                    return hu = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.setUnitString = function(n) {
                    return cu = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.setTrend = function(n) {
                    return hf = n, this.repaint(), this
                }, this.setTrendVisible = function(n) {
                    return iu = !!n, this.repaint(), this
                }, this.setFractionalScaleDecimals = function(n) {
                    wu = parseInt(n, 10);
                    vt({
                        background: !0
                    });
                    ft({
                        background: !0
                    });
                    this.repaint()
                }, this.setLabelNumberFormat = function(n) {
                    return bu = n, vt({
                        background: !0
                    }), ft({
                        background: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    var s = (ot - l) / (p - l) * ri,
                        t, f = sr,
                        n, i, e, o, r;
                    for (ne || ft({
                            frame: !0,
                            background: !0,
                            led: !0,
                            userLed: !0,
                            value: !0,
                            trend: !0,
                            foreground: !0
                        }), k.clearRect(0, 0, y, y), au && k.drawImage(ir, 0, 0), k.drawImage(rr, 0, 0), n = 0; n <= s; n += 5) {
                        if (t = sr, uu) e = l + n / ri * (p - l), o = nr.getEnd() - nr.getStart(), r = (e - l) / o, r = Math.max(Math.min(r, 1), 0), t = gt(nr.getColorAt(r).getRgbaColor());
                        else if (lr)
                            for (i = 0; i < bi.length; i++)
                                if (n >= bi[i].start && n < bi[i].stop) {
                                    t = bi[i].color;
                                    break
                                }
                        f.medium.getHexColor() !== t.medium.getHexColor() && (ie(ou, t), f = t);
                        k.save();
                        k.translate(st, at);
                        k.rotate(n * u + wi);
                        k.translate(-st, -at);
                        k.drawImage(ur, ce, le);
                        k.restore()
                    }
                    if (yu && be(k, ot), gr && k.drawImage(di, of, sf), tu && k.drawImage(bt, ae, ve), iu) switch (hf.state) {
                        case "up":
                            k.drawImage(bf, vr, yr);
                            break;
                        case "steady":
                            k.drawImage(kf, vr, yr);
                            break;
                        case "down":
                            k.drawImage(df, vr, yr);
                            break;
                        case "off":
                            k.drawImage(gf, vr, yr)
                    }
                    du && k.drawImage(fr, 0, 0);
                    vi = !1
                }, this.repaint(), this
            },
            tr = function(n, r) {
                var bt;
                r = r || {};
                var ft = undefined === r.orientation ? steelseries.Orientation.NORTH : r.orientation,
                    l = undefined === r.size ? 0 : r.size,
                    tt = undefined === r.minValue ? 0 : r.minValue,
                    ut = undefined === r.maxValue ? tt + 100 : r.maxValue,
                    hu = undefined === r.niceScale ? !0 : r.niceScale,
                    ot = undefined === r.threshold ? (ut - tt) / 2 + tt : r.threshold,
                    ni = undefined === r.section ? null : r.section,
                    ti = undefined === r.area ? null : r.area,
                    ur = undefined === r.titleString ? "" : r.titleString,
                    fr = undefined === r.unitString ? "" : r.unitString,
                    er = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                    or = undefined === r.frameVisible ? !0 : r.frameVisible,
                    lt = undefined === r.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : r.backgroundColor,
                    sr = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                    at = undefined === r.pointerType ? steelseries.PointerType.TYPE1 : r.pointerType,
                    hr = undefined === r.pointerColor ? steelseries.ColorDef.RED : r.pointerColor,
                    cu = undefined === r.knobType ? steelseries.KnobType.STANDARD_KNOB : r.knobType,
                    wt = undefined === r.knobStyle ? steelseries.KnobStyle.SILVER : r.knobStyle,
                    gi = undefined === r.ledColor ? steelseries.LedColor.RED_LED : r.ledColor,
                    nr = undefined === r.ledVisible ? !0 : r.ledVisible,
                    cr = undefined === r.thresholdVisible ? !0 : r.thresholdVisible,
                    ht = undefined === r.thresholdRising ? !0 : r.thresholdRising,
                    tr = undefined === r.minMeasuredValueVisible ? !1 : r.minMeasuredValueVisible,
                    ir = undefined === r.maxMeasuredValueVisible ? !1 : r.maxMeasuredValueVisible,
                    lr = undefined === r.foregroundType ? steelseries.ForegroundType.TYPE1 : r.foregroundType,
                    ar = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                    lu = undefined === r.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : r.labelNumberFormat,
                    si = undefined === r.playAlarm ? !1 : r.playAlarm,
                    vr = undefined === r.alarmSound ? !1 : r.alarmSound,
                    yr = undefined === r.fullScaleDeflectionTime ? 2.5 : r.fullScaleDeflectionTime,
                    c = w(n);
                l === 0 && (l = Math.min(c.canvas.width, c.canvas.height));
                c.canvas.width = l;
                c.canvas.height = l;
                si && vr !== !1 && (bt = o.createElement("audio"), bt.setAttribute("src", vr), bt.setAttribute("preload", "auto"));
                var pr = steelseries.GaugeType.TYPE5,
                    au = this,
                    k = tt,
                    ii = ut,
                    ri = tt,
                    p = l,
                    it = l,
                    rt = !1,
                    wr = 0,
                    kt, hi = !1,
                    wi = tt,
                    bi = ut,
                    ki = ut - tt,
                    dt = bi - wi,
                    di = 0,
                    vt = 0,
                    ci = 10,
                    vu = 10,
                    yu = 0,
                    ct = 1.25 * f,
                    pu = 1.25 * f,
                    ui = i,
                    yt = ui / dt,
                    br = p * .006,
                    kr = p * 1.17 / 2,
                    dr = !1,
                    rr = ct + (k - tt) * yt,
                    u = p / 2,
                    et = it * .733644,
                    wu = .455 * p,
                    bu = .51 * it,
                    ku = function() {
                        hu ? (ki = v(ut - tt, !1), vt = v(ki / (vu - 1), !0), wi = Math.floor(tt / vt) * vt, bi = Math.ceil(ut / vt) * vt, di = v(vt / (ci - 1), !0), tt = wi, ut = bi, dt = ut - tt) : (ki = ut - tt, wi = tt, bi = ut, dt = ki, di = 1, vt = 10);
                        yu = 0;
                        ct = 1.25 * f;
                        pu = 1.25 * f;
                        ui = i;
                        yt = ui / dt;
                        rr = ct + (k - tt) * yt
                    },
                    li = t(l, l),
                    gr = li.getContext("2d"),
                    ai = t(l, l),
                    y = ai.getContext("2d"),
                    fi = t(l * .093457, l * .093457),
                    nu = fi.getContext("2d"),
                    pt = t(l * .093457, l * .093457),
                    tu = pt.getContext("2d"),
                    ei = pt,
                    iu = t(Math.ceil(l * .028037), Math.ceil(l * .028037)),
                    ru = iu.getContext("2d"),
                    uu = t(Math.ceil(l * .028037), Math.ceil(l * .028037)),
                    fu = uu.getContext("2d"),
                    vi = t(l, l),
                    eu = vi.getContext("2d"),
                    yi = t(l, l),
                    ou = yi.getContext("2d"),
                    du = function(n) {
                        "type5" === pr.type && (n.save(), ft.type === "west" ? (n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .44, it * .8), n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .44, it * .16)) : ft.type === "east" ? (n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .52, it * .8), n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .52, it * .16)) : (n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .2 - it * .037383, it * .446666), n.drawImage(a(Math.ceil(it * .037383), steelseries.KnobType.STANDARD_KNOB, wt), p * .8, it * .446666)), n.restore())
                    },
                    gu = function() {
                        var t = o.createElement("canvas"),
                            n, i;
                        return t.width = Math.ceil(l * .046728), t.height = Math.ceil(t.width * .9), n = t.getContext("2d"), n.save(), i = n.createLinearGradient(0, .1, 0, t.height * .9), i.addColorStop(0, "#520000"), i.addColorStop(.3, "#fc1d00"), i.addColorStop(.59, "#fc1d00"), i.addColorStop(1, "#520000"), n.fillStyle = i, n.beginPath(), n.moveTo(t.width * .5, .1), n.lineTo(t.width * .9, t.height * .9), n.lineTo(t.width * .1, t.height * .9), n.lineTo(t.width * .5, .1), n.closePath(), n.fill(), n.strokeStyle = "#FFFFFF", n.stroke(), n.restore(), t
                    },
                    su = function(n, t, i, r, f) {
                        n.save();
                        n.strokeStyle = r;
                        n.fillStyle = r;
                        n.lineWidth = p * .035;
                        var e = ui / dt * t - ui / dt * tt,
                            o = e + (i - t) / (dt / ui);
                        n.translate(u, et);
                        n.rotate(ct);
                        n.beginPath();
                        f ? (n.moveTo(0, 0), n.arc(0, 0, p * .365 - n.lineWidth / 2, e, o, !1)) : n.arc(0, 0, p * .365, e, o, !1);
                        f ? (n.moveTo(0, 0), n.fill()) : n.stroke();
                        n.translate(-u, -et);
                        n.restore()
                    },
                    nf = function(n) {
                        var t, i;
                        n.save();
                        n.textAlign = "left";
                        n.textBaseline = "middle";
                        n.strokeStyle = lt.labelColor.getRgbaColor();
                        n.fillStyle = lt.labelColor.getRgbaColor();
                        n.font = .046728 * p + "px " + e;
                        t = n.measureText(ur).width;
                        n.fillText(ur, (p - t) / 2, it * .4, p * .3);
                        i = n.measureText(fr).width;
                        n.fillText(fr, (p - i) / 2, it * .47, p * .2);
                        n.restore()
                    },
                    tf = function(n, t) {
                        var l;
                        lt.labelColor.setAlpha(1);
                        n.save();
                        steelseries.Orientation.WEST === ft && (n.translate(u, u), n.rotate(-i), n.translate(-u, -u));
                        steelseries.Orientation.EAST === ft && (n.translate(u, u), n.rotate(i), n.translate(-u, -u));
                        n.textAlign = "center";
                        n.textBaseline = "middle";
                        l = Math.ceil(p * .04);
                        n.font = l + "px " + e;
                        n.strokeStyle = lt.labelColor.getRgbaColor();
                        n.fillStyle = lt.labelColor.getRgbaColor();
                        n.translate(u, et);
                        n.rotate(ct);
                        for (var o = yt * di, a, r = tt, f = ci - 1, s = p * .44, y = p * .41, w = p * .415, b = p * .42, v = p * .48, h = p * .04, k = ci / 2, d = parseFloat(ut.toFixed(2)), c = tt; parseFloat(c.toFixed(2)) <= d; c += di) {
                            if (a = +o + i, f++, f === ci) {
                                n.lineWidth = 1.5;
                                n.beginPath();
                                n.moveTo(s, 0);
                                n.lineTo(y, 0);
                                n.closePath();
                                n.stroke();
                                n.save();
                                n.translate(v, 0);
                                n.rotate(a);
                                switch (t.format) {
                                    case "fractional":
                                        n.fillText(r.toFixed(2), 0, 0, h);
                                        break;
                                    case "scientific":
                                        n.fillText(r.toPrecision(2), 0, 0, h);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(r.toFixed(0), 0, 0, h)
                                }
                                n.translate(-v, 0);
                                n.restore();
                                r += vt;
                                f = 0;
                                n.rotate(o);
                                continue
                            }
                            0 == ci % 2 && f === k ? (n.lineWidth = 1, n.beginPath(), n.moveTo(s, 0), n.lineTo(w, 0), n.closePath(), n.stroke()) : (n.lineWidth = .5, n.beginPath(), n.moveTo(s, 0), n.lineTo(b, 0), n.closePath(), n.stroke());
                            n.rotate(o)
                        }
                        n.translate(-u, -et);
                        n.restore()
                    },
                    gt = function(n) {
                        var t, r, e;
                        n = n || {};
                        var o = undefined === n.frame ? !1 : n.frame,
                            f = undefined === n.background ? !1 : n.background,
                            s = undefined === n.led ? !1 : n.led,
                            c = undefined === n.pointer ? !1 : n.pointer,
                            a = undefined === n.foreground ? !1 : n.foreground;
                        if (dr = !0, ku(), o && or && d(gr, er, u, l / 2, p, it), f && sr && nt(y, lt, u, l / 2, p, it), s && (nu.drawImage(h(Math.ceil(l * .093457), 1, gi), 0, 0), tu.drawImage(h(Math.ceil(l * .093457), 0, gi), 0, 0)), tr && (ru.drawImage(b(Math.ceil(l * .028037), steelseries.ColorDef.BLUE.dark.getRgbaColor(), !0, !0), 0, 0), ru.restore()), ir && (fu.drawImage(b(Math.ceil(l * .028037), steelseries.ColorDef.RED.medium.getRgbaColor(), !0), 0, 0), fu.restore()), f && sr) {
                            if (du(y), null !== ni && 0 < ni.length) {
                                y.save();
                                steelseries.Orientation.WEST === ft ? (y.translate(u, u), y.rotate(-i), y.translate(-u, -u)) : steelseries.Orientation.EAST === ft && (y.translate(u, u), y.rotate(i), y.translate(-u, -u));
                                t = ni.length;
                                do t--, su(y, ni[t].start, ni[t].stop, ni[t].color, !1); while (0 < t);
                                y.restore()
                            }
                            if (null !== ti && 0 < ti.length) {
                                steelseries.Orientation.WEST === ft && (y.translate(u, u), y.rotate(-i), y.translate(-u, -u));
                                steelseries.Orientation.EAST === ft && (y.translate(u, u), y.rotate(i), y.translate(-u, -u));
                                r = ti.length;
                                do r--, su(y, ti[r].start, ti[r].stop, ti[r].color, !0); while (0 < r);
                                y.restore()
                            }
                            tf(y, lu);
                            nf(y)
                        }
                        cr && (y.save(), steelseries.Orientation.WEST === ft && (y.translate(u, u), y.rotate(-i), y.translate(-u, -u)), steelseries.Orientation.EAST === ft && (y.translate(u, u), y.rotate(i), y.translate(-u, -u)), y.translate(u, et), y.rotate(ct + (ot - tt) * yt + i), y.translate(-u, -et), y.drawImage(gu(), p * .475, it * .32), y.restore());
                        c && st(eu, p * 1.17, at, hr, lt.labelColor);
                        a && ar && (e = at.type === "type15" || at.type === "type16" ? !1 : !0, g(ou, lr, p, it, e, cu, wt, pr, ft))
                    },
                    oi = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.led ? !1 : n.led,
                            u = undefined === n.pointer ? !1 : n.pointer,
                            f = undefined === n.foreground ? !1 : n.foreground;
                        t && (li.width = l, li.height = l, gr = li.getContext("2d"));
                        i && (ai.width = l, ai.height = l, y = ai.getContext("2d"));
                        r && (fi.width = Math.ceil(l * .093457), fi.height = Math.ceil(l * .093457), nu = fi.getContext("2d"), pt.width = Math.ceil(l * .093457), pt.height = Math.ceil(l * .093457), tu = pt.getContext("2d"), ei = pt);
                        u && (vi.width = l, vi.height = l, eu = vi.getContext("2d"));
                        f && (yi.width = l, yi.height = l, ou = yi.getContext("2d"))
                    },
                    pi = function(n) {
                        n ? wr = setInterval(rf, 1e3) : (clearInterval(wr), ei = pt)
                    },
                    rf = function() {
                        nr && (ei = ei === fi ? pt : fi, hi || (hi = !0, s(au.repaint)))
                    };
                return this.setValue = function(n) {
                    n = parseFloat(n);
                    var t = n < tt ? tt : n > ut ? ut : n;
                    return k !== t && (k = t, k > ri && (ri = k), k < ii && (ii = k), k >= ot && !rt && ht || k <= ot && !rt && !ht ? (rt = !0, pi(rt), si && bt.play()) : (k < ot && rt && ht || k > ot && rt && !ht) && (rt = !1, pi(rt), si && bt.pause()), this.repaint()), this
                }, this.getValue = function() {
                    return k
                }, this.setValueAnimated = function(n, t) {
                    n = parseFloat(n);
                    var r = n < tt ? tt : n > ut ? ut : n,
                        u = this,
                        i;
                    return k !== r && (undefined !== kt && kt.isPlaying && kt.stop(), i = yr * Math.abs(r - k) / (ut - tt), i = Math.max(i, yr / 5), kt = new Tween({}, "", Tween.regularEaseInOut, k, r, i), kt.onMotionChanged = function(n) {
                        k = n.target._pos;
                        k >= ot && !rt && ht || k <= ot && !rt && !ht ? (rt = !0, pi(rt), si && bt.play()) : (k < ot && rt && ht || k > ot && rt && !ht) && (rt = !1, pi(rt), si && bt.pause());
                        k > ri && (ri = k);
                        k < ii && (ii = k);
                        hi || (hi = !0, s(u.repaint))
                    }, t && typeof t == "function" && (kt.onMotionFinished = t), kt.start()), this
                }, this.resetMinMeasuredValue = function() {
                    return ii = k, this.repaint(), this
                }, this.resetMaxMeasuredValue = function() {
                    return ri = k, this.repaint(), this
                }, this.setMinMeasuredValueVisible = function(n) {
                    return tr = !!n, this.repaint(), this
                }, this.setMaxMeasuredValueVisible = function(n) {
                    return ir = !!n, this.repaint(), this
                }, this.setThresholdVisible = function(n) {
                    return cr = !!n, this.repaint(), this
                }, this.setThresholdRising = function(n) {
                    return ht = !!n, rt = !rt, pi(rt), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return oi({
                        frame: !0
                    }), er = n, gt({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return oi({
                        background: !0,
                        pointer: at.type === "type2" || at.type === "type13" ? !0 : !1
                    }), lt = n, gt({
                        background: !0,
                        pointer: at.type === "type2" || at.type === "type13" ? !0 : !1
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return oi({
                        foreground: !0
                    }), lr = n, gt({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerType = function(n) {
                    return oi({
                        pointer: !0,
                        foreground: !0
                    }), at = n, gt({
                        pointer: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return oi({
                        pointer: !0
                    }), hr = n, gt({
                        pointer: !0
                    }), this.repaint(), this
                }, this.setLedColor = function(n) {
                    return oi({
                        led: !0
                    }), gi = n, gt({
                        led: !0
                    }), this.repaint(), this
                }, this.setLedVisible = function(n) {
                    return nr = !!n, this.repaint(), this
                }, this.repaint = function() {
                    dr || gt({
                        frame: !0,
                        background: !0,
                        led: !0,
                        pointer: !0,
                        foreground: !0
                    });
                    c.clearRect(0, 0, l, l);
                    c.save();
                    or && c.drawImage(li, 0, 0);
                    c.drawImage(ai, 0, 0);
                    nr && c.drawImage(ei, wu, bu);
                    steelseries.Orientation.WEST === ft && (c.translate(u, u), c.rotate(-i), c.translate(-u, -u));
                    steelseries.Orientation.EAST === ft && (c.translate(u, u), c.rotate(i), c.translate(-u, -u));
                    tr && (c.save(), c.translate(u, et), c.rotate(ct + i + (ii - tt) * yt), c.translate(-u, -et), c.drawImage(iu, c.canvas.width * .4865, c.canvas.height * .27), c.restore());
                    ir && (c.save(), c.translate(u, et), c.rotate(ct + i + (ri - tt) * yt), c.translate(-u, -et), c.drawImage(uu, c.canvas.width * .4865, c.canvas.height * .27), c.restore());
                    rr = ct + i + (k - tt) * yt;
                    c.save();
                    c.translate(u, et);
                    c.rotate(rr);
                    c.shadowColor = "rgba(0, 0, 0, 0.8)";
                    c.shadowOffsetX = c.shadowOffsetY = br;
                    c.shadowBlur = br * 2;
                    c.translate(-kr, -kr);
                    c.drawImage(vi, 0, 0);
                    c.restore();
                    ar && (steelseries.Orientation.WEST === ft ? (c.translate(u, u), c.rotate(i), c.translate(-u, -u)) : steelseries.Orientation.EAST === ft && (c.translate(u, u), c.rotate(-i), c.translate(-u, -u)), c.drawImage(yi, 0, 0));
                    c.restore();
                    hi = !1
                }, this.repaint(), this
            },
            ir = function(n, r) {
                var f, u, gt;
                r = r || {};
                var p = undefined === r.gaugeType ? steelseries.GaugeType.TYPE1 : r.gaugeType,
                    g = undefined === r.width ? 0 : r.width,
                    nt = undefined === r.height ? 0 : r.height,
                    c = undefined === r.minValue ? 0 : r.minValue,
                    l = undefined === r.maxValue ? c + 100 : r.maxValue,
                    fu = undefined === r.niceScale ? !0 : r.niceScale,
                    ut = undefined === r.threshold ? (l - c) / 2 + c : r.threshold,
                    gi = undefined === r.titleString ? "" : r.titleString,
                    nr = undefined === r.unitString ? "" : r.unitString,
                    ar = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                    vr = undefined === r.frameVisible ? !0 : r.frameVisible,
                    it = undefined === r.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : r.backgroundColor,
                    yr = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                    ti = undefined === r.valueColor ? steelseries.ColorDef.RED : r.valueColor,
                    dt = undefined === r.lcdColor ? steelseries.LcdColor.STANDARD : r.lcdColor,
                    yi = undefined === r.lcdVisible ? !0 : r.lcdVisible,
                    pr = undefined === r.lcdDecimals ? 2 : r.lcdDecimals,
                    eu = undefined === r.digitalFont ? !1 : r.digitalFont,
                    ui = undefined === r.ledColor ? steelseries.LedColor.RED_LED : r.ledColor,
                    tr = undefined === r.ledVisible ? !0 : r.ledVisible,
                    wr = undefined === r.thresholdVisible ? !0 : r.thresholdVisible,
                    wt = undefined === r.thresholdRising ? !0 : r.thresholdRising,
                    ir = undefined === r.minMeasuredValueVisible ? !1 : r.minMeasuredValueVisible,
                    rr = undefined === r.maxMeasuredValueVisible ? !1 : r.maxMeasuredValueVisible,
                    ou = undefined === r.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : r.labelNumberFormat,
                    br = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                    fi = undefined === r.playAlarm ? !1 : r.playAlarm,
                    kr = undefined === r.alarmSound ? !1 : r.alarmSound,
                    dr = undefined === r.fullScaleDeflectionTime ? 2.5 : r.fullScaleDeflectionTime,
                    d = w(n);
                g === 0 && (g = d.canvas.width);
                nt === 0 && (nt = d.canvas.height);
                d.canvas.width = g;
                d.canvas.height = nt;
                f = g;
                u = nt;
                fi && kr !== !1 && (gt = o.createElement("audio"), gt.setAttribute("src", kr), gt.setAttribute("preload", "auto"));
                var su = this,
                    y = c,
                    st = l,
                    ht = c;
                p.type !== "type1" && p.type !== "type2" && (p = steelseries.GaugeType.TYPE1);
                var ni, k = !1,
                    ei = !1,
                    gr = 0,
                    a = g <= nt,
                    ur, fr, ct = Math.round((a ? nt : g) * .05),
                    ft = Math.round((a ? g : nt) * .05),
                    er, or;
                a ? (ur = f / 2 - ct / 2, fr = (p.type === "type1" ? .053 : .038) * u, er = Math.floor(u / 22) + "px " + e, or = Math.floor(u / 22) + "px " + et) : (ur = .89 * f, fr = u / 2 - ct / 2, er = Math.floor(u / 10) + "px " + e, or = Math.floor(u / 10) + "px " + et);
                var nu = !1,
                    pi = c,
                    wi = l,
                    bi = l - c,
                    tu = wi - pi,
                    ki = 0,
                    bt = 0,
                    oi = 10,
                    hu = 10,
                    cu = function() {
                        fu ? (bi = v(l - c, !1), bt = v(bi / (hu - 1), !0), pi = Math.floor(c / bt) * bt, wi = Math.ceil(l / bt) * bt, ki = v(bt / (oi - 1), !0), c = pi, l = wi, tu = l - c) : (bi = l - c, pi = c, wi = l, tu = bi, ki = 1, bt = 10)
                    },
                    si = t(g, nt),
                    iu = si.getContext("2d"),
                    hi = t(g, nt),
                    rt = hi.getContext("2d"),
                    di, ii = t(ct, ct),
                    sr = ii.getContext("2d"),
                    kt = t(ct, ct),
                    hr = kt.getContext("2d"),
                    ri = kt,
                    ci = t(ft, ft),
                    ru = ci.getContext("2d"),
                    li = t(ft, ft),
                    uu = li.getContext("2d"),
                    ai = t(g, nt),
                    cr = ai.getContext("2d"),
                    lu = function(n, t, i) {
                        n.save();
                        n.textAlign = "right";
                        n.textBaseline = "middle";
                        n.strokeStyle = dt.textColor;
                        n.fillStyle = dt.textColor;
                        (dt === steelseries.LcdColor.STANDARD || dt === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", i ? (n.shadowOffsetX = u * .003, n.shadowOffsetY = u * .003, n.shadowBlur = u * .004) : (n.shadowOffsetX = u * .007, n.shadowOffsetY = u * .007, n.shadowBlur = u * .009));
                        var r, e, o;
                        n.font = eu ? or : er;
                        i ? (r = (f - f * .571428) / 2 + f * .571428 - 2, e = u * .88 + 1 + (u * .055 - 2) / 2, o = f * .7 - 2) : (r = f * .695 + f * .18 - 2, e = u * .22 + 1 + (u * .15 - 2) / 2, o = u * .22 - 2);
                        n.fillText(t.toFixed(pr), r, e, o);
                        n.restore()
                    },
                    au = function(n) {
                        var i = o.createElement("canvas"),
                            t = i.getContext("2d"),
                            r;
                        return i.height = i.width = ft, t.save(), r = t.createLinearGradient(0, .1, 0, i.height * .9), r.addColorStop(0, "#520000"), r.addColorStop(.3, "#fc1d00"), r.addColorStop(.59, "#fc1d00"), r.addColorStop(1, "#520000"), t.fillStyle = r, n ? (t.beginPath(), t.moveTo(.1, i.height * .5), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .9, i.height * .9), t.closePath()) : (t.beginPath(), t.moveTo(.1, .1), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .5, i.height * .9), t.closePath()), t.fill(), t.strokeStyle = "#FFFFFF", t.stroke(), t.restore(), i
                    },
                    vu = function(n, t, i) {
                        var e, ut;
                        it.labelColor.setAlpha(1);
                        n.save();
                        n.textBaseline = "middle";
                        e = f * .1;
                        n.strokeStyle = it.labelColor.getRgbaColor();
                        n.fillStyle = it.labelColor.getRgbaColor();
                        var o = c,
                            h = oi - 1,
                            a, r, s, b, v, y, w = 1,
                            k, d, g, nt, tt, rt;
                        for (i ? (k = .34 * f, d = .36 * f, g = .33 * f, nt = .36 * f, tt = .32 * f, rt = .36 * f, n.textAlign = "right", s = 0, b = u * .12864, v = 0, y = p.type === "type1" ? u * .856796 - u * .12864 : u * .7475 - u * .12864, w = y / (l - c)) : (k = .65 * u, d = .63 * u, g = .66 * u, nt = .63 * u, tt = .67 * u, rt = .63 * u, n.textAlign = "center", b = 0, p.type === "type1" ? (s = f * .142857, v = f * .871012 - s) : (s = f * .19857, v = f * .82 - s), y = 0, w = v / (l - c)), ut = c, a = 0; ut <= l; ut += ki, a += ki) {
                            if (r = i ? b + y - a * w : s + a * w, h++, h === oi) {
                                if (n.lineWidth = 1.5, lr(n, tt, rt, r, i), i) switch (t.format) {
                                    case "fractional":
                                        n.fillText(o.toFixed(2), f * .28, r, e);
                                        break;
                                    case "scientific":
                                        n.fillText(o.toPrecision(2), f * .28, r, e);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(o.toFixed(0), f * .28, r, e)
                                } else switch (t.format) {
                                    case "fractional":
                                        n.fillText(o.toFixed(2), r, u * .73, e);
                                        break;
                                    case "scientific":
                                        n.fillText(o.toPrecision(2), r, u * .73, e);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(o.toFixed(0), r, u * .73, e)
                                }
                                o += bt;
                                h = 0;
                                continue
                            }
                            0 == oi % 2 && h === oi / 2 ? (n.lineWidth = 1, lr(n, g, nt, r, i)) : (n.lineWidth = .5, lr(n, k, d, r, i))
                        }
                        n.restore()
                    },
                    lr = function(n, t, i, r, u) {
                        u ? (n.beginPath(), n.moveTo(t, r), n.lineTo(i, r), n.closePath(), n.stroke()) : (n.beginPath(), n.moveTo(r, t), n.lineTo(r, i), n.closePath(), n.stroke())
                    },
                    ot = function(n) {
                        n = n || {};
                        var s = undefined === n.frame ? !1 : n.frame,
                            t = undefined === n.background ? !1 : n.background,
                            v = undefined === n.led ? !1 : n.led,
                            o = undefined === n.foreground ? !1 : n.foreground,
                            i, r, e;
                        nu = !0;
                        cu();
                        s && vr && at(iu, ar, f, u, a);
                        t && yr && vt(rt, it, f, u, a);
                        t && p.type === "type2" && bu(rt);
                        v && (a ? (sr.drawImage(h(ct, 1, ui), 0, 0), hr.drawImage(h(ct, 0, ui), 0, 0)) : (sr.drawImage(h(ct, 1, ui), 0, 0), hr.drawImage(h(ct, 0, ui), 0, 0)));
                        ir && (a ? ru.drawImage(b(ft, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, a), 0, 0) : ru.drawImage(b(ft, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, a), 0, 0));
                        rr && (a ? uu.drawImage(b(ft, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, a), 0, 0) : uu.drawImage(b(ft, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, a), 0, 0));
                        t && yr && (vu(rt, ou, a), a ? pt(rt, f, u, gi, nr, it, a, null, yi, p) : pt(rt, f, u, gi, nr, it, a, null, yi, p));
                        t && wr && (rt.save(), a ? (i = p.type === "type1" ? .856796 : .7475, r = i - .12864, e = u * i - u * r * (ut - c) / (l - c), rt.translate(f * .365, e - ft / 2)) : (i = p.type === "type1" ? .871012 : .82, r = i - (p.type === "type1" ? .142857 : .19857), e = f * r * (ut - c) / (l - c), rt.translate(f * (p.type === "type1" ? .142857 : .19857) - ft / 2 + e, u * .58)), rt.drawImage(au(a), 0, 0), rt.restore());
                        t && yi && (a ? (di = tt(f * .571428, u * .055, dt), rt.drawImage(di, (f - f * .571428) / 2, u * .88)) : (di = tt(f * .18, u * .15, dt), rt.drawImage(di, f * .695, u * .22)));
                        o && p.type === "type2" && wu(cr);
                        o && br && yt(cr, f, u, a, !1)
                    },
                    lt = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.led ? !1 : n.led,
                            u = undefined === n.foreground ? !1 : n.foreground;
                        t && (si.width = g, si.height = nt, iu = si.getContext("2d"));
                        i && (hi.width = g, hi.height = nt, rt = hi.getContext("2d"));
                        r && (ii.width = Math.ceil(g * .093457), ii.height = Math.ceil(nt * .093457), sr = ii.getContext("2d"), kt.width = Math.ceil(g * .093457), kt.height = Math.ceil(nt * .093457), hr = kt.getContext("2d"), ri = kt);
                        u && (ai.width = g, ai.height = nt, cr = ai.getContext("2d"))
                    },
                    vi = function(n) {
                        n ? gr = setInterval(yu, 1e3) : (clearInterval(gr), ri = kt)
                    },
                    yu = function() {
                        tr && (ri = ri === ii ? kt : ii, ei || (ei = !0, s(su.repaint)))
                    },
                    pu = function(n, t, i) {
                        var u, e, r = it.labelColor,
                            f, h, v, o, s, w, b, st, ht, ct, lt, at, vt, yt, pt, tt, k, rt, ut, d, g, nt, ft, et, ot;
                        a ? (u = i * .12864, e = p.type === "type1" ? i * .856796 : i * .7475, f = e - u, h = f * (y - c) / (l - c), v = e - h, st = 0, ht = u, ct = 0, lt = e) : (p.type === "type1" ? (u = t * .871012, e = t * .142857) : (u = t * .82, e = t * .19857), f = u - e, h = f * (y - c) / (l - c), v = e, st = u, ht = 0, ct = e, lt = 0);
                        p.type === "type1" && (d = it === steelseries.BackgroundColor.CARBON || it === steelseries.BackgroundColor.PUNCHED_SHEET || it === steelseries.BackgroundColor.STAINLESS || it === steelseries.BackgroundColor.BRUSHED_STAINLESS || it === steelseries.BackgroundColor.TURNED ? .3 : 0, g = n.createLinearGradient(st, ht, ct, lt), r.setAlpha(.05 + d), g.addColorStop(0, r.getRgbaColor()), r.setAlpha(.15 + d), g.addColorStop(.48, r.getRgbaColor()), r.setAlpha(.15 + d), g.addColorStop(.49, r.getRgbaColor()), r.setAlpha(.05 + d), g.addColorStop(1, r.getRgbaColor()), n.fillStyle = g, a ? n.fillRect(t * .435714, u, t * .142857, f) : n.fillRect(t * .142857, i * .435714, f, i * .142857), a ? (at = 0, vt = u, yt = 0, pt = u + f) : (at = t * .142857 + f, vt = 0, yt = t * .142857, pt = 0), nt = n.createLinearGradient(at, vt, yt, pt), r.setAlpha(.3 + d), nt.addColorStop(0, r.getRgbaColor()), r.setAlpha(.69), nt.addColorStop(.48, r.getRgbaColor()), r.setAlpha(.7), nt.addColorStop(.49, r.getRgbaColor()), r.setAlpha(.4), nt.addColorStop(1, r.getRgbaColor()), n.fillStyle = nt, a ? (n.fillRect(t * .435714, u, t * .007142, f), n.fillRect(t * .571428, u, t * .007142, f)) : (n.fillRect(t * .142857, i * .435714, f, i * .007142), n.fillRect(t * .142857, i * .571428, f, i * .007142)));
                        a ? p.type === "type1" ? (o = t * .45, s = 0, w = t * .45 + t * .114285, b = 0) : (o = t / 2 - i * .0486 / 2, s = 0, w = o + i * .053, b = 0) : p.type === "type1" ? (o = 0, s = i * .45, w = 0, b = i * .45 + i * .114285) : (o = 0, s = i / 2 - t * .025, w = 0, b = s + t * .053);
                        ft = n.createLinearGradient(o, s, w, b);
                        ft.addColorStop(0, ti.medium.getRgbaColor());
                        ft.addColorStop(1, ti.light.getRgbaColor());
                        n.fillStyle = ft;
                        et = p.type === "type1" ? 0 : a ? i * .05 : t * .05;
                        a ? n.fillRect(o, v, w - o, h + et) : n.fillRect(v - et, s, h + et, b - s);
                        p.type === "type1" && (a ? (tt = t * .45, k = 0, rt = tt + t * .05, ut = 0) : (tt = 0, k = i * .45, rt = 0, ut = k + i * .05), ot = n.createLinearGradient(tt, k, rt, ut), ot.addColorStop(0, "rgba(255, 255, 255, 0.7)"), ot.addColorStop(.98, "rgba(255, 255, 255, 0.0)"), n.fillStyle = ot, a ? n.fillRect(tt, v, rt, h) : n.fillRect(v, k, h, ut - k))
                    },
                    wu = function(n) {
                        var t = a ? u : f,
                            r;
                        n.save();
                        a ? n.translate(f / 2, 0) : (n.translate(f / 2, u / 2), n.rotate(i), n.translate(0, -f / 2 + f * .05));
                        n.beginPath();
                        n.moveTo(-.049 * t, .825 * t);
                        n.bezierCurveTo(-.049 * t, .7975 * t, -.0264 * t, .775 * t, .0013 * t, .775 * t);
                        n.bezierCurveTo(.0264 * t, .775 * t, .049 * t, .7975 * t, .049 * t, .825 * t);
                        n.bezierCurveTo(.049 * t, .85 * t, .0264 * t, .8725 * t, .0013 * t, .8725 * t);
                        n.bezierCurveTo(-.0264 * t, .8725 * t, -.049 * t, .85 * t, -.049 * t, .825 * t);
                        n.closePath();
                        r = n.createRadialGradient(0 * t, .825 * t, 0, 0 * t, .825 * t, .049 * t);
                        r.addColorStop(0, ti.medium.getRgbaColor());
                        r.addColorStop(.3, ti.medium.getRgbaColor());
                        r.addColorStop(1, ti.light.getRgbaColor());
                        n.fillStyle = r;
                        n.fill();
                        n.beginPath();
                        a ? (n.moveTo(-.0365 * t, .8075 * t), n.bezierCurveTo(-.0365 * t, .7925 * t, -.0214 * t, .7875 * t, -.0214 * t, .7825 * t), n.bezierCurveTo(.0189 * t, .785 * t, .0365 * t, .7925 * t, .0365 * t, .8075 * t), n.bezierCurveTo(.0365 * t, .8175 * t, .0214 * t, .815 * t, .0013 * t, .8125 * t), n.bezierCurveTo(-.0189 * t, .8125 * t, -.0365 * t, .8175 * t, -.0365 * t, .8075 * t), r = n.createRadialGradient(0, .8 * t, 0, 0, .8 * t, .0377 * t)) : (n.beginPath(), n.moveTo(-.0214 * t, .86 * t), n.bezierCurveTo(-.0365 * t, .86 * t, -.0415 * t, .845 * t, -.0465 * t, .825 * t), n.bezierCurveTo(-.0465 * t, .805 * t, -.0365 * t, .7875 * t, -.0214 * t, .7875 * t), n.bezierCurveTo(-.0113 * t, .7875 * t, -.0163 * t, .8025 * t, -.0163 * t, .8225 * t), n.bezierCurveTo(-.0163 * t, .8425 * t, -.0113 * t, .86 * t, -.0214 * t, .86 * t), r = n.createRadialGradient(-.03 * t, .8225 * t, 0, -.03 * t, .8225 * t, .0377 * t));
                        r.addColorStop(0, "rgba(255, 255, 255, 0.55)");
                        r.addColorStop(1, "rgba(255, 255, 255, 0.05)");
                        n.fillStyle = r;
                        n.closePath();
                        n.fill();
                        n.beginPath();
                        n.moveTo(-.0214 * t, .115 * t);
                        n.bezierCurveTo(-.0214 * t, .1075 * t, -.0163 * t, .1025 * t, -.0113 * t, .1025 * t);
                        n.bezierCurveTo(-.0113 * t, .1025 * t, -.0113 * t, .1025 * t, -.0113 * t, .1025 * t);
                        n.bezierCurveTo(-.0038 * t, .1025 * t, .0013 * t, .1075 * t, .0013 * t, .115 * t);
                        n.bezierCurveTo(.0013 * t, .115 * t, .0013 * t, .76 * t, .0013 * t, .76 * t);
                        n.bezierCurveTo(.0013 * t, .7675 * t, -.0038 * t, .7725 * t, -.0113 * t, .7725 * t);
                        n.bezierCurveTo(-.0113 * t, .7725 * t, -.0113 * t, .7725 * t, -.0113 * t, .7725 * t);
                        n.bezierCurveTo(-.0163 * t, .7725 * t, -.0214 * t, .7675 * t, -.0214 * t, .76 * t);
                        n.bezierCurveTo(-.0214 * t, .76 * t, -.0214 * t, .115 * t, -.0214 * t, .115 * t);
                        n.closePath();
                        r = n.createLinearGradient(-.0189 * t, 0, .0013 * t, 0);
                        r.addColorStop(0, "rgba(255, 255, 255, 0.1)");
                        r.addColorStop(.34, "rgba(255, 255, 255, 0.5)");
                        r.addColorStop(1, "rgba(255, 255, 255, 0.1)");
                        n.fillStyle = r;
                        n.fill();
                        n.restore()
                    },
                    bu = function(n) {
                        var t = a ? u : f,
                            r;
                        n.save();
                        a ? n.translate(f / 2, 0) : (n.translate(f / 2, u / 2), n.rotate(i), n.translate(0, -f / 2 + f * .05));
                        n.beginPath();
                        n.moveTo(-.0516 * t, .825 * t);
                        n.bezierCurveTo(-.0516 * t, .8525 * t, -.0289 * t, .875 * t, .0013 * t, .875 * t);
                        n.bezierCurveTo(.0289 * t, .875 * t, .0516 * t, .8525 * t, .0516 * t, .825 * t);
                        n.bezierCurveTo(.0516 * t, .8075 * t, .044 * t, .7925 * t, .0314 * t, .7825 * t);
                        n.bezierCurveTo(.0314 * t, .7825 * t, .0314 * t, .12 * t, .0314 * t, .12 * t);
                        n.bezierCurveTo(.0314 * t, .1025 * t, .0189 * t, .0875 * t, .0013 * t, .0875 * t);
                        n.bezierCurveTo(-.0163 * t, .0875 * t, -.0289 * t, .1025 * t, -.0289 * t, .12 * t);
                        n.bezierCurveTo(-.0289 * t, .12 * t, -.0289 * t, .7825 * t, -.0289 * t, .7825 * t);
                        n.bezierCurveTo(-.0415 * t, .79 * t, -.0516 * t, .805 * t, -.0516 * t, .825 * t);
                        n.closePath();
                        r = n.createLinearGradient(-.0163 * t, 0, .0289 * t, 0);
                        r.addColorStop(0, "rgba(226, 226, 226, 0.5)");
                        r.addColorStop(.5, "rgba(226, 226, 226, 0.2)");
                        r.addColorStop(1, "rgba(226, 226, 226, 0.5)");
                        n.fillStyle = r;
                        n.fill();
                        n.lineWidth = 1;
                        n.strokeStyle = "rgba(153, 153, 153, 0.5)";
                        n.stroke();
                        n.restore()
                    };
                return this.setValue = function(n) {
                    n = parseFloat(n);
                    var t = n < c ? c : n > l ? l : n;
                    return y !== t && (y = t, y > ht && (ht = y), y < st && (st = y), y >= ut && !k && wt || y <= ut && !k && !wt ? (k = !0, vi(k), fi && gt.play()) : (y < ut && k && wt || y > ut && k && !wt) && (k = !1, vi(k), fi && gt.pause()), this.repaint()), this
                }, this.getValue = function() {
                    return y
                }, this.setValueAnimated = function(n, t) {
                    var i, u = this,
                        r;
                    return n = parseFloat(n), i = n < c ? c : n > l ? l : n, y !== i && (undefined !== ni && ni.isPlaying && ni.stop(), r = dr * Math.abs(i - y) / (l - c), r = Math.max(r, dr / 5), ni = new Tween({}, "", Tween.regularEaseInOut, y, i, r), ni.onMotionChanged = function(n) {
                        y = n.target._pos;
                        y > ht && (ht = y);
                        y < st && (st = y);
                        y >= ut && !k && wt || y <= ut && !k && !wt ? (k = !0, vi(k), fi && gt.play()) : (y < ut && k && wt || y > ut && k && !wt) && (k = !1, vi(k), fi && gt.pause());
                        ei || (ei = !0, s(u.repaint))
                    }, t && typeof t == "function" && (ni.onMotionFinished = t), ni.start()), this
                }, this.resetMinMeasuredValue = function() {
                    return st = y, this.repaint(), this
                }, this.resetMaxMeasuredValue = function() {
                    return ht = y, this.repaint(), this
                }, this.setMinMeasuredValueVisible = function(n) {
                    return ir = !!n, this.repaint(), this
                }, this.setMaxMeasuredValueVisible = function(n) {
                    return rr = !!n, this.repaint(), this
                }, this.setThreshold = function(n) {
                    n = parseFloat(n);
                    var t = n < c ? c : n > l ? l : n;
                    return ut = t, lt({
                        background: !0
                    }), ot({
                        background: !0
                    }), this.repaint(), this
                }, this.setThresholdVisible = function(n) {
                    return wr = !!n, this.repaint(), this
                }, this.setThresholdRising = function(n) {
                    return wt = !!n, k = !k, vi(k), this.repaint(), this
                }, this.setLcdDecimals = function(n) {
                    return pr = parseInt(n, 10), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return lt({
                        frame: !0
                    }), ar = n, ot({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return lt({
                        background: !0
                    }), it = n, ot({
                        background: !0
                    }), this.repaint(), this
                }, this.setValueColor = function(n) {
                    return lt({
                        foreground: !0
                    }), ti = n, ot({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setLedColor = function(n) {
                    return lt({
                        led: !0
                    }), ui = n, ot({
                        led: !0
                    }), this.repaint(), this
                }, this.setLedVisible = function(n) {
                    return tr = !!n, this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return lt({
                        background: !0
                    }), dt = n, ot({
                        background: !0
                    }), this.repaint(), this
                }, this.setMaxMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < c ? c : n > l ? l : n;
                    return ht = t, this.repaint(), this
                }, this.setMinMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < c ? c : n > l ? l : n;
                    return st = t, this.repaint(), this
                }, this.setTitleString = function(n) {
                    return gi = n, lt({
                        background: !0
                    }), ot({
                        background: !0
                    }), this.repaint(), this
                }, this.setUnitString = function(n) {
                    return nr = n, lt({
                        background: !0
                    }), ot({
                        background: !0
                    }), this.repaint(), this
                }, this.setMinValue = function(n) {
                    return lt({
                        background: !0
                    }), c = parseFloat(n), st < c && (st = c), y < c && (y = c), ot({
                        background: !0
                    }), this.repaint(), this
                }, this.getMinValue = function() {
                    return c
                }, this.setMaxValue = function(n) {
                    return lt({
                        background: !0
                    }), l = parseFloat(n), ht > l && (ht = l), y > l && (y = l), ot({
                        background: !0
                    }), this.repaint(), this
                }, this.getMaxValue = function() {
                    return l
                }, this.repaint = function() {
                    nu || ot({
                        frame: !0,
                        background: !0,
                        led: !0,
                        foreground: !0
                    });
                    d.clearRect(0, 0, d.canvas.width, d.canvas.height);
                    vr && d.drawImage(si, 0, 0);
                    d.drawImage(hi, 0, 0);
                    yi && lu(d, y, a);
                    tr && d.drawImage(ri, ur, fr);
                    var n, t, i, r, e;
                    ir && (a ? (t = p.type === "type1" ? .856796 : .7475, i = t - .12864, n = u * t - u * i * (st - c) / (l - c), r = f * .34 - ci.width, e = n - ci.height / 2) : (t = p.type === "type1" ? .871012 : .82, i = t - (p.type === "type1" ? .142857 : .19857), n = f * i * (st - c) / (l - c), r = f * (p.type === "type1" ? .142857 : .19857) - ci.height / 2 + n, e = u * .65), d.drawImage(ci, r, e));
                    rr && (a ? (n = u * t - u * i * (ht - c) / (l - c), r = f * .34 - li.width, e = n - li.height / 2) : (t = p.type === "type1" ? .871012 : .8, i = t - (p.type === "type1" ? .14857 : .19857), n = f * i * (ht - c) / (l - c), r = f * (p.type === "type1" ? .142857 : .19857) - li.height / 2 + n, e = u * .65), d.drawImage(li, r, e));
                    d.save();
                    pu(d, f, u);
                    d.restore();
                    (br || p.type === "type2") && d.drawImage(ai, 0, 0);
                    ei = !1
                }, this.repaint(), this
            },
            rr = function(n, i) {
                var u, f, ri, pi, it;
                i = i || {};
                var y = undefined === i.width ? 0 : i.width,
                    p = undefined === i.height ? 0 : i.height,
                    r = undefined === i.minValue ? 0 : i.minValue,
                    c = undefined === i.maxValue ? r + 100 : i.maxValue,
                    ti = undefined === i.section ? null : i.section,
                    pu = undefined === i.useSectionColors ? !1 : i.useSectionColors,
                    wu = undefined === i.niceScale ? !0 : i.niceScale,
                    rt = undefined === i.threshold ? (c - r) / 2 + r : i.threshold,
                    er = undefined === i.titleString ? "" : i.titleString,
                    or = undefined === i.unitString ? "" : i.unitString,
                    nu = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                    tu = undefined === i.frameVisible ? !0 : i.frameVisible,
                    nt = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                    sr = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                    oi = undefined === i.valueColor ? steelseries.ColorDef.RED : i.valueColor,
                    ii = undefined === i.lcdColor ? steelseries.LcdColor.STANDARD : i.lcdColor,
                    gi = undefined === i.lcdVisible ? !0 : i.lcdVisible,
                    iu = undefined === i.lcdDecimals ? 2 : i.lcdDecimals,
                    bu = undefined === i.digitalFont ? !1 : i.digitalFont,
                    si = undefined === i.ledColor ? steelseries.LedColor.RED_LED : i.ledColor,
                    hr = undefined === i.ledVisible ? !0 : i.ledVisible,
                    cr = undefined === i.thresholdVisible ? !0 : i.thresholdVisible,
                    lt = undefined === i.thresholdRising ? !0 : i.thresholdRising,
                    lr = undefined === i.minMeasuredValueVisible ? !1 : i.minMeasuredValueVisible,
                    ar = undefined === i.maxMeasuredValueVisible ? !1 : i.maxMeasuredValueVisible,
                    ku = undefined === i.labelNumberFormat ? steelseries.LabelNumberFormat.STANDARD : i.labelNumberFormat,
                    ru = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                    hi = undefined === i.playAlarm ? !1 : i.playAlarm,
                    uu = undefined === i.alarmSound ? !1 : i.alarmSound,
                    kt = undefined === i.valueGradient ? null : i.valueGradient,
                    fu = undefined === i.useValueGradient ? !1 : i.useValueGradient,
                    eu = undefined === i.fullScaleDeflectionTime ? 2.5 : i.fullScaleDeflectionTime,
                    k = w(n);
                y === 0 && (y = k.canvas.width);
                p === 0 && (p = k.canvas.height);
                k.canvas.width = y;
                k.canvas.height = p;
                u = y;
                f = p;
                hi && uu !== !1 && (ri = o.createElement("audio"), ri.setAttribute("src", uu), ri.setAttribute("preload", "auto"));
                var du = this,
                    a = r,
                    wt = c,
                    bt = r,
                    ui, d = !1,
                    ci = !1,
                    li = !1,
                    nr = !1,
                    st = [],
                    ou = 0,
                    l = y <= p,
                    vr, yr, ht = Math.round((l ? p : y) * .05),
                    ot = Math.round((l ? y : p) * .05),
                    pr, wr;
                l ? (vr = u / 2 - ht / 2, yr = .053 * f, pr = Math.floor(f / 22) + "px " + e, wr = Math.floor(f / 22) + "px " + et) : (vr = .89 * u, yr = f / 1.95 - ht / 2, pr = Math.floor(f / 10) + "px " + e, wr = Math.floor(f / 10) + "px " + et);
                var su = !1,
                    tr = r,
                    ir = c,
                    rr = c - r,
                    hu = ir - tr,
                    ur = 0,
                    dt = 0,
                    ai = 10,
                    gu = 10,
                    nf = function() {
                        wu ? (rr = v(c - r, !1), dt = v(rr / (gu - 1), !0), tr = Math.floor(r / dt) * dt, ir = Math.ceil(c / dt) * dt, ur = v(dt / (ai - 1), !0), r = tr, c = ir, hu = c - r) : (rr = c - r, tr = r, ir = c, hu = rr, ur = 1, dt = 10)
                    },
                    vi = t(y, p),
                    cu = vi.getContext("2d"),
                    yi = t(y, p),
                    ut = yi.getContext("2d"),
                    fr, ft = o.createElement("canvas");
                l ? (ft.width = u * .121428, ft.height = f * .012135) : (ft.width = u * .012135, ft.height = f * .121428);
                pi = ft.getContext("2d");
                it = o.createElement("canvas");
                l ? (it.width = u * .121428, it.height = f * .012135) : (it.width = u * .012135, it.height = f * .121428);
                var lu = it.getContext("2d"),
                    fi = t(ht, ht),
                    br = fi.getContext("2d"),
                    ni = t(ht, ht),
                    kr = ni.getContext("2d"),
                    ei = ni,
                    wi = t(ot, ot),
                    au = wi.getContext("2d"),
                    bi = t(ot, ot),
                    vu = bi.getContext("2d"),
                    ki = t(y, p),
                    yu = ki.getContext("2d"),
                    tf = function(n, t, i) {
                        n.save();
                        n.textAlign = "right";
                        n.textBaseline = "middle";
                        n.strokeStyle = ii.textColor;
                        n.fillStyle = ii.textColor;
                        (ii === steelseries.LcdColor.STANDARD || ii === steelseries.LcdColor.STANDARD_GREEN) && (n.shadowColor = "gray", i ? (n.shadowOffsetX = u * .007, n.shadowOffsetY = u * .007, n.shadowBlur = u * .009) : (n.shadowOffsetX = f * .007, n.shadowOffsetY = f * .007, n.shadowBlur = f * .009));
                        var r, e, o;
                        n.font = bu ? wr : pr;
                        i ? (r = (u - u * .571428) / 2 + 1 + u * .571428 - 2, e = f * .88 + 1 + (f * .055 - 2) / 2, o = u * .7 - 2) : (r = u * .695 + u * .18 - 2, e = f * .22 + 1 + (f * .15 - 2) / 2, o = f * .22 - 2);
                        n.fillText(t.toFixed(iu), r, e, o);
                        n.restore()
                    },
                    rf = function(n) {
                        var i = o.createElement("canvas"),
                            t, r;
                        return i.height = i.width = ot, t = i.getContext("2d"), t.save(), r = t.createLinearGradient(0, .1, 0, i.height * .9), r.addColorStop(0, "#520000"), r.addColorStop(.3, "#fc1d00"), r.addColorStop(.59, "#fc1d00"), r.addColorStop(1, "#520000"), t.fillStyle = r, n ? (t.beginPath(), t.moveTo(.1, i.height * .5), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .9, i.height * .9), t.closePath()) : (t.beginPath(), t.moveTo(.1, .1), t.lineTo(i.width * .9, .1), t.lineTo(i.width * .5, i.height * .9), t.closePath()), t.fill(), t.strokeStyle = "#FFFFFF", t.stroke(), t.restore(), i
                    },
                    uf = function(n, t, i) {
                        var o, rt;
                        nt.labelColor.setAlpha(1);
                        n.save();
                        n.textBaseline = "middle";
                        o = u * .1;
                        n.strokeStyle = nt.labelColor.getRgbaColor();
                        n.fillStyle = nt.labelColor.getRgbaColor();
                        var s = r,
                            h = ai - 1,
                            l, e, y, p, w, a, v = 1,
                            b, k, d, g, tt, it;
                        for (i ? (b = .34 * u, k = .36 * u, d = .33 * u, g = .36 * u, tt = .32 * u, it = .36 * u, n.textAlign = "right", y = 0, p = f * .12864, w = 0, a = f * .856796 - f * .12864, v = a / (c - r)) : (b = .65 * f, k = .63 * f, d = .66 * f, g = .63 * f, tt = .67 * f, it = .63 * f, n.textAlign = "center", y = u * .142857, p = 0, w = u * .871012 - u * .142857, a = 0, v = w / (c - r)), rt = r, l = 0; rt <= c; rt += ur, l += ur) {
                            if (e = i ? p + a - l * v : y + l * v, h++, h === ai) {
                                if (n.lineWidth = 1.5, dr(n, tt, it, e, i), i) switch (t.format) {
                                    case "fractional":
                                        n.fillText(s.toFixed(2), u * .28, e, o);
                                        break;
                                    case "scientific":
                                        n.fillText(s.toPrecision(2), u * .28, e, o);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(s.toFixed(0), u * .28, e, o)
                                } else switch (t.format) {
                                    case "fractional":
                                        n.fillText(s.toFixed(2), e, f * .73, o);
                                        break;
                                    case "scientific":
                                        n.fillText(s.toPrecision(2), e, f * .73, o);
                                        break;
                                    case "standard":
                                    default:
                                        n.fillText(s.toFixed(0), e, f * .73, o)
                                }
                                s += dt;
                                h = 0;
                                continue
                            }
                            0 == ai % 2 && h === ai / 2 ? (n.lineWidth = 1, dr(n, d, g, e, i)) : (n.lineWidth = .5, dr(n, b, k, e, i))
                        }
                        n.restore()
                    },
                    dr = function(n, t, i, r, u) {
                        u ? (n.beginPath(), n.moveTo(t, r), n.lineTo(i, r), n.closePath(), n.stroke()) : (n.beginPath(), n.moveTo(r, t), n.lineTo(r, i), n.closePath(), n.stroke())
                    },
                    g = function(n) {
                        var i, t, e, o, s, a;
                        n = n || {};
                        var y = undefined === n.frame ? !1 : n.frame,
                            v = undefined === n.background ? !1 : n.background,
                            p = undefined === n.led ? !1 : n.led,
                            w = undefined === n.foreground ? !1 : n.foreground,
                            k = undefined === n.bargraphled ? !1 : n.bargraphled;
                        if (su = !0, nf(), y && tu && at(cu, nu, u, f, l), v && sr && vt(ut, nt, u, f, l), p && (l ? (br.drawImage(h(ht, 1, si), 0, 0), kr.drawImage(h(ht, 0, si), 0, 0)) : (br.drawImage(h(ht, 1, si), 0, 0), kr.drawImage(h(ht, 0, si), 0, 0))), lr && (l ? au.drawImage(b(ot, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, l), 0, 0) : au.drawImage(b(ot, steelseries.ColorDef.BLUE.dark.getRgbaColor(), !1, l), 0, 0)), ar && (l ? vu.drawImage(b(ot, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, l), 0, 0) : vu.drawImage(b(ot, steelseries.ColorDef.RED.medium.getRgbaColor(), !1, l), 0, 0)), v && sr && (uf(ut, ku, l), cr && (ut.save(), l ? (i = f * .856796 - f * .728155 * (rt - r) / (c - r), ut.translate(u * .365, i - ot / 2)) : (i = (u * .856796 - u * .12864) * (rt - r) / (c - r), ut.translate(u * .142857 - ot / 2 + i, f * .58)), ut.drawImage(rf(l), 0, 0), ut.restore()), l ? pt(ut, u, f, er, or, nt, l, null, gi) : pt(ut, u, f, er, or, nt, l, null, gi)), v && gi && (l ? (fr = tt(u * .571428, f * .055, ii), ut.drawImage(fr, (u - u * .571428) / 2, f * .88)) : (fr = tt(u * .18, f * .15, ii), ut.drawImage(fr, u * .695, f * .22))), k && (of(lu), gr(pi, oi)), li = !1, null !== ti && 0 < ti.length) {
                            li = !0;
                            t = ti.length;
                            l ? (e = f * .12864, o = f * .856796, s = o - e, a = 0) : (e = u * .856796, o = u * .12864, s = e - o, a = u * .012135 / 2);
                            st = [];
                            do t--, st.push({
                                start: (ti[t].start + Math.abs(r)) / (c - r) * s - a,
                                stop: (ti[t].stop + Math.abs(r)) / (c - r) * s - a,
                                color: gt(ti[t].color)
                            }); while (0 < t)
                        }
                        nr = !1;
                        fu && kt !== null && (li = !1, nr = !0);
                        w && ru && yt(yu, u, f, l, !1)
                    },
                    ct = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.led ? !1 : n.led,
                            u = undefined === n.bargraphled ? !1 : n.bargraphled,
                            f = undefined === n.foreground ? !1 : n.foreground;
                        t && (vi.width = y, vi.height = p, cu = vi.getContext("2d"));
                        i && (yi.width = y, yi.height = p, ut = yi.getContext("2d"));
                        u && (l ? (ft.width = y * .121428, ft.height = p * .012135) : (ft.width = y * .012135, ft.height = p * .121428), pi = ft.getContext("2d"), l ? (it.width = y * .121428, it.height = p * .012135) : (it.width = y * .012135, it.height = p * .121428), lu = it.getContext("2d"));
                        r && (fi.width = Math.ceil(y * .093457), fi.height = Math.ceil(p * .093457), br = fi.getContext("2d"), ni.width = Math.ceil(y * .093457), ni.height = Math.ceil(p * .093457), kr = ni.getContext("2d"), ei = ni);
                        f && (ki.width = y, ki.height = p, yu = ki.getContext("2d"))
                    },
                    di = function(n) {
                        n ? ou = setInterval(ff, 1e3) : (clearInterval(ou), ei = ni)
                    },
                    ff = function() {
                        hr && (ei = ei === fi ? ni : fi, ci || (ci = !0, s(du.repaint)))
                    },
                    ef = function(n, t, i) {
                        var s, ut, f = nt.labelColor,
                            u, yt, ti, d, et, ht, pt, wt, bt, dt, ni, ct, lt, p, y, g, tt, w, b, k, rt, ii, ri, at, vt, e, o, h, ot, v;
                        if (l ? (s = i * .12864, ut = i * .856796, u = ut - s, yt = u * (a - r) / (c - r), ti = s + u - yt, d = 0, et = s, ht = 0, pt = s + u * 1.014) : (s = t * .856796, ut = t * .12864, u = s - ut, yt = u * (a - r) / (c - r), ti = ut, d = t * .13, et = i * .435714, ht = d + u * 1.035, pt = et), y = nt === steelseries.BackgroundColor.CARBON || nt === steelseries.BackgroundColor.PUNCHED_SHEET || nt === steelseries.BackgroundColor.STAINLESS || nt === steelseries.BackgroundColor.BRUSHED_STAINLESS || nt === steelseries.BackgroundColor.TURNED ? .3 : 0, g = n.createLinearGradient(d, et, ht, pt), f.setAlpha(.047058 + y), g.addColorStop(0, f.getRgbaColor()), f.setAlpha(.145098 + y), g.addColorStop(.48, f.getRgbaColor()), f.setAlpha(.149019 + y), g.addColorStop(.49, f.getRgbaColor()), f.setAlpha(.047058 + y), g.addColorStop(1, f.getRgbaColor()), n.fillStyle = g, l ? n.fillRect(t * .435714, s, t * .15, u * 1.014) : n.fillRect(d, et, u * 1.035, i * .152857), l ? (wt = 0, bt = s, dt = 0, ni = s + u * 1.014) : (wt = d, bt = 0, dt = ht, ni = 0), tt = n.createLinearGradient(wt, bt, dt, ni), f.setAlpha(.298039 + y), tt.addColorStop(0, f.getRgbaColor()), f.setAlpha(.686274 + y), tt.addColorStop(.48, f.getRgbaColor()), f.setAlpha(.698039 + y), tt.addColorStop(.49, f.getRgbaColor()), f.setAlpha(.4 + y), tt.addColorStop(1, f.getRgbaColor()), n.fillStyle = tt, l ? (n.fillRect(t * .435714, s, t * .007142, u * 1.014), n.fillRect(t * .571428, s, t * .007142, u * 1.014)) : (n.fillRect(t * .13, i * .435714, u * 1.035, i * .007142), n.fillRect(t * .13, i * .571428, u * 1.035, i * .007142)), l ? (w = t * .45, b = i * .851941, k = t * .121428, rt = i * .012135, ii = (w + k) / 2, ri = (b + rt) / 2) : (w = t * .142857, b = i * .45, k = t * .012135, rt = i * .121428, ii = (w + k) / 2, ri = (b + rt) / 2), ot = oi, l) {
                            for (vt = u, o = 0; o <= vt; o += rt + 1) n.translate(0, -o), n.drawImage(it, w, b), n.translate(0, o);
                            for (at = (a - r) / (c - r) * u, o = 0; o <= at; o += rt + 1) {
                                if (h = oi, nr) ct = r + o / u * (c - r), lt = kt.getEnd() - kt.getStart(), p = (ct - r) / lt, p = Math.max(Math.min(p, 1), 0), h = gt(kt.getColorAt(p).getRgbaColor());
                                else if (li)
                                    for (v = 0; v < st.length; v++)
                                        if (o >= st[v].start && o < st[v].stop) {
                                            h = st[v].color;
                                            break
                                        }
                                ot.medium.getHexColor() !== h.medium.getHexColor() && (gr(pi, h), ot = h);
                                n.translate(0, -o);
                                n.drawImage(ft, w, b);
                                n.translate(0, o)
                            }
                        } else {
                            for (vt = u, e = -(k / 2); e <= vt; e += k + 1) n.translate(e, 0), n.drawImage(it, w, b), n.translate(-e, 0);
                            for (at = (a - r) / (c - r) * u, e = -(k / 2); e <= at; e += k + 1) {
                                if (h = oi, nr) ct = r + e / u * (c - r), lt = kt.getEnd() - kt.getStart(), p = (ct - r) / lt, p = Math.max(Math.min(p, 1), 0), h = gt(kt.getColorAt(p).getRgbaColor());
                                else if (li)
                                    for (v = 0; v < st.length; v++)
                                        if (e >= st[v].start && e < st[v].stop) {
                                            h = st[v].color;
                                            break
                                        }
                                ot.medium.getHexColor() !== h.medium.getHexColor() && (gr(pi, h), ot = h);
                                n.translate(e, 0);
                                n.drawImage(ft, w, b);
                                n.translate(-e, 0)
                            }
                        }
                    },
                    of = function(n) {
                        n.save();
                        n.beginPath();
                        n.rect(0, 0, n.canvas.width, n.canvas.height);
                        n.closePath();
                        var i = n.canvas.width / 2,
                            r = n.canvas.height / 2,
                            t = k.createRadialGradient(i, r, 0, i, r, n.canvas.width / 2);
                        t.addColorStop(0, "#3c3c3c");
                        t.addColorStop(1, "#323232");
                        n.fillStyle = t;
                        n.fill();
                        n.restore()
                    },
                    gr = function(n, t) {
                        var r, u, f, i;
                        n.save();
                        n.beginPath();
                        n.rect(0, 0, n.canvas.width, n.canvas.height);
                        n.closePath();
                        r = n.canvas.width / 2;
                        u = n.canvas.height / 2;
                        f = l ? n.canvas.width / 2 : n.canvas.height / 2;
                        i = k.createRadialGradient(r, u, 0, r, u, f);
                        i.addColorStop(0, t.light.getRgbaColor());
                        i.addColorStop(1, t.dark.getRgbaColor());
                        n.fillStyle = i;
                        n.fill();
                        n.restore()
                    };
                return this.setValue = function(n) {
                    n = parseFloat(n);
                    var t = n < r ? r : n > c ? c : n;
                    return a !== t && (a = t, a > bt && (bt = a), a < wt && (wt = a), a >= rt && !d && lt || a <= rt && !d && !lt ? (d = !0, di(d), hi && ri.play()) : (a < rt && d && lt || a > rt && d && !lt) && (d = !1, di(d), hi && ri.pause()), this.repaint()), this
                }, this.getValue = function() {
                    return a
                }, this.setValueAnimated = function(n, t) {
                    var i, f = this,
                        u;
                    return n = parseFloat(n), i = n < r ? r : n > c ? c : n, a !== i && (undefined !== ui && ui.isPlaying && ui.stop(), u = eu * Math.abs(i - a) / (c - r), u = Math.max(u, eu / 5), ui = new Tween({}, "", Tween.regularEaseInOut, a, i, u), ui.onMotionChanged = function(n) {
                        a = n.target._pos;
                        a >= rt && !d && lt || a <= rt && !d && !lt ? (d = !0, di(d), hi && ri.play()) : (a < rt && d && lt || a > rt && d && !lt) && (d = !1, di(d), hi && ri.pause());
                        a > bt && (bt = a);
                        a < wt && (wt = a);
                        ci || (ci = !0, s(f.repaint))
                    }, t && typeof t == "function" && (ui.onMotionFinished = t), ui.start()), this
                }, this.resetMinMeasuredValue = function() {
                    return wt = a, this.repaint(), this
                }, this.resetMaxMeasuredValue = function() {
                    return bt = a, this.repaint(), this
                }, this.setMinMeasuredValueVisible = function(n) {
                    return lr = !!n, this.repaint(), this
                }, this.setMaxMeasuredValueVisible = function(n) {
                    return ar = !!n, this.repaint(), this
                }, this.setThresholdVisible = function(n) {
                    return cr = !!n, this.repaint(), this
                }, this.setThresholdRising = function(n) {
                    return lt = !!n, d = !d, di(d), this.repaint(), this
                }, this.setLcdDecimals = function(n) {
                    return iu = parseInt(n, 10), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return ct({
                        frame: !0
                    }), nu = n, g({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return ct({
                        background: !0
                    }), nt = n, g({
                        background: !0
                    }), this.repaint(), this
                }, this.setValueColor = function(n) {
                    return ct({
                        bargraphled: !0
                    }), oi = n, g({
                        bargraphled: !0
                    }), this.repaint(), this
                }, this.setLedColor = function(n) {
                    return ct({
                        led: !0
                    }), si = n, g({
                        led: !0
                    }), this.repaint(), this
                }, this.setLedVisible = function(n) {
                    return hr = !!n, this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return ii = n, ct({
                        background: !0
                    }), g({
                        background: !0
                    }), this.repaint(), this
                }, this.setSection = function(n) {
                    return ti = n, g(), this.repaint(), this
                }, this.setSectionActive = function(n) {
                    return pu = n, g(), this.repaint(), this
                }, this.setGradient = function(n) {
                    return kt = n, g(), this.repaint(), this
                }, this.setGradientActive = function(n) {
                    return fu = n, g(), this.repaint(), this
                }, this.setMaxMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < r ? r : n > c ? c : n;
                    return bt !== t && (bt = t, this.repaint()), this
                }, this.setMinMeasuredValue = function(n) {
                    n = parseFloat(n);
                    var t = n < r ? r : n > c ? c : n;
                    return wt !== t && (wt = t, this.repaint()), this
                }, this.setTitleString = function(n) {
                    return er = n, ct({
                        background: !0
                    }), g({
                        background: !0
                    }), this.repaint(), this
                }, this.setUnitString = function(n) {
                    return or = n, ct({
                        background: !0
                    }), g({
                        background: !0
                    }), this.repaint(), this
                }, this.setMinValue = function(n) {
                    return r = parseFloat(n), ct({
                        background: !0,
                        foreground: !0,
                        pointer: !0
                    }), g({
                        background: !0,
                        foreground: !0,
                        pointer: !0
                    }), this.repaint(), this
                }, this.getMinValue = function() {
                    return r
                }, this.setMaxValue = function(n) {
                    return c = parseFloat(n), ct({
                        background: !0,
                        foreground: !0,
                        pointer: !0
                    }), g({
                        background: !0,
                        foreground: !0,
                        pointer: !0
                    }), this.repaint(), this
                }, this.getMaxValue = function() {
                    return c
                }, this.setThreshold = function(n) {
                    n = parseFloat(n);
                    var t = n < r ? r : n > c ? c : n;
                    return rt !== t && (rt = t, ct({
                        background: !0
                    }), g({
                        background: !0
                    }), this.repaint()), this
                }, this.setThresholdVisible = function(n) {
                    return cr = !!n, this.repaint(), this
                }, this.repaint = function() {
                    su || g({
                        frame: !0,
                        background: !0,
                        led: !0,
                        pointer: !0,
                        foreground: !0,
                        bargraphled: !0
                    });
                    k.clearRect(0, 0, k.canvas.width, k.canvas.height);
                    tu && k.drawImage(vi, 0, 0);
                    sr && k.drawImage(yi, 0, 0);
                    gi && tf(k, a, l);
                    hr && k.drawImage(ei, vr, yr);
                    var n, t, i;
                    lr && (l ? (n = f * .856796 - f * .728155 * (wt - r) / (c - r), t = u * .34 - wi.width, i = n - wi.height / 2) : (n = (u * .856796 - u * .12864) * (wt - r) / (c - r), t = u * .142857 - wi.height / 2 + n, i = f * .65), k.drawImage(wi, t, i));
                    ar && (l ? (n = f * .856796 - f * .728155 * (bt - r) / (c - r), t = u * .34 - bi.width, i = n - bi.height / 2) : (n = (u * .856796 - u * .12864) * (bt - r) / (c - r), t = u * .142857 - bi.height / 2 + n, i = f * .65), k.drawImage(bi, t, i));
                    k.save();
                    ef(k, u, f);
                    k.restore();
                    ru && k.drawImage(ki, 0, 0);
                    ci = !1
                }, this.repaint(), this
            },
            ur = function(n, i) {
                i = i || {};
                var a = undefined === i.width ? 0 : i.width,
                    v = undefined === i.height ? 0 : i.height,
                    y = undefined === i.lcdColor ? steelseries.LcdColor.STANDARD : i.lcdColor,
                    kt = undefined === i.lcdDecimals ? 2 : i.lcdDecimals,
                    rt = undefined === i.unitString ? "" : i.unitString,
                    ut = undefined === i.unitStringVisible ? !1 : i.unitStringVisible,
                    dt = undefined === i.headerString ? "" : i.headerString,
                    ft = undefined === i.headerStringVisible ? !1 : i.headerStringVisible,
                    ot = undefined === i.digitalFont ? !1 : i.digitalFont,
                    gt = undefined === i.valuesNumeric ? !0 : i.valuesNumeric,
                    b = undefined === i.value ? 0 : i.value,
                    ni = undefined === i.alwaysScroll ? !1 : i.alwaysScroll,
                    st = undefined === i.autoScroll ? !1 : i.autoScroll,
                    u = undefined === i.section ? null : i.section,
                    l = !1,
                    h = 0,
                    d, g = !1,
                    ti = this,
                    r = w(n);
                a === 0 && (a = r.canvas.width);
                v === 0 && (v = r.canvas.height);
                r.canvas.width = a;
                r.canvas.height = v;
                var o = a,
                    f = v,
                    c = 0,
                    k = Math.floor(f / 1.5),
                    ht = k + "px " + e,
                    lt = k + "px " + et,
                    at = !1,
                    vt, yt = [],
                    pt = [],
                    ii = function(n, t) {
                        var s, a, i;
                        r.save();
                        r.textAlign = "right";
                        r.strokeStyle = t;
                        r.fillStyle = t;
                        r.beginPath();
                        r.rect(2, 0, o - 4, f);
                        r.closePath();
                        r.clip();
                        (y === steelseries.LcdColor.STANDARD || y === steelseries.LcdColor.STANDARD_GREEN) && u === null && (r.shadowColor = "gray", r.shadowOffsetX = f * .035, r.shadowOffsetY = f * .035, r.shadowBlur = f * .055);
                        r.font = ot ? lt : ht;
                        gt ? (s = 0, c = 0, ut && (r.font = Math.floor(f / 2.5) + "px " + e, s = r.measureText(rt).width), r.font = ot ? lt : ht, a = n.toFixed(kt), c = r.measureText(a).width, i = .38, ft && (i = .52), r.fillText(a, o - s - 4 - h, f * .5 + k * i), ut && (r.font = Math.floor(f / 2.5) + "px " + e, r.fillText(rt, o - 2 - h, f * .5 + k * i)), ft && (r.textAlign = "center", r.font = Math.floor(f / 3.5) + "px " + e, r.fillText(dt, o / 2, f * .3))) : (c = r.measureText(n).width, ni || st && c > o - 4 ? l || (h = c > o * .8 ? o - c - o * .2 : 0, l = !0, clearTimeout(d), d = setTimeout(nt, 200)) : st && c <= o - 4 && (h = 0, l = !1), r.fillText(n, o - 2 - h, f * .5 + k * .38));
                        r.restore()
                    },
                    ri = function(n, i, r, u) {
                        var it = t(n, i),
                            f = it.getContext("2d");
                        f.save();
                        var h = 0,
                            et = n,
                            rt = i,
                            ut = Math.min(n, i) * .095,
                            s = f.createLinearGradient(0, h, 0, h + rt);
                        s.addColorStop(0, "#4c4c4c");
                        s.addColorStop(.08, "#666666");
                        s.addColorStop(.92, "#666666");
                        s.addColorStop(1, "#e6e6e6");
                        f.fillStyle = s;
                        p(f, 0, h, et, rt, ut);
                        f.fill();
                        f.restore();
                        f.save();
                        var c = ct(r),
                            e = wt(c[0], c[1], c[2]),
                            l = ct(u.gradientStartColor),
                            ot = wt(l[0], l[1], l[2]),
                            a = ct(u.gradientFraction1Color),
                            st = wt(a[0], a[1], a[2]),
                            v = ct(u.gradientFraction2Color),
                            ht = wt(v[0], v[1], v[2]),
                            y = ct(u.gradientFraction3Color),
                            lt = wt(y[0], y[1], y[2]),
                            w = ct(u.gradientStopColor),
                            at = wt(w[0], w[1], w[2]),
                            b = bt(e[0], e[1], ot[2] - .31),
                            k = bt(e[0], e[1], st[2] - .31),
                            d = bt(e[0], e[1], ht[2] - .31),
                            g = bt(e[0], e[1], lt[2] - .31),
                            nt = bt(e[0], e[1], at[2] - .31),
                            tt = 1,
                            vt = n - 2,
                            ft = i - 2,
                            yt = ut - 1,
                            o = f.createLinearGradient(0, tt, 0, tt + ft);
                        return o.addColorStop(0, "rgb(" + b[0] + ", " + b[1] + ", " + b[2] + ")"), o.addColorStop(.03, "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")"), o.addColorStop(.49, "rgb(" + d[0] + "," + d[1] + "," + d[2] + ")"), o.addColorStop(.5, "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")"), o.addColorStop(1, "rgb(" + nt[0] + "," + nt[1] + "," + nt[2] + ")"), f.fillStyle = o, p(f, 1, tt, vt, ft, yt), f.fill(), f.restore(), it
                    },
                    ui = function(n) {
                        var t = ct(n),
                            r = wt(t[0], t[1], t[2]),
                            i = bt(r[0], .57, .83);
                        return "rgb(" + i[0] + ", " + i[1] + ", " + i[2] + ")"
                    },
                    nt = function() {
                        l ? (h > o && (h = -c), h += 2, d = setTimeout(nt, 50)) : h = 0;
                        g || (g = !0, s(ti.repaint))
                    },
                    it = function() {
                        var n;
                        if (at = !0, vt = tt(a, v, y), null !== u && 0 < u.length)
                            for (n = 0; n < u.length; n++) yt[n] = ri(a, v, u[n].color, y), pt[n] = ui(u[n].color)
                    };
                return this.setValue = function(n) {
                    return b !== n && (b = n, this.repaint()), this
                }, this.setLcdColor = function(n) {
                    return y = n, it(), this.repaint(), this
                }, this.setSection = function(n) {
                    return u = n, it({
                        background: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setScrolling = function(n) {
                    if (n) {
                        if (l) return;
                        l = n;
                        nt()
                    } else l = n;
                    return this
                }, this.repaint = function() {
                    at || it();
                    r.clearRect(0, 0, r.canvas.width, r.canvas.height);
                    var t = vt,
                        i = y.textColor,
                        n;
                    if (null !== u && 0 < u.length)
                        for (n = 0; n < u.length; n++)
                            if (b >= u[n].start && b <= u[n].stop) {
                                t = yt[n];
                                i = pt[n];
                                break
                            }
                    r.drawImage(t, 0, 0);
                    ii(b, i);
                    g = !1
                }, this.repaint(), this
            },
            fr = function(n, t) {
                t = t || {};
                var h = undefined === t.width ? 0 : t.width,
                    c = undefined === t.height ? 0 : t.height,
                    f = undefined === t.lcdColor ? steelseries.LcdColor.STANDARD : t.lcdColor,
                    v = undefined === t.lcdDecimals ? 2 : t.lcdDecimals,
                    y = undefined === t.headerString ? "" : t.headerString,
                    o = undefined === t.headerStringVisible ? !1 : t.headerStringVisible,
                    it = undefined === t.detailString ? "" : t.detailString,
                    rt = undefined === t.detailStringVisible ? !1 : t.detailStringVisible,
                    ut = undefined === t.linkAltValue ? !0 : t.linkAltValue,
                    a = undefined === t.unitString ? "" : t.unitString,
                    p = undefined === t.unitStringVisible ? !1 : t.unitStringVisible,
                    b = undefined === t.digitalFont ? !1 : t.digitalFont,
                    ft = undefined === t.valuesNumeric ? !0 : t.valuesNumeric,
                    l = undefined === t.value ? 0 : t.value,
                    s = undefined === t.altValue ? 0 : t.altValue,
                    i = w(n);
                h === 0 && (h = i.canvas.width);
                c === 0 && (c = i.canvas.height);
                i.canvas.width = h;
                i.canvas.height = c;
                var u = h,
                    r = c,
                    ot = Math.floor(r / 1.875) + "px " + e,
                    st = Math.floor(r / 1.875) + "px " + et,
                    k = Math.floor(r / 3.5) + "px " + e,
                    ht = Math.floor(r / 3.5) + "px " + et,
                    d = !1,
                    g, ct = function(n) {
                        var t, c, h;
                        i.save();
                        i.textAlign = "right";
                        i.textBaseline = "middle";
                        i.strokeStyle = f.textColor;
                        i.fillStyle = f.textColor;
                        (f === steelseries.LcdColor.STANDARD || f === steelseries.LcdColor.STANDARD_GREEN) && (i.shadowColor = "gray", i.shadowOffsetX = r * .025, i.shadowOffsetY = r * .025, i.shadowBlur = r * .05);
                        ft ? (i.font = o ? Math.floor(r / 3) + "px " + e : Math.floor(r / 2.5) + "px " + e, t = 0, p && (o ? (i.font = Math.floor(r / 3) + "px " + e, t = i.measureText(a).width) : (i.font = Math.floor(r / 2.5) + "px " + e, t = i.measureText(a).width)), i.font = b ? st : ot, c = n.toFixed(v), o ? i.fillText(c, u - t - 4, r * .5) : i.fillText(c, u - t - 4, r * .38), p && (i.font = Math.floor(r / 3) + "px " + e, i.fillText(a, u - 2, r * .55)), h = s.toFixed(v), rt && (h = it + h), i.font = b ? ht : o ? Math.floor(r / 5) + "px " + e : k, i.textAlign = "center", o ? (i.fillText(h, u / 2, r * .83), i.fillText(y, u / 2, r * .16)) : i.fillText(h, u / 2, r * .8)) : o ? (i.font = Math.floor(r / 3.5) + "px " + e, i.fillText(n, u - 2, r * .48), i.font = Math.floor(r / 5) + "px " + e, i.textAlign = "center", i.fillText(s, u / 2, r * .83), i.fillText(y, u / 2, r * .17)) : (i.font = Math.floor(r / 2.5) + "px " + e, i.fillText(n, u - 2, r * .38), i.font = k, i.textAlign = "center", i.fillText(s, u / 2, r * .8));
                        i.restore()
                    },
                    nt = function() {
                        d = !0;
                        g = tt(h, c, f)
                    };
                return this.setValue = function(n) {
                    return l !== n && (ut && (s = l), l = n, this.repaint()), this
                }, this.setAltValue = function(n) {
                    return s !== n && (s = n, this.repaint()), this
                }, this.setLcdColor = function(n) {
                    return f = n, nt(), this.repaint(), this
                }, this.repaint = function() {
                    d || nt();
                    i.clearRect(0, 0, i.canvas.width, i.canvas.height);
                    i.drawImage(g, 0, 0);
                    ct(l)
                }, this.repaint(), this
            },
            er = function(n, o) {
                o = o || {};
                var v = undefined === o.size ? 0 : o.size,
                    at = undefined === o.decimalsVisible ? !1 : o.decimalsVisible,
                    ui = undefined === o.textOrientationFixed ? !1 : o.textOrientationFixed,
                    pt = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                    wt = undefined === o.frameVisible ? !0 : o.frameVisible,
                    k = undefined === o.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : o.backgroundColor,
                    bt = undefined === o.backgroundVisible ? !0 : o.backgroundVisible,
                    tt = undefined === o.pointerColor ? steelseries.ColorDef.RED : o.pointerColor,
                    kt = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                    dt = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                    fi = undefined === o.rotateFace ? !1 : o.rotateFace,
                    a = w(n);
                v === 0 && (v = Math.min(a.canvas.width, a.canvas.height));
                a.canvas.width = v;
                a.canvas.height = v;
                var it, vt = !1,
                    c = 0,
                    rt = 0,
                    y = 0,
                    gt = r / 360,
                    ht = this.value,
                    ni = at ? 1 : 0,
                    h = v,
                    l = v,
                    p = h / 2,
                    b = l / 2,
                    ti = !1,
                    ut = t(v, v),
                    ct = ut.getContext("2d"),
                    ft = t(v, v),
                    yt = ft.getContext("2d"),
                    et = t(v, v),
                    ii = et.getContext("2d"),
                    ot = t(v, v),
                    ri = ot.getContext("2d"),
                    ei = function(n) {
                        var r, e, t;
                        for (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = k.labelColor.getRgbaColor(), n.fillStyle = k.labelColor.getRgbaColor(), n.translate(p, b), t = 0; 360 > t; t++) {
                            n.strokeStyle = k.labelColor.getRgbaColor();
                            n.lineWidth = .5;
                            n.beginPath();
                            n.moveTo(h * .38, 0);
                            n.lineTo(h * .37, 0);
                            n.closePath();
                            n.stroke();
                            0 == t % 5 && (n.strokeStyle = k.labelColor.getRgbaColor(), n.lineWidth = 1, n.beginPath(), n.moveTo(h * .38, 0), n.lineTo(h * .36, 0), n.closePath(), n.stroke());
                            0 == t % 45 && (n.strokeStyle = k.labelColor.getRgbaColor(), n.lineWidth = 1, n.beginPath(), n.moveTo(h * .38, 0), n.lineTo(h * .34, 0), n.closePath(), n.stroke());
                            300 < h && (r = "14px " + r, e = "12px " + r);
                            300 >= h && (r = "12px " + r, e = "10px " + r);
                            200 >= h && (r = "10px " + r, e = "8px " + r);
                            100 >= h && (r = "8px " + r, e = "6px " + r);
                            n.save();
                            switch (t) {
                                case 0:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u + i);
                                    n.font = r;
                                    n.fillText("0°", 0, 0, h);
                                    n.rotate(-(t * u) + i);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .41, 0);
                                    n.rotate(t * u - i);
                                    n.font = e;
                                    n.fillText("0%", 0, 0, h);
                                    break;
                                case 45:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u + .25 * f);
                                    n.font = r;
                                    n.fillText("45°", 0, 0, h);
                                    n.rotate(-(t * u) + .25 * f);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .31, h * .085);
                                    n.rotate(t * u - .25 * f);
                                    n.font = e;
                                    n.fillText("100%", 0, 0, h);
                                    break;
                                case 90:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u);
                                    n.font = r;
                                    n.fillText("90°", 0, 0, h);
                                    n.rotate(-(t * u));
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .21, 0);
                                    n.rotate(t * u);
                                    n.font = e;
                                    n.fillText("∞", 0, 0, h);
                                    break;
                                case 135:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u - .25 * f);
                                    n.font = r;
                                    n.fillText("45°", 0, 0, h);
                                    n.rotate(-(t * u) - .25 * f);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .31, -h * .085);
                                    n.rotate(t * u + .25 * f);
                                    n.font = e;
                                    n.fillText("100%", 0, 0, h);
                                    break;
                                case 180:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u - i);
                                    n.font = r;
                                    n.fillText("0°", 0, 0, h);
                                    n.rotate(-(t * u) - i);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .41, 0);
                                    n.rotate(t * u + i);
                                    n.font = e;
                                    n.fillText("0%", 0, 0, h);
                                    n.translate(-h * .41, 0);
                                    break;
                                case 225:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u - .75 * f);
                                    n.font = r;
                                    n.fillText("45°", 0, 0, h);
                                    n.rotate(-(t * u) - .75 * f);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .31, h * .085);
                                    n.rotate(t * u + .75 * f);
                                    n.font = e;
                                    n.fillText("100%", 0, 0, h);
                                    break;
                                case 270:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u - f);
                                    n.font = r;
                                    n.fillText("90°", 0, 0, h);
                                    n.rotate(-(t * u) - f);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .21, 0);
                                    n.rotate(t * u - f);
                                    n.font = e;
                                    n.fillText("∞", 0, 0, h);
                                    break;
                                case 315:
                                    n.translate(h * .31, 0);
                                    n.rotate(t * u - 1.25 * f);
                                    n.font = r;
                                    n.fillText("45°", 0, 0, h);
                                    n.rotate(-(t * u) - 1.25 * f);
                                    n.translate(-h * .31, 0);
                                    n.translate(h * .31, -h * .085);
                                    n.rotate(t * u + 1.25 * f);
                                    n.font = e;
                                    n.fillText("100%", 0, 0, h)
                            }
                            n.restore();
                            n.rotate(gt)
                        }
                        n.translate(-p, -b);
                        n.restore()
                    },
                    oi = function(n) {
                        n.save();
                        n.strokeStyle = k.labelColor.getRgbaColor();
                        n.fillStyle = k.labelColor.getRgbaColor();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .200934, l * .434579);
                        n.lineTo(h * .163551, l * .434579);
                        n.lineTo(h * .163551, l * .560747);
                        n.lineTo(h * .200934, l * .560747);
                        n.lineWidth = 1;
                        n.lineCap = "square";
                        n.lineJoin = "miter";
                        n.stroke();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .163551, l * .471962);
                        n.lineTo(h * .205607, l * .5);
                        n.lineTo(h * .163551, l * .523364);
                        n.lineTo(h * .163551, l * .471962);
                        n.closePath();
                        n.fill();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .799065, l * .434579);
                        n.lineTo(h * .836448, l * .434579);
                        n.lineTo(h * .836448, l * .560747);
                        n.lineTo(h * .799065, l * .560747);
                        n.lineWidth = 1;
                        n.lineCap = "square";
                        n.lineJoin = "miter";
                        n.stroke();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .836448, l * .471962);
                        n.lineTo(h * .794392, l * .5);
                        n.lineTo(h * .836448, l * .523364);
                        n.lineTo(h * .836448, l * .471962);
                        n.closePath();
                        n.fill();
                        n.restore()
                    },
                    si = function(n) {
                        var u;
                        n.save();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .523364, l * .350467);
                        n.lineTo(h * .5, l * .130841);
                        n.lineTo(h * .476635, l * .350467);
                        n.bezierCurveTo(h * .476635, l * .350467, h * .490654, l * .345794, h * .5, l * .345794);
                        n.bezierCurveTo(h * .509345, l * .345794, h * .523364, l * .350467, h * .523364, l * .350467);
                        n.closePath();
                        var t = n.createLinearGradient(0, .154205 * l, 0, .350466 * l),
                            i = tt.dark,
                            r = tt.light;
                        i.setAlpha(.70588);
                        r.setAlpha(.70588);
                        t.addColorStop(0, i.getRgbaColor());
                        t.addColorStop(.3, r.getRgbaColor());
                        t.addColorStop(.59, r.getRgbaColor());
                        t.addColorStop(1, i.getRgbaColor());
                        n.fillStyle = t;
                        u = tt.light.getRgbaColor();
                        n.lineWidth = 1;
                        n.lineCap = "square";
                        n.lineJoin = "miter";
                        n.strokeStyle = u;
                        n.fill();
                        n.stroke();
                        i.setAlpha(1);
                        r.setAlpha(1);
                        n.restore()
                    },
                    hi = function(n) {
                        var t, i, r, f, u, e;
                        n.save();
                        t = tt.dark;
                        i = tt.light;
                        t.setAlpha(.70588);
                        i.setAlpha(.70588);
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .285046, l * .514018);
                        n.lineTo(h * .21028, l * .5);
                        n.lineTo(h * .285046, l * .481308);
                        n.bezierCurveTo(h * .285046, l * .481308, h * .280373, l * .490654, h * .280373, l * .495327);
                        n.bezierCurveTo(h * .280373, l * .504672, h * .285046, l * .514018, h * .285046, l * .514018);
                        n.closePath();
                        r = n.createLinearGradient(.224299 * h, 0, .289719 * h, 0);
                        r.addColorStop(0, t.getRgbaColor());
                        r.addColorStop(.3, i.getRgbaColor());
                        r.addColorStop(.59, i.getRgbaColor());
                        r.addColorStop(1, t.getRgbaColor());
                        n.fillStyle = r;
                        f = tt.light.getRgbaColor();
                        n.lineWidth = 1;
                        n.lineCap = "square";
                        n.lineJoin = "miter";
                        n.strokeStyle = f;
                        n.fill();
                        n.stroke();
                        n.save();
                        n.beginPath();
                        n.moveTo(h * .714953, l * .514018);
                        n.lineTo(h * .789719, l * .5);
                        n.lineTo(h * .714953, l * .481308);
                        n.bezierCurveTo(h * .714953, l * .481308, h * .719626, l * .490654, h * .719626, l * .495327);
                        n.bezierCurveTo(h * .719626, l * .504672, h * .714953, l * .514018, h * .714953, l * .514018);
                        n.closePath();
                        u = n.createLinearGradient(.7757 * h, 0, .71028 * h, 0);
                        u.addColorStop(0, t.getRgbaColor());
                        u.addColorStop(.3, i.getRgbaColor());
                        u.addColorStop(.59, i.getRgbaColor());
                        u.addColorStop(1, t.getRgbaColor());
                        n.fillStyle = u;
                        e = tt.light.getRgbaColor();
                        n.lineWidth = 1;
                        n.lineCap = "square";
                        n.lineJoin = "miter";
                        n.strokeStyle = e;
                        n.fill();
                        n.stroke();
                        t.setAlpha(1);
                        i.setAlpha(1);
                        n.restore()
                    },
                    st = function() {
                        ti = !0;
                        wt && d(ct, pt, p, b, h, l);
                        bt && (nt(ct, k, p, b, h, l), ei(ct));
                        oi(yt);
                        si(yt);
                        hi(ii);
                        dt && g(ri, kt, h, l, !1)
                    },
                    lt = function() {
                        ut.width = v;
                        ut.height = v;
                        ct = ut.getContext("2d");
                        ft.width = v;
                        ft.height = v;
                        yt = ft.getContext("2d");
                        et.width = v;
                        et.height = v;
                        ii = et.getContext("2d");
                        ot.width = v;
                        ot.height = v;
                        ri = ot.getContext("2d")
                    };
                return this.setValue = function(n) {
                    var t;
                    return n = parseFloat(n), t = 0 > n ? 360 + n : n, t = 359.9 < n ? n - 360 : n, c !== t && (c = t, rt = 2 * (Math.abs(c) * 10 % 10), 10 < rt && (rt -= 20), 0 === c && (y = 90), 0 < c && 90 >= c && (y = 90 - c), 90 < c && 180 >= c && (y = c - 90), 180 < c && 270 >= c && (y = 270 - c), 270 < c && 360 >= c && (y = c - 270), 0 > c && c >= -90 && (y = 90 - Math.abs(c)), c < -90 && c >= -180 && (y = Math.abs(c) - 90), c < -180 && c >= -270 && (y = 270 - Math.abs(c)), c < -270 && c >= -360 && (y = Math.abs(c) - 270), this.repaint()), this
                }, this.getValue = function() {
                    return c
                }, this.setValueAnimated = function(n, t) {
                    if (n = parseFloat(n), 360 - n + c < n - c && (n = 360 - n), c !== n) {
                        undefined !== it && it.isPlaying && it.stop();
                        it = new Tween({}, "", Tween.regularEaseInOut, c, n, 1);
                        var i = this;
                        it.onMotionChanged = function(n) {
                            c = n.target._pos;
                            rt = 2 * (Math.abs(c) * 10 % 10);
                            10 < rt && (rt -= 20);
                            0 === c && (y = 90);
                            0 < c && 90 >= c && (y = 90 - c);
                            90 < c && 180 >= c && (y = c - 90);
                            180 < c && 270 >= c && (y = 270 - c);
                            270 < c && 360 >= c && (y = c - 270);
                            0 > c && c >= -90 && (y = 90 - Math.abs(c));
                            c < -90 && c >= -180 && (y = Math.abs(c) - 90);
                            c < -180 && c >= -270 && (y = 270 - Math.abs(c));
                            c < -270 && c >= -360 && (y = Math.abs(c) - 270);
                            vt || (vt = !0, s(i.repaint))
                        };
                        t && typeof t == "function" && (it.onMotionFinished = t);
                        it.start()
                    }
                    return this
                }, this.setFrameDesign = function(n) {
                    return lt(), pt = n, st(), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return lt(), k = n, st(), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return lt(), kt = n, st(), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return lt(), tt = n, st(), this.repaint(), this
                }, this.repaint = function() {
                    ti || st();
                    a.save();
                    a.clearRect(0, 0, a.canvas.width, a.canvas.height);
                    ht = i + c * gt - i;
                    fi && (a.translate(p, b), a.rotate(-ht), a.translate(-p, -b));
                    (wt || bt) && a.drawImage(ut, 0, 0);
                    a.save();
                    a.translate(p, b);
                    a.rotate(ht);
                    a.translate(-p, -b);
                    a.drawImage(ft, 0, 0);
                    a.fillStyle = k.labelColor.getRgbaColor();
                    a.textAlign = "center";
                    a.textBaseline = "middle";
                    ui ? (a.restore(), a.font = at ? h * .1 + "px " + e : h * .15 + "px " + e, a.fillText(y.toFixed(ni) + "°", p, b, h * .35)) : (a.font = at ? h * .15 + "px " + e : h * .2 + "px " + e, a.fillText(y.toFixed(ni) + "°", p, b, h * .35), a.restore());
                    a.translate(p, b);
                    a.rotate(ht + rt * u);
                    a.translate(-p, -b);
                    a.drawImage(et, 0, 0);
                    a.restore();
                    dt && a.drawImage(ot, 0, 0);
                    a.restore();
                    vt = !1
                }, this.repaint(), this
            },
            or = function(n, r) {
                r = r || {};
                var h = undefined === r.size ? 0 : r.size,
                    vt = undefined === r.frameDesign ? steelseries.FrameDesign.METAL : r.frameDesign,
                    yt = undefined === r.frameVisible ? !0 : r.frameVisible,
                    k = undefined === r.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : r.backgroundColor,
                    et = undefined === r.backgroundVisible ? !0 : r.backgroundVisible,
                    pt = undefined === r.pointerType ? steelseries.PointerType.TYPE2 : r.pointerType,
                    c = undefined === r.pointerColor ? steelseries.ColorDef.RED : r.pointerColor,
                    ri = undefined === r.knobType ? steelseries.KnobType.STANDARD_KNOB : r.knobType,
                    ui = undefined === r.knobStyle ? steelseries.KnobStyle.SILVER : r.knobStyle,
                    wt = undefined === r.foregroundType ? steelseries.ForegroundType.TYPE1 : r.foregroundType,
                    bt = undefined === r.foregroundVisible ? !0 : r.foregroundVisible,
                    l = undefined === r.pointSymbols ? ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] : r.pointSymbols,
                    fi = undefined === r.pointSymbolsVisible ? !0 : r.pointSymbolsVisible,
                    ei = undefined === r.customLayer ? null : r.customLayer,
                    oi = undefined === r.degreeScale ? !1 : r.degreeScale,
                    kt = undefined === r.roseVisible ? !0 : r.roseVisible,
                    dt = undefined === r.rotateFace ? !1 : r.rotateFace,
                    p, ct = !1,
                    a = 0,
                    ot = u,
                    lt = this.value,
                    o = w(n);
                h === 0 && (h = Math.min(o.canvas.width, o.canvas.height));
                o.canvas.width = h;
                o.canvas.height = h;
                var f = h,
                    e = h,
                    v = f / 2,
                    y = e / 2,
                    gt = f * .006,
                    ni = !1,
                    rt = t(h, h),
                    st = rt.getContext("2d"),
                    tt = t(h, h),
                    at = tt.getContext("2d"),
                    ut = t(h, h),
                    ti = ut.getContext("2d"),
                    ft = t(h, h),
                    ii = ft.getContext("2d"),
                    si = function(n) {
                        var e, r, u, t;
                        if (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = k.labelColor.getRgbaColor(), n.fillStyle = k.labelColor.getRgbaColor(), n.translate(v, y), oi)
                            for (r = .08 * f + "px serif", u = f * .033 + "px serif", n.rotate(ot * 10), t = 10; 360 >= t; t += 10) {
                                if (n.save(), fi) switch (t) {
                                    case 360:
                                        n.translate(f * .35, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[2], 0, 0, f);
                                        n.translate(-f * .35, 0);
                                        break;
                                    case 90:
                                        n.translate(f * .35, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[4], 0, 0, f);
                                        n.translate(-f * .35, 0);
                                        break;
                                    case 180:
                                        n.translate(f * .35, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[6], 0, 0, f);
                                        n.translate(-f * .35, 0);
                                        break;
                                    case 270:
                                        n.translate(f * .35, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[0], 0, 0, f);
                                        n.translate(-f * .35, 0);
                                        break;
                                    default:
                                        e = (t + 90) % 360;
                                        n.translate(f * .37, 0);
                                        n.rotate(i);
                                        n.font = u;
                                        n.fillText("0".substring(e >= 100) + e, 0, 0, f);
                                        n.translate(-f * .37, 0)
                                } else e = (t + 90) % 360, n.translate(f * .37, 0), n.rotate(i), n.font = u, n.fillText("0".substring(e >= 100) + e, 0, 0, f), n.translate(-f * .37, 0);
                                n.restore();
                                n.rotate(ot * 10)
                            } else
                                for (r = .12 * f + "px serif", u = .06 * f + "px serif", t = 0; 360 > t; t += 2.5) {
                                    0 == t % 5 && (n.lineWidth = 1, n.beginPath(), n.moveTo(f * .38, 0), n.lineTo(f * .36, 0), n.closePath(), n.stroke());
                                    n.save();
                                    switch (t) {
                                        case 0:
                                            n.translate(f * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[2], 0, 0, f);
                                            n.translate(-f * .35, 0);
                                            break;
                                        case 45:
                                            n.translate(f * .29, 0);
                                            n.rotate(i);
                                            n.font = u;
                                            n.fillText(l[3], 0, 0, f);
                                            n.translate(-f * .29, 0);
                                            break;
                                        case 90:
                                            n.translate(f * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[4], 0, 0, f);
                                            n.translate(-f * .35, 0);
                                            break;
                                        case 135:
                                            n.translate(f * .29, 0);
                                            n.rotate(i);
                                            n.font = u;
                                            n.fillText(l[5], 0, 0, f);
                                            n.translate(-f * .29, 0);
                                            break;
                                        case 180:
                                            n.translate(f * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[6], 0, 0, f);
                                            n.translate(-f * .35, 0);
                                            break;
                                        case 225:
                                            n.translate(f * .29, 0);
                                            n.rotate(i);
                                            n.font = u;
                                            n.fillText(l[7], 0, 0, f);
                                            n.translate(-f * .29, 0);
                                            break;
                                        case 270:
                                            n.translate(f * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[0], 0, 0, f);
                                            n.translate(-f * .35, 0);
                                            break;
                                        case 315:
                                            n.translate(f * .29, 0);
                                            n.rotate(i);
                                            n.font = u;
                                            n.fillText(l[1], 0, 0, f);
                                            n.translate(-f * .29, 0)
                                    }
                                    n.restore();
                                    kt && (0 === t || 22.5 === t || 45 === t || 67.5 === t || 90 === t || 112.5 === t || 135 === t || 157.5 === t || 180 === t || 202.5 === t || 225 === t || 247.5 === t || 270 === t || 292.5 === t || 315 === t || 337.5 === t || 360 === t) && (n.save(), n.beginPath(), t % 45 ? n.moveTo(f * .29, 0) : n.moveTo(f * .38, 0), n.lineTo(f * .1, 0), n.closePath(), n.restore(), n.lineWidth = 1, n.strokeStyle = k.symbolColor.getRgbaColor(), n.stroke());
                                    n.rotate(ot * 2.5)
                                }
                        n.translate(-v, -y);
                        n.restore()
                    },
                    hi = function(n) {
                        var t, i, s, r, u, o, h;
                        n.save();
                        switch (pt.type) {
                            case "type2":
                                n.beginPath();
                                n.moveTo(f * .53271, e * .453271);
                                n.bezierCurveTo(f * .53271, e * .453271, f * .5, e * .149532, f * .5, e * .149532);
                                n.bezierCurveTo(f * .5, e * .149532, f * .467289, e * .453271, f * .467289, e * .453271);
                                n.bezierCurveTo(f * .453271, e * .462616, f * .443925, e * .481308, f * .443925, e * .5);
                                n.bezierCurveTo(f * .443925, e * .5, f * .556074, e * .5, f * .556074, e * .5);
                                n.bezierCurveTo(f * .556074, e * .481308, f * .546728, e * .462616, f * .53271, e * .453271);
                                n.closePath();
                                t = n.createLinearGradient(.471962 * f, 0, .528036 * f, 0);
                                t.addColorStop(0, c.light.getRgbaColor());
                                t.addColorStop(.46, c.light.getRgbaColor());
                                t.addColorStop(.47, c.medium.getRgbaColor());
                                t.addColorStop(1, c.medium.getRgbaColor());
                                n.fillStyle = t;
                                n.strokeStyle = c.dark.getRgbaColor();
                                n.lineWidth = 1;
                                n.lineCap = "square";
                                n.lineJoin = "miter";
                                n.fill();
                                n.stroke();
                                n.beginPath();
                                n.moveTo(f * .467289, e * .546728);
                                n.bezierCurveTo(f * .467289, e * .546728, f * .5, e * .850467, f * .5, e * .850467);
                                n.bezierCurveTo(f * .5, e * .850467, f * .53271, e * .546728, f * .53271, e * .546728);
                                n.bezierCurveTo(f * .546728, e * .537383, f * .556074, e * .518691, f * .556074, e * .5);
                                n.bezierCurveTo(f * .556074, e * .5, f * .443925, e * .5, f * .443925, e * .5);
                                n.bezierCurveTo(f * .443925, e * .518691, f * .453271, e * .537383, f * .467289, e * .546728);
                                n.closePath();
                                i = n.createLinearGradient(.471962 * f, 0, .528036 * f, 0);
                                i.addColorStop(0, "#e3e5e8");
                                i.addColorStop(.48, "#e3e5e8");
                                i.addColorStop(.48, "#abb1b8");
                                i.addColorStop(1, "#abb1b8");
                                n.fillStyle = i;
                                s = "#abb1b8";
                                n.strokeStyle = s;
                                n.lineWidth = 1;
                                n.lineCap = "square";
                                n.lineJoin = "miter";
                                n.fill();
                                n.stroke();
                                break;
                            case "type3":
                                n.beginPath();
                                n.moveTo(f * .5, e * .149532);
                                n.bezierCurveTo(f * .5, e * .149532, f * .443925, e * .490654, f * .443925, e * .5);
                                n.bezierCurveTo(f * .443925, e * .53271, f * .467289, e * .556074, f * .5, e * .556074);
                                n.bezierCurveTo(f * .53271, e * .556074, f * .556074, e * .53271, f * .556074, e * .5);
                                n.bezierCurveTo(f * .556074, e * .490654, f * .5, e * .149532, f * .5, e * .149532);
                                n.closePath();
                                r = n.createLinearGradient(.471962 * f, 0, .528036 * f, 0);
                                r.addColorStop(0, c.light.getRgbaColor());
                                r.addColorStop(.46, c.light.getRgbaColor());
                                r.addColorStop(.47, c.medium.getRgbaColor());
                                r.addColorStop(1, c.medium.getRgbaColor());
                                n.fillStyle = r;
                                n.strokeStyle = c.dark.getRgbaColor();
                                n.lineWidth = 1;
                                n.lineCap = "square";
                                n.lineJoin = "miter";
                                n.fill();
                                n.stroke();
                                break;
                            case "type1:":
                            default:
                                n.beginPath();
                                n.moveTo(f * .5, e * .495327);
                                n.lineTo(f * .528037, e * .495327);
                                n.lineTo(f * .5, e * .149532);
                                n.lineTo(f * .471962, e * .495327);
                                n.lineTo(f * .5, e * .495327);
                                n.closePath();
                                u = n.createLinearGradient(.471962 * f, 0, .528036 * f, 0);
                                u.addColorStop(0, c.light.getRgbaColor());
                                u.addColorStop(.46, c.light.getRgbaColor());
                                u.addColorStop(.47, c.medium.getRgbaColor());
                                u.addColorStop(1, c.medium.getRgbaColor());
                                n.fillStyle = u;
                                n.strokeStyle = c.dark.getRgbaColor();
                                n.lineWidth = 1;
                                n.lineCap = "square";
                                n.lineJoin = "miter";
                                n.fill();
                                n.stroke();
                                n.beginPath();
                                n.moveTo(f * .5, e * .504672);
                                n.lineTo(f * .471962, e * .504672);
                                n.lineTo(f * .5, e * .850467);
                                n.lineTo(f * .528037, e * .504672);
                                n.lineTo(f * .5, e * .504672);
                                n.closePath();
                                o = n.createLinearGradient(.471962 * f, 0, .528036 * f, 0);
                                o.addColorStop(0, "#e3e5e8");
                                o.addColorStop(.48, "#e3e5e8");
                                o.addColorStop(.480099, "#abb1b8");
                                o.addColorStop(1, "#abb1b8");
                                n.fillStyle = o;
                                h = "#abb1b8";
                                n.strokeStyle = h;
                                n.lineWidth = 1;
                                n.lineCap = "square";
                                n.lineJoin = "miter";
                                n.fill();
                                n.stroke()
                        }
                        n.restore()
                    },
                    b = function() {
                        ni = !0;
                        yt && d(st, vt, v, y, f, e);
                        et && (nt(st, k, v, y, f, e), ht(st, ei, v, y, f, e), kt && ai(at, v, y, f, e, k), si(at));
                        hi(ti, !1);
                        bt && g(ii, wt, f, e, !0, ri, ui)
                    },
                    it = function() {
                        rt.width = h;
                        rt.height = h;
                        st = rt.getContext("2d");
                        tt.width = h;
                        tt.height = h;
                        at = tt.getContext("2d");
                        ut.width = h;
                        ut.height = h;
                        ti = ut.getContext("2d");
                        ft.width = h;
                        ft.height = h;
                        ii = ft.getContext("2d")
                    };
                return this.setValue = function(n) {
                    return n = parseFloat(n) % 360, a !== n && (a = n, this.repaint()), this
                }, this.getValue = function() {
                    return a
                }, this.setValueAnimated = function(n, t) {
                    var r = n % 360,
                        u = this,
                        i;
                    return a !== r && (undefined !== p && p.isPlaying && p.stop(), i = ci(a, r), p = dt ? new Tween({}, "", Tween.regularEaseInOut, a, a + i, 2) : new Tween({}, "", Tween.elasticEaseOut, a, a + i, 2), p.onMotionChanged = function(n) {
                        a = n.target._pos % 360;
                        ct || (ct = !0, s(u.repaint))
                    }, t && typeof t == "function" && (p.onMotionFinished = t), p.start()), this
                }, this.setFrameDesign = function(n) {
                    return it(), vt = n, b(), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return it(), k = n, b(), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return it(), wt = n, b(), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return it(), c = n, b(), this.repaint(), this
                }, this.setPointerType = function(n) {
                    return it(), pt = n, b(), this.repaint(), this
                }, this.setPointSymbols = function(n) {
                    return it(), l = n, b(), this.repaint(), this
                }, this.repaint = function() {
                    ni || b();
                    o.save();
                    o.clearRect(0, 0, o.canvas.width, o.canvas.height);
                    lt = i + a * ot - i;
                    (et || yt) && o.drawImage(rt, 0, 0);
                    dt ? (o.save(), o.translate(v, y), o.rotate(-lt), o.translate(-v, -y), et && o.drawImage(tt, 0, 0), o.restore()) : (et && o.drawImage(tt, 0, 0), o.translate(v, y), o.rotate(lt), o.translate(-v, -y));
                    o.shadowColor = "rgba(0, 0, 0, 0.8)";
                    o.shadowOffsetX = o.shadowOffsetY = gt;
                    o.shadowBlur = gt * 2;
                    o.drawImage(ut, 0, 0);
                    o.restore();
                    bt && o.drawImage(ft, 0, 0);
                    ct = !1
                }, this.repaint(), this
            },
            sr = function(n, f) {
                f = f || {};
                var c = undefined === f.size ? 0 : f.size,
                    si = undefined === f.frameDesign ? steelseries.FrameDesign.METAL : f.frameDesign,
                    hi = undefined === f.frameVisible ? !0 : f.frameVisible,
                    ut = undefined === f.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : f.backgroundColor,
                    li = undefined === f.backgroundVisible ? !0 : f.backgroundVisible,
                    dt = undefined === f.pointerTypeLatest ? steelseries.PointerType.TYPE1 : f.pointerTypeLatest,
                    vi = undefined === f.pointerTypeAverage ? steelseries.PointerType.TYPE8 : f.pointerTypeAverage,
                    ii = undefined === f.pointerColor ? steelseries.ColorDef.RED : f.pointerColor,
                    ri = undefined === f.pointerColorAverage ? steelseries.ColorDef.BLUE : f.pointerColorAverage,
                    ar = undefined === f.knobType ? steelseries.KnobType.STANDARD_KNOB : f.knobType,
                    vr = undefined === f.knobStyle ? steelseries.KnobStyle.SILVER : f.knobStyle,
                    yi = undefined === f.foregroundType ? steelseries.ForegroundType.TYPE1 : f.foregroundType,
                    pi = undefined === f.foregroundVisible ? !0 : f.foregroundVisible,
                    l = undefined === f.pointSymbols ? ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] : f.pointSymbols,
                    yr = undefined === f.pointSymbolsVisible ? !0 : f.pointSymbolsVisible,
                    pr = undefined === f.customLayer ? null : f.customLayer,
                    wr = undefined === f.degreeScale ? !0 : f.degreeScale,
                    ui = undefined === f.degreeScaleHalf ? !1 : f.degreeScaleHalf,
                    wi = undefined === f.roseVisible ? !1 : f.roseVisible,
                    vt = undefined === f.lcdColor ? steelseries.LcdColor.STANDARD : f.lcdColor,
                    bi = undefined === f.lcdVisible ? !0 : f.lcdVisible,
                    br = undefined === f.digitalFont ? !1 : f.digitalFont,
                    ot = undefined === f.section ? null : f.section,
                    ct = undefined === f.area ? null : f.area,
                    gt = undefined === f.lcdTitleStrings ? ["Текущее (красная)", "Среднее (синяя)"] : f.lcdTitleStrings,
                    ki = undefined === f.titleString ? "" : f.titleString,
                    di = undefined === f.useColorLabels ? !1 : f.useColorLabels,
                    ni = undefined === f.fullScaleDeflectionTime ? 2.5 : f.fullScaleDeflectionTime,
                    lt, at, y = 0,
                    p = 0,
                    yt = u,
                    gi = this.valueLatest,
                    fi = this.valueAverage,
                    kr = -i,
                    nr = r,
                    tr = 360,
                    a = !1,
                    h = w(n);
                c === 0 && (c = Math.min(h.canvas.width, h.canvas.height));
                h.canvas.width = c;
                h.canvas.height = c;
                var o = c,
                    b = c,
                    k = o / 2,
                    it = b / 2,
                    ei = Math.floor(o / 10),
                    dr = ei + "px " + e,
                    gr = ei + "px " + et,
                    ti = o * .3,
                    ir = b * .12,
                    rr = (o - ti) / 2,
                    ur = b * .32,
                    fr = b * .565,
                    er = !1,
                    pt = t(c, c),
                    ft = pt.getContext("2d"),
                    oi, wt = t(c, c),
                    or = wt.getContext("2d"),
                    bt = t(c, c),
                    sr = bt.getContext("2d"),
                    kt = t(c, c),
                    hr = kt.getContext("2d"),
                    cr = function(n, t) {
                        for (h.save(), h.textAlign = "center", h.strokeStyle = vt.textColor, h.fillStyle = vt.textColor; n < -180;) n += 360;
                        !ui && n < 0 && (n += 360);
                        ui && n > 180 && (n = -(360 - n));
                        n >= 0 ? (n = "00" + Math.round(n), n = n.substring(n.length, n.length - 3)) : (n = "00" + Math.abs(Math.round(n)), n = "-" + n.substring(n.length, n.length - 3));
                        (vt === steelseries.LcdColor.STANDARD || vt === steelseries.LcdColor.STANDARD_GREEN) && (h.shadowColor = "gray", h.shadowOffsetX = o * .007, h.shadowOffsetY = o * .007, h.shadowBlur = o * .007);
                        h.font = br ? gr : dr;
                        h.fillText(n + "°", o / 2 + ti * .05, (t ? ur : fr) + ir * .5 + ei * .38, ti * .9);
                        h.restore()
                    },
                    lr = function(n, t, i, r, u) {
                        n.save();
                        n.strokeStyle = r;
                        n.fillStyle = r;
                        n.lineWidth = o * .035;
                        var f = nr / tr * t,
                            e = f + (i - t) / (tr / nr);
                        n.translate(k, it);
                        n.rotate(kr);
                        n.beginPath();
                        u ? (n.moveTo(0, 0), n.arc(0, 0, o * .365 - n.lineWidth / 2, f, e, !1)) : n.arc(0, 0, o * .365, f, e, !1);
                        u ? (n.moveTo(0, 0), n.fill()) : n.stroke();
                        n.translate(-k, -it);
                        n.restore()
                    },
                    nu = function(n) {
                        var c = o * .38,
                            a = o * .35,
                            p = o * .36,
                            h = o * .1,
                            v = o * .31,
                            u = o * .36,
                            r, f, t, s, y;
                        if (n.textAlign = "center", n.textBaseline = "middle", n.save(), n.strokeStyle = ut.labelColor.getRgbaColor(), n.fillStyle = ut.labelColor.getRgbaColor(), n.translate(k, it), wr)
                            for (r = Math.floor(.1 * o) + "px serif bold", f = Math.floor(o * .04) + "px " + e, n.rotate(yt * 5), t = 5; 360 >= t; t += 5) {
                                if (n.save(), yr) switch (t) {
                                    case 360:
                                        n.translate(u, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[2], 0, 0, h);
                                        n.translate(-u, 0);
                                        break;
                                    case 90:
                                        n.translate(u, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[4], 0, 0, h);
                                        n.translate(-u, 0);
                                        break;
                                    case 180:
                                        n.translate(u, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[6], 0, 0, h);
                                        n.translate(-u, 0);
                                        break;
                                    case 270:
                                        n.translate(u, 0);
                                        n.rotate(i);
                                        n.font = r;
                                        n.fillText(l[0], 0, 0, h);
                                        n.translate(-u, 0);
                                        break;
                                    case 5:
                                    case 85:
                                    case 95:
                                    case 175:
                                    case 185:
                                    case 265:
                                    case 275:
                                    case 355:
                                        break;
                                    default:
                                        (t + 90) % 20 ? (n.lineWidth = (t + 90) % 5 ? 1.5 : 1, n.beginPath(), n.moveTo(c, 0), y = (t + 90) % 10 ? p : a, n.lineTo(y, 0), n.closePath(), n.stroke()) : (n.lineWidth = 1.5, n.beginPath(), n.moveTo(c, 0), n.lineTo(a, 0), n.closePath(), n.stroke(), s = (t + 90) % 360, n.translate(v, 0), n.rotate(i), n.font = f, n.fillText("0".substring(s >= 100) + s, 0, 0, h), n.translate(-v, 0))
                                } else(t + 90) % 20 ? (n.lineWidth = (t + 90) % 5 ? 1.5 : 1, n.beginPath(), n.moveTo(c, 0), y = (t + 90) % 10 ? p : a, n.lineTo(y, 0), n.closePath(), n.stroke()) : (n.lineWidth = 1.5, n.beginPath(), n.moveTo(c, 0), n.lineTo(a, 0), n.closePath(), n.stroke(), s = (t + 90) % 360, ui && s > 180 && (s = -(360 - s)), n.translate(v, 0), n.rotate(i), n.font = f, n.fillText(s, 0, 0, h), n.translate(-v, 0));
                                n.restore();
                                n.rotate(yt * 5)
                            } else
                                for (r = .12 * o + "px serif", f = .06 * o + "px serif", n.lineWidth = 1, n.strokeStyle = ut.symbolColor.getRgbaColor(), t = 0; 360 > t; t += 2.5) {
                                    0 == t % 5 && (n.beginPath(), n.moveTo(o * .38, 0), n.lineTo(o * .36, 0), n.closePath(), n.stroke());
                                    n.save();
                                    switch (t) {
                                        case 0:
                                            n.translate(o * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[2], 0, 0);
                                            n.translate(-o * .35, 0);
                                            break;
                                        case 45:
                                            n.translate(o * .29, 0);
                                            n.rotate(i);
                                            n.font = f;
                                            n.fillText(l[3], 0, 0);
                                            n.translate(-o * .29, 0);
                                            break;
                                        case 90:
                                            n.translate(o * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[4], 0, 0);
                                            n.translate(-o * .35, 0);
                                            break;
                                        case 135:
                                            n.translate(o * .29, 0);
                                            n.rotate(i);
                                            n.font = f;
                                            n.fillText(l[5], 0, 0);
                                            n.translate(-o * .29, 0);
                                            break;
                                        case 180:
                                            n.translate(o * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[6], 0, 0);
                                            n.translate(-o * .35, 0);
                                            break;
                                        case 225:
                                            n.translate(o * .29, 0);
                                            n.rotate(i);
                                            n.font = f;
                                            n.fillText(l[7], 0, 0);
                                            n.translate(-o * .29, 0);
                                            break;
                                        case 270:
                                            n.translate(o * .35, 0);
                                            n.rotate(i);
                                            n.font = r;
                                            n.fillText(l[0], 0, 0);
                                            n.translate(-o * .35, 0);
                                            break;
                                        case 315:
                                            n.translate(o * .29, 0);
                                            n.rotate(i);
                                            n.font = f;
                                            n.fillText(l[1], 0, 0);
                                            n.translate(-o * .29, 0)
                                    }
                                    n.restore();
                                    wi && (0 === t || 22.5 === t || 45 === t || 67.5 === t || 90 === t || 112.5 === t || 135 === t || 157.5 === t || 180 === t || 202.5 === t || 225 === t || 247.5 === t || 270 === t || 292.5 === t || 315 === t || 337.5 === t || 360 === t) && (n.save(), n.beginPath(), t % 45 ? n.moveTo(o * .29, 0) : n.moveTo(o * .38, 0), n.lineTo(o * .1, 0), n.closePath(), n.restore(), n.stroke());
                                    n.rotate(yt * 2.5)
                                }
                        n.translate(-k, -it);
                        n.restore()
                    },
                    tu = function(n) {
                        gt.length > 0 && (n.save(), n.textAlign = "center", n.textBaseline = "middle", n.fillStyle = di ? ii.medium.getRgbaColor() : ut.labelColor.getRgbaColor(), n.font = .04 * o + "px " + e, n.fillText(gt[0], o / 2, b * .29, o * .3), n.fillStyle = di ? ri.medium.getRgbaColor() : ut.labelColor.getRgbaColor(), n.fillText(gt[1], o / 2, b * .71, o * .3), ki.length > 0 && (n.fillStyle = ut.labelColor.getRgbaColor(), n.font = .0467 * o + "px " + e, n.fillText(ki, o / 2, b * .5, o * .3)))
                    },
                    v = function(n) {
                        var t, i, u;
                        n = n || {};
                        var r = undefined === n.background ? !1 : n.background,
                            f = undefined === n.pointer ? !1 : n.pointer,
                            e = undefined === n.foreground ? !1 : n.foreground;
                        if (er = !0, r && hi && d(ft, si, k, it, o, b), r && li) {
                            if (nt(ft, ut, k, it, o, b), ht(ft, pr, k, it, o, b), null !== ot && 0 < ot.length) {
                                t = ot.length;
                                do t--, lr(ft, ot[t].start, ot[t].stop, ot[t].color, !1); while (0 < t)
                            }
                            if (null !== ct && 0 < ct.length) {
                                i = ct.length;
                                do i--, lr(ft, ct[i].start, ct[i].stop, ct[i].color, !0); while (0 < i)
                            }
                            nu(ft)
                        }
                        r && wi && ai(ft, k, it, o, b, ut);
                        r && bi && (oi = tt(ti, ir, vt), ft.drawImage(oi, rr, ur), ft.drawImage(oi, rr, fr), tu(ft));
                        f && (st(sr, o, vi, ri, ut.labelColor), st(or, o, dt, ii, ut.labelColor));
                        e && pi && (u = dt.type === "type15" || dt.type === "type16" ? !1 : !0, g(hr, yi, o, b, u, ar, vr))
                    },
                    rt = function(n) {
                        n = n || {};
                        var t = undefined === n.background ? !1 : n.background,
                            i = undefined === n.pointer ? !1 : n.pointer,
                            r = undefined === n.foreground ? !1 : n.foreground;
                        t && (pt.width = c, pt.height = c, ft = pt.getContext("2d"));
                        i && (wt.width = c, wt.height = c, or = wt.getContext("2d"), bt.width = c, bt.height = c, sr = bt.getContext("2d"));
                        r && (kt.width = c, kt.height = c, hr = kt.getContext("2d"))
                    };
                return this.setValueLatest = function(n) {
                    return n = parseFloat(n), n = n === 360 ? 360 : n % 360, y !== n && (y = n, this.repaint()), this
                }, this.getValueLatest = function() {
                    return y
                }, this.setValueAverage = function(n) {
                    return n = parseFloat(n), n = n === 360 ? 360 : n % 360, p !== n && (p = n, this.repaint()), this
                }, this.getValueAverage = function() {
                    return p
                }, this.setValueAnimatedLatest = function(n, t) {
                    var i, f = this,
                        r, u;
                    return n = parseFloat(n), i = n === 360 ? 360 : n % 360, y !== i && (undefined !== lt && lt.isPlaying && lt.stop(), r = ci(y, i), r !== 0 ? (u = ni * Math.abs(r) / 180, u = Math.max(u, ni / 5), lt = new Tween({}, "", Tween.regularEaseInOut, y, y + r, u), lt.onMotionChanged = function(n) {
                        y = n.target._pos === 360 ? 360 : n.target._pos % 360;
                        a || (a = !0, s(f.repaint))
                    }, lt.onMotionFinished = function() {
                        y = i;
                        a || (a = !0, s(f.repaint));
                        t && typeof t == "function" && t()
                    }, lt.start()) : (y = i, a || (a = !0, s(f.repaint)))), this
                }, this.setValueAnimatedAverage = function(n, t) {
                    var i, f = this,
                        r, u;
                    return n = parseFloat(n), i = n === 360 ? 360 : n % 360, p !== n && (undefined !== at && at.isPlaying && at.stop(), r = ci(p, i), r !== 0 ? (u = ni * Math.abs(r) / 180, u = Math.max(u, ni / 5), at = new Tween({}, "", Tween.regularEaseInOut, p, p + r, u), at.onMotionChanged = function(n) {
                        p = n.target._pos === 360 ? 360 : n.target._pos % 360;
                        a || (a = !0, s(f.repaint))
                    }, at.onMotionFinished = function() {
                        p = i;
                        a || (a = !0, s(f.repaint));
                        t && typeof t == "function" && t()
                    }, at.start()) : (p = i, a || (a = !0, s(f.repaint)))), this
                }, this.setArea = function(n) {
                    return ct = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setSection = function(n) {
                    return ot = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return si = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return ut = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return rt({
                        foreground: !0
                    }), yi = n, v({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return rt({
                        pointer: !0
                    }), ii = n, v({
                        pointer: !0
                    }), this.repaint(), this
                }, this.setPointerColorAverage = function(n) {
                    return rt({
                        pointer: !0
                    }), ri = n, v({
                        pointer: !0
                    }), this.repaint(), this
                }, this.setPointerType = function(n) {
                    return dt = n, rt({
                        pointer: !0,
                        foreground: !0
                    }), v({
                        pointer: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerTypeAverage = function(n) {
                    return vi = n, rt({
                        pointer: !0,
                        foreground: !0
                    }), v({
                        pointer: !0,
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointSymbols = function(n) {
                    return l = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return vt = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.setLcdTitleStrings = function(n) {
                    return gt = n, rt({
                        background: !0
                    }), v({
                        background: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    er || v({
                        frame: !0,
                        background: !0,
                        led: !0,
                        pointer: !0,
                        foreground: !0
                    });
                    h.clearRect(0, 0, h.canvas.width, h.canvas.height);
                    (hi || li) && h.drawImage(pt, 0, 0);
                    bi && (cr(y, !0), cr(p, !1));
                    fi = p * yt;
                    var n = o * .006;
                    h.save();
                    h.translate(k, it);
                    h.rotate(fi);
                    h.translate(-k, -it);
                    h.shadowColor = "rgba(0, 0, 0, 0.8)";
                    h.shadowOffsetX = h.shadowOffsetY = n;
                    h.shadowBlur = n * 2;
                    h.drawImage(bt, 0, 0);
                    gi = y * yt - fi;
                    h.translate(k, it);
                    h.rotate(gi);
                    h.translate(-k, -it);
                    h.drawImage(wt, 0, 0);
                    h.restore();
                    pi && h.drawImage(kt, 0, 0);
                    a = !1
                }, this.repaint(), this
            },
            hr = function(n, o) {
                o = o || {};
                var l = undefined === o.size ? 0 : o.size,
                    ct = undefined === o.frameDesign ? steelseries.FrameDesign.METAL : o.frameDesign,
                    dt = undefined === o.frameVisible ? !0 : o.frameVisible,
                    lt = undefined === o.foregroundType ? steelseries.ForegroundType.TYPE1 : o.foregroundType,
                    gt = undefined === o.foregroundVisible ? !0 : o.foregroundVisible,
                    et = undefined === o.pointerColor ? steelseries.ColorDef.WHITE : o.pointerColor,
                    nt, tt, ot = !1,
                    y = 0,
                    v = 0,
                    at = f * l / 360,
                    vt = 0,
                    p = !1,
                    a = w(n);
                l === 0 && (l = Math.min(a.canvas.width, a.canvas.height));
                a.canvas.width = l;
                a.canvas.height = l;
                var h = l,
                    c = l,
                    b = h / 2,
                    k = c / 2,
                    yt = !1,
                    ut = t(l, l),
                    pt = ut.getContext("2d"),
                    it = t(l, l * f),
                    wt = it.getContext("2d"),
                    rt = t(l * .037383, l * .056074),
                    bt = rt.getContext("2d"),
                    ft = t(l, l),
                    st = ft.getContext("2d"),
                    ni = function(n) {
                        var t, r, i, o, c;
                        n.save();
                        t = l;
                        r = l * f;
                        n.beginPath();
                        n.rect(0, 0, t, r);
                        n.closePath();
                        o = n.createLinearGradient(0, 0, 0, r);
                        o.addColorStop(0, "#7fd5f0");
                        o.addColorStop(.5, "#7fd5f0");
                        o.addColorStop(.5, "#3c4439");
                        o.addColorStop(1, "#3c4439");
                        n.fillStyle = o;
                        n.fill();
                        n.lineWidth = 1;
                        var h = r / 72,
                            s = !1,
                            u = 10;
                        for (n.textAlign = "center", n.textBaseline = "middle", c = t * .04, n.font = c + "px " + e, n.fillStyle = "#37596e", i = r / 2 - h; i > 0; i -= h) u <= 90 && (s ? (n.fillText(u, (t - t * .2) / 2 - 8, i, t * .375), n.fillText(u, t - (t - t * .2) / 2 + 8, i, t * .375), n.beginPath(), n.moveTo((t - t * .2) / 2, i), n.lineTo(t - (t - t * .2) / 2, i), n.closePath(), u += 10) : (n.beginPath(), n.moveTo((t - t * .1) / 2, i), n.lineTo(t - (t - t * .1) / 2, i), n.closePath()), n.stroke()), s ^= !0;
                        for (s = !1, u = 10, n.strokeStyle = "#FFFFFF", n.lineWidth = 1.5, n.beginPath(), n.moveTo(0, r / 2), n.lineTo(t, r / 2), n.closePath(), n.stroke(), n.fillStyle = "#FFFFFF", n.lineWidth = 1, i = r / 2 + h; i <= r; i += h) u <= 90 && (s ? (n.fillText(-u, (t - t * .2) / 2 - 8, i, t * .375), n.fillText(-u, t - (t - t * .2) / 2 + 8, i, t * .375), n.beginPath(), n.moveTo((t - t * .2) / 2, i), n.lineTo(t - (t - t * .2) / 2, i), n.closePath(), u += 10) : (n.beginPath(), n.moveTo((t - t * .1) / 2, i), n.lineTo(t - (t - t * .1) / 2, i), n.closePath()), n.stroke()), s ^= !0;
                        n.restore()
                    },
                    ti = function(n) {
                        var r, f, t;
                        for (n.save(), n.fillStyle = et.light.getRgbaColor(), n.beginPath(), n.moveTo(h * .476635, c * .5), n.bezierCurveTo(h * .476635, c * .514018, h * .485981, c * .523364, h * .5, c * .523364), n.bezierCurveTo(h * .514018, c * .523364, h * .523364, c * .514018, h * .523364, c * .5), n.bezierCurveTo(h * .523364, c * .485981, h * .514018, c * .476635, h * .5, c * .476635), n.bezierCurveTo(h * .485981, c * .476635, h * .476635, c * .485981, h * .476635, c * .5), n.closePath(), n.moveTo(h * .415887, c * .504672), n.lineTo(h * .415887, c * .495327), n.bezierCurveTo(h * .415887, c * .495327, h * .467289, c * .495327, h * .467289, c * .495327), n.bezierCurveTo(h * .471962, c * .481308, h * .481308, c * .471962, h * .495327, c * .467289), n.bezierCurveTo(h * .495327, c * .467289, h * .495327, c * .415887, h * .495327, c * .415887), n.lineTo(h * .504672, c * .415887), n.bezierCurveTo(h * .504672, c * .415887, h * .504672, c * .467289, h * .504672, c * .467289), n.bezierCurveTo(h * .518691, c * .471962, h * .528037, c * .481308, h * .53271, c * .495327), n.bezierCurveTo(h * .53271, c * .495327, h * .584112, c * .495327, h * .584112, c * .495327), n.lineTo(h * .584112, c * .504672), n.bezierCurveTo(h * .584112, c * .504672, h * .53271, c * .504672, h * .53271, c * .504672), n.bezierCurveTo(h * .528037, c * .518691, h * .518691, c * .53271, h * .5, c * .53271), n.bezierCurveTo(h * .481308, c * .53271, h * .471962, c * .518691, h * .467289, c * .504672), n.bezierCurveTo(h * .467289, c * .504672, h * .415887, c * .504672, h * .415887, c * .504672), n.closePath(), n.fill(), r = 5, f = 5 * u, n.translate(b, k), n.rotate(-i), n.translate(-b, -k), t = -90; t <= 90; t += r) t % 45 == 0 || t === 0 ? (n.strokeStyle = et.medium.getRgbaColor(), n.lineWidth = 2, n.beginPath(), n.moveTo(h * .5, c * .088785), n.lineTo(h * .5, c * .113), n.closePath(), n.stroke()) : t % 15 == 0 ? (n.strokeStyle = "#FFFFFF", n.lineWidth = 1, n.beginPath(), n.moveTo(h * .5, c * .088785), n.lineTo(h * .5, c * .103785), n.closePath(), n.stroke()) : (n.strokeStyle = "#FFFFFF", n.lineWidth = .5, n.beginPath(), n.moveTo(h * .5, c * .088785), n.lineTo(h * .5, c * .093785), n.closePath(), n.stroke()), n.translate(b, k), n.rotate(f, b, k), n.translate(-b, -k);
                        n.restore()
                    },
                    ii = function(n) {
                        n.save();
                        var t = h * .037383,
                            i = c * .056074;
                        n.beginPath();
                        n.moveTo(t * .5, 0);
                        n.lineTo(0, i);
                        n.lineTo(t, i);
                        n.closePath();
                        n.fillStyle = et.light.getRgbaColor();
                        n.fill();
                        n.strokeStyle = et.medium.getRgbaColor();
                        n.stroke();
                        n.restore()
                    },
                    ht = function() {
                        yt = !0;
                        dt && d(pt, ct, b, k, h, c);
                        ni(wt);
                        ii(bt);
                        ti(st);
                        gt && g(st, lt, h, c, !0, ki, di, bi)
                    },
                    kt = function() {
                        ut.width = l;
                        ut.height = l;
                        pt = ut.getContext("2d");
                        it.width = l;
                        it.height = l * f;
                        wt = it.getContext("2d");
                        rt.width = l * .037383;
                        rt.height = l * .056074;
                        bt = rt.getContext("2d");
                        ft.width = l;
                        ft.height = l;
                        st = ft.getContext("2d")
                    };
                return this.setRoll = function(n) {
                    return n = parseFloat(n) % 360, y !== n && (y = n, this.repaint()), this
                }, this.getRoll = function() {
                    return y
                }, this.setRollAnimated = function(n, t) {
                    var i = this;
                    return n = parseFloat(n) % 360, y !== n && (undefined !== nt && nt.isPlaying && nt.stop(), nt = new Tween({}, "", Tween.regularEaseInOut, y, n, 1), nt.onMotionChanged = function(n) {
                        y = n.target._pos;
                        ot || (ot = !0, s(i.repaint))
                    }, t && typeof t == "function" && (nt.onMotionFinished = t), nt.start()), this
                }, this.setPitch = function(n) {
                    return n = (parseFloat(n) + 180 - vt) % 360 - 180, v !== n && (v = n, v > 90 ? (v = 180 - v, p || this.setRoll(y - 180), p = !0) : v < -90 ? (v = -180 - v, p || this.setRoll(y + 180), p = !0) : p = !1, this.repaint()), this
                }, this.getPitch = function() {
                    return v
                }, this.setPitchAnimated = function(n, t) {
                    var i = this;
                    return n = parseFloat(n), v !== n && (undefined !== tt && tt.isPlaying && tt.stop(), tt = new Tween({}, "", Tween.regularEaseInOut, v, n, 1), tt.onMotionChanged = function(n) {
                        v = n.target._pos;
                        v > 90 ? (v = 180 - v, p || this.setRoll(y - 180), p = !0) : v < -90 ? (v = -180 - v, p || this.setRoll(y + 180), p = !0) : p = !1;
                        ot || (ot = !0, s(i.repaint));
                        i.setPitch(n.target._pos)
                    }, t && typeof t == "function" && (tt.onMotionFinished = t), tt.start()), this
                }, this.setPitchOffset = function(n) {
                    return vt = parseFloat(n), this.repaint(), this
                }, this.setFrameDesign = function(n) {
                    return kt(), ct = n, ht(), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return kt(), lt = n, ht(), this.repaint(), this
                }, this.repaint = function() {
                    yt || ht();
                    a.save();
                    a.clearRect(0, 0, a.canvas.width, a.canvas.height);
                    a.drawImage(ut, 0, 0);
                    a.save();
                    a.beginPath();
                    a.arc(b, k, h * .831775 / 2, 0, r, !0);
                    a.closePath();
                    a.clip();
                    a.translate(b, k);
                    a.rotate(-(y * u));
                    a.translate(-b, 0);
                    a.translate(0, v * at);
                    a.drawImage(it, 0, -it.height / 2);
                    a.translate(0, -(v * at) - k);
                    a.drawImage(rt, h * .5 - rt.width / 2, h * .107476);
                    a.restore();
                    a.drawImage(ft, 0, 0);
                    a.restore()
                }, this.repaint(), this
            },
            cr = function(n, t) {
                var a, f, s, u, c;
                t = t || {};
                var i = undefined === t.size ? 0 : t.size,
                    y = undefined === t.ledColor ? steelseries.LedColor.RED_LED : t.ledColor,
                    l = !1,
                    p = 0,
                    r = w(n);
                i === 0 && (i = Math.min(r.canvas.width, r.canvas.height));
                r.canvas.width = i;
                r.canvas.height = i;
                a = !1;
                f = o.createElement("canvas");
                f.width = i;
                f.height = i;
                s = f.getContext("2d");
                u = o.createElement("canvas");
                u.width = i;
                u.height = i;
                var v = u.getContext("2d"),
                    e = u,
                    b = function() {
                        a = !0;
                        s.clearRect(0, 0, s.canvas.width, s.canvas.height);
                        s.drawImage(h(i, 1, y), 0, 0);
                        v.clearRect(0, 0, v.canvas.width, v.canvas.height);
                        v.drawImage(h(i, 0, y), 0, 0)
                    };
                return this.toggleLed = function() {
                    return e = e === f ? u : f, c(), this
                }, this.setLedColor = function(n) {
                    return y = n, a = !1, c(), this
                }, this.setLedOnOff = function(n) {
                    return e = n ? f : u, c(), this
                }, this.blink = function(n) {
                    return n ? l || (p = setInterval(this.toggleLed, 1e3), l = !0) : l && (clearInterval(p), l = !1, e = u), this
                }, c = function() {
                    a || b();
                    r.save();
                    r.clearRect(0, 0, r.canvas.width, r.canvas.height);
                    r.drawImage(e, 0, 0);
                    r.restore()
                }, c(), this
            },
            lr = function(n, i) {
                i = i || {};
                var o = undefined === i.size ? 0 : i.size,
                    ti = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                    ii = undefined === i.frameVisible ? !0 : i.frameVisible,
                    y = undefined === i.pointerType ? steelseries.PointerType.TYPE1 : i.pointerType,
                    v = undefined === i.pointerColor ? y === steelseries.PointerType.TYPE1 ? steelseries.ColorDef.GRAY : steelseries.ColorDef.BLACK : i.pointerColor,
                    tt = undefined === i.backgroundColor ? y === steelseries.PointerType.TYPE1 ? steelseries.BackgroundColor.ANTHRACITE : steelseries.BackgroundColor.LIGHT_GRAY : i.backgroundColor,
                    ri = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                    ui = undefined === i.foregroundType ? steelseries.ForegroundType.TYPE1 : i.foregroundType,
                    fi = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                    yi = undefined === i.customLayer ? null : i.customLayer,
                    k = undefined === i.isAutomatic ? !0 : i.isAutomatic,
                    l = undefined === i.hour ? 11 : i.hour,
                    a = undefined === i.minute ? 5 : i.minute,
                    b = undefined === i.second ? 0 : i.second,
                    ut = undefined === i.secondMovesContinuous ? !1 : i.secondMovesContinuous,
                    yt = undefined === i.timeZoneOffsetHour ? 0 : i.timeZoneOffsetHour,
                    pt = undefined === i.timeZoneOffsetMinute ? 0 : i.timeZoneOffsetMinute,
                    ft = undefined === i.secondPointerVisible ? !0 : i.secondPointerVisible,
                    p = new Date,
                    ei, kt, oi, si, it = ut ? 100 : 1e3;
                it = ft ? it : 100;
                var pi = this,
                    dt = 6,
                    e = w(n);
                o === 0 && (o = Math.min(e.canvas.width, e.canvas.height));
                e.canvas.width = o;
                e.canvas.height = o;
                var f = o,
                    s = o,
                    h = f / 2,
                    c = s / 2,
                    hi = !1,
                    et = t(o, o),
                    ci = et.getContext("2d"),
                    ot = t(o, o),
                    wt = ot.getContext("2d"),
                    st = t(o, o),
                    li = st.getContext("2d"),
                    ct = t(o, o),
                    ai = ct.getContext("2d"),
                    lt = t(o, o),
                    vi = lt.getContext("2d"),
                    at = t(o, o),
                    gt = at.getContext("2d"),
                    wi = function(n, t) {
                        var i, o, s, r, e;
                        r = f * .405;
                        n.save();
                        n.translate(h, c);
                        switch (t.type) {
                            case "type1":
                                for (o = f * .074766, e = r - o, n.strokeStyle = tt.labelColor.getRgbaColor(), n.lineWidth = f * .014018, i = 0; i < 360; i += 30) n.beginPath(), n.moveTo(r, 0), n.lineTo(e, 0), n.closePath(), n.stroke(), n.rotate(30 * u);
                                for (s = f * .126168, e = r - s, n.lineWidth = f * .03271, i = 0; i < 360; i += 90) n.beginPath(), n.moveTo(r, 0), n.lineTo(e, 0), n.closePath(), n.stroke(), n.rotate(90 * u);
                                break;
                            case "type2":
                            default:
                                for (o = f * .037383, e = r - o, n.strokeStyle = tt.labelColor.getRgbaColor(), n.lineWidth = f * .009345, i = 0; i < 360; i += 6) n.beginPath(), n.moveTo(r, 0), n.lineTo(e, 0), n.closePath(), n.stroke(), n.rotate(6 * u);
                                for (s = f * .084112, e = r - s, n.lineWidth = f * .028037, i = 0; i < 360; i += 30) n.beginPath(), n.moveTo(r, 0), n.lineTo(e, 0), n.closePath(), n.stroke(), n.rotate(30 * u)
                        }
                        n.translate(-h, -c);
                        n.restore()
                    },
                    bi = function(n, t) {
                        n.save();
                        var i;
                        switch (t.type) {
                            case "type2":
                                n.beginPath();
                                n.lineWidth = f * .046728;
                                n.moveTo(h, f * .289719);
                                n.lineTo(h, f * .289719 + f * .224299);
                                n.strokeStyle = v.medium.getRgbaColor();
                                n.closePath();
                                n.stroke();
                                break;
                            case "type1":
                            default:
                                n.beginPath();
                                n.moveTo(f * .471962, s * .560747);
                                n.lineTo(f * .471962, s * .214953);
                                n.lineTo(f * .5, s * .182242);
                                n.lineTo(f * .528037, s * .214953);
                                n.lineTo(f * .528037, s * .560747);
                                n.lineTo(f * .471962, s * .560747);
                                n.closePath();
                                i = n.createLinearGradient(f * .471962, s * .560747, f * .528037, s * .214953);
                                i.addColorStop(1, v.veryLight.getRgbaColor());
                                i.addColorStop(0, v.light.getRgbaColor());
                                n.fillStyle = i;
                                n.strokeStyle = v.light.getRgbaColor();
                                n.fill();
                                n.stroke()
                        }
                        n.restore()
                    },
                    ki = function(n, t) {
                        n.save();
                        var i;
                        switch (t.type) {
                            case "type2":
                                n.beginPath();
                                n.lineWidth = f * .03271;
                                n.moveTo(h, f * .116822);
                                n.lineTo(h, f * .116822 + f * .38785);
                                n.strokeStyle = v.medium.getRgbaColor();
                                n.closePath();
                                n.stroke();
                                break;
                            case "type1":
                            default:
                                n.beginPath();
                                n.moveTo(f * .518691, s * .574766);
                                n.lineTo(f * .523364, s * .135514);
                                n.lineTo(f * .5, s * .107476);
                                n.lineTo(f * .476635, s * .140186);
                                n.lineTo(f * .476635, s * .574766);
                                n.lineTo(f * .518691, s * .574766);
                                n.closePath();
                                i = n.createLinearGradient(f * .518691, s * .574766, f * .476635, s * .140186);
                                i.addColorStop(1, v.veryLight.getRgbaColor());
                                i.addColorStop(0, v.light.getRgbaColor());
                                n.fillStyle = i;
                                n.strokeStyle = v.light.getRgbaColor();
                                n.fill();
                                n.stroke()
                        }
                        n.restore()
                    },
                    di = function(n, t) {
                        n.save();
                        var i;
                        switch (t.type) {
                            case "type2":
                                n.lineWidth = f * .009345;
                                n.beginPath();
                                n.moveTo(h, f * .09813);
                                n.lineTo(h, f * .09813 + f * .126168);
                                n.closePath();
                                n.stroke();
                                n.lineWidth = f * .018691;
                                n.beginPath();
                                n.moveTo(h, f * .308411);
                                n.lineTo(h, f * .308411 + f * .191588);
                                n.closePath();
                                n.stroke();
                                n.lineWidth = f * .016;
                                n.beginPath();
                                n.arc(h, f * .26, f * .085 / 2, 0, r);
                                n.closePath();
                                n.stroke();
                                break;
                            case "type1":
                            default:
                                n.beginPath();
                                n.moveTo(f * .509345, s * .116822);
                                n.lineTo(f * .509345, s * .574766);
                                n.lineTo(f * .490654, s * .574766);
                                n.lineTo(f * .490654, s * .116822);
                                n.lineTo(f * .509345, s * .116822);
                                n.closePath();
                                i = n.createLinearGradient(f * .509345, s * .116822, f * .490654, s * .574766);
                                i.addColorStop(0, steelseries.ColorDef.RED.light.getRgbaColor());
                                i.addColorStop(.47, steelseries.ColorDef.RED.medium.getRgbaColor());
                                i.addColorStop(1, steelseries.ColorDef.RED.dark.getRgbaColor());
                                n.fillStyle = i;
                                n.strokeStyle = steelseries.ColorDef.RED.dark.getRgbaColor();
                                n.fill();
                                n.stroke()
                        }
                        n.restore()
                    },
                    gi = function(n) {
                        var t;
                        n.beginPath();
                        n.arc(h, c, f * .045, 0, r);
                        n.closePath();
                        t = n.createLinearGradient(h - f * .045 / 2, c - f * .045 / 2, h + f * .045 / 2, c + f * .045 / 2);
                        t.addColorStop(0, "#eef0f2");
                        t.addColorStop(1, "#65696d");
                        n.fillStyle = t;
                        n.fill()
                    },
                    nr = function(n, t) {
                        var i;
                        n.save();
                        switch (t.type) {
                            case "type2":
                                n.fillStyle = "#000000";
                                n.beginPath();
                                n.arc(h, c, f * .088785 / 2, 0, r);
                                n.closePath();
                                n.fill();
                                break;
                            case "type1":
                            default:
                                i = n.createLinearGradient(h - f * .027 / 2, c - f * .027 / 2, h + f * .027 / 2, c + f * .027 / 2);
                                i.addColorStop(0, "#f3f4f7");
                                i.addColorStop(.11, "#f3f5f7");
                                i.addColorStop(.12, "#f1f3f5");
                                i.addColorStop(.2, "#c0c5cb");
                                i.addColorStop(.2, "#bec3c9");
                                i.addColorStop(1, "#bec3c9");
                                n.fillStyle = i;
                                n.beginPath();
                                n.arc(h, c, f * .027, 0, r);
                                n.closePath();
                                n.fill()
                        }
                        n.restore()
                    },
                    bt = function(n, t, i) {
                        oi = i * dt * u;
                        ei = t * dt * u;
                        kt = (n + t / 60) * dt * 5 * u
                    },
                    ni = function() {
                        k ? p = new Date : (p.setHours(l), p.setMinutes(a), p.setSeconds(b));
                        b = p.getSeconds() + (ut ? p.getMilliseconds() / 1e3 : 0);
                        l = yt !== 0 ? p.getUTCHours() + yt : p.getHours();
                        l = l % 12;
                        a = pt !== 0 ? p.getUTCMinutes() + pt : p.getMinutes();
                        a > 60 && (a -= 60, l++);
                        a < 0 && (a += 60, l--);
                        l = l % 12;
                        bt(l, a, b);
                        k && (si = setTimeout(ni, it));
                        pi.repaint()
                    },
                    rt = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.pointers ? !1 : n.pointers,
                            u = undefined === n.foreground ? !1 : n.foreground;
                        hi = !0;
                        t && ii && d(ci, ti, h, c, f, s);
                        i && ri && (nt(wt, tt, h, c, f, s), ht(wt, yi, h, c, f, s), wi(wt, y));
                        r && (bi(li, y), ki(ai, y), di(vi, y));
                        u && fi && (nr(gt, y), g(gt, ui, f, s, !1))
                    },
                    vt = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.pointers ? !1 : n.pointers,
                            u = undefined === n.foreground ? !1 : n.foreground;
                        t && (et.width = o, et.height = o, ci = et.getContext("2d"));
                        i && (ot.width = o, ot.height = o, wt = ot.getContext("2d"));
                        r && (st.width = o, st.height = o, li = st.getContext("2d"), ct.width = o, ct.height = o, ai = ct.getContext("2d"), lt.width = o, lt.height = o, vi = lt.getContext("2d"));
                        u && (at.width = o, at.height = o, gt = at.getContext("2d"))
                    };
                return this.getAutomatic = function() {
                    return k
                }, this.setAutomatic = function(n) {
                    return n = !!n, k && !n ? (clearTimeout(si), k = n) : !k && n && (k = n, ni()), this
                }, this.getHour = function() {
                    return l
                }, this.setHour = function(n) {
                    return n = parseInt(n, 10) % 12, l !== n && (l = n, bt(l, a, b), this.repaint()), this
                }, this.getMinute = function() {
                    return a
                }, this.setMinute = function(n) {
                    return n = parseInt(n, 10) % 60, a !== n && (a = n, bt(l, a, b), this.repaint()), this
                }, this.getSecond = function() {
                    return b
                }, this.setSecond = function(n) {
                    return n = parseInt(n, 10) % 60, b !== n && (b = n, bt(l, a, b), this.repaint()), this
                }, this.getTimeZoneOffsetHour = function() {
                    return yt
                }, this.setTimeZoneOffsetHour = function(n) {
                    return yt = parseInt(n, 10), this.repaint(), this
                }, this.getTimeZoneOffsetMinute = function() {
                    return pt
                }, this.setTimeZoneOffsetMinute = function(n) {
                    return pt = parseInt(n, 10), this.repaint(), this
                }, this.getSecondPointerVisible = function() {
                    return ft
                }, this.setSecondPointerVisible = function(n) {
                    return ft = !!n, this.repaint(), this
                }, this.getSecondMovesContinuous = function() {
                    return ut
                }, this.setSecondMovesContinuous = function(n) {
                    return ut = !!n, it = ut ? 100 : 1e3, it = ft ? it : 100, this
                }, this.setFrameDesign = function(n) {
                    return vt({
                        frame: !0
                    }), ti = n, rt({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return vt({
                        frame: !0,
                        background: !0
                    }), tt = n, rt({
                        frame: !0,
                        background: !0
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return vt({
                        foreground: !0
                    }), ui = n, rt({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerType = function(n) {
                    return vt({
                        background: !0,
                        foreground: !0,
                        pointers: !0
                    }), y = n, y.type === "type1" ? (v = steelseries.ColorDef.GRAY, tt = steelseries.BackgroundColor.ANTHRACITE) : (v = steelseries.ColorDef.BLACK, tt = steelseries.BackgroundColor.LIGHT_GRAY), rt({
                        background: !0,
                        foreground: !0,
                        pointers: !0
                    }), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return vt({
                        pointers: !0
                    }), v = n, rt({
                        pointers: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    hi || rt({
                        frame: !0,
                        background: !0,
                        pointers: !0,
                        foreground: !0
                    });
                    e.clearRect(0, 0, e.canvas.width, e.canvas.height);
                    ii && e.drawImage(et, 0, 0);
                    ri && e.drawImage(ot, 0, 0);
                    var n = f * .006;
                    e.save();
                    e.translate(h, c);
                    e.rotate(kt);
                    e.translate(-h, -c);
                    e.shadowColor = "rgba(0, 0, 0, 0.8)";
                    e.shadowOffsetX = e.shadowOffsetY = n;
                    e.shadowBlur = n * 2;
                    e.drawImage(st, 0, 0);
                    e.translate(h, c);
                    e.rotate(ei - kt);
                    e.translate(-h, -c);
                    e.drawImage(ct, 0, 0);
                    e.restore();
                    y.type === "type1" && gi(e);
                    ft && (e.save(), e.translate(h, c), e.rotate(oi), e.translate(-h, -c), e.shadowColor = "rgba(0, 0, 0, 0.8)", e.shadowOffsetX = e.shadowOffsetY = n, e.shadowBlur = n * 2, e.drawImage(lt, 0, 0), e.restore());
                    fi && e.drawImage(at, 0, 0)
                }, ni(), this
            },
            ar = function(t, i) {
                var e, o, s;
                i = i || {};
                var u = undefined === i.size ? 0 : i.size,
                    f = undefined === i.value ? 50 : i.value,
                    r = w(t);
                return u === 0 && (u = r.canvas.width), e = u, o = Math.ceil(u * .45), r.canvas.width = e, r.canvas.height = o, s = function(t, i, r, u) {
                    var f, e;
                    t.beginPath();
                    t.moveTo(i * .025, r * .055555);
                    t.lineTo(i * .9, r * .055555);
                    t.lineTo(i * .9, r * .944444);
                    t.lineTo(i * .025, r * .944444);
                    t.lineTo(i * .025, r * .055555);
                    t.closePath();
                    t.beginPath();
                    t.moveTo(i * .925, 0);
                    t.lineTo(0, 0);
                    t.lineTo(0, r);
                    t.lineTo(i * .925, r);
                    t.lineTo(i * .925, r * .722222);
                    t.bezierCurveTo(i * .925, r * .722222, i * .975, r * .722222, i * .975, r * .722222);
                    t.bezierCurveTo(i, r * .722222, i, r * .666666, i, r * .666666);
                    t.bezierCurveTo(i, r * .666666, i, r * .333333, i, r * .333333);
                    t.bezierCurveTo(i, r * .333333, i, r * .277777, i * .975, r * .277777);
                    t.bezierCurveTo(i * .975, r * .277777, i * .925, r * .277777, i * .925, r * .277777);
                    t.lineTo(i * .925, 0);
                    t.closePath();
                    f = t.createLinearGradient(0, 0, 0, r);
                    f.addColorStop(0, "#ffffff");
                    f.addColorStop(1, "#7e7e7e");
                    t.fillStyle = f;
                    t.fill();
                    t.beginPath();
                    e = Math.max(i * .875 * (u / 100), Math.ceil(i * .01));
                    t.rect(i * .025, i * .025, e, r * .888888);
                    t.closePath();
                    var h = [new n(177, 25, 2, 1), new n(219, 167, 21, 1), new n(121, 162, 75, 1)],
                        c = new ri(0, 100, [0, .4, 1], h);
                    t.fillStyle = c.getColorAt(u / 100).getRgbColor();
                    t.fill();
                    t.beginPath();
                    e = Math.max(e - i * .05, 0);
                    t.rect(i * .05, i * .05, e, r * .777777);
                    t.closePath();
                    var l = [new n(198, 39, 5, 1), new n(228, 189, 32, 1), new n(163, 216, 102, 1)],
                        a = [new n(246, 121, 48, 1), new n(246, 244, 157, 1), new n(223, 233, 86, 1)],
                        o = [0, .4, 1],
                        s = new ri(0, 100, o, l),
                        v = new ri(0, 100, o, a);
                    f = t.createLinearGradient(i * .05, 0, i * .875, 0);
                    f.addColorStop(0, s.getColorAt(u / 100).getRgbColor());
                    f.addColorStop(.5, v.getColorAt(u / 100).getRgbColor());
                    f.addColorStop(1, s.getColorAt(u / 100).getRgbColor());
                    t.fillStyle = f;
                    t.fill();
                    t.beginPath();
                    t.rect(i * .025, i * .025, i * .875, r * .444444);
                    t.closePath();
                    f = t.createLinearGradient(i * .025, i * .025, i * .875, r * .444444);
                    f.addColorStop(0, "rgba(255, 255, 255, 0)");
                    f.addColorStop(1, "rgba(255, 255, 255, 0.8)");
                    t.fillStyle = f;
                    t.fill()
                }, this.setValue = function(n) {
                    return n = n < 0 ? 0 : n > 100 ? 100 : n, f !== n && (f = n, this.repaint()), this
                }, this.getValue = function() {
                    return f
                }, this.repaint = function() {
                    r.clearRect(0, 0, r.canvas.width, r.canvas.height);
                    s(r, e, o, f)
                }, this.repaint(), this
            },
            vr = function(n, i) {
                i = i || {};
                var h = undefined === i.size ? 0 : i.size,
                    ti = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                    ii = undefined === i.frameVisible ? !0 : i.frameVisible,
                    l = undefined === i.pointerColor ? steelseries.ColorDef.BLACK : i.pointerColor,
                    ct = undefined === i.backgroundColor ? steelseries.BackgroundColor.LIGHT_GRAY : i.backgroundColor,
                    ri = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                    ui = undefined === i.foregroundType ? steelseries.ForegroundType.TYPE1 : i.foregroundType,
                    fi = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                    ai = undefined === i.customLayer ? null : i.customLayer,
                    yt = 0,
                    lt = 0,
                    pt, vi = 6,
                    yi = this,
                    at = 0,
                    tt = 0,
                    ei = 0,
                    oi = 0,
                    si = 0,
                    a = !1,
                    v = !1,
                    s = w(n),
                    o, b, c, y, p, hi, k, ci = !1,
                    it, wt, rt, ut, ft, bt, et, kt, ot, dt, li = function(n, t, i, u, o, s, h) {
                        var et = u * t,
                            ot = et + "px " + e,
                            st = t * .15,
                            nt = 1,
                            tt = o * t,
                            it = Math.round(.025 * t),
                            rt = Math.round(.035 * t),
                            ut = Math.round(.045 * t),
                            ht = ct.labelColor.getRgbaColor(),
                            ft = ct.labelColor.getRgbaColor(),
                            c = t / 2,
                            l = t * .4,
                            a, p, d, b = 0,
                            g = 0,
                            lt = 0,
                            w, v = 0,
                            y = 0,
                            k, at = -f,
                            vt = r / i;
                        for (n.width = n.height = t, n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = ot, k = at, w = 0; w <= i + 1; k -= vt * .1, w += .1) n.lineWidth = .5, v = Math.sin(k), y = Math.cos(k), b % 2 == 0 && (a = [c + (l - it) * v + s, c + (l - it) * y + h], p = [c + l * v + s, c + l * y + h], n.strokeStyle = ft, n.beginPath(), n.moveTo(a[0], a[1]), n.lineTo(p[0], p[1]), n.closePath(), n.stroke()), (b === 10 || b === 0) && (n.fillStyle = ht, n.lineWidth = nt, p = [c + l * v + s, c + l * y + h], d = [c + (l - tt) * v + s, c + (l - tt) * y + h], g === 5 ? (w !== i && Math.round(w) !== 60 && n.fillText(Math.round(w), d[0], d[1], st), n.lineWidth = 1.5, a = [c + (l - ut) * v + s, c + (l - ut) * y + h], g = 0) : (n.lineWidth = nt, a = [c + (l - rt) * v + s, c + (l - rt) * y + h]), n.strokeStyle = ft, n.beginPath(), n.moveTo(a[0], a[1]), n.lineTo(p[0], p[1]), n.closePath(), n.stroke(), b = 0, lt++, g++), b++;
                        n.restore()
                    },
                    pi = function(n) {
                        var t, i;
                        n.save();
                        n.beginPath();
                        n.moveTo(o * .509345, o * .457943);
                        n.lineTo(o * .5, o * .102803);
                        n.lineTo(o * .490654, o * .457943);
                        n.bezierCurveTo(o * .490654, o * .457943, o * .490654, o * .457943, o * .490654, o * .457943);
                        n.bezierCurveTo(o * .471962, o * .462616, o * .457943, o * .481308, o * .457943, o * .5);
                        n.bezierCurveTo(o * .457943, o * .518691, o * .471962, o * .537383, o * .490654, o * .542056);
                        n.bezierCurveTo(o * .490654, o * .542056, o * .490654, o * .542056, o * .490654, o * .542056);
                        n.lineTo(o * .490654, o * .621495);
                        n.lineTo(o * .509345, o * .621495);
                        n.lineTo(o * .509345, o * .542056);
                        n.bezierCurveTo(o * .509345, o * .542056, o * .509345, o * .542056, o * .509345, o * .542056);
                        n.bezierCurveTo(o * .528037, o * .537383, o * .542056, o * .518691, o * .542056, o * .5);
                        n.bezierCurveTo(o * .542056, o * .481308, o * .528037, o * .462616, o * .509345, o * .457943);
                        n.bezierCurveTo(o * .509345, o * .457943, o * .509345, o * .457943, o * .509345, o * .457943);
                        n.closePath();
                        t = n.createLinearGradient(0, 0, 0, o * .621495);
                        t.addColorStop(0, l.medium.getRgbaColor());
                        t.addColorStop(.388888, l.medium.getRgbaColor());
                        t.addColorStop(.5, l.light.getRgbaColor());
                        t.addColorStop(.611111, l.medium.getRgbaColor());
                        t.addColorStop(1, l.medium.getRgbaColor());
                        n.fillStyle = t;
                        n.strokeStyle = l.dark.getRgbaColor();
                        n.fill();
                        n.stroke();
                        n.beginPath();
                        i = o * .06542 / 2;
                        n.arc(c, y, i, 0, r);
                        t = n.createLinearGradient(c - i, c + i, 0, c + i);
                        t.addColorStop(0, "#e6b35c");
                        t.addColorStop(.01, "#e6b35c");
                        t.addColorStop(.99, "#c48200");
                        t.addColorStop(1, "#c48200");
                        n.fillStyle = t;
                        n.closePath();
                        n.fill();
                        n.beginPath();
                        i = o * .046728 / 2;
                        n.arc(c, y, i, 0, r);
                        t = n.createRadialGradient(c, c, 0, c, c, i);
                        t.addColorStop(0, "#c5c5c5");
                        t.addColorStop(.19, "#c5c5c5");
                        t.addColorStop(.22, "#000000");
                        t.addColorStop(.8, "#000000");
                        t.addColorStop(.99, "#707070");
                        t.addColorStop(1, "#707070");
                        n.fillStyle = t;
                        n.closePath();
                        n.fill();
                        n.restore()
                    },
                    wi = function(n) {
                        var t, i;
                        n.save();
                        n.beginPath();
                        n.moveTo(o * .476635, o * .313084);
                        n.bezierCurveTo(o * .476635, o * .322429, o * .485981, o * .331775, o * .495327, o * .336448);
                        n.bezierCurveTo(o * .495327, o * .336448, o * .495327, o * .350467, o * .495327, o * .350467);
                        n.lineTo(o * .504672, o * .350467);
                        n.bezierCurveTo(o * .504672, o * .350467, o * .504672, o * .336448, o * .504672, o * .336448);
                        n.bezierCurveTo(o * .514018, o * .331775, o * .523364, o * .322429, o * .523364, o * .313084);
                        n.bezierCurveTo(o * .523364, o * .303738, o * .514018, o * .294392, o * .504672, o * .289719);
                        n.bezierCurveTo(o * .504672, o * .289719, o * .5, o * .200934, o * .5, o * .200934);
                        n.bezierCurveTo(o * .5, o * .200934, o * .495327, o * .289719, o * .495327, o * .289719);
                        n.bezierCurveTo(o * .485981, o * .294392, o * .476635, o * .303738, o * .476635, o * .313084);
                        n.closePath();
                        t = n.createLinearGradient(0, 0, o, 0);
                        t.addColorStop(0, l.medium.getRgbaColor());
                        t.addColorStop(.388888, l.medium.getRgbaColor());
                        t.addColorStop(.5, l.light.getRgbaColor());
                        t.addColorStop(.611111, l.medium.getRgbaColor());
                        t.addColorStop(1, l.medium.getRgbaColor());
                        n.fillStyle = t;
                        n.strokeStyle = l.dark.getRgbaColor();
                        n.fill();
                        n.stroke();
                        n.beginPath();
                        i = o * .037383 / 2;
                        n.arc(c, k + p / 2, i, 0, r);
                        n.fillStyle = "#C48200";
                        n.closePath();
                        n.fill();
                        n.beginPath();
                        i = o * .028037 / 2;
                        n.arc(c, k + p / 2, i, 0, r);
                        n.fillStyle = "#999999";
                        n.closePath();
                        n.fill();
                        n.beginPath();
                        i = o * .018691 / 2;
                        n.arc(c, k + p / 2, i, 0, r);
                        n.fillStyle = "#000000";
                        n.closePath();
                        n.fill();
                        n.restore()
                    },
                    gt = function() {
                        tt = (new Date).getTime() - at;
                        lt = tt * vi / 1e3;
                        yt = lt % 10800 / 30;
                        ei = tt / 6e4 % 30;
                        oi = tt / 1e3 % 60;
                        si = tt % 1e3
                    },
                    st = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.pointers ? !1 : n.pointers,
                            u = undefined === n.foreground ? !1 : n.foreground;
                        ci = !0;
                        t && ii && d(wt, ti, c, y, o, b);
                        i && ri && (nt(ut, ct, c, y, o, b), ht(ut, ai, c, y, o, b), li(ut, o, 60, .075, .1, 0, 0), li(ut, p, 30, .095, .13, hi, k));
                        r && (pi(kt), wi(bt));
                        u && fi && g(dt, ui, o, b, !1)
                    },
                    vt = function(n) {
                        n = n || {};
                        var t = undefined === n.frame ? !1 : n.frame,
                            i = undefined === n.background ? !1 : n.background,
                            r = undefined === n.pointers ? !1 : n.pointers,
                            u = undefined === n.foreground ? !1 : n.foreground;
                        t && (it.width = h, it.height = h, wt = it.getContext("2d"));
                        i && (rt.width = h, rt.height = h, ut = rt.getContext("2d"));
                        r && (ft.width = h, ft.height = h, bt = ft.getContext("2d"), et.width = h, et.height = h, kt = et.getContext("2d"));
                        u && (ot.width = h, ot.height = h, dt = ot.getContext("2d"))
                    },
                    ni = function() {
                        v || (gt(), yi.repaint());
                        a && (pt = setTimeout(ni, 200))
                    };
                return this.isRunning = function() {
                    return a
                }, this.start = function() {
                    return a || (a = !0, at = (new Date).getTime() - tt, ni()), this
                }, this.stop = function() {
                    return a && (a = !1, clearTimeout(pt)), v && (v = !1, gt(), this.repaint()), this
                }, this.reset = function() {
                    return a && (a = !1, v = !1, clearTimeout(pt)), at = (new Date).getTime(), gt(), this.repaint(), this
                }, this.lap = function() {
                    return a && !v ? v = !0 : v && (v = !1), this
                }, this.getMeasuredTime = function() {
                    return ei + ":" + oi + ":" + si
                }, this.setFrameDesign = function(n) {
                    return vt({
                        frame: !0
                    }), ti = n, st({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return vt({
                        background: !0
                    }), ct = n, st({
                        background: !0
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return vt({
                        foreground: !0
                    }), ui = n, st({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setPointerColor = function(n) {
                    return vt({
                        pointers: !0
                    }), l = n, st({
                        pointers: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    ci || st({
                        frame: !0,
                        background: !0,
                        pointers: !0,
                        foreground: !0
                    });
                    s.clearRect(0, 0, o, b);
                    ii && s.drawImage(it, 0, 0);
                    ri && s.drawImage(rt, 0, 0);
                    var n = o * .006,
                        t = (yt + 2 * Math.sin(yt * u)) * u,
                        i = (lt + 2 * Math.sin(lt * u)) * u;
                    s.save();
                    s.translate(c, k + p / 2);
                    s.rotate(t);
                    s.translate(-c, -(k + p / 2));
                    s.shadowColor = "rgba(0, 0, 0, 0.8)";
                    s.shadowOffsetX = s.shadowOffsetY = n / 2;
                    s.shadowBlur = n;
                    s.drawImage(ft, 0, 0);
                    s.restore();
                    s.save();
                    s.translate(c, y);
                    s.rotate(i);
                    s.translate(-c, -y);
                    s.shadowColor = "rgba(0, 0, 0, 0.8)";
                    s.shadowOffsetX = s.shadowOffsetY = n / 2;
                    s.shadowBlur = n;
                    s.drawImage(et, 0, 0);
                    s.restore();
                    fi && s.drawImage(ot, 0, 0)
                }, h = h === 0 ? Math.min(s.canvas.width, s.canvas.height) : h, s.canvas.width = h, s.canvas.height = h, o = h, b = h, c = o / 2, y = b / 2, p = .285 * o, hi = c - p / 2, k = .17 * o, it = t(h, h), wt = it.getContext("2d"), rt = t(h, h), ut = rt.getContext("2d"), ft = t(h, h), bt = ft.getContext("2d"), et = t(h, h), kt = et.getContext("2d"), ot = t(h, h), dt = ot.getContext("2d"), at = (new Date).getTime(), ni(), this
            },
            yr = function(n, i) {
                function hr() {
                    vt = r / (ei - y);
                    yt = vt / 10;
                    kt = yt / 10
                }

                function cr() {
                    oi = v % 1e3 / 100;
                    wt = v % 1e4 / 100;
                    bt = v % 1e5 / 100
                }
                var wi, p, k;
                i = i || {};
                var c = undefined === i.size ? 0 : i.size,
                    gt = undefined === i.frameDesign ? steelseries.FrameDesign.METAL : i.frameDesign,
                    ni = undefined === i.frameVisible ? !0 : i.frameVisible,
                    ut = undefined === i.backgroundColor ? steelseries.BackgroundColor.DARK_GRAY : i.backgroundColor,
                    bi = undefined === i.backgroundVisible ? !0 : i.backgroundVisible,
                    ti = undefined === i.titleString ? "" : i.titleString,
                    ii = undefined === i.unitString ? "" : i.unitString,
                    ki = undefined === i.unitAltPos ? !1 : !0,
                    di = undefined === i.knobType ? steelseries.KnobType.METAL_KNOB : i.knobType,
                    gi = undefined === i.knobStyle ? steelseries.KnobStyle.BLACK : i.knobStyle,
                    it = undefined === i.lcdColor ? steelseries.LcdColor.BLACK : i.lcdColor,
                    ri = undefined === i.lcdVisible ? !0 : i.lcdVisible,
                    nr = undefined === i.digitalFont ? !1 : i.digitalFont,
                    ui = undefined === i.foregroundType ? steelseries.ForegroundType.TYPE1 : i.foregroundType,
                    fi = undefined === i.foregroundVisible ? !0 : i.foregroundVisible,
                    tr = undefined === i.customLayer ? null : i.customLayer,
                    y = 0,
                    ei = 10,
                    v = y,
                    oi = 0,
                    wt = 0,
                    bt = 0,
                    vt, yt, kt, ir = 1,
                    b, dt = !1,
                    u, o, l, a, si, h = w(n),
                    rr = f,
                    hi = !1,
                    ft = t(c, c),
                    ci = ft.getContext("2d"),
                    ot = t(c, c),
                    rt = ot.getContext("2d"),
                    li, st = t(c, c),
                    ai = st.getContext("2d"),
                    ct = t(c, c),
                    vi = ct.getContext("2d"),
                    lt = t(c, c),
                    yi = lt.getContext("2d"),
                    at = t(c, c),
                    pi = at.getContext("2d");
                h.save();
                c = c === 0 ? Math.min(h.canvas.width, h.canvas.height) : c;
                h.canvas.width = c;
                h.canvas.height = c;
                u = c;
                o = c;
                l = u / 2;
                a = o / 2;
                wi = ki ? o * .68 : !1;
                si = Math.floor(u * .09) + "px " + e;
                var ur = function(n) {
                        h.save();
                        h.textAlign = "right";
                        h.textBaseline = "middle";
                        h.strokeStyle = it.textColor;
                        h.fillStyle = it.textColor;
                        (it === steelseries.LcdColor.STANDARD || it === steelseries.LcdColor.STANDARD_GREEN) && (h.shadowColor = "gray", h.shadowOffsetX = u * .007, h.shadowOffsetY = u * .007, h.shadowBlur = u * .009);
                        h.font = nr ? Math.floor(u * .075) + "px " + et : Math.floor(u * .075) + "px bold " + e;
                        h.fillText(Math.round(n), (u + u * .4) / 2 - 4, u * .607, u * .4);
                        h.restore()
                    },
                    fr = function(n, t, i, r, f, e) {
                        var k = Math.max(u * .012, 2),
                            d = Math.max(u * .007, 1.5),
                            p = u * .13,
                            w = u * .05,
                            b = u * .07,
                            o = u * .4,
                            c = 0,
                            g = 0,
                            s = 0,
                            h = 0,
                            y, v, nt = -i - t / 2;
                        for (n.save(), n.textAlign = "center", n.textBaseline = "middle", n.font = si, n.strokeStyle = ut.labelColor.getRgbaColor(), n.fillStyle = ut.labelColor.getRgbaColor(), y = nt, v = 0; v <= 10; y -= e * .1, v += .1) s = Math.sin(y), h = Math.cos(y), c % 2 == 0 && (n.lineWidth = d, n.beginPath(), n.moveTo(l + (o - w) * s, a + (o - w) * h), n.lineTo(l + o * s, a + o * h), n.closePath(), n.stroke()), (c === 10 || c === 0) && (n.lineWidth = k, t === 0 && Math.round(v) !== ei && n.fillText(Math.round(v).toString(), l + (o - p) * s, a + (o - p) * h), c = 0, g++, n.beginPath(), n.moveTo(l + (o - b) * s, a + (o - b) * h), n.lineTo(l + o * s, a + o * h), n.closePath(), n.stroke()), c++;
                        n.restore()
                    },
                    er = function(n, t) {
                        var i;
                        t ? (n.fillStyle = "rgba(0, 0, 0, 0.5)", n.strokeStyle = "rgba(0, 0, 0, 0.5)") : (i = n.createLinearGradient(0, o * .168224, 0, o * .626168), i.addColorStop(0, "#ffffff"), i.addColorStop(.31, "#ffffff"), i.addColorStop(.3101, "#ffffff"), i.addColorStop(.32, "#202020"), i.addColorStop(1, "#202020"), n.fillStyle = i);
                        n.save();
                        n.beginPath();
                        n.moveTo(u * .518691, o * .471962);
                        n.bezierCurveTo(u * .514018, o * .471962, u * .509345, o * .467289, u * .509345, o * .467289);
                        n.lineTo(u * .509345, o * .200934);
                        n.lineTo(u * .5, o * .168224);
                        n.lineTo(u * .490654, o * .200934);
                        n.lineTo(u * .490654, o * .467289);
                        n.bezierCurveTo(u * .490654, o * .467289, u * .481308, o * .471962, u * .481308, o * .471962);
                        n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5);
                        n.bezierCurveTo(u * .467289, o * .514018, u * .476635, o * .528037, u * .490654, o * .53271);
                        n.bezierCurveTo(u * .490654, o * .53271, u * .490654, o * .579439, u * .490654, o * .588785);
                        n.bezierCurveTo(u * .485981, o * .593457, u * .481308, o * .59813, u * .481308, o * .607476);
                        n.bezierCurveTo(u * .481308, o * .616822, u * .490654, o * .626168, u * .5, o * .626168);
                        n.bezierCurveTo(u * .509345, o * .626168, u * .518691, o * .616822, u * .518691, o * .607476);
                        n.bezierCurveTo(u * .518691, o * .59813, u * .514018, o * .593457, u * .504672, o * .588785);
                        n.bezierCurveTo(u * .504672, o * .579439, u * .504672, o * .53271, u * .509345, o * .53271);
                        n.bezierCurveTo(u * .523364, o * .528037, u * .53271, o * .514018, u * .53271, o * .5);
                        n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962);
                        n.closePath();
                        n.fill();
                        n.restore()
                    },
                    or = function(n) {
                        var t;
                        t = n.createLinearGradient(0, o * .401869, 0, o * .616822);
                        t.addColorStop(0, "#ffffff");
                        t.addColorStop(.51, "#ffffff");
                        t.addColorStop(.52, "#ffffff");
                        t.addColorStop(.5201, "#202020");
                        t.addColorStop(.53, "#202020");
                        t.addColorStop(1, "#202020");
                        n.fillStyle = t;
                        n.beginPath();
                        n.moveTo(u * .518691, o * .471962);
                        n.bezierCurveTo(u * .514018, o * .462616, u * .528037, o * .401869, u * .528037, o * .401869);
                        n.lineTo(u * .5, o * .331775);
                        n.lineTo(u * .471962, o * .401869);
                        n.bezierCurveTo(u * .471962, o * .401869, u * .485981, o * .462616, u * .481308, o * .471962);
                        n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5);
                        n.bezierCurveTo(u * .467289, o * .514018, u * .476635, o * .528037, u * .490654, o * .53271);
                        n.bezierCurveTo(u * .490654, o * .53271, u * .462616, o * .574766, u * .462616, o * .593457);
                        n.bezierCurveTo(u * .467289, o * .616822, u * .5, o * .612149, u * .5, o * .612149);
                        n.bezierCurveTo(u * .5, o * .612149, u * .53271, o * .616822, u * .537383, o * .593457);
                        n.bezierCurveTo(u * .537383, o * .574766, u * .509345, o * .53271, u * .509345, o * .53271);
                        n.bezierCurveTo(u * .523364, o * .528037, u * .53271, o * .514018, u * .53271, o * .5);
                        n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962);
                        n.closePath();
                        n.fill();
                        n.restore()
                    },
                    sr = function(n) {
                        n.fillStyle = "#ffffff";
                        n.beginPath();
                        n.moveTo(u * .518691, o * .471962);
                        n.bezierCurveTo(u * .514018, o * .471962, u * .514018, o * .467289, u * .514018, o * .467289);
                        n.lineTo(u * .514018, o * .317757);
                        n.lineTo(u * .504672, o * .303738);
                        n.lineTo(u * .504672, o * .182242);
                        n.lineTo(u * .53271, o * .116822);
                        n.lineTo(u * .462616, o * .116822);
                        n.lineTo(u * .495327, o * .182242);
                        n.lineTo(u * .495327, o * .299065);
                        n.lineTo(u * .485981, o * .317757);
                        n.lineTo(u * .485981, o * .467289);
                        n.bezierCurveTo(u * .485981, o * .467289, u * .485981, o * .471962, u * .481308, o * .471962);
                        n.bezierCurveTo(u * .471962, o * .481308, u * .467289, o * .490654, u * .467289, o * .5);
                        n.bezierCurveTo(u * .467289, o * .518691, u * .481308, o * .53271, u * .5, o * .53271);
                        n.bezierCurveTo(u * .518691, o * .53271, u * .53271, o * .518691, u * .53271, o * .5);
                        n.bezierCurveTo(u * .53271, o * .490654, u * .528037, o * .481308, u * .518691, o * .471962);
                        n.closePath();
                        n.fill()
                    };
                return p = function(n) {
                    n = n || {};
                    var i = undefined === n.frame ? !1 : n.frame,
                        t = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        f = undefined === n.foreground ? !1 : n.foreground;
                    hi = !0;
                    hr();
                    i && ni && d(ci, gt, l, a, u, o);
                    t && bi && (nt(rt, ut, l, a, u, o), ht(rt, tr, l, a, u, o), fr(rt, 0, rr, 0, 10, vt, ir, 0, !0, !0, null), pt(rt, u, o, ti, ii, ut, !0, !0, wi));
                    t && ri && (li = tt(u * .4, o * .09, it), rt.drawImage(li, (u - u * .4) / 2, o * .56));
                    r && (er(yi, !1), or(vi, !1), sr(ai, !1));
                    f && fi && g(pi, ui, u, o, !0, di, gi)
                }, k = function(n) {
                    n = n || {};
                    var t = undefined === n.frame ? !1 : n.frame,
                        i = undefined === n.background ? !1 : n.background,
                        r = undefined === n.pointers ? !1 : n.pointers,
                        u = undefined === n.foreground ? !1 : n.foreground;
                    t && (ft.width = c, ft.height = c, ci = ft.getContext("2d"));
                    i && (ot.width = c, ot.height = c, rt = ot.getContext("2d"));
                    r && (lt.width = c, lt.height = c, yi = lt.getContext("2d"), ct.width = c, ct.height = c, vi = ct.getContext("2d"), st.width = c, st.height = c, ai = st.getContext("2d"));
                    u && (at.width = c, at.height = c, pi = at.getContext("2d"))
                }, this.setValue = function(n) {
                    v = parseFloat(n);
                    this.repaint()
                }, this.getValue = function() {
                    return v
                }, this.setValueAnimated = function(n, t) {
                    n = parseFloat(n);
                    var i = n < y ? y : n,
                        u = this,
                        r;
                    return v !== i && (undefined !== b && b.isPlaying && b.stop(), r = Math.max(Math.abs(v - i) / 2e3, 1), b = new Tween({}, "", Tween.regularEaseInOut, v, i, r), b.onMotionChanged = function(n) {
                        v = n.target._pos;
                        dt || (dt = !0, s(u.repaint))
                    }, t && typeof t == "function" && (b.onMotionFinished = t), b.start()), this
                }, this.setFrameDesign = function(n) {
                    return k({
                        frame: !0
                    }), gt = n, p({
                        frame: !0
                    }), this.repaint(), this
                }, this.setBackgroundColor = function(n) {
                    return k({
                        background: !0,
                        pointer: !0
                    }), ut = n, p({
                        background: !0,
                        pointer: !0
                    }), this.repaint(), this
                }, this.setForegroundType = function(n) {
                    return k({
                        foreground: !0
                    }), ui = n, p({
                        foreground: !0
                    }), this.repaint(), this
                }, this.setLcdColor = function(n) {
                    return it = n, k({
                        background: !0
                    }), p({
                        background: !0
                    }), this.repaint(), this
                }, this.setTitleString = function(n) {
                    return ti = n, k({
                        background: !0
                    }), p({
                        background: !0
                    }), this.repaint(), this
                }, this.setUnitString = function(n) {
                    return ii = n, k({
                        background: !0
                    }), p({
                        background: !0
                    }), this.repaint(), this
                }, this.repaint = function() {
                    hi || p({
                        frame: !0,
                        background: !0,
                        led: !0,
                        pointers: !0,
                        foreground: !0
                    });
                    h.clearRect(0, 0, h.canvas.width, h.canvas.height);
                    ni && h.drawImage(ft, 0, 0);
                    h.drawImage(ot, 0, 0);
                    ri && ur(v);
                    cr();
                    var n = u * .006 * .5;
                    h.save();
                    h.translate(l, a);
                    h.rotate((bt - y) * kt);
                    h.translate(-l, -a);
                    h.shadowColor = "rgba(0, 0, 0, 0.8)";
                    h.shadowOffsetX = h.shadowOffsetY = n;
                    h.shadowBlur = n * 2;
                    h.drawImage(st, 0, 0);
                    n = u * .006 * .75;
                    h.shadowOffsetX = h.shadowOffsetY = n;
                    h.translate(l, a);
                    h.rotate((wt - y) * yt - (bt - y) * kt);
                    h.translate(-l, -a);
                    h.drawImage(ct, 0, 0);
                    n = u * .006;
                    h.shadowOffsetX = h.shadowOffsetY = n;
                    h.translate(l, a);
                    h.rotate((oi - y) * vt - (wt - y) * yt);
                    h.translate(-l, -a);
                    h.drawImage(lt, 0, 0);
                    h.restore();
                    fi && h.drawImage(at, 0, 0);
                    dt = !1
                }, this.repaint(), this
            },
            pr = function(n, t) {
                function fi(n, t, i) {
                    var r = o.createElement("canvas");
                    return r.width = n, r.height = t, i(r.getContext("2d")), r
                }
                var g, ft;
                t = t || {};
                var e = undefined === t.width ? 0 : t.width,
                    s = undefined === t.height ? 0 : t.height,
                    f = w(n),
                    nt, i, u, tt = !1,
                    it = !1,
                    rt = !1,
                    ut = !1,
                    h = o.createElement("canvas"),
                    et = h.getContext("2d"),
                    c = o.createElement("canvas"),
                    ot = c.getContext("2d"),
                    l = o.createElement("canvas"),
                    st = l.getContext("2d"),
                    a = o.createElement("canvas"),
                    ht = a.getContext("2d"),
                    v = o.createElement("canvas"),
                    ct = v.getContext("2d"),
                    y = o.createElement("canvas"),
                    lt = y.getContext("2d"),
                    p = o.createElement("canvas"),
                    at = p.getContext("2d"),
                    b = o.createElement("canvas"),
                    vt = b.getContext("2d"),
                    k = o.createElement("canvas"),
                    yt = k.getContext("2d"),
                    d = o.createElement("canvas"),
                    pt = d.getContext("2d");
                e === 0 && (e = f.canvas.width);
                s === 0 && (s = f.canvas.height);
                f.canvas.width = e;
                f.canvas.height = s;
                nt = e < s * .352517 ? e * 2.836734 : s;
                i = nt * .352517;
                u = nt;
                h.width = i;
                h.height = u;
                c.width = i;
                c.height = u;
                l.width = i;
                l.height = u;
                a.width = i;
                a.height = u;
                v.width = i;
                v.height = u;
                y.width = i;
                y.height = u;
                p.width = i;
                p.height = u;
                b.width = i;
                b.height = u;
                k.width = i;
                k.height = u;
                d.width = i;
                d.height = u;
                var wt = function(n) {
                        var r, t;
                        n.save();
                        n.save();
                        n.beginPath();
                        n.moveTo(.107142 * i, 0);
                        n.lineTo(i - .107142 * i, 0);
                        n.quadraticCurveTo(i, 0, i, .107142 * i);
                        n.lineTo(i, u - .107142 * i);
                        n.quadraticCurveTo(i, u, i - .107142 * i, u);
                        n.lineTo(.107142 * i, u);
                        n.quadraticCurveTo(0, u, 0, u - .107142 * i);
                        n.lineTo(0, .107142 * i);
                        n.quadraticCurveTo(0, 0, .107142 * i, u);
                        n.closePath();
                        r = n.createLinearGradient(.040816 * i, .007194 * u, .952101 * i, .995882 * u);
                        r.addColorStop(0, "rgb(152, 152, 154)");
                        r.addColorStop(.01, "rgb(152, 152, 154)");
                        r.addColorStop(.09, "#333333");
                        r.addColorStop(.24, "rgb(152, 152, 154)");
                        r.addColorStop(.55, "rgb(31, 31, 31)");
                        r.addColorStop(.78, "#363636");
                        r.addColorStop(.98, "#000000");
                        r.addColorStop(1, "#000000");
                        n.fillStyle = r;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(.030612 * i + .084183 * i, .010791 * u);
                        n.lineTo(.030612 * i + .938775 * i - .084183 * i, .010791 * u);
                        n.quadraticCurveTo(.030612 * i + .938775 * i, .010791 * u, .030612 * i + .938775 * i, .010791 * u + .084183 * i);
                        n.lineTo(.030612 * i + .938775 * i, .010791 * u + .978417 * u - .084183 * i);
                        n.quadraticCurveTo(.030612 * i + .938775 * i, .010791 * u + .978417 * u, .030612 * i + .938775 * i - .084183 * i, .010791 * u + .978417 * u);
                        n.lineTo(.030612 * i + .084183 * i, .010791 * u + .978417 * u);
                        n.quadraticCurveTo(.030612 * i, .010791 * u + .978417 * u, .030612 * i, .010791 * u + .978417 * u - .084183 * i);
                        n.lineTo(.030612 * i, .010791 * u + .084183 * i);
                        n.quadraticCurveTo(.030612 * i, .010791 * u, .030612 * i + .084183 * i, .010791 * u);
                        n.closePath();
                        t = n.createLinearGradient(-.132653 * i, -.053956 * u, 2.061408 * i, .667293 * u);
                        t.addColorStop(0, "#000000");
                        t.addColorStop(.01, "#000000");
                        t.addColorStop(.16, "#373735");
                        t.addColorStop(.31, "#000000");
                        t.addColorStop(.44, "#303030");
                        t.addColorStop(.65, "#000000");
                        t.addColorStop(.87, "#363636");
                        t.addColorStop(.98, "#000000");
                        t.addColorStop(1, "#000000");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    bt = function(n) {
                        var t, f, e, o;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .805755 * u, .397959 * i, 0, r, !1);
                        t = n.createLinearGradient(0, .665467 * u, 0, .946043 * u);
                        t.addColorStop(0, "#ffffff");
                        t.addColorStop(.05, "rgb(204, 204, 204)");
                        t.addColorStop(.1, "rgb(153, 153, 153)");
                        t.addColorStop(.17, "#666666");
                        t.addColorStop(.27, "#333333");
                        t.addColorStop(1, "#010101");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1.083333, 1);
                        n.beginPath();
                        n.arc(.461538 * i, .816546 * u, .367346 * i, 0, r, !1);
                        f = n.createLinearGradient(0, .68705 * u, 0, .946043 * u);
                        f.addColorStop(0, "#000000");
                        f.addColorStop(.35, "#040404");
                        f.addColorStop(.66, "#000000");
                        f.addColorStop(1, "#010101");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .809352 * u, .357142 * i, 0, r, !1);
                        e = n.createRadialGradient(.5 * i, .809352 * u, 0, .5 * i, .809352 * u, .362244 * i);
                        e.addColorStop(0, "#000000");
                        e.addColorStop(.88, "#000000");
                        e.addColorStop(.95, "rgb(94, 94, 94)");
                        e.addColorStop(1, "#010101");
                        n.fillStyle = e;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .809352 * u, .357142 * i, 0, r, !1);
                        o = n.createLinearGradient(0, .68705 * u, 0, .917266 * u);
                        o.addColorStop(0, "#000000");
                        o.addColorStop(1, "rgba(1, 1, 1, 0)");
                        n.fillStyle = o;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    kt = function(n) {
                        var t, f;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .809352 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .809352 * u, 0, .5 * i, .809352 * u, .32653 * i);
                        t.addColorStop(0, "rgb(85, 185, 123)");
                        t.addColorStop(1, "rgb(0, 31, 0)");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(0, .812949 * u);
                        n.bezierCurveTo(0, .910071 * u, .224489 * i, .989208 * u, .5 * i, .989208 * u);
                        n.bezierCurveTo(.77551 * i, .989208 * u, i, .910071 * u, i, .809352 * u);
                        n.bezierCurveTo(.908163 * i, .751798 * u, .704081 * i, .68705 * u, .5 * i, .68705 * u);
                        n.bezierCurveTo(.285714 * i, .68705 * u, .081632 * i, .751798 * u, 0, .812949 * u);
                        n.closePath();
                        f = n.createRadialGradient(.5 * i, .809352 * u, 0, .5 * i, .809352 * u, .515306 * i);
                        f.addColorStop(0, "rgb(65, 187, 126)");
                        f.addColorStop(1, "rgba(4, 37, 8, 0)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    dt = function(n) {
                        var f, t;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .809352 * u, .32653 * i, 0, r, !1);
                        f = n.createRadialGradient(.5 * i, .809352 * u, 0, .5 * i, .809352 * u, .32653 * i);
                        f.addColorStop(0, "rgba(0, 255, 0, 0.25)");
                        f.addColorStop(1, "rgba(0, 255, 0, 0.05)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .809352 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .809352 * u, 0, .5 * i, .809352 * u, .32653 * i);
                        t.addColorStop(0, "rgba(1, 1, 1, 0)");
                        t.addColorStop(.55, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.5501, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.78, "rgba(0, 0, 0, 0.12)");
                        t.addColorStop(.79, "rgba(0, 0, 0, 0.12)");
                        t.addColorStop(1, "rgba(0, 0, 0, 0.5)");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.fillStyle = n.createPattern(g, "repeat");
                        n.fill();
                        n.restore()
                    },
                    gt = function(n) {
                        var t, f, e, o;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .496402 * u, .397959 * i, 0, r, !1);
                        t = n.createLinearGradient(0, .356115 * u, 0, .63669 * u);
                        t.addColorStop(0, "#ffffff");
                        t.addColorStop(.05, "rgb(204, 204, 204)");
                        t.addColorStop(.1, "rgb(153, 153, 153)");
                        t.addColorStop(.17, "#666666");
                        t.addColorStop(.27, "#333333");
                        t.addColorStop(1, "#010101");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1.083333, 1);
                        n.beginPath();
                        n.arc(.461538 * i, .507194 * u, .367346 * i, 0, r, !1);
                        f = n.createLinearGradient(0, .377697 * u, 0, .63669 * u);
                        f.addColorStop(0, "#000000");
                        f.addColorStop(.35, "#040404");
                        f.addColorStop(.66, "#000000");
                        f.addColorStop(1, "#010101");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .5 * u, .357142 * i, 0, r, !1);
                        e = n.createRadialGradient(.5 * i, .5 * u, 0, .5 * i, .5 * u, .362244 * i);
                        e.addColorStop(0, "#000000");
                        e.addColorStop(.88, "#000000");
                        e.addColorStop(.95, "#5e5e5e");
                        e.addColorStop(1, "#010101");
                        n.fillStyle = e;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .5 * u, .357142 * i, 0, r, !1);
                        o = n.createLinearGradient(0, .377697 * u, 0, .607913 * u);
                        o.addColorStop(0, "#000000");
                        o.addColorStop(1, "rgba(1, 1, 1, 0)");
                        n.fillStyle = o;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    ni = function(n) {
                        var t, f;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .5 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .5 * u, 0, .5 * i, .5 * u, .32653 * i);
                        t.addColorStop(0, "#fed434");
                        t.addColorStop(1, "#82330c");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(0, .503597 * u);
                        n.bezierCurveTo(0, .600719 * u, .224489 * i, .679856 * u, .5 * i, .679856 * u);
                        n.bezierCurveTo(.77551 * i, .679856 * u, i, .600719 * u, i, .5 * u);
                        n.bezierCurveTo(.908163 * i, .442446 * u, .704081 * i, .377697 * u, .5 * i, .377697 * u);
                        n.bezierCurveTo(.285714 * i, .377697 * u, .081632 * i, .442446 * u, 0, .503597 * u);
                        n.closePath();
                        f = n.createRadialGradient(.5 * i, .5 * u, 0, .5 * i, .5 * u, .515306 * i);
                        f.addColorStop(0, "#fed434");
                        f.addColorStop(1, "rgba(130, 51, 12, 0)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    ti = function(n) {
                        var f, t;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .5 * u, .32653 * i, 0, r, !1);
                        f = n.createRadialGradient(.5 * i, .5 * u, 0, .5 * i, .5 * u, .32653 * i);
                        f.addColorStop(0, "rgba(255, 255, 0, 0.25)");
                        f.addColorStop(1, "rgba(255, 255, 0, 0.05)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .5 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .5 * u, 0, .5 * i, .5 * u, .32653 * i);
                        t.addColorStop(0, "rgba(1, 1, 1, 0)");
                        t.addColorStop(.55, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.5501, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.78, "rgba(0, 0, 0, 0.12)");
                        t.addColorStop(.79, "rgba(0, 0, 0, 0.13)");
                        t.addColorStop(1, "rgba(0, 0, 0, 0.5)");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.fillStyle = n.createPattern(g, "repeat");
                        n.fill();
                        n.restore()
                    },
                    ii = function(n) {
                        var t, f, e, o;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .18705 * u, .397959 * i, 0, r, !1);
                        t = n.createLinearGradient(.5 * i, .046762 * u, .5 * i, .327338 * u);
                        t.addColorStop(0, "#ffffff");
                        t.addColorStop(.05, "#cccccc");
                        t.addColorStop(.1, "#999999");
                        t.addColorStop(.17, "#666666");
                        t.addColorStop(.27, "#333333");
                        t.addColorStop(1, "#010101");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1.083333, 1);
                        n.beginPath();
                        n.arc(.461538 * i, .197841 * u, .367346 * i, 0, r, !1);
                        f = n.createLinearGradient(.5 * i, .068345 * u, .5 * i, .327338 * u);
                        f.addColorStop(0, "#000000");
                        f.addColorStop(.35, "#040404");
                        f.addColorStop(.66, "#000000");
                        f.addColorStop(1, "#010101");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .190647 * u, .357142 * i, 0, r, !1);
                        e = n.createRadialGradient(.5 * i, .190647 * u, 0, .5 * i, .190647 * u, .362244 * i);
                        e.addColorStop(0, "#000000");
                        e.addColorStop(.88, "#000000");
                        e.addColorStop(.95, "#5e5e5e");
                        e.addColorStop(1, "#010101");
                        n.fillStyle = e;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .190647 * u, .357142 * i, 0, r, !1);
                        o = n.createLinearGradient(.5 * i, .068345 * u, .5 * i, .298561 * u);
                        o.addColorStop(0, "#000000");
                        o.addColorStop(1, "rgba(1, 1, 1, 0)");
                        n.fillStyle = o;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    ri = function(n) {
                        var t, f;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .190647 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .190647 * u, 0, .5 * i, .190647 * u, .32653 * i);
                        t.addColorStop(0, "#ff0000");
                        t.addColorStop(1, "#410004");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(0, .194244 * u);
                        n.bezierCurveTo(0, .291366 * u, .224489 * i, .370503 * u, .5 * i, .370503 * u);
                        n.bezierCurveTo(.77551 * i, .370503 * u, i, .291366 * u, i, .190647 * u);
                        n.bezierCurveTo(.908163 * i, .133093 * u, .704081 * i, .068345 * u, .5 * i, .068345 * u);
                        n.bezierCurveTo(.285714 * i, .068345 * u, .081632 * i, .133093 * u, 0, .194244 * u);
                        n.closePath();
                        f = n.createRadialGradient(.5 * i, .190647 * u, 0, .5 * i, .190647 * u, .515306 * i);
                        f.addColorStop(0, "#ff0000");
                        f.addColorStop(1, "rgba(118, 5, 1, 0)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    ui = function(n) {
                        var f, t;
                        n.save();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .190647 * u, .32653 * i, 0, r, !1);
                        f = n.createRadialGradient(.5 * i, .190647 * u, 0, .5 * i, .190647 * u, .32653 * i);
                        f.addColorStop(0, "rgba(255, 0, 0, 0.25)");
                        f.addColorStop(1, "rgba(255, 0, 0, 0.05)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.scale(1, 1);
                        n.beginPath();
                        n.arc(.5 * i, .190647 * u, .32653 * i, 0, r, !1);
                        t = n.createRadialGradient(.5 * i, .190647 * u, 0, .5 * i, .190647 * u, .32653 * i);
                        t.addColorStop(0, "rgba(1, 1, 1, 0)");
                        t.addColorStop(.55, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.5501, "rgba(0, 0, 0, 0)");
                        t.addColorStop(.78, "rgba(0, 0, 0, 0.12)");
                        t.addColorStop(.79, "rgba(0, 0, 0, 0.13)");
                        t.addColorStop(1, "rgba(0, 0, 0, 0.5)");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.fillStyle = n.createPattern(g, "repeat");
                        n.fill();
                        n.restore()
                    };
                return g = fi(2, 2, function(n) {
                    n.save();
                    n.strokeStyle = "rgba(0, 0, 0, 0.1)";
                    n.beginPath();
                    n.lineTo(0, 0, 1, 0);
                    n.lineTo(0, 1, 0, 1);
                    n.stroke();
                    n.restore()
                }), ft = function() {
                    ut = !0;
                    wt(et);
                    bt(ot);
                    kt(st);
                    dt(ht);
                    gt(ct);
                    ni(lt);
                    ti(at);
                    ii(vt);
                    ri(yt);
                    ui(pt)
                }, this.setRedOn = function(n) {
                    tt = !!n;
                    this.repaint()
                }, this.isRedOn = function() {
                    return tt
                }, this.setYellowOn = function(n) {
                    it = !!n;
                    this.repaint()
                }, this.isYellowOn = function() {
                    return it
                }, this.setGreenOn = function(n) {
                    rt = !!n;
                    this.repaint()
                }, this.isGreenOn = function() {
                    return rt
                }, this.repaint = function() {
                    ut || ft();
                    f.save();
                    f.clearRect(0, 0, f.canvas.width, f.canvas.height);
                    f.drawImage(h, 0, 0);
                    f.drawImage(c, 0, 0);
                    rt && f.drawImage(l, 0, 0);
                    f.drawImage(a, 0, 0);
                    f.drawImage(v, 0, 0);
                    it && f.drawImage(y, 0, 0);
                    f.drawImage(p, 0, 0);
                    f.drawImage(b, 0, 0);
                    tt && f.drawImage(k, 0, 0);
                    f.drawImage(d, 0, 0);
                    f.restore()
                }, this.repaint(), this
            },
            wr = function(n, t) {
                function nt(n, t, i) {
                    var r = o.createElement("canvas");
                    return r.width = n, r.height = t, i(r.getContext("2d")), r
                }
                var w;
                t = t || {};
                var u, f = undefined === t.width ? 0 : t.width,
                    e = undefined === t.height ? 0 : t.height,
                    s = undefined === t.glowColor ? "#ffff00" : t.glowColor,
                    a, r, i, p = !1,
                    v = !1,
                    y = 1,
                    h = o.createElement("canvas"),
                    k = h.getContext("2d"),
                    c = o.createElement("canvas"),
                    d = c.getContext("2d"),
                    l = o.createElement("canvas"),
                    g = l.getContext("2d");
                u = document.getElementById(n).getContext("2d");
                f === 0 && (f = u.canvas.width);
                e === 0 && (e = u.canvas.height);
                u.canvas.width = f;
                u.canvas.height = e;
                a = f < e ? f : e;
                r = a;
                i = a;
                w = function(n) {
                    var t, i = nt(1, 1, function(t) {
                        t.fillStyle = n;
                        t.beginPath();
                        t.rect(0, 0, 1, 1);
                        t.fill()
                    });
                    return t = i.getContext("2d").getImageData(0, 0, 2, 2).data, [t[0], t[1], t[2]]
                };
                h.width = r;
                h.height = i;
                c.width = r;
                c.height = i;
                l.width = r;
                l.height = i;
                var tt = function(n) {
                        var t;
                        n.save();
                        n.clearRect(0, 0, n.canvas.width, n.canvas.height);
                        n.save();
                        n.beginPath();
                        n.moveTo(.289473 * r, .438596 * i);
                        n.bezierCurveTo(.289473 * r, .561403 * i, .385964 * r, .605263 * i, .385964 * r, .745614 * i);
                        n.bezierCurveTo(.385964 * r, .745614 * i, .587719 * r, .745614 * i, .587719 * r, .745614 * i);
                        n.bezierCurveTo(.587719 * r, .605263 * i, .692982 * r, .561403 * i, .692982 * r, .438596 * i);
                        n.bezierCurveTo(.692982 * r, .324561 * i, .605263 * r, .22807 * i, .5 * r, .22807 * i);
                        n.bezierCurveTo(.385964 * r, .22807 * i, .289473 * r, .324561 * i, .289473 * r, .438596 * i);
                        n.closePath();
                        t = n.createLinearGradient(0, .289473 * i, 0, .701754 * i);
                        t.addColorStop(0, "#eeeeee");
                        t.addColorStop(.99, "#999999");
                        t.addColorStop(1, "#999999");
                        n.fillStyle = t;
                        n.fill();
                        n.lineCap = "butt";
                        n.lineJoin = "round";
                        n.lineWidth = .008771 * r;
                        n.strokeStyle = "#cccccc";
                        n.stroke();
                        n.restore();
                        n.restore()
                    },
                    it = function(n) {
                        var t, e = w(s),
                            o = e[0],
                            u = e[1],
                            h = e[2],
                            f = dr(o, u, h);
                        n.save();
                        n.clearRect(0, 0, n.canvas.width, n.canvas.height);
                        n.save();
                        n.beginPath();
                        n.moveTo(.289473 * r, .438596 * i);
                        n.bezierCurveTo(.289473 * r, .561403 * i, .385964 * r, .605263 * i, .385964 * r, .745614 * i);
                        n.bezierCurveTo(.385964 * r, .745614 * i, .587719 * r, .745614 * i, .587719 * r, .745614 * i);
                        n.bezierCurveTo(.587719 * r, .605263 * i, .692982 * r, .561403 * i, .692982 * r, .438596 * i);
                        n.bezierCurveTo(.692982 * r, .324561 * i, .605263 * r, .22807 * i, .5 * r, .22807 * i);
                        n.bezierCurveTo(.385964 * r, .22807 * i, .289473 * r, .324561 * i, .289473 * r, .438596 * i);
                        n.closePath();
                        t = n.createLinearGradient(0, .289473 * i, 0, .701754 * i);
                        o === u && u === h ? (t.addColorStop(0, "hsl(0, 60%, 0%)"), t.addColorStop(1, "hsl(0, 40%, 0%)")) : (t.addColorStop(0, "hsl(" + f[0] * 255 + ", " + f[1] * 100 + "%, 70%)"), t.addColorStop(1, "hsl(" + f[0] * 255 + ", " + f[1] * 100 + "%, 80%)"));
                        n.fillStyle = t;
                        n.shadowOffsetX = 0;
                        n.shadowOffsetY = 0;
                        n.shadowBlur = 30;
                        n.shadowColor = s;
                        n.fill();
                        n.lineCap = "butt";
                        n.lineJoin = "round";
                        n.lineWidth = .008771 * r;
                        n.strokeStyle = "rgba(" + o + ", " + u + ", " + h + ", 0.4)";
                        n.stroke();
                        n.restore();
                        n.restore()
                    },
                    rt = function(n) {
                        var e, t, f, u;
                        n.save();
                        n.clearRect(0, 0, n.canvas.width, n.canvas.height);
                        n.save();
                        n.beginPath();
                        n.moveTo(.350877 * r, .333333 * i);
                        n.bezierCurveTo(.350877 * r, .280701 * i, .41228 * r, .236842 * i, .5 * r, .236842 * i);
                        n.bezierCurveTo(.578947 * r, .236842 * i, .64035 * r, .280701 * i, .64035 * r, .333333 * i);
                        n.bezierCurveTo(.64035 * r, .385964 * i, .578947 * r, .429824 * i, .5 * r, .429824 * i);
                        n.bezierCurveTo(.41228 * r, .429824 * i, .350877 * r, .385964 * i, .350877 * r, .333333 * i);
                        n.closePath();
                        e = n.createLinearGradient(0, .245614 * i, 0, .429824 * i);
                        e.addColorStop(0, "#ffffff");
                        e.addColorStop(.99, "rgba(255, 255, 255, 0)");
                        e.addColorStop(1, "rgba(255, 255, 255, 0)");
                        n.fillStyle = e;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(.377192 * r, .745614 * i);
                        n.bezierCurveTo(.377192 * r, .745614 * i, .429824 * r, .72807 * i, .491228 * r, .72807 * i);
                        n.bezierCurveTo(.561403 * r, .72807 * i, .605263 * r, .736842 * i, .605263 * r, .736842 * i);
                        n.lineTo(.605263 * r, .763157 * i);
                        n.lineTo(.596491 * r, .780701 * i);
                        n.lineTo(.605263 * r, .798245 * i);
                        n.lineTo(.596491 * r, .815789 * i);
                        n.lineTo(.605263 * r, .833333 * i);
                        n.lineTo(.596491 * r, .850877 * i);
                        n.lineTo(.605263 * r, .868421 * i);
                        n.lineTo(.596491 * r, .885964 * i);
                        n.lineTo(.605263 * r, .894736 * i);
                        n.bezierCurveTo(.605263 * r, .894736 * i, .570175 * r, .95614 * i, .535087 * r, .991228 * i);
                        n.bezierCurveTo(.526315 * r, .991228 * i, .517543 * r, i, .5 * r, i);
                        n.bezierCurveTo(.482456 * r, i, .473684 * r, i, .464912 * r, .991228 * i);
                        n.bezierCurveTo(.421052 * r, .947368 * i, .394736 * r, .903508 * i, .394736 * r, .903508 * i);
                        n.lineTo(.394736 * r, .894736 * i);
                        n.lineTo(.385964 * r, .885964 * i);
                        n.lineTo(.394736 * r, .868421 * i);
                        n.lineTo(.385964 * r, .850877 * i);
                        n.lineTo(.394736 * r, .833333 * i);
                        n.lineTo(.385964 * r, .815789 * i);
                        n.lineTo(.394736 * r, .798245 * i);
                        n.lineTo(.377192 * r, .789473 * i);
                        n.lineTo(.394736 * r, .771929 * i);
                        n.lineTo(.377192 * r, .763157 * i);
                        n.lineTo(.377192 * r, .745614 * i);
                        n.closePath();
                        t = n.createLinearGradient(.473684 * r, .72807 * i, .484702 * r, .938307 * i);
                        t.addColorStop(0, "#333333");
                        t.addColorStop(.04, "#d9dad6");
                        t.addColorStop(.19, "#e4e5e0");
                        t.addColorStop(.24, "#979996");
                        t.addColorStop(.31, "#fbffff");
                        t.addColorStop(.4, "#818584");
                        t.addColorStop(.48, "#f5f7f4");
                        t.addColorStop(.56, "#959794");
                        t.addColorStop(.64, "#f2f2f0");
                        t.addColorStop(.7, "#828783");
                        t.addColorStop(.78, "#fcfcfc");
                        t.addColorStop(1, "#666666");
                        n.fillStyle = t;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(.377192 * r, .745614 * i);
                        n.bezierCurveTo(.377192 * r, .745614 * i, .429824 * r, .72807 * i, .491228 * r, .72807 * i);
                        n.bezierCurveTo(.561403 * r, .72807 * i, .605263 * r, .736842 * i, .605263 * r, .736842 * i);
                        n.lineTo(.605263 * r, .763157 * i);
                        n.lineTo(.596491 * r, .780701 * i);
                        n.lineTo(.605263 * r, .798245 * i);
                        n.lineTo(.596491 * r, .815789 * i);
                        n.lineTo(.605263 * r, .833333 * i);
                        n.lineTo(.596491 * r, .850877 * i);
                        n.lineTo(.605263 * r, .868421 * i);
                        n.lineTo(.596491 * r, .885964 * i);
                        n.lineTo(.605263 * r, .894736 * i);
                        n.bezierCurveTo(.605263 * r, .894736 * i, .570175 * r, .95614 * i, .535087 * r, .991228 * i);
                        n.bezierCurveTo(.526315 * r, .991228 * i, .517543 * r, i, .5 * r, i);
                        n.bezierCurveTo(.482456 * r, i, .473684 * r, i, .464912 * r, .991228 * i);
                        n.bezierCurveTo(.421052 * r, .947368 * i, .394736 * r, .903508 * i, .394736 * r, .903508 * i);
                        n.lineTo(.394736 * r, .894736 * i);
                        n.lineTo(.385964 * r, .885964 * i);
                        n.lineTo(.394736 * r, .868421 * i);
                        n.lineTo(.385964 * r, .850877 * i);
                        n.lineTo(.394736 * r, .833333 * i);
                        n.lineTo(.385964 * r, .815789 * i);
                        n.lineTo(.394736 * r, .798245 * i);
                        n.lineTo(.377192 * r, .789473 * i);
                        n.lineTo(.394736 * r, .771929 * i);
                        n.lineTo(.377192 * r, .763157 * i);
                        n.lineTo(.377192 * r, .745614 * i);
                        n.closePath();
                        f = n.createLinearGradient(.377192 * r, .789473 * i, .605263 * r, .789473 * i);
                        f.addColorStop(0, "rgba(0, 0, 0, 0.4)");
                        f.addColorStop(.15, "rgba(0, 0, 0, 0.32)");
                        f.addColorStop(.85, "rgba(0, 0, 0, 0.33)");
                        f.addColorStop(1, "rgba(0, 0, 0, 0.4)");
                        n.fillStyle = f;
                        n.fill();
                        n.restore();
                        n.save();
                        n.beginPath();
                        n.moveTo(.421052 * r, .947368 * i);
                        n.bezierCurveTo(.438596 * r, .95614 * i, .447368 * r, .973684 * i, .464912 * r, .991228 * i);
                        n.bezierCurveTo(.473684 * r, i, .482456 * r, i, .5 * r, i);
                        n.bezierCurveTo(.517543 * r, i, .526315 * r, .991228 * i, .535087 * r, .991228 * i);
                        n.bezierCurveTo(.543859 * r, .982456 * i, .561403 * r, .95614 * i, .578947 * r, .947368 * i);
                        n.bezierCurveTo(.552631 * r, .938596 * i, .526315 * r, .938596 * i, .5 * r, .938596 * i);
                        n.bezierCurveTo(.473684 * r, .938596 * i, .447368 * r, .938596 * i, .421052 * r, .947368 * i);
                        n.closePath();
                        u = n.createLinearGradient(0, .938596 * i, 0, i);
                        u.addColorStop(0, "#050a06");
                        u.addColorStop(.61, "#070602");
                        u.addColorStop(.71, "#999288");
                        u.addColorStop(.83, "#010101");
                        u.addColorStop(1, "#000000");
                        n.fillStyle = u;
                        n.fill();
                        n.restore();
                        n.restore()
                    },
                    ut = function(n) {
                        n.save();
                        n.setTransform(1, 0, 0, 1, 0, 0);
                        n.clearRect(0, 0, n.canvas.width, n.canvas.height);
                        n.restore()
                    },
                    b = function() {
                        p = !0;
                        tt(k);
                        it(d);
                        rt(g)
                    };
                return this.setOn = function(n) {
                    return v = !!n, this.repaint(), this
                }, this.isOn = function() {
                    return v
                }, this.setAlpha = function(n) {
                    return y = n, this.repaint(), this
                }, this.getAlpha = function() {
                    return y
                }, this.setGlowColor = function(n) {
                    return s = n, b(), this.repaint(), this
                }, this.getGlowColor = function() {
                    return s
                }, this.repaint = function() {
                    p || b();
                    ut(u);
                    u.save();
                    u.drawImage(h, 0, 0);
                    u.globalAlpha = y;
                    v && u.drawImage(c, 0, 0);
                    u.globalAlpha = 1;
                    u.drawImage(l, 0, 0);
                    u.restore()
                }, this.repaint(), this
            },
            br = function(n, i) {
                function pt() {
                    var t, n;
                    for (ht = !0, p.rect(0, 0, a, e), t = p.createLinearGradient(0, 0, 0, e), t.addColorStop(0, "rgba(0, 0, 0, 1)"), t.addColorStop(.1, "rgba(0, 0, 0, 0.4)"), t.addColorStop(.33, "rgba(255, 255, 255, 0.45)"), t.addColorStop(.46, "rgba(255, 255, 255, 0)"), t.addColorStop(.9, "rgba(0, 0, 0, 0.4)"), t.addColorStop(1, "rgba(0, 0, 0, 1)"), p.fillStyle = t, p.fill(), r.rect(0, 0, f, h * 1.1), r.fillStyle = vt, r.fill(), r.strokeStyle = "#f0f0f0", r.lineWidth = "1px", r.moveTo(0, 0), r.lineTo(0, h * 1.1), r.stroke(), r.strokeStyle = "#202020", r.moveTo(f, 0), r.lineTo(f, h * 1.1), r.stroke(), r.textAlign = "center", r.textBaseline = "middle", r.font = nt, r.fillStyle = yt, n = 9; n < 21; n++) r.fillText(n % 10, f * .5, c * (n - 9) + c / 2);
                    if (v > 0)
                        for (u.rect(0, 0, f, h * 1.1), u.fillStyle = ct, u.fill(), u.strokeStyle = "#f0f0f0", u.lineWidth = "1px", u.moveTo(0, 0), u.lineTo(0, h * 1.1), u.stroke(), u.strokeStyle = "#202020", u.moveTo(f, 0), u.lineTo(f, h * 1.1), u.stroke(), u.textAlign = "center", u.textBaseline = "middle", u.font = nt, u.fillStyle = lt, n = 9; n < 21; n++) u.fillText(n % 10, f * .5, c * (n - 9) + c / 2);
                    for (n = 0; n < k + v; n++) it[n] = Math.random() * st * e - st * e / 2
                }

                function wt() {
                    for (var u = 1, e = o, i, t, r, s, n = 0; n < v; n++) e *= 10;
                    for (t = Math.floor(e), r = e - t, t = String(t), s = 9, n = 0; n < v + k; n++) i = +t.substring(t.length - n - 1, t.length - n) || 0, s !== 9 && (r = 0), n < v ? b.drawImage(et, a - f * u, -(c * (i + r) + tt + it[n])) : b.drawImage(ft, a - f * u, -(c * (i + r) + tt + it[n])), u++, s = i
                }
                i = i || {};
                var ot = undefined === i._context ? null : i._context,
                    e = undefined === i.height ? 0 : i.height,
                    k = undefined === i.digits ? 6 : i.digits,
                    v = undefined === i.decimals ? 1 : i.decimals,
                    ct = undefined === i.decimalBackColor ? "#F0F0F0" : i.decimalBackColor,
                    lt = undefined === i.decimalForeColor ? "#F01010" : i.decimalForeColor,
                    at = undefined === i.font ? "sans-serif" : i.font,
                    o = undefined === i.value ? 0 : i.value,
                    vt = undefined === i.valueBackColor ? "#050505" : i.valueBackColor,
                    yt = undefined === i.valueForeColor ? "#F8F8F8" : i.valueForeColor,
                    st = undefined === i.wobbleFactor ? .07 : i.wobbleFactor,
                    ht = !1,
                    l, y, d = !1,
                    g, f, nt, a, h, c, tt, it = [],
                    rt, b, ut, p, ft, r, et, u;
                y = ot ? ot : w(n);
                e === 0 && (e = y.canvas.height);
                o < 0 && (o = 0);
                g = Math.floor(e * .85);
                nt = "600 " + g + "px " + at;
                f = Math.floor(e * .68);
                a = f * (k + v);
                h = g * 11;
                c = h / 12;
                tt = c * .81;
                y.canvas.width = a;
                y.canvas.height = e;
                rt = t(a, e);
                b = rt.getContext("2d");
                ut = t(a, e);
                p = ut.getContext("2d");
                ft = t(f, h * 1.1);
                r = ft.getContext("2d");
                et = t(f, h * 1.1);
                u = et.getContext("2d");
                this.setValueAnimated = function(n, t) {
                    var i = this;
                    return n = parseFloat(n), n < 0 && (n = 0), o !== n && (undefined !== l && l.isPlaying && l.stop(), l = new Tween({}, "", Tween.strongEaseOut, o, n, 2), l.onMotionChanged = function(n) {
                        o = n.target._pos;
                        d || (d = !0, s(i.repaint))
                    }, t && typeof t == "function" && (l.onMotionFinished = t), l.start()), this.repaint(), this
                };
                this.setValue = function(n) {
                    return o = parseFloat(n), o < 0 && (o = 0), this.repaint(), this
                };
                this.getValue = function() {
                    return o
                };
                this.repaint = function() {
                    ht || pt();
                    wt();
                    b.drawImage(ut, 0, 0);
                    y.drawImage(rt, 0, 0);
                    d = !1
                };
                this.repaint()
            },
            ai = function(n, t, i, f, e, o) {
                var l = !0,
                    s, h, c = o.symbolColor.getRgbaColor();
                for (n.save(), n.lineWidth = 1, n.fillStyle = c, n.strokeStyle = c, n.translate(t, i), s = 0; s < 360; s += 15) l = !l, n.beginPath(), n.arc(0, 0, f * .26, s * u, (s + 15) * u, !1), n.arc(0, 0, f * .23, (s + 15) * u, s * u, !0), n.closePath(), l && n.fill(), n.stroke();
                for (n.translate(-t, -i), s = 0; 360 >= s; s += 90) n.beginPath(), n.moveTo(f * .560747, e * .584112), n.lineTo(f * .640186, e * .644859), n.lineTo(f * .584112, e * .560747), n.lineTo(f * .560747, e * .584112), n.closePath(), n.fillStyle = c, n.fill(), n.stroke(), n.beginPath(), n.moveTo(f * .523364, e * .397196), n.lineTo(f * .5, e * .196261), n.lineTo(f * .471962, e * .397196), n.lineTo(f * .523364, e * .397196), n.closePath(), h = n.createLinearGradient(.476635 * f, 0, .518691 * f, 0), h.addColorStop(0, "rgb(222, 223, 218)"), h.addColorStop(.48, "rgb(222, 223, 218)"), h.addColorStop(.49, c), h.addColorStop(1, c), n.fillStyle = h, n.fill(), n.stroke(), n.translate(t, i), n.rotate(s * u), n.translate(-t, -i);
                n.beginPath();
                n.translate(t, i);
                n.arc(0, 0, f * .1, 0, r, !1);
                n.lineWidth = f * .022;
                n.stroke();
                n.translate(-t, -i);
                n.restore()
            },
            st = function(n, i, u, f, e) {
                var c, o, s, h, l = i.toString() + u.type + f.light.getHexColor() + f.medium.getHexColor();
                if (!st.cache[l]) {
                    c = t(i, i);
                    o = c.getContext("2d");
                    switch (u.type) {
                        case "type2":
                            s = o.createLinearGradient(0, i * .471962, 0, i * .130841);
                            s.addColorStop(0, e.getRgbaColor());
                            s.addColorStop(.36, e.getRgbaColor());
                            s.addColorStop(.361, f.light.getRgbaColor());
                            s.addColorStop(1, f.light.getRgbaColor());
                            o.fillStyle = s;
                            o.beginPath();
                            o.moveTo(i * .518691, i * .471962);
                            o.lineTo(i * .509345, i * .462616);
                            o.lineTo(i * .509345, i * .341121);
                            o.lineTo(i * .504672, i * .130841);
                            o.lineTo(i * .495327, i * .130841);
                            o.lineTo(i * .490654, i * .341121);
                            o.lineTo(i * .490654, i * .462616);
                            o.lineTo(i * .481308, i * .471962);
                            o.closePath();
                            o.fill();
                            break;
                        case "type3":
                            o.beginPath();
                            o.rect(i * .495327, i * .130841, i * .009345, i * .373831);
                            o.closePath();
                            o.fillStyle = f.light.getRgbaColor();
                            o.fill();
                            break;
                        case "type4":
                            s = o.createLinearGradient(.467289 * i, 0, .528036 * i, 0);
                            s.addColorStop(0, f.dark.getRgbaColor());
                            s.addColorStop(.51, f.dark.getRgbaColor());
                            s.addColorStop(.52, f.light.getRgbaColor());
                            s.addColorStop(1, f.light.getRgbaColor());
                            o.fillStyle = s;
                            o.beginPath();
                            o.moveTo(i * .5, i * .126168);
                            o.lineTo(i * .514018, i * .135514);
                            o.lineTo(i * .53271, i * .5);
                            o.lineTo(i * .523364, i * .602803);
                            o.lineTo(i * .476635, i * .602803);
                            o.lineTo(i * .467289, i * .5);
                            o.lineTo(i * .485981, i * .135514);
                            o.lineTo(i * .5, i * .126168);
                            o.closePath();
                            o.fill();
                            break;
                        case "type5":
                            s = o.createLinearGradient(.471962 * i, 0, .528036 * i, 0);
                            s.addColorStop(0, f.light.getRgbaColor());
                            s.addColorStop(.5, f.light.getRgbaColor());
                            s.addColorStop(.5, f.medium.getRgbaColor());
                            s.addColorStop(1, f.medium.getRgbaColor());
                            o.fillStyle = s;
                            o.beginPath();
                            o.moveTo(i * .5, i * .495327);
                            o.lineTo(i * .528037, i * .495327);
                            o.lineTo(i * .5, i * .149532);
                            o.lineTo(i * .471962, i * .495327);
                            o.lineTo(i * .5, i * .495327);
                            o.closePath();
                            o.fill();
                            o.lineWidth = 1;
                            o.lineCap = "square";
                            o.lineJoin = "miter";
                            o.strokeStyle = f.dark.getRgbaColor();
                            o.stroke();
                            break;
                        case "type6":
                            o.fillStyle = f.medium.getRgbaColor();
                            o.beginPath();
                            o.moveTo(i * .481308, i * .485981);
                            o.lineTo(i * .481308, i * .392523);
                            o.lineTo(i * .485981, i * .317757);
                            o.lineTo(i * .495327, i * .130841);
                            o.lineTo(i * .504672, i * .130841);
                            o.lineTo(i * .514018, i * .317757);
                            o.lineTo(i * .518691, i * .38785);
                            o.lineTo(i * .518691, i * .485981);
                            o.lineTo(i * .504672, i * .485981);
                            o.lineTo(i * .504672, i * .38785);
                            o.lineTo(i * .5, i * .317757);
                            o.lineTo(i * .495327, i * .392523);
                            o.lineTo(i * .495327, i * .485981);
                            o.lineTo(i * .481308, i * .485981);
                            o.closePath();
                            o.fill();
                            break;
                        case "type7":
                            s = o.createLinearGradient(.481308 * i, 0, .518691 * i, 0);
                            s.addColorStop(0, f.dark.getRgbaColor());
                            s.addColorStop(1, f.medium.getRgbaColor());
                            o.fillStyle = s;
                            o.beginPath();
                            o.moveTo(i * .490654, i * .130841);
                            o.lineTo(i * .481308, i * .5);
                            o.lineTo(i * .518691, i * .5);
                            o.lineTo(i * .504672, i * .130841);
                            o.lineTo(i * .490654, i * .130841);
                            o.closePath();
                            o.fill();
                            break;
                        case "type8":
                            s = o.createLinearGradient(.471962 * i, 0, .528036 * i, 0);
                            s.addColorStop(0, f.light.getRgbaColor());
                            s.addColorStop(.5, f.light.getRgbaColor());
                            s.addColorStop(.5, f.medium.getRgbaColor());
                            s.addColorStop(1, f.medium.getRgbaColor());
                            o.fillStyle = s;
                            o.strokeStyle = f.dark.getRgbaColor();
                            o.beginPath();
                            o.moveTo(i * .5, i * .53271);
                            o.lineTo(i * .53271, i * .5);
                            o.bezierCurveTo(i * .53271, i * .5, i * .509345, i * .457943, i * .5, i * .149532);
                            o.bezierCurveTo(i * .490654, i * .457943, i * .467289, i * .5, i * .467289, i * .5);
                            o.lineTo(i * .5, i * .53271);
                            o.closePath();
                            o.fill();
                            o.stroke();
                            break;
                        case "type9":
                            s = o.createLinearGradient(.471962 * i, 0, .528036 * i, 0);
                            s.addColorStop(0, "rgb(50, 50, 50)");
                            s.addColorStop(.5, "#666666");
                            s.addColorStop(1, "rgb(50, 50, 50)");
                            o.fillStyle = s;
                            o.strokeStyle = "#2E2E2E";
                            o.beginPath();
                            o.moveTo(i * .495327, i * .233644);
                            o.lineTo(i * .504672, i * .233644);
                            o.lineTo(i * .514018, i * .439252);
                            o.lineTo(i * .485981, i * .439252);
                            o.lineTo(i * .495327, i * .233644);
                            o.closePath();
                            o.moveTo(i * .490654, i * .130841);
                            o.lineTo(i * .471962, i * .471962);
                            o.lineTo(i * .471962, i * .528037);
                            o.bezierCurveTo(i * .471962, i * .528037, i * .476635, i * .602803, i * .476635, i * .602803);
                            o.bezierCurveTo(i * .476635, i * .607476, i * .481308, i * .607476, i * .5, i * .607476);
                            o.bezierCurveTo(i * .518691, i * .607476, i * .523364, i * .607476, i * .523364, i * .602803);
                            o.bezierCurveTo(i * .523364, i * .602803, i * .528037, i * .528037, i * .528037, i * .528037);
                            o.lineTo(i * .528037, i * .471962);
                            o.lineTo(i * .509345, i * .130841);
                            o.lineTo(i * .490654, i * .130841);
                            o.closePath();
                            o.fill();
                            o.beginPath();
                            o.moveTo(i * .495327, i * .219626);
                            o.lineTo(i * .504672, i * .219626);
                            o.lineTo(i * .504672, i * .135514);
                            o.lineTo(i * .495327, i * .135514);
                            o.lineTo(i * .495327, i * .219626);
                            o.closePath();
                            o.fillStyle = f.medium.getRgbaColor();
                            o.fill();
                            break;
                        case "type10":
                            o.beginPath();
                            o.moveTo(i * .5, i * .149532);
                            o.bezierCurveTo(i * .5, i * .149532, i * .443925, i * .490654, i * .443925, i * .5);
                            o.bezierCurveTo(i * .443925, i * .53271, i * .467289, i * .556074, i * .5, i * .556074);
                            o.bezierCurveTo(i * .53271, i * .556074, i * .556074, i * .53271, i * .556074, i * .5);
                            o.bezierCurveTo(i * .556074, i * .490654, i * .5, i * .149532, i * .5, i * .149532);
                            o.closePath();
                            s = o.createLinearGradient(.471962 * i, 0, .528036 * i, 0);
                            s.addColorStop(0, f.light.getRgbaColor());
                            s.addColorStop(.5, f.light.getRgbaColor());
                            s.addColorStop(.5, f.medium.getRgbaColor());
                            s.addColorStop(1, f.medium.getRgbaColor());
                            o.fillStyle = s;
                            o.strokeStyle = f.medium.getRgbaColor();
                            o.lineWidth = 1;
                            o.lineCap = "square";
                            o.lineJoin = "miter";
                            o.fill();
                            o.stroke();
                            break;
                        case "type11":
                            o.beginPath();
                            o.moveTo(.5 * i, .168224 * i);
                            o.lineTo(.485981 * i, .5 * i);
                            o.bezierCurveTo(.485981 * i, .5 * i, .481308 * i, .584112 * i, .5 * i, .584112 * i);
                            o.bezierCurveTo(.514018 * i, .584112 * i, .509345 * i, .5 * i, .509345 * i, .5 * i);
                            o.lineTo(.5 * i, .168224 * i);
                            o.closePath();
                            s = o.createLinearGradient(0, .168224 * i, 0, .584112 * i);
                            s.addColorStop(0, f.medium.getRgbaColor());
                            s.addColorStop(1, f.dark.getRgbaColor());
                            o.fillStyle = s;
                            o.strokeStyle = f.dark.getRgbaColor();
                            o.fill();
                            o.stroke();
                            break;
                        case "type12":
                            o.beginPath();
                            o.moveTo(.5 * i, .168224 * i);
                            o.lineTo(.485981 * i, .5 * i);
                            o.lineTo(.5 * i, .504672 * i);
                            o.lineTo(.509345 * i, .5 * i);
                            o.lineTo(.5 * i, .168224 * i);
                            o.closePath();
                            s = o.createLinearGradient(0, .168224 * i, 0, .504672 * i);
                            s.addColorStop(0, f.medium.getRgbaColor());
                            s.addColorStop(1, f.dark.getRgbaColor());
                            o.fillStyle = s;
                            o.strokeStyle = f.dark.getRgbaColor();
                            o.fill();
                            o.stroke();
                            break;
                        case "type13":
                        case "type14":
                            o.beginPath();
                            o.moveTo(.485981 * i, .168224 * i);
                            o.lineTo(.5 * i, .130841 * i);
                            o.lineTo(.509345 * i, .168224 * i);
                            o.lineTo(.509345 * i, .509345 * i);
                            o.lineTo(.485981 * i, .509345 * i);
                            o.lineTo(.485981 * i, .168224 * i);
                            o.closePath();
                            u.type === "type13" ? (s = o.createLinearGradient(0, .5 * i, 0, .130841 * i), s.addColorStop(0, e.getRgbaColor()), s.addColorStop(.85, e.getRgbaColor()), s.addColorStop(.85, f.medium.getRgbaColor()), s.addColorStop(1, f.medium.getRgbaColor()), o.fillStyle = s) : (s = o.createLinearGradient(.485981 * i, 0, .509345 * i, 0), s.addColorStop(0, f.veryDark.getRgbaColor()), s.addColorStop(.5, f.light.getRgbaColor()), s.addColorStop(1, f.veryDark.getRgbaColor()), o.fillStyle = s);
                            o.fill();
                            break;
                        case "type15":
                        case "type16":
                            o.beginPath();
                            o.moveTo(i * .509345, i * .457943);
                            o.lineTo(i * .5015, i * .13);
                            o.lineTo(i * .4985, i * .13);
                            o.lineTo(i * .490654, i * .457943);
                            o.bezierCurveTo(i * .490654, i * .457943, i * .490654, i * .457943, i * .490654, i * .457943);
                            o.bezierCurveTo(i * .471962, i * .462616, i * .457943, i * .481308, i * .457943, i * .5);
                            o.bezierCurveTo(i * .457943, i * .518691, i * .471962, i * .537383, i * .490654, i * .542056);
                            o.bezierCurveTo(i * .490654, i * .542056, i * .490654, i * .542056, i * .490654, i * .542056);
                            u.type === "type15" ? (o.lineTo(i * .490654, i * .57), o.bezierCurveTo(i * .46, i * .58, i * .46, i * .62, i * .490654, i * .63), o.bezierCurveTo(i * .47, i * .62, i * .48, i * .59, i * .5, i * .59), o.bezierCurveTo(i * .53, i * .59, i * .52, i * .62, i * .509345, i * .63), o.bezierCurveTo(i * .54, i * .62, i * .54, i * .58, i * .509345, i * .57), o.lineTo(i * .509345, i * .57)) : (o.lineTo(i * .490654, i * .621495), o.lineTo(i * .509345, i * .621495));
                            o.lineTo(i * .509345, i * .542056);
                            o.bezierCurveTo(i * .509345, i * .542056, i * .509345, i * .542056, i * .509345, i * .542056);
                            o.bezierCurveTo(i * .528037, i * .537383, i * .542056, i * .518691, i * .542056, i * .5);
                            o.bezierCurveTo(i * .542056, i * .481308, i * .528037, i * .462616, i * .509345, i * .457943);
                            o.bezierCurveTo(i * .509345, i * .457943, i * .509345, i * .457943, i * .509345, i * .457943);
                            o.closePath();
                            s = u.type === "type15" ? o.createLinearGradient(0, 0, 0, i * .63) : o.createLinearGradient(0, 0, 0, i * .621495);
                            s.addColorStop(0, f.medium.getRgbaColor());
                            s.addColorStop(.388888, f.medium.getRgbaColor());
                            s.addColorStop(.5, f.light.getRgbaColor());
                            s.addColorStop(.611111, f.medium.getRgbaColor());
                            s.addColorStop(1, f.medium.getRgbaColor());
                            o.fillStyle = s;
                            o.strokeStyle = f.dark.getRgbaColor();
                            o.fill();
                            o.stroke();
                            o.beginPath();
                            h = i * .06542 / 2;
                            o.arc(i * .5, i * .5, h, 0, r);
                            s = o.createLinearGradient(i * .5 - h, i * .5 + h, 0, i * .5 + h);
                            s.addColorStop(0, "#e6b35c");
                            s.addColorStop(.01, "#e6b35c");
                            s.addColorStop(.99, "#c48200");
                            s.addColorStop(1, "#c48200");
                            o.fillStyle = s;
                            o.closePath();
                            o.fill();
                            o.beginPath();
                            h = i * .046728 / 2;
                            o.arc(i * .5, i * .5, h, 0, r);
                            s = o.createRadialGradient(i * .5, i * .5, 0, i * .5, i * .5, h);
                            s.addColorStop(0, "#c5c5c5");
                            s.addColorStop(.19, "#c5c5c5");
                            s.addColorStop(.22, "#000000");
                            s.addColorStop(.8, "#000000");
                            s.addColorStop(.99, "#707070");
                            s.addColorStop(1, "#707070");
                            o.fillStyle = s;
                            o.closePath();
                            o.fill();
                            break;
                        case "type1":
                        default:
                            s = o.createLinearGradient(0, i * .471962, 0, i * .130841);
                            s.addColorStop(0, f.veryDark.getRgbaColor());
                            s.addColorStop(.3, f.medium.getRgbaColor());
                            s.addColorStop(.59, f.medium.getRgbaColor());
                            s.addColorStop(1, f.veryDark.getRgbaColor());
                            o.fillStyle = s;
                            o.beginPath();
                            o.moveTo(i * .518691, i * .471962);
                            o.bezierCurveTo(i * .514018, i * .457943, i * .509345, i * .415887, i * .509345, i * .401869);
                            o.bezierCurveTo(i * .504672, i * .383177, i * .5, i * .130841, i * .5, i * .130841);
                            o.bezierCurveTo(i * .5, i * .130841, i * .490654, i * .383177, i * .490654, i * .397196);
                            o.bezierCurveTo(i * .490654, i * .415887, i * .485981, i * .457943, i * .481308, i * .471962);
                            o.bezierCurveTo(i * .471962, i * .481308, i * .467289, i * .490654, i * .467289, i * .5);
                            o.bezierCurveTo(i * .467289, i * .518691, i * .481308, i * .53271, i * .5, i * .53271);
                            o.bezierCurveTo(i * .518691, i * .53271, i * .53271, i * .518691, i * .53271, i * .5);
                            o.bezierCurveTo(i * .53271, i * .490654, i * .528037, i * .481308, i * .518691, i * .471962);
                            o.closePath();
                            o.fill()
                    }
                    st.cache[l] = c
                }
                return n.drawImage(st.cache[l], 0, 0), this
            },
            d, at, nt, ht, vt, g, yt, a, h, tt, b, ut, s, y, l, it, lt, kt, ni, li, fi, ft, k, dt, ei, oi, ti;
        st.cache = {};
        d = function(i, u, f, e, o, s) {
            var p, h, c, l, a, v, y, w = o.toString() + s + u.design;
            if (!d.cache[w]) {
                p = t(o, s);
                h = p.getContext("2d");
                h.fillStyle = "#848484";
                h.strokeStyle = "rgba(132, 132, 132, 0.5)";
                h.beginPath();
                h.arc(f, e, o / 2, 0, r, !0);
                h.closePath();
                h.fill();
                h.stroke();
                h.beginPath();
                h.arc(f, e, o * .990654 / 2, 0, r, !0);
                h.closePath();
                switch (u.design) {
                    case "metal":
                        c = h.createLinearGradient(0, o * .004672, 0, s * .990654);
                        c.addColorStop(0, "#fefefe");
                        c.addColorStop(.07, "rgb(210, 210, 210)");
                        c.addColorStop(.12, "rgb(179, 179, 179)");
                        c.addColorStop(1, "rgb(213, 213, 213)");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "brass":
                        c = h.createLinearGradient(0, o * .004672, 0, s * .990654);
                        c.addColorStop(0, "rgb(249, 243, 155)");
                        c.addColorStop(.05, "rgb(246, 226, 101)");
                        c.addColorStop(.1, "rgb(240, 225, 132)");
                        c.addColorStop(.5, "rgb(90, 57, 22)");
                        c.addColorStop(.9, "rgb(249, 237, 139)");
                        c.addColorStop(.95, "rgb(243, 226, 108)");
                        c.addColorStop(1, "rgb(202, 182, 113)");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "steel":
                        c = h.createLinearGradient(0, o * .004672, 0, s * .990654);
                        c.addColorStop(0, "rgb(231, 237, 237)");
                        c.addColorStop(.05, "rgb(189, 199, 198)");
                        c.addColorStop(.1, "rgb(192, 201, 200)");
                        c.addColorStop(.5, "rgb(23, 31, 33)");
                        c.addColorStop(.9, "rgb(196, 205, 204)");
                        c.addColorStop(.95, "rgb(194, 204, 203)");
                        c.addColorStop(1, "rgb(189, 201, 199)");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "gold":
                        c = h.createLinearGradient(0, o * .004672, 0, s * .990654);
                        c.addColorStop(0, "rgb(255, 255, 207)");
                        c.addColorStop(.15, "rgb(255, 237, 96)");
                        c.addColorStop(.22, "rgb(254, 199, 57)");
                        c.addColorStop(.3, "rgb(255, 249, 203)");
                        c.addColorStop(.38, "rgb(255, 199, 64)");
                        c.addColorStop(.44, "rgb(252, 194, 60)");
                        c.addColorStop(.51, "rgb(255, 204, 59)");
                        c.addColorStop(.6, "rgb(213, 134, 29)");
                        c.addColorStop(.68, "rgb(255, 201, 56)");
                        c.addColorStop(.75, "rgb(212, 135, 29)");
                        c.addColorStop(1, "rgb(247, 238, 101)");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "anthracite":
                        c = h.createLinearGradient(0, .004672 * s, 0, .995326 * s);
                        c.addColorStop(0, "rgb(118, 117, 135)");
                        c.addColorStop(.06, "rgb(74, 74, 82)");
                        c.addColorStop(.12, "rgb(50, 50, 54)");
                        c.addColorStop(1, "rgb(79, 79, 87)");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "tiltedGray":
                        c = h.createLinearGradient(.233644 * o, .084112 * s, .81258 * o, .910919 * s);
                        c.addColorStop(0, "#ffffff");
                        c.addColorStop(.07, "rgb(210, 210, 210)");
                        c.addColorStop(.16, "rgb(179, 179, 179)");
                        c.addColorStop(.33, "#ffffff");
                        c.addColorStop(.55, "#c5c5c5");
                        c.addColorStop(.79, "#ffffff");
                        c.addColorStop(1, "#666666");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "tiltedBlack":
                        c = h.createLinearGradient(.228971 * o, .079439 * s, .802547 * o, .898591 * s);
                        c.addColorStop(0, "#666666");
                        c.addColorStop(.21, "#000000");
                        c.addColorStop(.47, "#666666");
                        c.addColorStop(.99, "#000000");
                        c.addColorStop(1, "#000000");
                        h.fillStyle = c;
                        h.fill();
                        break;
                    case "glossyMetal":
                        c = h.createRadialGradient(.5 * o, .5 * s, 0, .5 * o, .5 * o, .5 * o);
                        c.addColorStop(0, "rgb(207, 207, 207)");
                        c.addColorStop(.96, "rgb(205, 204, 205)");
                        c.addColorStop(1, "rgb(244, 244, 244)");
                        h.fillStyle = c;
                        h.fill();
                        h.beginPath();
                        h.arc(.5 * o, .5 * s, .973962 * o / 2, 0, r);
                        h.closePath();
                        c = h.createLinearGradient(0, s - .971962 * s, 0, .971962 * s);
                        c.addColorStop(0, "rgb(249, 249, 249)");
                        c.addColorStop(.23, "rgb(200, 195, 191)");
                        c.addColorStop(.36, "#ffffff");
                        c.addColorStop(.59, "rgb(29, 29, 29)");
                        c.addColorStop(.76, "rgb(200, 194, 192)");
                        c.addColorStop(1, "rgb(209, 209, 209)");
                        h.fillStyle = c;
                        h.fill();
                        h.beginPath();
                        h.arc(.5 * o, .5 * s, .869158 * o / 2, 0, r);
                        h.closePath();
                        h.fillStyle = "#f6f6f6";
                        h.fill();
                        h.beginPath();
                        h.arc(.5 * o, .5 * s, .85 * o / 2, 0, r);
                        h.closePath();
                        h.fillStyle = "#333333";
                        h.fill();
                        break;
                    case "blackMetal":
                        v = [0, .125, .347222, .5, .680555, .875, 1];
                        y = [new n(254, 254, 254, 1), new n(0, 0, 0, 1), new n(153, 153, 153, 1), new n(0, 0, 0, 1), new n(153, 153, 153, 1), new n(0, 0, 0, 1), new n(254, 254, 254, 1)];
                        h.save();
                        h.arc(f, e, o * .990654 / 2, 0, r, !0);
                        h.clip();
                        l = o * .495327;
                        a = o * .42056;
                        c = new ot(v, y);
                        c.fillCircle(h, f, e, a, l);
                        h.strokeStyle = "#848484";
                        h.strokeStyle = "rgba(132, 132, 132, 0.8)";
                        h.beginPath();
                        h.lineWidth = o / 90;
                        h.arc(f, e, o / 2, 0, r, !0);
                        h.closePath();
                        h.stroke();
                        h.restore();
                        break;
                    case "shinyMetal":
                        v = [0, .125, .25, .347222, .5, .652777, .75, .875, 1];
                        y = [new n(254, 254, 254, 1), new n(210, 210, 210, 1), new n(179, 179, 179, 1), new n(238, 238, 238, 1), new n(160, 160, 160, 1), new n(238, 238, 238, 1), new n(179, 179, 179, 1), new n(210, 210, 210, 1), new n(254, 254, 254, 1)];
                        h.save();
                        h.arc(f, e, o * .990654 / 2, 0, r, !0);
                        h.clip();
                        l = o * .495327;
                        a = o * .42056;
                        c = new ot(v, y);
                        c.fillCircle(h, f, e, a, l);
                        h.strokeStyle = "#848484";
                        h.strokeStyle = "rgba(132, 132, 132, 0.8)";
                        h.beginPath();
                        h.lineWidth = o / 90;
                        h.arc(f, e, o / 2, 0, r, !0);
                        h.closePath();
                        h.stroke();
                        h.restore();
                        break;
                    case "chrome":
                        v = [0, .09, .12, .16, .25, .29, .33, .38, .48, .52, .63, .68, .8, .83, .87, .97, 1];
                        y = [new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(136, 136, 138, 1), new n(164, 185, 190, 1), new n(158, 179, 182, 1), new n(112, 112, 112, 1), new n(221, 227, 227, 1), new n(155, 176, 179, 1), new n(156, 176, 177, 1), new n(254, 255, 255, 1), new n(255, 255, 255, 1), new n(156, 180, 180, 1), new n(198, 209, 211, 1), new n(246, 248, 247, 1), new n(204, 216, 216, 1), new n(164, 188, 190, 1), new n(255, 255, 255, 1)];
                        h.save();
                        h.arc(f, e, o * .990654 / 2, 0, r, !0);
                        h.clip();
                        l = o * .495327;
                        a = o * .42056;
                        c = new ot(v, y);
                        c.fillCircle(h, f, e, a, l);
                        h.strokeStyle = "#848484";
                        h.strokeStyle = "rgba(132, 132, 132, 0.8)";
                        h.beginPath();
                        h.lineWidth = o / 90;
                        h.arc(f, e, o / 2, 0, r, !0);
                        h.closePath();
                        h.stroke();
                        h.restore()
                }
                h.fillStyle = "rgb(191, 191, 191)";
                h.beginPath();
                h.arc(f, e, o * .841121 / 2, 0, r, !0);
                h.closePath();
                h.fill();
                h.globalCompositeOperation = "destination-out";
                h.beginPath();
                h.arc(f, e, o * .83 / 2, 0, r, !0);
                h.closePath();
                h.fill();
                d.cache[w] = p
            }
            return i.drawImage(d.cache[w], 0, 0), this
        };
        d.cache = {};
        at = function(i, r, u, f, e) {
            var h, y, s, c, w, l, o, a = [],
                v = [],
                b = u.toString() + f + r.design + e;
            if (!at.cache[b]) {
                h = Math.sqrt(u * u + f * f) * .04;
                h = Math.ceil(Math.min(h, (e ? u : f) * .1));
                y = t(u, f);
                s = y.getContext("2d");
                e ? (c = Math.ceil(u * .05), w = c - 1, l = Math.floor(u * .028571)) : (c = Math.ceil(f * .05), w = c - 1, l = Math.floor(f * .028571));
                p(s, 0, 0, u, f, c);
                s.fillStyle = "#838383";
                s.fill();
                p(s, 1, 1, u - 2, f - 2, w);
                switch (r.design) {
                    case "metal":
                        o = s.createLinearGradient(0, u * .004672, 0, f * .990654);
                        o.addColorStop(0, "#fefefe");
                        o.addColorStop(.07, "rgb(210, 210, 210)");
                        o.addColorStop(.12, "rgb(179, 179, 179)");
                        o.addColorStop(1, "rgb(213, 213, 213)");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "brass":
                        o = s.createLinearGradient(0, u * .004672, 0, f * .990654);
                        o.addColorStop(0, "rgb(249, 243, 155)");
                        o.addColorStop(.05, "rgb(246, 226, 101)");
                        o.addColorStop(.1, "rgb(240, 225, 132)");
                        o.addColorStop(.5, "rgb(90, 57, 22)");
                        o.addColorStop(.9, "rgb(249, 237, 139)");
                        o.addColorStop(.95, "rgb(243, 226, 108)");
                        o.addColorStop(1, "rgb(202, 182, 113)");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "steel":
                        o = s.createLinearGradient(0, u * .004672, 0, f * .990654);
                        o.addColorStop(0, "rgb(231, 237, 237)");
                        o.addColorStop(.05, "rgb(189, 199, 198)");
                        o.addColorStop(.1, "rgb(192, 201, 200)");
                        o.addColorStop(.5, "rgb(23, 31, 33)");
                        o.addColorStop(.9, "rgb(196, 205, 204)");
                        o.addColorStop(.95, "rgb(194, 204, 203)");
                        o.addColorStop(1, "rgb(189, 201, 199)");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "gold":
                        o = s.createLinearGradient(0, u * .004672, 0, f * .990654);
                        o.addColorStop(0, "rgb(255, 255, 207)");
                        o.addColorStop(.15, "rgb(255, 237, 96)");
                        o.addColorStop(.22, "rgb(254, 199, 57)");
                        o.addColorStop(.3, "rgb(255, 249, 203)");
                        o.addColorStop(.38, "rgb(255, 199, 64)");
                        o.addColorStop(.44, "rgb(252, 194, 60)");
                        o.addColorStop(.51, "rgb(255, 204, 59)");
                        o.addColorStop(.6, "rgb(213, 134, 29)");
                        o.addColorStop(.68, "rgb(255, 201, 56)");
                        o.addColorStop(.75, "rgb(212, 135, 29)");
                        o.addColorStop(1, "rgb(247, 238, 101)");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "anthracite":
                        o = s.createLinearGradient(0, .004672 * f, 0, .995326 * f);
                        o.addColorStop(0, "rgb(118, 117, 135)");
                        o.addColorStop(.06, "rgb(74, 74, 82)");
                        o.addColorStop(.12, "rgb(50, 50, 54)");
                        o.addColorStop(1, "rgb(79, 79, 87)");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "tiltedGray":
                        o = s.createLinearGradient(.233644 * u, .084112 * f, .81258 * u, .910919 * f);
                        o.addColorStop(0, "#ffffff");
                        o.addColorStop(.07, "rgb(210, 210, 210)");
                        o.addColorStop(.16, "rgb(179, 179, 179)");
                        o.addColorStop(.33, "#ffffff");
                        o.addColorStop(.55, "#c5c5c5");
                        o.addColorStop(.79, "#ffffff");
                        o.addColorStop(1, "#666666");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "tiltedBlack":
                        o = s.createLinearGradient(.228971 * u, .079439 * f, .802547 * u, .898591 * f);
                        o.addColorStop(0, "#666666");
                        o.addColorStop(.21, "#000000");
                        o.addColorStop(.47, "#666666");
                        o.addColorStop(.99, "#000000");
                        o.addColorStop(1, "#000000");
                        s.fillStyle = o;
                        s.fill();
                        break;
                    case "glossyMetal":
                        p(s, 1, 1, u - 2, f - 2, c);
                        s.clip();
                        o = s.createLinearGradient(0, 1, 0, f - 2);
                        o.addColorStop(0, "rgb(249, 249, 249)");
                        o.addColorStop(.2, "rgb(200, 195, 191)");
                        o.addColorStop(.3, "#ffffff");
                        o.addColorStop(.6, "rgb(29, 29, 29)");
                        o.addColorStop(.8, "rgb(200, 194, 192)");
                        o.addColorStop(1, "rgb(209, 209, 209)");
                        s.fillStyle = o;
                        s.fill();
                        p(s, h - 2, h - 2, u - (h - 2) * 2, f - (h - 2) * 2, l);
                        s.clip();
                        s.fillStyle = "#f6f6f6";
                        s.fill();
                        p(s, h - 1, h - 1, u - (h - 1) * 2, f - (h - 1) * 2, l);
                        s.clip();
                        s.fillStyle = "#333333";
                        break;
                    case "blackMetal":
                        a = [0, .125, .347222, .5, .680555, .875, 1];
                        v = [new n("#FFFFFF"), new n("#000000"), new n("#999999"), new n("#000000"), new n("#999999"), new n("#000000"), new n("#FFFFFF")];
                        s.beginPath();
                        p(s, 1, 1, u - 2, f - 2, c);
                        s.closePath();
                        s.clip();
                        o = new ot(a, v);
                        o.fillRect(s, u / 2, f / 2, u, f, h, h);
                        break;
                    case "shinyMetal":
                        a = [0, .125, .25, .347222, .5, .652777, .75, .875, 1];
                        v = [new n("#FFFFFF"), new n("#D2D2D2"), new n("#B3B3B3"), new n("#EEEEEE"), new n("#A0A0A0"), new n("#EEEEEE"), new n("#B3B3B3"), new n("#D2D2D2"), new n("#FFFFFF")];
                        s.beginPath();
                        p(s, 1, 1, u - 2, f - 2, c);
                        s.closePath();
                        s.clip();
                        o = new ot(a, v);
                        o.fillRect(s, u / 2, f / 2, u, f, h, h);
                        break;
                    case "chrome":
                        a = [0, .09, .12, .16, .25, .29, .33, .38, .48, .52, .63, .68, .8, .83, .87, .97, 1];
                        v = [new n("#FFFFFF"), new n("#FFFFFF"), new n("#888890"), new n("#A4B9BE"), new n("#9EB3B6"), new n("#707070"), new n("#DDE3E3"), new n("#9BB0B3"), new n("#9CB0B1"), new n("#FEFFFF"), new n("#FFFFFF"), new n("#9CB4B4"), new n("#C6D1D3"), new n("#F6F8F7"), new n("#CCD8D8"), new n("#A4BCBE"), new n("#FFFFFF")];
                        s.beginPath();
                        p(s, 1, 1, u - 2, f - 2, c);
                        s.closePath();
                        s.clip();
                        o = new ot(a, v);
                        o.fillRect(s, u / 2, f / 2, u, f, h, h)
                }
                p(s, h, h, u - h * 2, f - h * 2, l);
                s.fillStyle = "rgb(192, 192, 192)";
                s.globalCompositeOperation = "destination-out";
                p(s, h, h, u - h * 2, f - h * 2, l);
                s.fill();
                at.cache[b] = y
            }
            return i.drawImage(at.cache[b], 0, 0), this
        };
        at.cache = {};
        nt = function(i, f, e, o, s, h) {
            var w, c, l, d, g, a = s * .831775 / 2,
                tt, it, rt, p, y, v, ut, b, k = s.toString() + h + f.name;
            if (!nt.cache[k]) {
                if (w = t(s, h), c = w.getContext("2d"), c.beginPath(), c.arc(e, o, a, 0, r, !0), c.closePath(), f.name === "CARBON" || f.name === "PUNCHED_SHEET" || f.name === "BRUSHED_METAL" || f.name === "BRUSHED_STAINLESS") f.name === "CARBON" && (c.fillStyle = c.createPattern(vi, "repeat"), c.fill()), f.name === "PUNCHED_SHEET" && (c.fillStyle = c.createPattern(yi, "repeat"), c.fill()), l = c.createLinearGradient(a, 0, s - a, 0), l.addColorStop(0, "rgba(0, 0, 0, 0.25)"), l.addColorStop(.5, "rgba(0, 0, 0, 0)"), l.addColorStop(1, "rgba(0, 0, 0, 0.25)"), c.fillStyle = l, c.beginPath(), c.arc(e, o, a, 0, r, !0), c.closePath(), c.fill(), (f.name === "BRUSHED_METAL" || f.name === "BRUSHED_STAINLESS") && (tt = f.name === "BRUSHED_METAL" ? !0 : !1, it = parseInt(f.gradientStop.getHexColor().substr(-6), 16), rt = pi(it, 5, .1, tt, .5), c.fillStyle = c.createPattern(rt.fill(0, 0, s, h), "no-repeat"), c.fill());
                else if (f.name === "STAINLESS" || f.name === "TURNED") {
                    if (d = [0, .03, .1, .14, .24, .33, .38, .5, .62, .67, .76, .81, .85, .97, 1], g = [new n("#FDFDFD"), new n("#FDFDFD"), new n("#B2B2B4"), new n("#ACACAE"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#ACACAE"), new n("#B2B2B4"), new n("#FDFDFD"), new n("#FDFDFD")], l = new ot(d, g), l.fillCircle(c, e, o, 0, a), f.name === "TURNED") {
                        for (p = a, y = p * .55, v = u * (500 / p), c.save(), c.beginPath(), c.arc(e, o, p, 0, r), c.closePath(), c.clip(), c.lineWidth = .5, ut = r - v * .3, b = 0; b < ut; b += v) c.strokeStyle = "rgba(240, 240, 255, 0.25)", c.beginPath(), c.arc(e + y, o, y, 0, r), c.stroke(), c.translate(e, o), c.rotate(v * .3), c.translate(-e, -o), c.strokeStyle = "rgba(25, 10, 10, 0.1)", c.beginPath(), c.arc(e + y, o, y, 0, r), c.stroke(), c.translate(e, o), c.rotate(v - v * .3), c.translate(-e, -o);
                        c.restore()
                    }
                } else l = c.createLinearGradient(0, s * .084112, 0, a * 2), l.addColorStop(0, f.gradientStart.getRgbaColor()), l.addColorStop(.4, f.gradientFraction.getRgbaColor()), l.addColorStop(1, f.gradientStop.getRgbaColor()), c.fillStyle = l, c.fill();
                l = c.createRadialGradient(e, o, 0, e, o, a);
                l.addColorStop(0, "rgba(0, 0, 0, 0)");
                l.addColorStop(.7, "rgba(0, 0, 0, 0)");
                l.addColorStop(.71, "rgba(0, 0, 0, 0)");
                l.addColorStop(.86, "rgba(0, 0, 0, 0.03)");
                l.addColorStop(.92, "rgba(0, 0, 0, 0.07)");
                l.addColorStop(.97, "rgba(0, 0, 0, 0.15)");
                l.addColorStop(1, "rgba(0, 0, 0, 0.3)");
                c.fillStyle = l;
                c.beginPath();
                c.arc(e, o, a, 0, r, !0);
                c.closePath();
                c.fill();
                nt.cache[k] = w
            }
            return i.drawImage(nt.cache[k], 0, 0), this
        };
        nt.cache = {};
        ht = function(n, t, i, u, f, e) {
            var o = f * .831775,
                s = e * .831775,
                h = (f - o) / 2,
                c = (e - s) / 2;
            return t !== null && t.height > 0 && t.width > 0 && (n.save(), n.beginPath(), n.arc(i, u, f * .831775 / 2, 0, r, !0), n.clip(), n.drawImage(t, h, c, o, s), n.restore()), this
        };
        vt = function(i, u, f, e, o) {
            var l, tt, c, it, k, h, d, s, et, g, w, a, v, y, rt, ut, ft, nt = f.toString() + e + o + u.name,
                b;
            if (!vt.cache[nt]) {
                if (h = Math.sqrt(f * f + e * e) * .04, h = Math.ceil(Math.min(h, (o ? f : e) * .1)) - 1, b = Math.floor((o ? f : e) * .028571), d = t(f, e), s = d.getContext("2d"), et = u, s.lineWidth = 0, p(s, h, h, f - h * 2, e - h * 2, b), u.name === "CARBON" || u.name === "PUNCHED_SHEET" || u.name === "STAINLESS" || u.name === "BRUSHED_METAL" || u.name === "BRUSHED_STAINLESS" || u.name === "TURNED") {
                    if (u.name === "CARBON" && (s.fillStyle = s.createPattern(vi, "repeat"), s.fill()), u.name === "PUNCHED_SHEET" && (s.fillStyle = s.createPattern(yi, "repeat"), s.fill()), (u.name === "STAINLESS" || u.name === "TURNED") && (it = [0, .03, .1, .14, .24, .33, .38, .5, .62, .67, .76, .81, .85, .97, 1], k = [new n("#FDFDFD"), new n("#FDFDFD"), new n("#B2B2B4"), new n("#ACACAE"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#8E8E8E"), new n("#8E8E8E"), new n("#FDFDFD"), new n("#ACACAE"), new n("#B2B2B4"), new n("#FDFDFD"), new n("#FDFDFD")], c = new ot(it, k), s.clip(), c.fillRect(s, f / 2, e / 2, f - h * 2, e - h * 2, f / 2, e / 2), c = s.createLinearGradient(0, h, 0, e - h * 2), c.addColorStop(0, "rgba(0, 0, 0, 0.25)"), c.addColorStop(.1, "rgba(0, 0, 0, 0.05)"), c.addColorStop(1, "rgba(0, 0, 0, 0)"), s.fillStyle = c, s.fill(), u.name === "TURNED")) {
                        for (g = Math.sqrt((f - h * 2) * (f - h * 2) + (e - h * 2) * (e - h * 2)) / 2, w = g * .55, a = f / 2, v = e / 2, y = r / 360 * (400 / g), s.save(), p(s, h, h, f - h * 2, e - h * 2, b), s.clip(), s.lineWidth = .5, tt = r - y * .3, l = 0; l < tt; l += y) s.strokeStyle = "rgba(240, 240, 255, 0.25)", s.beginPath(), s.arc(a + w, v, w, 0, r), s.stroke(), s.translate(a, v), s.rotate(y * .3), s.translate(-a, -v), s.strokeStyle = "rgba(25, 10, 10, 0.1)", s.beginPath(), s.arc(a + w, v, w, 0, r), s.stroke(), s.translate(a, v), s.rotate(-y * .3), s.translate(-a, -v), s.translate(a, v), s.rotate(y), s.translate(-a, -v);
                        s.restore()
                    }
                    c = s.createLinearGradient(h, h, f - h * 2, e - h * 2);
                    c.addColorStop(0, "rgba(0, 0, 0, 0.25)");
                    c.addColorStop(.5, "rgba(0, 0, 0, 0)");
                    c.addColorStop(1, "rgba(0, 0, 0, 0.25)");
                    s.fillStyle = c;
                    p(s, h, h, f - h * 2, e - h * 2, b);
                    s.fill();
                    (u.name === "BRUSHED_METAL" || u.name === "BRUSHED_STAINLESS") && (rt = u.name === "BRUSHED_METAL" ? !0 : !1, ut = parseInt(u.gradientStop.getHexColor().substr(-6), 16), ft = pi(ut, 5, .1, rt, .5), s.fillStyle = s.createPattern(ft.fill(0, 0, f, e), "no-repeat"), s.fill())
                } else c = s.createLinearGradient(0, h, 0, e - h * 2), c.addColorStop(0, u.gradientStart.getRgbaColor()), c.addColorStop(.4, u.gradientFraction.getRgbaColor()), c.addColorStop(1, u.gradientStop.getRgbaColor()), s.fillStyle = c, s.fill();
                for (k = ["rgba(0, 0, 0, 0.30)", "rgba(0, 0, 0, 0.20)", "rgba(0, 0, 0, 0.13)", "rgba(0, 0, 0, 0.09)", "rgba(0, 0, 0, 0.06)", "rgba(0, 0, 0, 0.04)", "rgba(0, 0, 0, 0.03)"], l = 0; l < 7; l++) s.strokeStyle = k[l], p(s, h + l, h + l, f - h * 2 - 2 * l, e - h * 2 - 2 * l, b), s.stroke();
                vt.cache[nt] = d
            }
            return i.drawImage(vt.cache[nt], 0, 0), this
        };
        vt.cache = {};
        g = function(n, i, r, u, f, e, o, s, h) {
            var b, c, v = Math.ceil(u * .084112),
                y = r * .5 - v / 2,
                p = u * .5 - v / 2,
                d = r * .008,
                l, w, k = i.type + r + u + f + (e !== undefined ? e.type : "-") + (o !== undefined ? o.style : "-") + (h !== undefined ? h.type : "-");
            if (!g.cache[k]) {
                b = t(r, u);
                c = b.getContext("2d");
                f && (c.shadowColor = "rgba(0, 0, 0, 0.8)", c.shadowOffsetX = c.shadowOffsetY = d, c.shadowBlur = d * 2, s === steelseries.GaugeType.TYPE5 ? steelseries.Orientation.WEST === h ? (y = r * .733644 - v / 2, c.drawImage(a(v, e, o), y, p)) : steelseries.Orientation.EAST === h ? (y = r * (1 - .733644) - v / 2, c.drawImage(a(v, e, o), y, p)) : (p = u * .733644 - v / 2, c.drawImage(a(v, e, o), y, u * .6857)) : c.drawImage(a(v, e, o), y, p), c.shadowOffsetX = c.shadowOffsetY = 0, c.shadowBlur = 0);
                switch (i.type) {
                    case "type2":
                        c.beginPath();
                        c.moveTo(r * .135514, u * .696261);
                        c.bezierCurveTo(r * .214953, u * .588785, r * .317757, u * .5, r * .462616, u * .425233);
                        c.bezierCurveTo(r * .612149, u * .345794, r * .733644, u * .317757, r * .873831, u * .322429);
                        c.bezierCurveTo(r * .766355, u * .112149, r * .528037, u * .023364, r * .313084, u * .130841);
                        c.bezierCurveTo(r * .09813, u * .238317, r * .028037, u * .485981, r * .135514, u * .696261);
                        c.closePath();
                        l = c.createLinearGradient(.313084 * r, .135514 * u, .495528 * r, .493582 * u);
                        l.addColorStop(0, "rgba(255, 255, 255, 0.275)");
                        l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                        break;
                    case "type3":
                        c.beginPath();
                        c.moveTo(r * .084112, u * .509345);
                        c.bezierCurveTo(r * .21028, u * .556074, r * .462616, u * .560747, r * .5, u * .560747);
                        c.bezierCurveTo(r * .537383, u * .560747, r * .794392, u * .560747, r * .915887, u * .509345);
                        c.bezierCurveTo(r * .915887, u * .2757, r * .738317, u * .084112, r * .5, u * .084112);
                        c.bezierCurveTo(r * .261682, u * .084112, r * .084112, u * .2757, r * .084112, u * .509345);
                        c.closePath();
                        l = c.createLinearGradient(0, .093457 * u, 0, .556073 * u);
                        l.addColorStop(0, "rgba(255, 255, 255, 0.275)");
                        l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                        break;
                    case "type4":
                        c.beginPath();
                        c.moveTo(r * .67757, u * .24299);
                        c.bezierCurveTo(r * .771028, u * .308411, r * .822429, u * .411214, r * .813084, u * .528037);
                        c.bezierCurveTo(r * .799065, u * .654205, r * .719626, u * .757009, r * .593457, u * .799065);
                        c.bezierCurveTo(r * .485981, u * .831775, r * .369158, u * .808411, r * .285046, u * .728971);
                        c.bezierCurveTo(r * .2757, u * .719626, r * .252336, u * .714953, r * .233644, u * .728971);
                        c.bezierCurveTo(r * .214953, u * .747663, r * .219626, u * .771028, r * .228971, u * .7757);
                        c.bezierCurveTo(r * .331775, u * .878504, r * .476635, u * .915887, r * .616822, u * .869158);
                        c.bezierCurveTo(r * .771028, u * .822429, r * .873831, u * .691588, r * .88785, u * .53271);
                        c.bezierCurveTo(r * .897196, u * .38785, r * .836448, u * .257009, r * .719626, u * .182242);
                        c.bezierCurveTo(r * .705607, u * .172897, r * .682242, u * .163551, r * .663551, u * .186915);
                        c.bezierCurveTo(r * .654205, u * .205607, r * .668224, u * .238317, r * .67757, u * .24299);
                        c.closePath();
                        l = c.createRadialGradient(.5 * r, .5 * u, 0, .5 * r, .5 * u, .38785 * r);
                        l.addColorStop(0, "rgba(255, 255, 255, 0)");
                        l.addColorStop(.82, "rgba(255, 255, 255, 0)");
                        l.addColorStop(.83, "rgba(255, 255, 255, 0)");
                        l.addColorStop(1, "rgba(255, 255, 255, 0.15)");
                        c.beginPath();
                        c.moveTo(r * .261682, u * .224299);
                        c.bezierCurveTo(r * .285046, u * .238317, r * .252336, u * .285046, r * .24299, u * .317757);
                        c.bezierCurveTo(r * .24299, u * .350467, r * .271028, u * .383177, r * .271028, u * .397196);
                        c.bezierCurveTo(r * .2757, u * .415887, r * .261682, u * .457943, r * .238317, u * .509345);
                        c.bezierCurveTo(r * .224299, u * .542056, r * .17757, u * .612149, r * .158878, u * .612149);
                        c.bezierCurveTo(r * .144859, u * .612149, r * .088785, u * .546728, r * .130841, u * .369158);
                        c.bezierCurveTo(r * .140186, u * .336448, r * .214953, u * .200934, r * .261682, u * .224299);
                        c.closePath();
                        w = c.createLinearGradient(.130841 * r, .369158 * u, .273839 * r, .412877 * u);
                        w.addColorStop(0, "rgba(255, 255, 255, 0.275)");
                        w.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                        c.fillStyle = w;
                        c.fill();
                        break;
                    case "type5":
                        c.beginPath();
                        c.moveTo(r * .084112, u * .5);
                        c.bezierCurveTo(r * .084112, u * .271028, r * .271028, u * .084112, r * .5, u * .084112);
                        c.bezierCurveTo(r * .700934, u * .084112, r * .864485, u * .224299, r * .906542, u * .411214);
                        c.bezierCurveTo(r * .911214, u * .439252, r * .911214, u * .518691, r * .845794, u * .537383);
                        c.bezierCurveTo(r * .794392, u * .546728, r * .551401, u * .411214, r * .392523, u * .457943);
                        c.bezierCurveTo(r * .168224, u * .509345, r * .135514, u * .7757, r * .093457, u * .593457);
                        c.bezierCurveTo(r * .088785, u * .560747, r * .084112, u * .53271, r * .084112, u * .5);
                        c.closePath();
                        l = c.createLinearGradient(0, .084112 * u, 0, .644859 * u);
                        l.addColorStop(0, "rgba(255, 255, 255, 0.275)");
                        l.addColorStop(1, "rgba(255, 255, 255, 0.015)");
                        break;
                    case "type1":
                    default:
                        c.beginPath();
                        c.moveTo(r * .084112, u * .509345);
                        c.bezierCurveTo(r * .205607, u * .448598, r * .336448, u * .415887, r * .5, u * .415887);
                        c.bezierCurveTo(r * .672897, u * .415887, r * .789719, u * .443925, r * .915887, u * .509345);
                        c.bezierCurveTo(r * .915887, u * .2757, r * .738317, u * .084112, r * .5, u * .084112);
                        c.bezierCurveTo(r * .261682, u * .084112, r * .084112, u * .2757, r * .084112, u * .509345);
                        c.closePath();
                        l = c.createLinearGradient(0, .088785 * u, 0, .490654 * u);
                        l.addColorStop(0, "rgba(255, 255, 255, 0.275)");
                        l.addColorStop(1, "rgba(255, 255, 255, 0.015)")
                }
                c.fillStyle = l;
                c.fill();
                g.cache[k] = b
            }
            return n.drawImage(g.cache[k], 0, 0), this
        };
        g.cache = {};
        yt = function(n, i, r, u) {
            var c, o, e, s, f, h, l = i.toString() + r + u;
            return yt.cache[l] || (c = t(i, r), o = c.getContext("2d"), s = Math.sqrt(i * i + r * r) * .04, s = Math.min(s, (u ? i : r) * .1), f = s * 1.3, h = f * 1.33, o.beginPath(), o.moveTo(f, r - f), o.lineTo(i - f, r - f), o.bezierCurveTo(i - f, r - f, i - h, r * .7, i - h, r * .5), o.bezierCurveTo(i - h, h, i - f, f, i - s, f), o.lineTo(f, f), o.bezierCurveTo(f, f, h, r * .285714, h, r * .5), o.bezierCurveTo(h, r * .7, f, r - f, s, r - f), o.closePath(), e = o.createLinearGradient(0, r - s, 0, s), e.addColorStop(0, "rgba(255, 255, 255, 0)"), e.addColorStop(.06, "rgba(255, 255, 255, 0)"), e.addColorStop(.07, "rgba(255, 255, 255, 0)"), e.addColorStop(.12, "rgba(255, 255, 255, 0)"), e.addColorStop(.17, "rgba(255, 255, 255, 0.013546)"), e.addColorStop(.1701, "rgba(255, 255, 255, 0)"), e.addColorStop(.79, "rgba(255, 255, 255, 0)"), e.addColorStop(.8, "rgba(255, 255, 255, 0)"), e.addColorStop(.84, "rgba(255, 255, 255, 0.082217)"), e.addColorStop(.93, "rgba(255, 255, 255, 0.288702)"), e.addColorStop(.94, "rgba(255, 255, 255, 0.298039)"), e.addColorStop(.96, "rgba(255, 255, 255, 0.119213)"), e.addColorStop(.97, "rgba(255, 255, 255, 0)"), e.addColorStop(1, "rgba(255, 255, 255, 0)"), o.fillStyle = e, o.fill(), yt.cache[l] = c), n.drawImage(yt.cache[l], 0, 0), this
        };
        yt.cache = {};
        a = function(n, i, u) {
            var h, f, o = n / 2,
                s = n / 2,
                e, c = n.toString() + i.type + u.style;
            if (!a.cache[c]) {
                h = t(n * 1.18889, n * 1.18889);
                f = h.getContext("2d");
                switch (i.type) {
                    case "metalKnob":
                        f.beginPath();
                        f.moveTo(0, n * .5);
                        f.bezierCurveTo(0, n * .222222, n * .222222, 0, n * .5, 0);
                        f.bezierCurveTo(n * .777777, 0, n, n * .222222, n, n * .5);
                        f.bezierCurveTo(n, n * .777777, n * .777777, n, n * .5, n);
                        f.bezierCurveTo(n * .222222, n, 0, n * .777777, 0, n * .5);
                        f.closePath();
                        e = f.createLinearGradient(0, 0, 0, n);
                        e.addColorStop(0, "rgb(92, 95, 101)");
                        e.addColorStop(.47, "rgb(46, 49, 53)");
                        e.addColorStop(1, "rgb(22, 23, 26)");
                        f.fillStyle = e;
                        f.fill();
                        f.beginPath();
                        f.moveTo(n * .055555, n * .5);
                        f.bezierCurveTo(n * .055555, n * .277777, n * .277777, n * .055555, n * .5, n * .055555);
                        f.bezierCurveTo(n * .722222, n * .055555, n * .944444, n * .277777, n * .944444, n * .5);
                        f.bezierCurveTo(n * .944444, n * .722222, n * .722222, n * .944444, n * .5, n * .944444);
                        f.bezierCurveTo(n * .277777, n * .944444, n * .055555, n * .722222, n * .055555, n * .5);
                        f.closePath();
                        e = f.createLinearGradient(0, .055555 * n, 0, .944443 * n);
                        switch (u.style) {
                            case "black":
                                e.addColorStop(0, "rgb(43, 42, 47)");
                                e.addColorStop(1, "rgb(26, 27, 32)");
                                break;
                            case "brass":
                                e.addColorStop(0, "rgb(150, 110, 54)");
                                e.addColorStop(1, "rgb(124, 95, 61)");
                                break;
                            case "silver":
                            default:
                                e.addColorStop(0, "rgb(204, 204, 204)");
                                e.addColorStop(1, "rgb(87, 92, 98)")
                        }
                        f.fillStyle = e;
                        f.fill();
                        f.beginPath();
                        f.moveTo(n * .777777, n * .833333);
                        f.bezierCurveTo(n * .722222, n * .722222, n * .611111, n * .666666, n * .5, n * .666666);
                        f.bezierCurveTo(n * .388888, n * .666666, n * .277777, n * .722222, n * .222222, n * .833333);
                        f.bezierCurveTo(n * .277777, n * .888888, n * .388888, n * .944444, n * .5, n * .944444);
                        f.bezierCurveTo(n * .611111, n * .944444, n * .722222, n * .888888, n * .777777, n * .833333);
                        f.closePath();
                        e = f.createRadialGradient(.555555 * n, .944444 * n, 0, .555555 * n, .944444 * n, .388888 * n);
                        e.addColorStop(0, "rgba(255, 255, 255, 0.6)");
                        e.addColorStop(1, "rgba(255, 255, 255, 0)");
                        f.fillStyle = e;
                        f.fill();
                        f.beginPath();
                        f.moveTo(n * .944444, n * .277777);
                        f.bezierCurveTo(n * .833333, n * .111111, n * .666666, 0, n * .5, 0);
                        f.bezierCurveTo(n * .333333, 0, n * .166666, n * .111111, n * .055555, n * .277777);
                        f.bezierCurveTo(n * .166666, n * .333333, n * .333333, n * .388888, n * .5, n * .388888);
                        f.bezierCurveTo(n * .666666, n * .388888, n * .833333, n * .333333, n * .944444, n * .277777);
                        f.closePath();
                        e = f.createRadialGradient(.5 * n, 0, 0, .5 * n, 0, .583333 * n);
                        e.addColorStop(0, "rgba(255, 255, 255, 0.749019)");
                        e.addColorStop(1, "rgba(255, 255, 255, 0)");
                        f.fillStyle = e;
                        f.fill();
                        f.beginPath();
                        f.moveTo(n * .277777, n * .555555);
                        f.bezierCurveTo(n * .277777, n * .388888, n * .388888, n * .277777, n * .5, n * .277777);
                        f.bezierCurveTo(n * .611111, n * .277777, n * .777777, n * .388888, n * .777777, n * .555555);
                        f.bezierCurveTo(n * .777777, n * .666666, n * .611111, n * .777777, n * .5, n * .777777);
                        f.bezierCurveTo(n * .388888, n * .777777, n * .277777, n * .666666, n * .277777, n * .555555);
                        f.closePath();
                        e = f.createLinearGradient(0, .277777 * n, 0, .722221 * n);
                        e.addColorStop(0, "#000000");
                        e.addColorStop(1, "rgb(204, 204, 204)");
                        f.fillStyle = e;
                        f.fill();
                        f.beginPath();
                        f.moveTo(n * .333333, n * .555555);
                        f.bezierCurveTo(n * .333333, n * .444444, n * .388888, n * .333333, n * .5, n * .333333);
                        f.bezierCurveTo(n * .611111, n * .333333, n * .722222, n * .444444, n * .722222, n * .555555);
                        f.bezierCurveTo(n * .722222, n * .611111, n * .611111, n * .722222, n * .5, n * .722222);
                        f.bezierCurveTo(n * .388888, n * .722222, n * .333333, n * .611111, n * .333333, n * .555555);
                        f.closePath();
                        e = f.createLinearGradient(0, .333333 * n, 0, .666666 * n);
                        e.addColorStop(0, "rgb(10, 9, 1)");
                        e.addColorStop(1, "rgb(42, 41, 37)");
                        f.fillStyle = e;
                        f.fill();
                        break;
                    case "standardKnob":
                        e = f.createLinearGradient(0, 0, 0, n);
                        e.addColorStop(0, "rgb(180, 180, 180)");
                        e.addColorStop(.46, "rgb(63, 63, 63)");
                        e.addColorStop(1, "rgb(40, 40, 40)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createLinearGradient(0, n - n * .77, 0, n - n * .77 + n * .77);
                        switch (u.style) {
                            case "black":
                                e.addColorStop(0, "rgb(191, 191, 191)");
                                e.addColorStop(.5, "rgb(45, 44, 49)");
                                e.addColorStop(1, "rgb(125, 126, 128)");
                                break;
                            case "brass":
                                e.addColorStop(0, "rgb(223, 208, 174)");
                                e.addColorStop(.5, "rgb(123, 95, 63)");
                                e.addColorStop(1, "rgb(207, 190, 157)");
                                break;
                            case "silver":
                            default:
                                e.addColorStop(0, "rgb(215, 215, 215)");
                                e.addColorStop(.5, "rgb(116, 116, 116)");
                                e.addColorStop(1, "rgb(215, 215, 215)")
                        }
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .77 / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createRadialGradient(o, s, 0, o, s, n * .77 / 2);
                        e.addColorStop(0, "rgba(0, 0, 0, 0)");
                        e.addColorStop(.75, "rgba(0, 0, 0, 0)");
                        e.addColorStop(.76, "rgba(0, 0, 0, 0.01)");
                        e.addColorStop(1, "rgba(0, 0, 0, 0.2)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .77 / 2, 0, r, !0);
                        f.closePath();
                        f.fill()
                }
                a.cache[c] = h
            }
            return a.cache[c]
        };
        a.cache = {};
        h = function(n, i, u) {
            var l, f, o = n / 2,
                s = n / 2,
                e, a = n.toString() + i + u.outerColor_ON;
            if (!h.cache[a]) {
                l = t(n, n);
                f = l.getContext("2d");
                switch (i) {
                    case 0:
                        e = f.createRadialGradient(o, s, 0, o, s, n * .5 / 2);
                        e.addColorStop(0, u.innerColor1_OFF);
                        e.addColorStop(.2, u.innerColor2_OFF);
                        e.addColorStop(1, u.outerColor_OFF);
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .5 / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createRadialGradient(o, s, 0, o, s, n * .5 / 2);
                        e.addColorStop(0, "rgba(0, 0, 0, 0)");
                        e.addColorStop(.8, "rgba(0, 0, 0, 0)");
                        e.addColorStop(1, "rgba(0, 0, 0, 0.4)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .5 / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createLinearGradient(0, .35 * n, 0, .35 * n + .15 * n);
                        e.addColorStop(0, "rgba(255, 255, 255, 0.4)");
                        e.addColorStop(1, "rgba(255, 255, 255, 0)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, .35 * n + .2 * n / 2, n * .2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        break;
                    case 1:
                        e = f.createRadialGradient(o, s, 0, o, s, n * .5 / 2);
                        e.addColorStop(0, u.innerColor1_ON);
                        e.addColorStop(.2, u.innerColor2_ON);
                        e.addColorStop(1, u.outerColor_ON);
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .5 / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createRadialGradient(o, s, 0, o, s, n * .5 / 2);
                        e.addColorStop(0, "rgba(0, 0, 0, 0)");
                        e.addColorStop(.8, "rgba(0, 0, 0, 0)");
                        e.addColorStop(1, "rgba(0, 0, 0, 0.4)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n * .5 / 2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createLinearGradient(0, .35 * n, 0, .35 * n + .15 * n);
                        e.addColorStop(0, "rgba(255, 255, 255, 0.4)");
                        e.addColorStop(1, "rgba(255, 255, 255, 0)");
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, .35 * n + .2 * n / 2, n * .2, 0, r, !0);
                        f.closePath();
                        f.fill();
                        e = f.createRadialGradient(o, s, 0, o, s, n / 2);
                        e.addColorStop(0, c(u.coronaColor, 0));
                        e.addColorStop(.6, c(u.coronaColor, .4));
                        e.addColorStop(.7, c(u.coronaColor, .25));
                        e.addColorStop(.8, c(u.coronaColor, .15));
                        e.addColorStop(.85, c(u.coronaColor, .05));
                        e.addColorStop(1, c(u.coronaColor, 0));
                        f.fillStyle = e;
                        f.beginPath();
                        f.arc(o, s, n / 2, 0, r, !0);
                        f.closePath();
                        f.fill()
                }
                h.cache[a] = l
            }
            return h.cache[a]
        };
        h.cache = {};
        tt = function(n, i, r) {
            var e, f, o = 0,
                v = n,
                c = i,
                l = Math.min(n, i) * .095,
                u, s = 1,
                y = n - 2,
                a = i - 2,
                w = l - 1,
                h = n.toString() + i + JSON.stringify(r);
            return tt.cache[h] || (e = t(n, i), f = e.getContext("2d"), u = f.createLinearGradient(0, o, 0, o + c), u.addColorStop(0, "#4c4c4c"), u.addColorStop(.08, "#666666"), u.addColorStop(.92, "#666666"), u.addColorStop(1, "#e6e6e6"), f.fillStyle = u, p(f, 0, o, v, c, l), f.fill(), u = f.createLinearGradient(0, s, 0, s + a), u.addColorStop(0, r.gradientStartColor), u.addColorStop(.03, r.gradientFraction1Color), u.addColorStop(.49, r.gradientFraction2Color), u.addColorStop(.5, r.gradientFraction3Color), u.addColorStop(1, r.gradientStopColor), f.fillStyle = u, p(f, 1, s, y, a, w), f.fill(), tt.cache[h] = e), tt.cache[h]
        };
        tt.cache = {};
        b = function(n, t, i, r) {
            var f, u, e = n.toString() + t + i + r;
            return b.cache[e] || (f = o.createElement("canvas"), u = f.getContext("2d"), f.width = n, f.height = n, u.fillStyle = t, i ? (u.beginPath(), u.moveTo(n * .5, n), u.lineTo(0, 0), u.lineTo(n, 0), u.closePath(), u.fill()) : r ? (u.beginPath(), u.moveTo(n, n * .5), u.lineTo(0, 0), u.lineTo(0, n), u.closePath(), u.fill()) : (u.beginPath(), u.moveTo(n * .5, 0), u.lineTo(n, n), u.lineTo(0, n), u.closePath(), u.fill()), b.cache[e] = f), b.cache[e]
        };
        b.cache = {};
        ut = function(n, i, u) {
            var e = n * 2,
                s, f, o, h = i.state + n + JSON.stringify(u),
                l = function() {
                    var t = u[0];
                    i.state === "up" ? (o = f.createRadialGradient(.5 * n, .2 * e, 0, .5 * n, .2 * e, .5 * n), o.addColorStop(0, t.innerColor1_ON), o.addColorStop(.2, t.innerColor2_ON), o.addColorStop(1, t.outerColor_ON)) : (o = f.createLinearGradient(0, 0, 0, .5 * e), o.addColorStop(0, "#323232"), o.addColorStop(1, "#5c5c5c"));
                    f.fillStyle = o;
                    f.beginPath();
                    f.moveTo(.5 * n, 0);
                    f.lineTo(n, .2 * e);
                    f.lineTo(.752 * n, .2 * e);
                    f.lineTo(.752 * n, .37 * e);
                    f.lineTo(.252 * n, .37 * e);
                    f.lineTo(.252 * n, .2 * e);
                    f.lineTo(0, .2 * e);
                    f.closePath();
                    f.fill();
                    i.state !== "up" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(0, .2 * e), f.lineTo(.5 * n, 0), f.lineTo(n, .2 * e), f.moveTo(.252 * n, .2 * e), f.lineTo(.252 * n, .37 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(.252 * n, .37 * e), f.lineTo(.752 * n, .37 * e), f.lineTo(.752 * n, .2 * e), f.lineTo(n, .2 * e), f.stroke()) : (o = f.createRadialGradient(.5 * n, .2 * e, 0, .5 * n, .2 * e, .7 * n), o.addColorStop(0, c(t.coronaColor, 0)), o.addColorStop(.5, c(t.coronaColor, .3)), o.addColorStop(.7, c(t.coronaColor, .2)), o.addColorStop(.8, c(t.coronaColor, .1)), o.addColorStop(.85, c(t.coronaColor, .05)), o.addColorStop(1, c(t.coronaColor, 0)), f.fillStyle = o, f.beginPath(), f.arc(.5 * n, .2 * e, .7 * n, 0, r, !0), f.closePath(), f.fill())
                },
                a = function() {
                    var t = u[1];
                    f.beginPath();
                    i.state === "steady" ? (o = t.outerColor_ON, f.fillStyle = o, f.rect(.128 * n, .41 * e, .744 * n, .074 * e), f.rect(.128 * n, .516 * e, .744 * n, .074 * e), f.closePath(), f.fill()) : (o = f.createLinearGradient(0, .41 * e, 0, .41 * e + .074 * e), o.addColorStop(0, "#323232"), o.addColorStop(1, "#5c5c5c"), f.fillStyle = o, f.rect(.128 * n, .41 * e, .744 * n, .074 * e), f.closePath(), f.fill(), o = f.createLinearGradient(0, .516 * e, 0, .516 * e + .074 * e), o.addColorStop(0, "#323232"), o.addColorStop(1, "#5c5c5c"), f.fillStyle = o, f.rect(.128 * n, .516 * e, .744 * n, .074 * e), f.closePath(), f.fill());
                    i.state !== "steady" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(.128 * n, .41 * e + .074 * e), f.lineTo(.128 * n, .41 * e), f.lineTo(.128 * n + .744 * n, .41 * e), f.stroke(), f.beginPath(), f.moveTo(.128 * n, .516 * e + .074 * e), f.lineTo(.128 * n, .516 * e), f.lineTo(.128 * n + .744 * n, .516 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(.128 * n + .744 * n, .41 * e), f.lineTo(.128 * n + .744 * n, .41 * e + .074 * e), f.lineTo(.128 * n, .41 * e + .074 * e), f.stroke(), f.beginPath(), f.moveTo(.128 * n + .744 * n, .516 * e), f.lineTo(.128 * n + .744 * n, .516 * e + .074 * e), f.lineTo(.128 * n, .516 * e + .074 * e), f.stroke()) : (o = f.createRadialGradient(.5 * n, .5 * e, 0, .5 * n, .5 * e, .7 * n), o.addColorStop(0, c(t.coronaColor, 0)), o.addColorStop(.5, c(t.coronaColor, .3)), o.addColorStop(.7, c(t.coronaColor, .2)), o.addColorStop(.8, c(t.coronaColor, .1)), o.addColorStop(.85, c(t.coronaColor, .05)), o.addColorStop(1, c(t.coronaColor, 0)), f.fillStyle = o, f.beginPath(), f.arc(.5 * n, .5 * e, .7 * n, 0, r, !0), f.closePath(), f.fill())
                },
                v = function() {
                    var t = u[2];
                    i.state === "down" ? (o = f.createRadialGradient(.5 * n, .8 * e, 0, .5 * n, .8 * e, .5 * n), o.addColorStop(0, t.innerColor1_ON), o.addColorStop(.2, t.innerColor2_ON), o.addColorStop(1, t.outerColor_ON)) : (o = f.createLinearGradient(0, .63 * e, 0, e), o.addColorStop(0, "#323232"), o.addColorStop(1, "#5c5c5c"));
                    f.beginPath();
                    f.fillStyle = o;
                    f.moveTo(.5 * n, e);
                    f.lineTo(n, .8 * e);
                    f.lineTo(.725 * n, .8 * e);
                    f.lineTo(.725 * n, .63 * e);
                    f.lineTo(.252 * n, .63 * e);
                    f.lineTo(.252 * n, .8 * e);
                    f.lineTo(0, .8 * e);
                    f.closePath();
                    f.fill();
                    i.state !== "down" ? (f.strokeStyle = "rgba(0, 0, 0, 0.4)", f.beginPath(), f.moveTo(0, .8 * e), f.lineTo(.252 * n, .8 * e), f.moveTo(.252 * n, .63 * e), f.lineTo(.752 * n, .63 * e), f.stroke(), f.beginPath(), f.moveTo(.752 * n, .8 * e), f.lineTo(n, .8 * e), f.stroke(), f.strokeStyle = "rgba(255, 255, 255, 0.3)", f.beginPath(), f.moveTo(0, .8 * e), f.lineTo(.5 * n, e), f.lineTo(n, .8 * e), f.stroke(), f.beginPath(), f.moveTo(.752 * n, .8 * e), f.lineTo(.752 * n, .63 * e), f.stroke()) : (o = f.createRadialGradient(.5 * n, .8 * e, 0, .5 * n, .8 * e, .7 * n), o.addColorStop(0, c(t.coronaColor, 0)), o.addColorStop(.5, c(t.coronaColor, .3)), o.addColorStop(.7, c(t.coronaColor, .2)), o.addColorStop(.8, c(t.coronaColor, .1)), o.addColorStop(.85, c(t.coronaColor, .05)), o.addColorStop(1, c(t.coronaColor, 0)), f.fillStyle = o, f.beginPath(), f.arc(.5 * n, .8 * e, .7 * n, 0, r, !0), f.closePath(), f.fill())
                };
            if (!ut.cache[h]) {
                s = t(n * 2, n * 4);
                f = s.getContext("2d");
                f.translate(n * .5, n * .5);
                switch (i.state) {
                    case "up":
                        v();
                        a();
                        l();
                        break;
                    case "steady":
                        v();
                        l();
                        a();
                        break;
                    case "down":
                    default:
                        l();
                        a();
                        v()
                }
                ut.cache[h] = s
            }
            return ut.cache[h]
        };
        ut.cache = {};
        var pt = function(n, t, i, r, u, f, o, s, h, c) {
                c = undefined === c ? c = steelseries.GaugeType.TYPE1 : c;
                n.save();
                n.textAlign = s ? "center" : "left";
                n.textBaseline = "middle";
                n.strokeStyle = f.labelColor.getRgbaColor();
                n.fillStyle = f.labelColor.getRgbaColor();
                s ? (n.font = .046728 * t + "px " + e, n.fillText(r, t / 2, i * .3, t * .3), n.fillText(u, t / 2, i * .38, t * .3)) : o ? (n.font = .1 * t + "px " + e, n.save(), n.translate(.671428 * t, .1375 * i), n.rotate(1.570796), n.fillText(r, 0, 0), n.translate(-.671428 * t, -.1375 * i), n.restore(), n.font = .071428 * t + "px " + e, h ? c.type === "type2" ? (n.textAlign = "right", n.fillText(u, .36 * t, i * .79, t * .25)) : n.fillText(u, .63 * t, i * .85, t * .2) : (n.textAlign = "center", c.type === "type2" ? n.fillText(u, t / 2, i * .92, t * .2) : n.fillText(u, t / 2, i * .89, t * .2))) : (n.font = .035 * t + "px " + e, n.fillText(r, t * .15, i * .25, t * .3), n.font = .025 * t + "px " + e, n.fillText(u, t * .0625, i * .7, t * .07));
                n.restore()
            },
            vi = si(12, 12, function(n) {
                var u = n.canvas.width,
                    t = n.canvas.height,
                    f = 0,
                    r = 0,
                    i;
                n.save();
                n.save();
                n.beginPath();
                n.rect(0, 0, u * .5, t * .5);
                n.closePath();
                n.restore();
                i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t);
                i.addColorStop(0, "rgb(35, 35, 35)");
                i.addColorStop(1, "rgb(23, 23, 23)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .083333, 0, u * .333333, t * .416666);
                n.closePath();
                n.restore();
                f = .083333;
                r = 0;
                i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t);
                i.addColorStop(0, "rgb(38, 38, 38)");
                i.addColorStop(1, "rgb(30, 30, 30)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .5, t * .5, u * .5, t * .5);
                n.closePath();
                n.restore();
                f = .5;
                r = .5;
                i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t);
                i.addColorStop(0, "rgb(35, 35, 35)");
                i.addColorStop(1, "rgb(23, 23, 23)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .583333, t * .5, u * .333333, t * .416666);
                n.closePath();
                n.restore();
                f = .583333;
                r = .5;
                i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t);
                i.addColorStop(0, "rgb(38, 38, 38)");
                i.addColorStop(1, "rgb(30, 30, 30)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .5, 0, u * .5, t * .5);
                n.closePath();
                n.restore();
                f = .5;
                r = 0;
                i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t);
                i.addColorStop(0, "#303030");
                i.addColorStop(1, "rgb(40, 40, 40)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .583333, t * .083333, u * .333333, t * .416666);
                n.closePath();
                n.restore();
                f = .583333;
                r = .083333;
                i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t);
                i.addColorStop(0, "rgb(53, 53, 53)");
                i.addColorStop(1, "rgb(45, 45, 45)");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(0, t * .5, u * .5, t * .5);
                n.closePath();
                n.restore();
                f = 0;
                r = .5;
                i = n.createLinearGradient(0, r * t, 0, .5 * t + r * t);
                i.addColorStop(0, "#303030");
                i.addColorStop(1, "#282828");
                n.fillStyle = i;
                n.fill();
                n.save();
                n.beginPath();
                n.rect(u * .083333, t * .583333, u * .333333, t * .416666);
                n.closePath();
                n.restore();
                f = .083333;
                r = .583333;
                i = n.createLinearGradient(0, r * t, 0, .416666 * t + r * t);
                i.addColorStop(0, "#353535");
                i.addColorStop(1, "#2d2d2d");
                n.fillStyle = i;
                n.fill();
                n.restore()
            }),
            yi = si(15, 15, function(n) {
                var i = n.canvas.width,
                    t = n.canvas.height,
                    r;
                n.save();
                n.save();
                n.beginPath();
                n.rect(0, 0, i, t);
                n.closePath();
                n.restore();
                n.fillStyle = "#1D2123";
                n.fill();
                n.save();
                n.beginPath();
                n.moveTo(0, t * .266666);
                n.bezierCurveTo(0, t * .4, i * .066666, t * .466666, i * .2, t * .466666);
                n.bezierCurveTo(i * .333333, t * .466666, i * .4, t * .4, i * .4, t * .266666);
                n.bezierCurveTo(i * .4, t * .133333, i * .333333, t * .066666, i * .2, t * .066666);
                n.bezierCurveTo(i * .066666, t * .066666, 0, t * .133333, 0, t * .266666);
                n.closePath();
                r = n.createLinearGradient(0, .066666 * t, 0, .466666 * t);
                r.addColorStop(0, "#000000");
                r.addColorStop(1, "#444444");
                n.fillStyle = r;
                n.fill();
                n.save();
                n.beginPath();
                n.moveTo(0, t * .2);
                n.bezierCurveTo(0, t * .333333, i * .066666, t * .4, i * .2, t * .4);
                n.bezierCurveTo(i * .333333, t * .4, i * .4, t * .333333, i * .4, t * .2);
                n.bezierCurveTo(i * .4, t * .066666, i * .333333, 0, i * .2, 0);
                n.bezierCurveTo(i * .066666, 0, 0, t * .066666, 0, t * .2);
                n.closePath();
                n.fillStyle = "#050506";
                n.fill();
                n.save();
                n.beginPath();
                n.moveTo(i * .466666, t * .733333);
                n.bezierCurveTo(i * .466666, t * .866666, i * .533333, t * .933333, i * .666666, t * .933333);
                n.bezierCurveTo(i * .8, t * .933333, i * .866666, t * .866666, i * .866666, t * .733333);
                n.bezierCurveTo(i * .866666, t * .6, i * .8, t * .533333, i * .666666, t * .533333);
                n.bezierCurveTo(i * .533333, t * .533333, i * .466666, t * .6, i * .466666, t * .733333);
                n.closePath();
                r = n.createLinearGradient(0, .533333 * t, 0, .933333 * t);
                r.addColorStop(0, "#000000");
                r.addColorStop(1, "#444444");
                n.fillStyle = r;
                n.fill();
                n.save();
                n.beginPath();
                n.moveTo(i * .466666, t * .666666);
                n.bezierCurveTo(i * .466666, t * .8, i * .533333, t * .866666, i * .666666, t * .866666);
                n.bezierCurveTo(i * .8, t * .866666, i * .866666, t * .8, i * .866666, t * .666666);
                n.bezierCurveTo(i * .866666, t * .533333, i * .8, t * .466666, i * .666666, t * .466666);
                n.bezierCurveTo(i * .533333, t * .466666, i * .466666, t * .533333, i * .466666, t * .666666);
                n.closePath();
                n.fillStyle = "#050506";
                n.fill();
                n.restore()
            }),
            pi = function(n, i, r, u, e) {
                function o(n, t) {
                    return n += (2 * Math.random() - 1) * t | 0, n < 0 ? 0 : n > 255 ? 255 : n
                }

                function s(n) {
                    return n < 0 ? 0 : n > 255 ? 255 : n
                }

                function h(n, t, i, r, u, f) {
                    var o, v, e, a, s, h, c, l;
                    for (u >= i && (u = i - 1), a = 1 / (u * 2 + 1), s = 0, v = 0; v < r; v++) {
                        for (h = c = l = 0, o = 0; o < u; o++) e = (s + o) * 4, h += n.data[e], c += n.data[e + 1], l += n.data[e + 2];
                        for (o = 0; o < i; o++) o > u && (e = (s - u - 1) * 4, h -= n.data[e], c -= n.data[e + 1], l -= n.data[e + 2]), o + u < i && (e = (s + u) * 4, h += n.data[e], c += n.data[e + 1], l += n.data[e + 2]), e = s * 4, t.data[e] = h * a | 0, t.data[e + 1] = c * a | 0, t.data[e + 2] = l * a | 0, t.data[e + 3] = f, s++
                    }
                }
                return this.fill = function(c, l, a, v) {
                    var k, d, nt, ot, p, b, st, g, y, ht, ct = 255,
                        lt = n >> 16 & 255,
                        at = n >> 8 & 255,
                        vt = n & 255,
                        tt = 0,
                        it = 255 * r,
                        yt, pt, wt, w, rt, ut, ft, et;
                    if (c = Math.floor(c), l = Math.floor(l), a = Math.ceil(a), v = Math.ceil(v), p = a - c, b = v - l, st = t(p, b), g = st.getContext("2d"), y = g.createImageData(p, b), ht = g.createImageData(p, b), e !== 0)
                        for (ot = [], k = 0; k < p; k++) ot[k] = 255 * e * Math.sin(k / p * f) | 0;
                    for (nt = 0; nt < b; nt++)
                        for (i !== 0 && (yt = pt = wt = 0), d = 0; d < p; d++) w = nt * p * 4 + d * 4, rt = lt, ut = at, ft = vt, e !== 0 && (et = ot[d], rt += et, ut += et, ft += et), u ? (tt = (2 * Math.random() - 1) * it | 0, y.data[w] = s(rt + tt), y.data[w + 1] = s(ut + tt), y.data[w + 2] = s(ft + tt), y.data[w + 3] = ct) : (y.data[w] = o(rt, it), y.data[w + 1] = o(ut, it), y.data[w + 2] = o(ft, it), y.data[w + 3] = ct);
                    return i > 0 ? (h(y, ht, p, b, i, ct), g.putImageData(ht, c, l)) : g.putImageData(y, c, l), st
                }, this
            },
            n = function(n, t, i, r) {
                function s() {
                    u = rt(n, 255);
                    f = rt(t, 255);
                    e = rt(i, 255);
                    o = rt(r, 1)
                }
                var u, f, e, o;
                arguments.length === 1 ? (i = parseInt(n.substr(5, 2), 16), t = parseInt(n.substr(3, 2), 16), n = parseInt(n.substr(1, 2), 16), r = 1) : arguments.length === 3 && (r = 1);
                s();
                this.getRed = function() {
                    return u
                };
                this.setRed = function(n) {
                    u = rt(n, 255)
                };
                this.getGreen = function() {
                    return f
                };
                this.setGreen = function(n) {
                    f = rt(n, 255)
                };
                this.getBlue = function() {
                    return e
                };
                this.setBlue = function(n) {
                    e = rt(n, 255)
                };
                this.getAlpha = function() {
                    return o
                };
                this.setAlpha = function(n) {
                    o = rt(n, 1)
                };
                this.getRgbaColor = function() {
                    return "rgba(" + u + ", " + f + ", " + e + ", " + o + ")"
                };
                this.getRgbColor = function() {
                    return "rgb(" + u + ", " + f + ", " + e + ")"
                };
                this.getHexColor = function() {
                    return "#" + u.toString(16) + f.toString(16) + e.toString(16)
                }
            },
            ot = function(n, i) {
                for (var e = n.length - 1, u = 0; u <= e; u++) n[u] = r * n[u] - f;
                this.fillCircle = function(r, f, o, s, h) {
                    var w, l = Math.ceil(h),
                        c = l * 2,
                        a, tt, v, y, b, k, it, g, p, d, nt, rt;
                    for (a = r.createImageData(c, c), tt = 255, y = 0; y < c; y++)
                        for (k = l - y, it = k * k, v = 0; v < c; v++)
                            if (b = v - l, g = Math.sqrt(b * b + it), g <= l && g >= s) {
                                for (w = Math.atan2(b, k), u = 0; u < e; u++) w >= n[u] && w < n[u + 1] && (d = ui(i[u], i[u + 1], n[u + 1] - n[u], w - n[u], !0));
                                p = (c - y) * c * 4 + v * 4;
                                a.data[p] = d[0];
                                a.data[p + 1] = d[1];
                                a.data[p + 2] = d[2];
                                a.data[p + 3] = tt
                            }
                    nt = t(c, c);
                    rt = nt.getContext("2d");
                    rt.putImageData(a, 0, 0);
                    r.drawImage(nt, f - l, o - l)
                };
                this.fillRect = function(r, f, o, s, h, c, l) {
                    var w, k, d, y, nt, a, v, tt, it, p, b, g, rt;
                    for (s = Math.ceil(s), h = Math.ceil(h), k = s / 2, d = h / 2, c = Math.ceil(c), l = Math.ceil(l), y = r.createImageData(s, h), nt = 255, v = 0; v < h; v++)
                        for (it = d - v, a = 0; a < s; a++) {
                            for (v > l && v <= h - l && a > c && a < s - c && (a = s - c), tt = a - k, w = Math.atan2(tt, it), u = 0; u < e; u++) w >= n[u] && w < n[u + 1] && (b = ui(i[u], i[u + 1], n[u + 1] - n[u], w - n[u], !0));
                            p = (h - v) * s * 4 + a * 4;
                            y.data[p] = b[0];
                            y.data[p + 1] = b[0];
                            y.data[p + 2] = b[0];
                            y.data[p + 3] = nt
                        }
                    g = t(s, h);
                    rt = g.getContext("2d");
                    rt.putImageData(y, 0, 0);
                    r.drawImage(g, f - k, o - d)
                }
            },
            ri = function(n, t, i, r) {
                this.getColorAt = function(n) {
                    var u = 0,
                        e = 0,
                        f = 1,
                        o = 1,
                        t, s;
                    for (n = n < 0 ? 0 : n > 1 ? 1 : n, t = 0; t < i.length; t++) {
                        if (i[t] < n && u < i[t] && (u = i[t], e = t), i[t] === n) return r[t];
                        i[t] > n && f >= i[t] && (f = i[t], o = t)
                    }
                    return s = (n - u) / (f - u), ui(r[e], r[o], 1, s)
                };
                this.getStart = function() {
                    return n
                };
                this.getEnd = function() {
                    return t
                }
            };
        Math.log10 = function(n) {
            return Math.log(n) / Math.LN10
        };
        s = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(n) {
                    window.setTimeout(n, 1e3 / 16)
                }
            }(),
            function() {
                y = function(n, t, i, r, u, f) {
                    this.gradientStart = n;
                    this.gradientFraction = t;
                    this.gradientStop = i;
                    this.labelColor = r;
                    this.symbolColor = u;
                    this.name = f
                }
            }(),
            function() {
                l = function(n, t, i, r, u, f) {
                    this.gradientStartColor = n;
                    this.gradientFraction1Color = t;
                    this.gradientFraction2Color = i;
                    this.gradientFraction3Color = r;
                    this.gradientStopColor = u;
                    this.textColor = f
                }
            }(),
            function() {
                it = function(n, t, i, r, u, f) {
                    this.veryDark = n;
                    this.dark = t;
                    this.medium = i;
                    this.light = r;
                    this.lighter = u;
                    this.veryLight = f
                }
            }(),
            function() {
                lt = function(n, t, i, r, u, f, e) {
                    this.innerColor1_ON = n;
                    this.innerColor2_ON = t;
                    this.outerColor_ON = i;
                    this.coronaColor = r;
                    this.innerColor1_OFF = u;
                    this.innerColor2_OFF = f;
                    this.outerColor_OFF = e
                }
            }(),
            function() {
                kt = function(n) {
                    this.type = n
                }
            }(),
            function() {
                ni = function(n) {
                    this.type = n
                }
            }(),
            function() {
                li = function(n) {
                    this.type = n
                }
            }(),
            function() {
                fi = function(n) {
                    this.style = n
                }
            }(),
            function() {
                ft = function(n) {
                    this.design = n
                }
            }(),
            function() {
                k = function(n) {
                    this.type = n
                }
            }(),
            function() {
                dt = function(n) {
                    this.type = n
                }
            }(),
            function() {
                ei = function(n) {
                    this.format = n
                }
            }(),
            function() {
                oi = function(n) {
                    this.type = n
                }
            }(),
            function() {
                ti = function(n) {
                    this.state = n
                }
            }();
        var nu = {
                DARK_GRAY: new y(new n(0, 0, 0, 1), new n(51, 51, 51, 1), new n(153, 153, 153, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "DARK_GRAY"),
                SATIN_GRAY: new y(new n(45, 57, 57, 1), new n(45, 57, 57, 1), new n(45, 57, 57, 1), new n(167, 184, 180, 1), new n(137, 154, 150, 1), "SATIN_GRAY"),
                LIGHT_GRAY: new y(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "LIGHT_GRAY"),
                WHITE: new y(new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "WHITE"),
                BLACK: new y(new n(0, 0, 0, 1), new n(0, 0, 0, 1), new n(0, 0, 0, 1), new n(255, 255, 255, 1), new n(150, 150, 150, 1), "BLACK"),
                BEIGE: new y(new n(178, 172, 150, 1), new n(204, 205, 184, 1), new n(231, 231, 214, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BEIGE"),
                BROWN: new y(new n(245, 225, 193, 1), new n(245, 225, 193, 1), new n(255, 250, 240, 1), new n(109, 73, 47, 1), new n(89, 53, 27, 1), "BROWN"),
                RED: new y(new n(198, 93, 95, 1), new n(212, 132, 134, 1), new n(242, 218, 218, 1), new n(0, 0, 0, 1), new n(90, 0, 0, 1), "RED"),
                GREEN: new y(new n(65, 120, 40, 1), new n(129, 171, 95, 1), new n(218, 237, 202, 1), new n(0, 0, 0, 1), new n(0, 90, 0, 1), "GREEN"),
                BLUE: new y(new n(45, 83, 122, 1), new n(115, 144, 170, 1), new n(227, 234, 238, 1), new n(0, 0, 0, 1), new n(0, 0, 90, 1), "BLUE"),
                ANTHRACITE: new y(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(250, 250, 250, 1), new n(180, 180, 180, 1), "ANTHRACITE"),
                MUD: new y(new n(80, 86, 82, 1), new n(70, 76, 72, 1), new n(57, 62, 58, 1), new n(255, 255, 240, 1), new n(225, 225, 210, 1), "MUD"),
                PUNCHED_SHEET: new y(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "PUNCHED_SHEET"),
                CARBON: new y(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(255, 255, 255, 1), new n(180, 180, 180, 1), "CARBON"),
                STAINLESS: new y(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "STAINLESS"),
                BRUSHED_METAL: new y(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(69, 69, 74, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BRUSHED_METAL"),
                BRUSHED_STAINLESS: new y(new n(50, 50, 54, 1), new n(47, 47, 51, 1), new n(110, 110, 112, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "BRUSHED_STAINLESS"),
                TURNED: new y(new n(130, 130, 130, 1), new n(181, 181, 181, 1), new n(253, 253, 253, 1), new n(0, 0, 0, 1), new n(80, 80, 80, 1), "TURNED")
            },
            tu = {
                BEIGE: new l("#c8c8b1", "rgb(241, 237, 207)", "rgb(234, 230, 194)", "rgb(225, 220, 183)", "rgb(237, 232, 191)", "#000000"),
                BLUE: new l("#ffffff", "rgb(231, 246, 255)", "rgb(170, 224, 255)", "rgb(136, 212, 255)", "rgb(192, 232, 255)", "#124564"),
                ORANGE: new l("#ffffff", "rgb(255, 245, 225)", "rgb(255, 217, 147)", "rgb(255, 201, 104)", "rgb(255, 227, 173)", "#503700"),
                RED: new l("#ffffff", "rgb(255, 225, 225)", "rgb(253, 152, 152)", "rgb(252, 114, 115)", "rgb(254, 178, 178)", "#4f0c0e"),
                YELLOW: new l("#ffffff", "rgb(245, 255, 186)", "rgb(210, 255, 0)", "rgb(158, 205, 0)", "rgb(210, 255, 0)", "#405300"),
                WHITE: new l("#ffffff", "#ffffff", "rgb(241, 246, 242)", "rgb(229, 239, 244)", "#ffffff", "#000000"),
                GRAY: new l("#414141", "rgb(117, 117, 117)", "rgb(87, 87, 87)", "#414141", "rgb(81, 81, 81)", "#ffffff"),
                BLACK: new l("#414141", "#666666", "#333333", "#000000", "#333333", "#cccccc"),
                GREEN: new l("rgb(33, 67, 67)", "rgb(33, 67, 67)", "rgb(29, 58, 58)", "rgb(28, 57, 57)", "rgb(23, 46, 46)", "rgba(0, 185, 165, 255)"),
                BLUE2: new l("rgb(0, 68, 103)", "rgb(8, 109, 165)", "rgb(0, 72, 117)", "rgb(0, 72, 117)", "rgb(0, 68, 103)", "rgb(111, 182, 228)"),
                BLUE_BLACK: new l("rgb(22, 125, 212)", "rgb(3, 162, 254)", "rgb(3, 162, 254)", "rgb(3, 162, 254)", "rgb(11, 172, 244)", "#000000"),
                BLUE_DARKBLUE: new l("rgb(18, 33, 88)", "rgb(18, 33, 88)", "rgb(19, 30, 90)", "rgb(17, 31, 94)", "rgb(21, 25, 90)", "rgb(23, 99, 221)"),
                BLUE_GRAY: new l("rgb(135, 174, 255)", "rgb(101, 159, 255)", "rgb(44, 93, 255)", "rgb(27, 65, 254)", "rgb(12, 50, 255)", "#b2b4ed"),
                STANDARD: new l("rgb(131, 133, 119)", "rgb(176, 183, 167)", "rgb(165, 174, 153)", "rgb(166, 175, 156)", "rgb(175, 184, 165)", "rgb(35, 42, 52)"),
                STANDARD_GREEN: new l("#ffffff", "rgb(219, 230, 220)", "rgb(179, 194, 178)", "rgb(153, 176, 151)", "rgb(114, 138, 109)", "#080C06"),
                BLUE_BLUE: new l("rgb(100, 168, 253)", "rgb(100, 168, 253)", "rgb(95, 160, 250)", "rgb(80, 144, 252)", "rgb(74, 134, 255)", "#002cbb"),
                RED_DARKRED: new l("rgb(72, 36, 50)", "rgb(185, 111, 110)", "rgb(148, 66, 72)", "rgb(83, 19, 20)", "rgb(7, 6, 14)", "#FE8B92"),
                DARKBLUE: new l("rgb(14, 24, 31)", "rgb(46, 105, 144)", "rgb(19, 64, 96)", "rgb(6, 20, 29)", "rgb(8, 9, 10)", "#3DB3FF"),
                LILA: new l("rgb(175, 164, 255)", "rgb(188, 168, 253)", "rgb(176, 159, 255)", "rgb(174, 147, 252)", "rgb(168, 136, 233)", "#076148"),
                BLACKRED: new l("rgb(8, 12, 11)", "rgb(10, 11, 13)", "rgb(11, 10, 15)", "rgb(7, 13, 9)", "rgb(9, 13, 14)", "#B50026"),
                DARKGREEN: new l("rgb(25, 85, 0)", "rgb(47, 154, 0)", "rgb(30, 101, 0)", "rgb(30, 101, 0)", "rgb(25, 85, 0)", "#233123"),
                AMBER: new l("rgb(182, 71, 0)", "rgb(236, 155, 25)", "rgb(212, 93, 5)", "rgb(212, 93, 5)", "rgb(182, 71, 0)", "#593A0A"),
                LIGHTBLUE: new l("rgb(125, 146, 184)", "rgb(197, 212, 231)", "rgb(138, 155, 194)", "rgb(138, 155, 194)", "rgb(125, 146, 184)", "#090051"),
                SECTIONS: new l("#b2b2b2", "#ffffff", "#c4c4c4", "#c4c4c4", "#b2b2b2", "#000000")
            },
            iu = {
                RED: new it(new n(82, 0, 0, 1), new n(158, 0, 19, 1), new n(213, 0, 25, 1), new n(240, 82, 88, 1), new n(255, 171, 173, 1), new n(255, 217, 218, 1)),
                GREEN: new it(new n(8, 54, 4, 1), new n(0, 107, 14, 1), new n(15, 148, 0, 1), new n(121, 186, 37, 1), new n(190, 231, 141, 1), new n(234, 247, 218, 1)),
                BLUE: new it(new n(0, 11, 68, 1), new n(0, 73, 135, 1), new n(0, 108, 201, 1), new n(0, 141, 242, 1), new n(122, 200, 255, 1), new n(204, 236, 255, 1)),
                ORANGE: new it(new n(118, 83, 30, 1), new n(215, 67, 0, 1), new n(240, 117, 0, 1), new n(255, 166, 0, 1), new n(255, 255, 128, 1), new n(255, 247, 194, 1)),
                YELLOW: new it(new n(41, 41, 0, 1), new n(102, 102, 0, 1), new n(177, 165, 0, 1), new n(255, 242, 0, 1), new n(255, 250, 153, 1), new n(255, 252, 204, 1)),
                CYAN: new it(new n(15, 109, 109, 1), new n(0, 109, 144, 1), new n(0, 144, 191, 1), new n(0, 174, 239, 1), new n(153, 223, 249, 1), new n(204, 239, 252, 1)),
                MAGENTA: new it(new n(98, 0, 114, 1), new n(128, 24, 72, 1), new n(191, 36, 107, 1), new n(255, 48, 143, 1), new n(255, 172, 210, 1), new n(255, 214, 23, 1)),
                WHITE: new it(new n(210, 210, 210, 1), new n(220, 220, 220, 1), new n(235, 235, 235, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1), new n(255, 255, 255, 1)),
                GRAY: new it(new n(25, 25, 25, 1), new n(51, 51, 51, 1), new n(76, 76, 76, 1), new n(128, 128, 128, 1), new n(204, 204, 204, 1), new n(243, 243, 243, 1)),
                BLACK: new it(new n(0, 0, 0, 1), new n(5, 5, 5, 1), new n(10, 10, 10, 1), new n(15, 15, 15, 1), new n(20, 20, 20, 1), new n(25, 25, 25, 1)),
                RAITH: new it(new n(0, 32, 65, 1), new n(0, 65, 125, 1), new n(0, 106, 172, 1), new n(130, 180, 214, 1), new n(148, 203, 242, 1), new n(191, 229, 255, 1)),
                GREEN_LCD: new it(new n(0, 55, 45, 1), new n(15, 109, 93, 1), new n(0, 185, 165, 1), new n(48, 255, 204, 1), new n(153, 255, 227, 1), new n(204, 255, 241, 1)),
                JUG_GREEN: new it(new n(0, 56, 0, 1), new n(32, 69, 36, 1), new n(50, 161, 0, 1), new n(129, 206, 0, 1), new n(190, 231, 141, 1), new n(234, 247, 218, 1))
            },
            ru = {
                RED_LED: new lt("#FF9A89", "#FF9A89", "#FF3300", "#FF8D70", "#7E1C00", "#7E1C00", "#641B00"),
                GREEN_LED: new lt("#9AFF89", "#9AFF89", "#59FF2A", "#A5FF00", "#1C7E00", "#1C7E00", "#1B6400"),
                BLUE_LED: new lt("#899AFF", "#899AFF", "#0033FF", "#708DFF", "#001C7E", "#001C7E", "#001B64"),
                ORANGE_LED: new lt("#FEA23F", "#FEA23F", "#FD6C00", "#FD6C00", "#592800", "#592800", "#421F00"),
                YELLOW_LED: new lt("#FFFF62", "#FFFF62", "#FFFF00", "#FFFF00", "#6B6D00", "#6B6D00", "#515300"),
                CYAN_LED: new lt("#00FFFF", "#00FFFF", "#1BC3C3", "#00FFFF", "#083B3B", "#083B3B", "#052727"),
                MAGENTA_LED: new lt("#D300FF", "#D300FF", "#8600CB", "#C300FF", "#38004B", "#38004B", "#280035")
            },
            bi = {
                TYPE1: new kt("type1"),
                TYPE2: new kt("type2"),
                TYPE3: new kt("type3"),
                TYPE4: new kt("type4"),
                TYPE5: new kt("type5")
            },
            uu = {
                NORTH: new ni("north"),
                SOUTH: new ni("south"),
                EAST: new ni("east"),
                WEST: new ni("west")
            },
            ki = {
                STANDARD_KNOB: new li("standardKnob"),
                METAL_KNOB: new li("metalKnob")
            },
            di = {
                BLACK: new fi("black"),
                BRASS: new fi("brass"),
                SILVER: new fi("silver")
            },
            fu = {
                BLACK_METAL: new ft("blackMetal"),
                METAL: new ft("metal"),
                SHINY_METAL: new ft("shinyMetal"),
                BRASS: new ft("brass"),
                STEEL: new ft("steel"),
                CHROME: new ft("chrome"),
                GOLD: new ft("gold"),
                ANTHRACITE: new ft("anthracite"),
                TILTED_GRAY: new ft("tiltedGray"),
                TILTED_BLACK: new ft("tiltedBlack"),
                GLOSSY_METAL: new ft("glossyMetal")
            },
            eu = {
                TYPE1: new k("type1"),
                TYPE2: new k("type2"),
                TYPE3: new k("type3"),
                TYPE4: new k("type4"),
                TYPE5: new k("type5"),
                TYPE6: new k("type6"),
                TYPE7: new k("type7"),
                TYPE8: new k("type8"),
                TYPE9: new k("type9"),
                TYPE10: new k("type10"),
                TYPE11: new k("type11"),
                TYPE12: new k("type12"),
                TYPE13: new k("type13"),
                TYPE14: new k("type14"),
                TYPE15: new k("type15"),
                TYPE16: new k("type16")
            },
            ou = {
                TYPE1: new dt("type1"),
                TYPE2: new dt("type2"),
                TYPE3: new dt("type3"),
                TYPE4: new dt("type4"),
                TYPE5: new dt("type5")
            },
            su = {
                STANDARD: new ei("standard"),
                FRACTIONAL: new ei("fractional"),
                SCIENTIFIC: new ei("scientific")
            },
            hu = {
                NORMAL: new oi("normal"),
                HORIZONTAL: new oi("horizontal"),
                TANGENT: new oi("tangent")
            },
            cu = {
                UP: new ti("up"),
                STEADY: new ti("steady"),
                DOWN: new ti("down"),
                OFF: new ti("off")
            };
        return {
            Radial: gi,
            RadialBargraph: nr,
            RadialVertical: tr,
            Linear: ir,
            LinearBargraph: rr,
            DisplaySingle: ur,
            DisplayMulti: fr,
            Level: er,
            Compass: or,
            WindDirection: sr,
            Horizon: hr,
            Led: cr,
            Clock: lr,
            Battery: ar,
            StopWatch: vr,
            Altimeter: yr,
            TrafficLight: pr,
            LightBulb: wr,
            Odometer: br,
            drawFrame: d,
            drawBackground: nt,
            drawForeground: g,
            rgbaColor: n,
            ConicalGradient: ot,
            setAlpha: c,
            getColorFromFraction: ui,
            gradientWrapper: ri,
            BackgroundColor: nu,
            LcdColor: tu,
            ColorDef: iu,
            LedColor: ru,
            GaugeType: bi,
            Orientation: uu,
            FrameDesign: fu,
            PointerType: eu,
            ForegroundType: ou,
            KnobType: ki,
            KnobStyle: di,
            LabelNumberFormat: su,
            TickLabelOrientation: hu,
            TrendState: cu,
            Section: kr
        }
    }()
    //# sourceMappingURL=steelseries-min.js.map