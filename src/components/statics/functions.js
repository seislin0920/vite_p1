//==legend
export const LegendScope = {
  mlDomain: [4, 8], //==規模範圍[3,7]
  get mlRange() {
    //== [4, 5, 6, 7, 8]
    return d3.range(...this.mlDomain).concat(this.mlDomain[1]);
  },
  depthDomain: [0, 320], //==深度範圍
  pgaDomain: [0.8, 2.5, 8, 25, 80, 140, 250, 440, 800], //==pga threshold
  pgaRange: [
    //==pga color
    "rgb(255, 255, 255)",
    "rgb(200, 255, 211)",
    "rgb(28, 255, 28)",
    "rgb(255, 255, 0)",
    "rgb(255, 170, 0)",
    "rgb(255, 90, 0)",
    "rgb(209, 54, 15)",
    "rgb(161, 52, 35)",
    "rgb(153, 12, 51)",
    "rgb(153, 41, 165)",
  ],
};

export const getMLScale = () => {
  return (ml, circleSize) => {
    // console.debug(ml);
    let ml_base = 3;
    return ml > ml_base ? (ml - ml_base) * circleSize + 0.1 : 0.1;
  };
};

export const getPgaScale = (
  pgaDomain = LegendScope.pgaDomain,
  pgaRange = LegendScope.pgaRange
) => {
  return d3.scaleThreshold().domain(pgaDomain).range(pgaRange);
};

export const getDepthScale = (
  reverse = true,
  depthDomain = LegendScope.depthDomain
) => {
  return d3.scaleSequentialSqrt(
    reverse ? [...depthDomain].reverse() : [...depthDomain],
    d3.interpolateTurbo
  );
};

//==@d3/color-legend
export const getColorLegend = ({
  color,
  title,
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat = undefined,
  tickValues,
  vertical = false,
} = {}) => {
  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3
    .create("svg")
    .attr("width", vertical ? height : width)
    .attr("height", vertical ? width : height)
    .attr("viewBox", vertical ? [0, 0, height, width] : [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

  let tickAdjust = (g) =>
    g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color
      .copy()
      .rangeRound(
        d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
      );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr(
        "xlink:href",
        ramp(
          color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
        ).toDataURL()
      );
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(
      color
        .copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      {
        range() {
          return [marginLeft, width - marginRight];
        },
      }
    );

    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL())
      .attr(
        "transform",
        `translate(${width - marginLeft - marginRight}) scale(-1,1)`
      );

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3
          .range(n)
          .map((i) => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds = color.thresholds
      ? color.thresholds() // scaleQuantize
      : color.quantiles
      ? color.quantiles() // scaleQuantile
      : color.domain(); // scaleThreshold

    const thresholdFormat =
      tickFormat === undefined
        ? (d) => d
        : typeof tickFormat === "string"
        ? d3.format(tickFormat)
        : tickFormat;

    x = d3
      .scaleLinear()
      .domain([-1, color.range().length - 1])
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
      .call((g) => {
        if (vertical)
          g.attr("x", marginTop)
            .attr("y", (d, i) => x(color.range().length - i - 2))
            .attr("width", height - marginTop - marginBottom)
            .attr("height", (d, i) => x(i) - x(i - 1))
            .attr("fill", (d) => d);
        else
          g.attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", (d) => d);
      });

    tickValues = d3.range(thresholds.length);
    tickFormat = (i) =>
      thresholdFormat(thresholds[vertical ? thresholds.length - 1 - i : i], i);
  }

  // Ordinal
  else {
    x = d3
      .scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    svg
      .append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
      .attr("x", x)
      .attr("y", marginTop)
      .attr("width", Math.max(0, x.bandwidth() - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", color);

    tickAdjust = () => {};
  }
  // console.debug(tickFormat);
  svg
    .append("g")
    .attr(
      "transform",
      `translate(${vertical ? [marginTop + 5, 0] : [0, height - marginBottom]})`
    )
    .call(
      d3[vertical ? "axisRight" : "axisBottom"](x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues)
    )
    .call(tickAdjust)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", vertical ? -marginTop : marginLeft)
        .attr("y", vertical ? -5 : marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title)
    );

  return svg.node();
};