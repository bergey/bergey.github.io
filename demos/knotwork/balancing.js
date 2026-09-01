function polar_pt(angle, radius) {
    return {
        x: radius * Math.cos(angle * 2 * Math.PI),
        y: radius * Math.sin(angle * 2 * Math.PI),
    };
}

function fit_y({p, q}, y1, y2) {
    // const p = line.p.y < line.q.y ? line.p : line.q;
    // const q = line.p.y < line.q.y ? line.q : line.p;
    const y_min = Math.min(y1, y2);
    const y_max = Math.max(y1, y2);
    // y(t) = p.y * (1 - t) + q.y * t = p.y + t * (q.y - p.y)
    const t_min = (y_min - p.y) / (q.y - p.y);
    const t_max = (y_max - p.y) / (q.y - p.y);
    // console.log({t_min, t_max, p, q, y_min, y_max});
    return {
        p: { x: p.x * (1-t_min) + q.x * t_min, y: p.y * (1-t_min) + q.y * t_min },
        q: { x: p.x * (1-t_max) + q.x * t_max, y: p.y * (1-t_max) + q.y * t_max },
    }
}

function reverse(line) {
    return {p: line.q, q: line.p};
}

function intersect_lines(one, two) {
    // ctx.save();
    // ctx.strokeStyle = "yellow";
    // render(one);
    // render(two);
    // ctx.restore();
    return intersect_lines_or_segments(one, two, false, false);
}

function intersect_segments(one, two) {
    return intersect_lines_or_segments(one, two, true, true);
}

function intersect_segment_line(one, two) {
    return intersect_lines_or_segments(one, two, true, false);
}

function intersect_lines_or_segments(a, b, segment_one=false, segment_two=false) {
    // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
    const ε = 0.001;

      // special cases for vertical & horizontal lines
    // TODO maybe better to check segment bounds here?
    if (a.p.x == a.q.x) {
        return line_intersection_vertical(b, a, ε);
    }
    if (b.p.x == b.q.x) {
        return line_intersection_vertical(a, b, ε);
    }
    if (a.p.y == a.q.y) {
        return line_intersection_horizontal(b, a, ε);
    }
    if (b.p.y == b.q.y) {
        return line_intersection_horizontal(a, b, ε);
    }

    const a_dx = a.p.x - a.q.x;
    const a_dy = a.p.y - a.q.y;
    const b_dx = b.p.x - b.q.x;
    const b_dy = b.p.y - b.q.y;

    const denominator = a_dx * b_dy - a_dy * b_dx;
    if (Math.abs(denominator) < ε) {
        return null;
    }
    const p_dx = a.p.x - b.p.x;
    const p_dy = a.p.y - b.p.y;

    // test s in [0, 1], t in [0, 1] before division
    const s_numerator = p_dx * b_dy - p_dy * b_dx;
    const t_numerator = p_dx* a_dy - p_dy * a_dx;

    if (segment_one && (Math.sign(s_numerator) != Math.sign(denominator) || Math.abs(s_numerator) - Math.abs(denominator) > ε)) {
        return null;
    }
    if (segment_two && (Math.sign(t_numerator) != Math.sign(denominator) || Math.abs(t_numerator) - Math.abs(denominator) > ε)) {
        return null;
    }

    const s = s_numerator / denominator;
    if (segment_one && (s < ε || s > 1. - ε)) {
        return null;
    }
    return {
        x: a.p.x - s * a_dx,
        y: a.p.y - s * a_dy,
    };
}

function line_intersection_vertical(line, vertical, ε) {
    const x = vertical.p.x;
    const denominator = line.q.x - line.p.x;
    if (Math.abs(denominator) < ε) {
        return null;
    }
    const numerator = x - line.p.x;
    const t = numerator / denominator;
    const y = line.q.y * t + line.p.y * (1. - t);
    return {x, y};
}

function line_intersection_horizontal(line, horizontal, ε) {
    const p = line_intersection_vertical(reflect_xy(line), reflect_xy(horizontal), ε);
    if (p !== null) {
        return reflect_xy(p);
    } else {
        return null;
    }
}

function reflect_xy(shape) {
    if (Array.isArray(shape)) {
        return shape.map(reflect_xy);
    } else if ('x' in shape) {
        return {x: shape.y, y: shape.x};
    } else if ('p' in shape) {
        return {p: reflect_xy(shape.p), q: reflect_xy(shape.q) };
    }
}

function rotate(shape, angle) {
    // console.log({shape, angle});
    if (Array.isArray(shape)) {
        return shape.map((s) => rotate(s, angle));
    } else if ('p' in shape) {
        return {p: rotate(shape.p, angle), q: rotate(shape.q, angle)};
    } else if ('x' in shape) {
        const θ = angle * 2 * Math.PI;
        return {
            x: shape.x * Math.cos(θ) - shape.y * Math.sin(θ),
            y: shape.y * Math.cos(θ) + shape.x * Math.sin(θ),
        };
    }
}

function repeat_rotate(shapes, copies) {
    let ret = [];
    for (let i=0; i< copies; i++) {
        ret.push(... rotate(shapes, i/copies));
    }
    return ret;
}

function render_grid(shapes, offset, copies) {
    for (let i=Math.floor(-copies/2); i<copies/2; i++) {
        for (let j=Math.floor(-copies/2); j<copies/2; j++) {
            ctx.save();
            ctx.translate(i * offset, j * offset);
            render(shapes);
            ctx.restore();
        }
    }
}

// execution begins here

const origin = {x: 0, y: 0};

const canvas = document.getElementById('balancing');
const ctx = canvas.getContext('2d');
// TODO retina display multiplier
// center origin, +Y up
ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);

function render(shape) {
    ctx.beginPath();
    if (Array.isArray(shape)) {
        shape.forEach(render);
    } else if ('c' in shape) {
        ctx.ellipse(shape.c.x, shape.c.y, shape.r, shape.r, 0, 0, 2 * Math.PI);
    } else if ('p' in shape) {
        ctx.moveTo(shape.p.x, shape.p.y);
        ctx.lineTo(shape.q.x, shape.q.y);
    }
    ctx.stroke();
}

// ctx.lineWidth = 3;
ctx.strokeStyle = "white";
const r = 100;

// construction marks for debugging
// render({c: {x: 0, y: 0}, r});
// render([{p: origin, q: {x: r, y: 0}}, {p: {x: r, y: 0}, q: {x: r, y: r}}, {p: {x: r, y: r}, q: {x: 0, y: r}}, {p: origin, q: {x: 0, y: r}}]);

let segments = [];
// Eric Broug, pages 27-29

// segments.push(fit_y({p: polar_pt(3/4, r), q: polar_pt(1/8, r)}, 0, r));
// const right = polar_pt(0, r);
// const p = intersect_lines({p: origin, q: {x: 100, y: 100}}, {p: polar_pt(3/8, r), q: right});
// segments.push({p, q: right});
// const refl = [...segments, ...reflect_xy(segments)];
// const square = repeat_rotate([...segments, ...reflect_xy(segments)], 4);

// pages 30-33
// 4 segments, each repeated in 8-fold symmetry (or 2x8 + 1x16)
// 2 segments of the octogon, one where circle touches square, one extended past circle
// two segments near radii of the circle
// the offset from radii found by intersection of squares

const octo = {p: polar_pt(0, r), q: polar_pt(1/8, r)};
const X = intersect_lines({p: polar_pt(-1/8, r), q: polar_pt(1/8, r)}, {p: polar_pt(0, r), q: polar_pt(1/4, r)});
const N = {p: X, q: rotate(X, 3/8)};
const SE = {p: X, q: rotate(X, 5/8)};
// render(SE)
// render(N)
segments.push(
    {p: intersect_lines(N, octo), q: octo.p},
    {p: intersect_lines(SE, octo), q: fit_y(octo, 0, r).q}
);
let NE = rotate(SE, 1/4);
segments.push({p: segments[0].p, q: intersect_lines(N, NE)}); // a segment of N
let E = rotate(N, -1/4);
segments.push({p: segments[1].p, q: intersect_lines(SE, E)}); // a segment of SE
const square = repeat_rotate([...segments, ...reflect_xy(segments)], 4);

render_grid(square, 2 * r, Math.ceil(canvas.width / (2*r))+1);
ctx.strokeStyle = "blue";
render(square);
console.log('done');
