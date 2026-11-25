import json, math
FR, OP, W = 60, 150, 400
def st(v): return {"a": 0, "k": v}
def an(kfs, ease=(0.3, 0.7)):
    # kfs: list of (t, value); value list
    out = []
    for i, (t, v) in enumerate(kfs):
        v = v if isinstance(v, list) else [v]
        k = {"t": t, "s": v}
        if i < len(kfs) - 1:
            k["o"] = {"x": [ease[0]], "y": [0]}
            k["i"] = {"x": [ease[1]], "y": [1]}
        out.append(k)
    return {"a": 1, "k": out}
def col(h): h = h.lstrip('#'); return [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)] + [1]
def tr(p=(0, 0)): return {"ty": "tr", "p": st(list(p)), "a": st([0, 0]), "s": st([100, 100]), "r": st(0), "o": st(100)}
def fill(c): return {"ty": "fl", "c": st(col(c)), "o": st(100), "r": 1}
def stroke(c, w): return {"ty": "st", "c": st(col(c)), "o": st(100), "w": w if isinstance(w, dict) else st(w), "lc": 2, "lj": 2}
def star(pts, orr, irr, rnd=0): return {"ty": "sr", "sy": 1, "d": 1, "pt": st(pts), "p": st([0, 0]), "r": st(0), "ir": st(irr), "is": st(rnd), "or": st(orr), "os": st(rnd)}
def ell(d): return {"ty": "el", "d": 1, "p": st([0, 0]), "s": d if isinstance(d, dict) else st([d, d])}
def grp(items, p=(0, 0)): return {"ty": "gr", "it": items + [tr(p)]}
ind = [0]
def layer(nm, shapes, ks, ip=0):
    ind[0] += 1
    base = {"o": st(100), "r": st(0), "p": st([W/2, W/2, 0]), "a": st([0, 0, 0]), "s": st([100, 100, 100])}
    base.update(ks)
    return {"ddd": 0, "ind": ind[0], "ty": 4, "nm": nm, "sr": 1, "ks": base, "ao": 0, "shapes": shapes, "ip": ip, "op": OP, "st": 0, "bm": 0}

C = ["#ff5d73", "#ffb020", "#3ec7a8", "#4b8bff", "#a46bff", "#ff8a3d"]
layers = []
# 큰 별 (맨 위): 튀어나오고 → 살짝 흔들 → 숨쉬기
layers.append(layer("star", [grp([star(5, 92, 42, 8), fill("#ffcf3a"), stroke("#f39a00", 7)]),
                             grp([star(5, 52, 24, 6), fill("#ffe58a")], (0, 4))], {
    "s": an([(0, [0, 0, 100]), (14, [128, 128, 100]), (24, [92, 92, 100]), (32, [104, 104, 100]), (40, [100, 100, 100]),
             (95, [100, 100, 100]), (115, [108, 108, 100]), (135, [100, 100, 100])]),
    "r": an([(0, -70), (18, 12), (28, -6), (38, 0), (60, 0), (68, -8), (76, 8), (84, 0)])}))
# 눈 (별 얼굴)
for x in (-17, 17):
    layers.append(layer("eye", [grp([ell(st([11, 15])), fill("#5a3200")], (x, -4))], {
        "s": an([(0, [0, 0, 100]), (16, [128, 128, 100]), (24, [92, 92, 100]), (40, [100, 100, 100]),
                 (100, [100, 100, 100]), (104, [100, 10, 100]), (109, [100, 100, 100])])}))
layers.insert(0, layers.pop())  # keep order: eyes above star
layers.insert(0, layers.pop())
# 퍼지는 고리 2개
for k, (c, t0) in enumerate((("#ffcf3a", 6), ("#ff8fb1", 14))):
    layers.append(layer("ring%d" % k, [grp([ell(an([(t0, [20, 20]), (t0 + 34, [360, 360])], (0.1, 0.4))),
                                            stroke(c, an([(t0, [18]), (t0 + 34, [2])]))])], {
        "o": an([(t0, [0]), (t0 + 2, [100]), (t0 + 34, [0])])}))
# 사방으로 튀는 점과 작은 별
N = 14
for i in range(N):
    a = 2 * math.pi * i / N + 0.2
    d = 150 + (i % 3) * 18
    c = C[i % len(C)]
    shp = star(4, 13, 5) if i % 2 else ell(15 - (i % 3) * 3)
    t0 = 8 + (i % 4)
    layers.append(layer("p%d" % i, [grp([shp, fill(c)])], {
        "p": an([(t0, [W/2, W/2, 0]), (t0 + 38, [W/2 + d * math.cos(a), W/2 + d * math.sin(a), 0])], (0.05, 0.35)),
        "r": an([(t0, [0]), (t0 + 50, [200 if i % 2 else 0])]),
        "s": an([(t0, [30, 30, 100]), (t0 + 10, [120, 120, 100]), (t0 + 50, [40, 40, 100])]),
        "o": an([(t0, [0]), (t0 + 2, [100]), (t0 + 34, [100]), (t0 + 52, [0])])}))
# 반짝이 (늦게, 깜빡)
for j, (x, y, t0) in enumerate(((-120, -95, 40), (125, -70, 55), (-105, 105, 70), (110, 110, 85), (0, -150, 100))):
    layers.append(layer("tw%d" % j, [grp([star(4, 16, 4), fill("#ffffff"), stroke("#ffc400", 3)])], {
        "p": st([W/2 + x, W/2 + y, 0]),
        "s": an([(t0, [0, 0, 100]), (t0 + 10, [110, 110, 100]), (t0 + 24, [0, 0, 100])]),
        "r": an([(t0, [0]), (t0 + 24, [90])])}))
anim = {"v": "5.7.4", "fr": FR, "ip": 0, "op": OP, "w": W, "h": W, "nm": "star-burst", "ddd": 0, "assets": [], "layers": layers}
js = "/* 축하 별 Lottie 애니메이션 (anim/mklottie.py 로 코드 생성) */\nwindow.ANIM_STAR=" + json.dumps(anim, separators=(',', ':')) + ";\n"
open('/home/user/daicheongmath26-1/anim/star.js', 'w').write(js)
print(len(js), len(layers))
