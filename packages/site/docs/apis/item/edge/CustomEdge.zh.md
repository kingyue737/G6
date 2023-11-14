---
title: 自定义边
order: 8
---

在 G6 中，如果内置边不能满足特定需求，可以通过扩展已有的边类型来创建自定义边。这允许您利用 G6 强大的内置功能的同时，为边添加特有的逻辑和样式。

可以通过继承内置的边（例如 LineEdge），来创建自定义边。可继承图形参见： [边类型](/manual/customize/extension-cats#2-边类型edges)

```ts
import { Graph, Extensions, extend } from '@antv/g6';

// 创建自定义边，继承自 LineEdge
class CustomEdge extends Extensions.LineEdge {
  // overwrite member method
  // 重载成员方法，自定义绘制逻辑
}

// 使用 extend 方法扩展 Graph 类，注册自定义边
const ExtGraph = extend(Graph, {
  edges: {
    'custom-edge': CustomEdge,
  },
});

// 使用扩展后的 Graph 类创建图实例，指定边类型为自定义边
const graph = new ExtGraph({
  // ...其他配置项
  edge: {
    type: 'custom-edge', // 指定自定义边
    // 边的其他配置项详见具体边配置
  },
});
```

## 重载方法

### draw

**类型**：

```ts
type draw = (
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: { [shapeId: string]: DisplayObject },
) => {
  keyShape: DisplayObject;
  labelShape?: DisplayObject;
  iconShape?: DisplayObject;
  [otherShapeId: string]: DisplayObject;
};
```

**说明**：用于绘制与边相关的所有图形

### drawKeyShape

**类型**：

```ts
type drawKeyShape = (
  model: EdgeDisplayModel,
  sourcePoint: Point,
  targetPoint: Point,
  shapeMap: EdgeShapeMap,
) => DisplayObject;
```

**说明**：用于绘制关键图形

### drawLabelShape

**类型**：

```ts
type drawLabelShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**说明**：绘制边的标签图形

### drawLabelBackgroundShape

**类型**：

```ts
type drawLabelBackgroundShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**说明**：绘制边的文本的背景图形

### drawIconShape

**类型**：

```ts
type drawIconShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**说明**：绘制边的图标图形

### drawHaloShape

**类型**：

```ts
type drawHaloShape = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => DisplayObject;
```

**说明**：绘制边的光晕图形

### drawOtherShapes

**类型**：

```ts
type drawOtherShapes = (model: EdgeDisplayModel, shapeMap: EdgeShapeMap) => { [id: string]: DisplayObject };
```

**说明**：绘制边的其他图形。自定义边中的其他图形应当定义和配置在 `otherShapes` 中。

### afterDraw

**类型**：

```ts
type afterDraw = (
  model: EdgeDisplayModel,
  shapeMap: { [shapeId: string]: DisplayObject },
  shapesChanged?: string[],
) => { [otherShapeId: string]: DisplayObject };
```

**说明**：绘制边后执行其他绘图操作或添加自定义形状

### getMergedStyles

**类型**：

```ts
type getMergedStyles = (model: EdgeDisplayModel) => EdgeDisplayModel;
```

**说明**：将 display model 数据中定义的样式与边的默认和主题样式合并

## 成员方法

继承的图形提供下列方法调用

### upsertShape

**类型**：

```ts
type upserShape = (
  type: SHAPE_TYPE | SHAPE_TYPE_3D,
  id: string,
  style: ShapeStyle,
  shapeMap: NodeShapeMap | ComboShapeMap,
  model: NodeDisplayModel | ComboDisplayModel,
) => DisplayObject;
```

**说明**：根据配置创建（如果在 shapeMap 中不存在）或更新形状

### upsertArrow

**类型**：

```ts
type upsertArrow = (
  position: 'start' | 'end',
  arrowConfig: boolean | ArrowStyle,
  bodyStyle: ShapeStyle,
  model: EdgeDisplayModel,
  resultStyle: ShapeStyle,
) => void;
```

**说明**：在边的指定位置添加或更新箭头标记

---

- [EdgeDisplayModel](/apis/data/edge-display-model)