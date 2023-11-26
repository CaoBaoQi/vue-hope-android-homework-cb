---
title: Android 基础界面编程
order: 2
icon: /doc.svg
category:
  - cb
  - MD
---

# Android 基础界面编程

## 一、基础 View 组件

### 1.1 文本显示框 TextView

TextView 类直接继承于 View 类，主要用于在界面上显示文本信息，类似于一个文本显示器。

TextView 可以设置显示文本的：

- 字体大小 `android:textSize`
- 颜色 `android:textColor`
- 风格 `android:textStyle`

等属性，Text View 还具有自动识别文本中的各种链接、能够直接显示字符串中的 HTML 标签的格式。识别自动链接的属性为 `android:autoLink` 该属性有：

- none： 不匹配任何格式（默认值）
- web、email、phone、map 分别用于匹配 网页、邮箱、电话、地址
- all 匹配所有

当匹配时，相应部分会以超链接显示，单击超链接会自动运行相关程序。例如：单击电话号码超链接会调用拨号程序，单击网页超链接会打开网页等。

显示 HTML 标签格式，需要通过 Java 代码来控制。

1. 首先为该文本框添加一个 id 属性
2. 然后再 `onCreate() `方法中，通过 `findViewById (R.id.xxx) ` 获取该文本框最后通过 `setText(Html.fromHtml("[HTML 代码]"), Html.FROM_HTML_MODE_LEGACY))` 方法来设置显示的内容。

#### TextView 匹配 web、email 等

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        tools:context=".MainActivity">

    <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello World!"
            android:textSize="15sp"
            android:textColor="@color/black"
            android:textStyle="bold"/>

    <TextView android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="@string/custom_phone"
              android:autoLink="phone"/>

    <TextView android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="@string/custom_email"
              android:autoLink="email"/>

</LinearLayout>
```

#### TextView 显示 HTML 标签

```xml
    <TextView
            android:id="@+id/main_text_html"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"/>
```

```java
 @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView htmlView = findViewById(R.id.main_text_html);

        htmlView.setText(Html.fromHtml("<h1>这是 H1 标签</h1>", Html.FROM_HTML_MODE_LEGACY));
    }
```

### 1.2 文本编辑框 EditText

TextView 的功能仅时用于显示信息而不能编辑，为此 Android 提供了 EditView 组件，EditText 是 TextView 的子类，与 TextView 具有很多相似之处。它们最大的区别在于 EditText 允许用户编辑文本内容。

EditText 常用属性：

- `android:hint`  设置当文本框为空时，文本框显示的提示信息（一旦输入内容该提示信息立即消失）
- `android:password` 设置文本框是否为密码框，值为 （true | false） 
- `andorid:inputType` 设置文本框输入值的类型 （数字、电话 等）

```xml
    <!--EditView-->
    <EditText android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:inputType="text"
              android:hint="@string/main_edit_text_info"
              android:autofillHints="password"/>
```

### 1.3 按钮 Button

Button 也是继承于 TextView ，功能非常单一，用于在界面生成一个按钮，使用户单击，单击后会触发一个单击事件，开发人员可以针对该单击事件设计相应的事件处理，从而实现与用户交互的功能。

```xml
    <!--Button-->
    <Button android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:background="#c04851"
            android:text="@string/button"
            android:textColor="@color/black"
            android:textStyle="bold"
            android:textSize="15sp"/>
```

### 1.4 图片视图

ImageView 的作用与 TextView 类似，TextView 用于显示文字，ImageView 则用于显示图片。

ImageView 常见属性：

- `src` 用于设置引用图片的地址
- `scaleType` 用于设置图片的缩放类型
  - `fitCenter` 保持纵横比缩放图片
  - `fitXY` 对图片横向、纵向独立缩放
  - `centerCrop` 比缩放图片

```xml
    <!--ImageView-->
    <ImageView android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:scaleType="fitCenter"
               android:src="@drawable/pic_01"
               android:contentDescription="@string/pic_01"/>
```

### 1.5 实战-登录页面

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:background="@color/white"
              android:orientation="vertical"
              tools:context=".MainActivity">

    <!--头像-->
    <ImageView
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginTop="70dp"
            android:background="@drawable/avata"/>

    <!--用户名-->
    <EditText
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginLeft="35dp"
            android:layout_marginRight="35dp"
            android:layout_marginTop="35dp"
            android:drawableLeft="@drawable/username"
            android:drawablePadding="10dp"
            android:gravity="center_vertical"
            android:hint="@string/usernameMain"
            android:paddingLeft="8dp"
            android:textColor="#a3a3a3"
            android:textSize="14sp"/>

    <!--密码-->
    <EditText
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginLeft="35dp"
            android:layout_marginRight="35dp"
            android:layout_marginTop="5dp"
            android:drawableLeft="@drawable/password"
            android:drawablePadding="10dp"
            android:gravity="center_vertical"
            android:hint="@string/passwordMain"
            android:inputType="textPassword"
            android:paddingLeft="8dp"
            android:textColor="#a3a3a3"
            android:singleLine="true"
            android:textSize="14sp"/>
    <!--登录-->
    <Button
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginLeft="35dp"
            android:layout_marginRight="35dp"
            android:layout_marginTop="15dp"
            android:background="#03A9F4"
            android:text="@string/loginMain"
            android:textColor="@color/white"
            android:textSize="18sp"/>

    <!--注册 和 找回密码-->
    <LinearLayout
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:layout_marginLeft="35dp"
            android:layout_marginRight="35dp"
            android:layout_marginTop="8dp"
            android:gravity="center_horizontal"
            android:orientation="horizontal">

        <TextView
                android:layout_width="1dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:gravity="center_horizontal"
                android:padding="9dp"
                android:text="@string/registerMain"
                android:textColor="#2196F3"
                android:textSize="14sp"/>

        <TextView
                android:layout_width="1dp"
                android:layout_height="wrap_content"
                android:layout_weight="1"
                android:gravity="center_horizontal"
                android:padding="9dp"
                android:text="@string/findPasswordMain"
                android:textColor="#2196F3"
                android:textSize="14sp"/>

    </LinearLayout>

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```



## 二、布局管理器

### 2.1 线性布局

线性布局是最常用的也是最基础的布局方式，其会使得容器里的所有组件一个挨着一个排列。

线性布局的常用属性：

- `android:orientation` 设置布局管理器内组件的排列方向
  - `horizontal` 水平排列 （不管组件的宽度为多少，整个布局只占一行，当组件的宽度超出容器宽度时，超出的部分不会显示）
  - `vertical` 垂直排列 (整个布局文件只有一列，每个组件占一行，不管组件宽度多小)
- `android:gravity` 设置布局管理器内组件的对齐方式，可以同时指定多种对齐方式的组合，多个属性用竖线隔开，但数显前后不能出现空格 例如 `bottom|center_horizontal` 代表出现在屏幕底部且水平居中 
- `android:background` 用于为该组件设置背景，可以是背景图片，也可以是背景颜色。

使用线性布局的时候如果一行的宽度或高度超过了容器的宽度或高度，那么超出的部分将无法显示，但我们可以通过在外面包裹一个滚动逐渐`ScrollView (垂直滚动)` 或 `HorizontalScrollView (水平滚动)`来解决。

#### 滚动

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:tools="http://schemas.android.com/tools"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:id="@+id/layout_main"
            tools:context=".LinerActivity">
        <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:gravity="center_horizontal"
                android:orientation="vertical">

            <ImageView
                    android:layout_width="150dp"
                    android:layout_height="150dp"
                    android:scaleType="fitCenter"
                    android:padding="3dp"
                    android:src="@drawable/mcdd_01"
                    android:contentDescription="@string/mcdd_strange">
            </ImageView>

            <ImageView
                    android:layout_width="150dp"
                    android:layout_height="150dp"
                    android:scaleType="fitCenter"
                    android:padding="3dp"
                    android:src="@drawable/mcdd_02"
                    android:contentDescription="@string/mcdd_cb">
            </ImageView>

            <ImageView
                    android:layout_width="150dp"
                    android:layout_height="150dp"
                    android:scaleType="fitCenter"
                    android:padding="3dp"
                    android:src="@drawable/mcdd_03"
                    android:contentDescription="@string/mcdd_cbq">
            </ImageView>

            <ImageView
                    android:layout_width="150dp"
                    android:layout_height="150dp"
                    android:scaleType="fitCenter"
                    android:padding="3dp"
                    android:src="@drawable/mcdd_04"
                    android:contentDescription="@string/mcdd_rose">
            </ImageView>

        </LinearLayout>

    </LinearLayout>


</ScrollView>

```

在使用 `LinerLayout` 的时候，子控件可以设置 `layout_weight`来设置子控件的权重。

#### 权重

```xml
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">

        <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="130dp"
                android:orientation="horizontal">

            <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:gravity="center"
                    android:layout_weight="1"
                    android:text="@string/red"
                    android:textSize="25sp"
                    android:background="#DD4D4D">
            </TextView>

            <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:gravity="center"
                    android:layout_weight="2"
                    android:text="@string/green"
                    android:textSize="25sp"
                    android:background="#4DAC51">
            </TextView>

            <TextView
                    android:layout_width="wrap_content"
                    android:layout_height="match_parent"
                    android:gravity="center"
                    android:layout_weight="3"
                    android:text="@string/blue"
                    android:textSize="25sp"
                    android:background="#1B1B71">
            </TextView>

        </LinearLayout>
```



### 2.2 表格布局

表格布局是以行和列的形式来管理界面组件。由 TableLayout 类表示，我们不必声明包含几行几列，而是通过 TableRow 来添加行然后再 TableRow 中添加组件来添加列。

TableRow 就是一个表格行，本身也是容器，可以不断地添加其他组件，每添加一个组件就是在该行中增加一列。如果直接向 TableLayout 中添加组件，而没有添加 TableRow 那么该组件将会占用一行。

在表格布局中，每列的宽度都是一样的，列的宽度由该列中最宽的组件决定，整个表格布局的宽度则取决于父容器的宽度，默认为占满父容器本身。

TableLayout 集成了 LinewLayout，因此其完全支持 LinerLayout 所支持的全部 XML 属性除此之外，TableLayout 还增加了自己特有的属性：

- `android:collapseColumns` 隐藏指定的列，其值为列所有的序号。从 0 开始，如果需要隐藏多列使用逗号隔开即可。
- `android:shrinkColumns` 收缩指定的列以适合屏幕，使整行能够完全显示，不会超出屏幕，用于当某一行的内容超过屏幕的宽度时，会使该列自动换行，其值为列所在的序号。如果没有改属性，则超出屏幕的部分会自动截取，不会显示
- `android:strechColumns` 尽量把指定的列填充空白部分。该属性用于某一行的内容不足以填充整个屏幕，指定某一列的内容扩张以填满整个屏幕，其它列的宽度不变

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical"
              tools:context=".TableActivity">

    <ImageView
            android:layout_width="match_parent"
            android:layout_height="150dp"
            android:scaleType="centerCrop"
            android:src="@drawable/jinzhong_12"/>

    <TableLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:gravity="center"
            android:paddingTop="5dp">

        <TableRow>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:layout_marginStart="3dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
        </TableRow>

        <TableRow>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
            <ImageView
                    android:layout_width="83dp"
                    android:layout_height="83dp"
                    android:src="@drawable/logo"/>
        </TableRow>

    </TableLayout>



</LinearLayout>
```



### 2.3 相对布局

相对布局，顾名思义就是相对于某个组件的位置，由 RelativeLayout 类表示，这种布局的关键是找到一个合适的参照物，如果甲组件的位置需要根据乙组件的位置来确定，那么要求先定义乙组件，再定义甲组件。

在相对布局中，每个组件的位置可通过它相对于某个组件的方位以及对其方式来确定，相对布局中常见的属性有：

- `android:layout_centerHorizontal` 设置该组件是否位于父容器的水平居中位置
- `android:layout_centerVertical` 设置该组件是否位于父容器的垂直居中位置
- `android:layout_centerInParent` 设置该组件是否位于父容器的正中央位置
- `android:layout_alignParent [Top、Bottom、Left、Right]` 设置该组件是否与父容器顶端、底端、左边、右边对齐
- `android:layout_toRigthtOf` 、`android:layout_toLeftOf` 设置该组件位于给定 ID 组件的右侧、左侧
- `android:layout_above`、`android:layout_below` 设置该组件位于给定的 ID 组件的 上方、下方
- `android:layout_align[Top、Bottom、Left、Right]` 设置该组件与给定的 ID 组件的上边界、下边界、左边界、有边界 对齐

#### 更新界面

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                tools:context=".LinerActivity">

    <TextView
            android:id="@+id/tv_hello_world"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/relative_ask"
            android:textSize="20sp"
            android:layout_centerInParent="true" />

    <Button
            android:id="@+id/bt_update"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/relative_now_update"
            android:layout_toStartOf="@+id/bt_no_update"
            android:layout_below="@+id/tv_hello_world" />

    <Button
            android:id="@+id/bt_no_update"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/relative_after_update"
            android:layout_alignEnd="@+id/tv_hello_world"
            android:layout_below="@+id/tv_hello_world" />


</RelativeLayout>
```



### 2.4 层布局

层布局也叫帧布局，由 FrameLayout 类表示。其每个组件占据一层，后面添加的层会覆盖前面的层，后面的组件会叠放在先前的组件之上。

- 如果后面组件大于前面的组件，那么前面的组件将会完全被覆盖
- 如果后面组件无法完全覆盖前面的组件，则未覆盖部分显示先前的组件。

该布局在开发中设计地图时经常用到，因为是按层次方式布局，需要实现层面显示的样式时就可以采用这种布局方式，比如实现一个类似于百度地图的布局等。

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
             xmlns:tools="http://schemas.android.com/tools"
             android:layout_width="match_parent"
             android:layout_height="match_parent"
             tools:context=".FrameActivity">

    <TextView
            android:layout_width="300dp"
            android:layout_height="300dp"
            android:background="#f00"
            android:layout_gravity="center"/>
    <TextView
            android:layout_width="200dp"
            android:layout_height="200dp"
            android:background="#5E794EED"
            android:layout_gravity="center"/>

    <TextView
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:background="#70B5CA"
            android:layout_gravity="center"/>


</FrameLayout>
```



### 2.5 网格布局

网格布局由 GridLayout 代表，是 Android 4.0 新增的布局管理器，因此需要在 Android 4.0 之后的版本中才能使用该布局管理器。如果希望在更早的 Android 平台上使用该布局管理器，则需要导入相应的支撑库。GridLayout 的作用类似于 HTML 中的 table 标签，它把整个容器划分成若干的行和若干的列个网格，每个网格可以放置一个组件。除此之外，也可以设置一个组件横跨多个列，一个组件纵跨多个行。网格布局和 TableLayout （表格布局）有点儿类似，不过它功能更多，使用更加方便，例如：

- 可以自己设置布局中组件的排列方式
- 自定义网格布局有多少行 多少 列
- 直接设置组件位于某行某列
- 设置组件横跨几行或者几列

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical"
              tools:context=".GridActivity">

    <ImageView
            android:layout_width="match_parent"
            android:layout_height="150dp"
            android:scaleType="centerCrop"
            android:src="@drawable/jinzhong_11"/>

    <GridLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center_horizontal"
            android:foregroundGravity="center"
            android:columnCount="5"
            android:orientation="horizontal"
            android:rotation="2">

        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:clickable="true"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
        <ImageView
                android:layout_width="73dp"
                android:layout_height="73dp"
                android:src="@drawable/logo"/>
    </GridLayout>

</LinearLayout>
```


