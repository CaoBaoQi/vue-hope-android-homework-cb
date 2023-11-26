---
title: Android 高级界面控件
order: 3
icon: /doc.svg
category:
  - cb
  - MD
---

# Android 高级界面控件

## 一、布局美化

### 1.1 图片按钮

ImageButton 的作用与 Button 的作用类似，主要是用于添加单击事件处理。

- Button 类从 TextView 继承而来
- ImageButton 类从 Image 继承而来

它们主要的区别是 Button 按钮上显示的是文字，ImageButton 按钮上显示的是图片。

```xml
    <!--头像-->
    <ImageButton
            android:id="@+id/iv_head"
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginTop="70dp"
            android:background="@drawable/avata"/>
```

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageButton button = findViewById(R.id.iv_head);

        button.setOnClickListener(v -> Toast.makeText(MainActivity.this,"您点击了登陆图标",Toast.LENGTH_SHORT).show());
    }
}
```

### 1.2 自定义 XML 图片

### shape XML 图片

有时候为了满足特定功能需求，引用 shape 标签去定义一些背景，shape 的用法跟图片一样，可以给 View 设置 `android:background="@drable/shape"`，定义的 shape 文件放在 `res\shape` 目录下。通常可以用 shape 作 button 的背景选择器、编辑框背景，也可以作切换 Tab 时底部的下划线。通过 shape 绘制不用的形状，如矩形，圆形，直线等。shape 常见属性：

- `android:shape`
  - `rectangle`矩形，默认的行政，可以画出直角矩形、圆角矩形、弧形等
  - `oval` 椭圆形
  - `line`线形
  - `ring ` 环形
- 包含的元素
  - `solid` 设置形状填充的颜色只有 `android:color` 一个属性用于设置填充的颜色
  - `padding` 设置内容与形状边界的内边距 `android:[left、right、top、bottom]` 分别用于设置 左、右、上、下
  - `gradient` 设置形状的渐变颜色，可以是线性渐变、辐射渐变、扫描渐变
    - `android:type`
    - `android:[startColor、endColor、centerColor]` 开始颜色、结束颜色、中间颜色
    - `android:angle` 渐变的角度（仅在线性渐变时才有效，必须是 45 的倍数）
  - `corners` 设置圆角，只适用于 rectangle 类型，`android:[topLeft、topRight、bottomLef、buttomRight] Radius` 可以分别设置四个角不同半径的圆角，当设置的圆角半径很大时，如 `200dp`就变成弧形边了。
  - `stroke` 设置描边，可描成实线或虚线
    - `android:dash [Width、Gap]` 分别用于设置虚线时的横线长度和横线之间距离

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#16646A64" />  <!-- 填充颜色 -->
    <stroke android:color="#000000" /> <!-- 边框颜色 -->
    <corners android:radius="10dp" />   <!-- 圆角半径 -->
</shape>
```



### selector XML 图片

使用 selector 标签根据不同的状态加载不同的背景图片。selector 集合定义在 XML 文件里面，View 对象背景颜色的选择取决于自身当前的状态，View  对象的每一种状态可以设置不同的背景色。

Android 的 selector 要在 drawable 下进行配置，常见的属性有：

| XML 属性                       | 说明                                 |
| ------------------------------ | ------------------------------------ |
| `android:state_pressed`        | 当被单击时显示该图片                 |
| `android:state_focused`        | 获得焦点时显示                       |
| `android:state_selected`       | 当被选择时显示                       |
| `android:state_checkable`      | 当 CheckBox 能使用时显示             |
| `android:state_checked`        | 当 CheckBox 选中时显示               |
| `android:state_enabled`        | 当该组件能使用时显示                 |
| `android:state_window_focused` | 当此 activity 获得焦点在最前面时显示 |

> 注意：
>
> - 并不是所有的 View 子类都拥有八种状态，例如 Button 对象，拥有  pressed、enabled、window_focused、default 四种状态
> - 如果控件设置了多种状态。排放顺序依次为： `pressed -> focused -> selected -> checkable -> checked -> enabled -> window_focused -> default` 
> - 匹配的第一项将会作为当前 View 对象的背景颜色，结束匹配。如果第一项每次都能匹配到，就不会向下匹配，那么之后的状态也就失效了，然而每个 View 对象都有默认的状态，因此 **需要将默认状态放在最后**。

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="@color/btn_press"/>
    <stroke android:color="@color/btn_press"/>
    <corners android:radius="15dp"/>
</shape>
```

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="@color/btn_unpress"/>
    <stroke android:color="@color/btn_unpress"/>
    <corners android:radius="5dp"/>
</shape>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:state_pressed="false"
        android:drawable="@drawable/btn_unpress">
    </item>
    <item
            android:state_pressed="true"
            android:drawable="@drawable/btn_press">
    </item>
</selector>
```

### 1.3 实战-登录页面布局美化

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="#16646A64" />  <!-- 填充颜色 -->
    <stroke android:color="#000000" /> <!-- 边框颜色 -->
    <corners android:radius="10dp" />   <!-- 圆角半径 -->
</shape>
```

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="@color/btn_press"/>
    <stroke android:color="@color/btn_press"/>
    <corners android:radius="15dp"/>
</shape>
```

```xml
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <solid android:color="@color/btn_unpress"/>
    <stroke android:color="@color/btn_unpress"/>
    <corners android:radius="5dp"/>
</shape>
```

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:state_pressed="false"
        android:drawable="@drawable/btn_unpress">
    </item>
    <item
            android:state_pressed="true"
            android:drawable="@drawable/btn_press">
    </item>
</selector>

```

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:background="#FFFFFF"
              android:orientation="vertical"
              tools:context=".MainActivity">

    <!--头像-->
    <ImageButton
            android:id="@+id/iv_head"
            android:layout_width="70dp"
            android:layout_height="70dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginTop="70dp"
            android:background="@drawable/avata"/>

    <!--用户名-->
    <EditText
            android:id="@+id/et_user_name"
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:background="@drawable/rectangle_shape"
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
            android:id="@+id/et_psw"
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:background="@drawable/rectangle_shape"
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
            android:id="@+id/btn_login"
            android:layout_width="fill_parent"
            android:layout_height="40dp"
            android:layout_gravity="center_horizontal"
            android:layout_marginLeft="35dp"
            android:layout_marginRight="35dp"
            android:layout_marginTop="15dp"
            android:background="@drawable/btn_selector"
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

        ImageButton button = findViewById(R.id.iv_head);

        button.setOnClickListener(v -> Toast.makeText(MainActivity.this,"您点击了登陆图标",Toast.LENGTH_SHORT).show());
    }
}
```



## 二、对话框

对话框是一个漂浮在 Acticity 之上的小窗口，此时，Activity 会失去焦点，对话框获取用户的所有交互。对话框通常用于通知，它会临时打断用户，执行一些与应用程序相关的小任务，例如，任务执行进度或登陆提示等。在 Android 中，提供了丰富的对话框支持，主要分为：

- AlertDialog 警示框，功能最丰富、应用最广的对话框，该对话框可以包含 0~3 个按钮，或者是包含复选框或单选按钮的列表
- ProgressDialog 进度条对话框，主要用于显示进度信息，以进度环或进度条的形式显示任务执行进度，该类继承于 AlertDialog 也可添加按钮
- DatePickerDialog 日期选择对话框
- TimePickerDialog 时间选择对话框

除此之外，Android 也支持用户创建自定义的对话框，只需要继承 Dialog 基类，或者是 Dialog 的子类，然后定义一个新的布局就可以了。

### 2.1 警示框

AlertDialog 是 Dialog 的子类，它能创建大部分用户交互的对话框，也是系统推荐到对话框类型。创建 AlertDialog 对话框的方式有两种，第一种是通过 Activity 的 onCreateDialog() 方法进行创建，通过 showDialog() 进行显示（但该方法已经在 Android 4.1 版本中废弃） 因此我们主要使用第二种（通过 AlertDialog 的内部类 Builder 对象创建）具体步骤如下：

1. 创建 AlertDialog.Builder 对象，该对象是 AlertDialog 的创建器。
2. 调用 AlertDialog.Builder 的方法，为对话框设置图标、标题、内容等。
3. 调用 AlertDialog.Builder 的 create() 方法创建 AlterDialog 对话框
4. 调用 AlertDialog.Builder 的 show() 方法，显示对话框。

Builder 类中主要的方法及其作用：

|                             方法                             |                             说明                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                   `setTitle(String title)`                   |                      设置对话框的标题。                      |
|                 `setMessage(String message)`                 |                    设置对话框的消息内容。                    |
| `setPositiveButton(String text, DialogInterface.OnClickListener listener)` | 设置对话框的确认按钮，text参数表示按钮上显示的文本，listener参数表示按钮点击后的回调动作。 |
| `setNegativeButton(String text, DialogInterface.OnClickListener listener)` | 设置对话框的取消按钮，text参数表示按钮上显示的文本，listener参数表示按钮点击后的回调动作。 |
| `setNeutralButton(String text, DialogInterface.OnClickListener listener)` | 设置对话框的中立按钮，text参数表示按钮上显示的文本，listener参数表示按钮点击后的回调动作。 |
| `setItems(CharSequence[] items, DialogInterface.OnClickListener listener)` | 设置对话框显示一个列表，items参数表示要显示的列表项，listener参数表示列表项点击后的回调动作。 |
| `setSingleChoiceItems(CharSequence[] items, int checkedItem, DialogInterface.OnClickListener listener)` | 设置对话框显示一个单选列表，items参数表示要显示的列表项，checkedItem参数表示默认选中的列表项，listener参数表示列表项点击后的回调动作。 |
| `setMultiChoiceItems(CharSequence[] items, boolean[] checkedItems, DialogInterface.OnMultiChoiceClickListener listener)` | 设置对话框显示一个多选列表，items参数表示要显示的列表项，checkedItems参数表示默认选中的列表项，listener参数表示列表项点击后的回调动作。 |
|                     `setView(View view)`                     |              设置对话框显示一个自定义的 View。               |

> Builder 中的很多方法返回值仍为 Builder ，因此我们可以通过 链式调用 的方式进行代码的编写。

### 普通对话框

AlertDialog 是 Android 提供的一个对话框（Dialog）类，用于在应用程序中显示弹出式对话框。它可以用来向用户展示重要的信息、获取用户的确认或取消操作、显示列表选项、接收用户的输入等。

AlertDialog 可以显示一个带有标题、消息内容和按钮的对话框。常见的按钮包括确认按钮、取消按钮和中立按钮，用户可以通过点击这些按钮来执行相应的操作。此外，AlertDialog 还可以显示列表，包括单选列表和多选列表，供用户进行选择。

AlertDialog 提供了灵活的构建方式，可以通过 Builder 模式来创建和配置对话框。使用 Builder 可以设置对话框的标题、消息内容、按钮的文本和点击事件、列表项内容和点击事件等。通过 Builder，可以轻松地定制对话框的外观和行为。

AlertDialog 在 Android 开发中广泛使用，可以用于各种场景，例如：

- 显示提示信息或警告信息，例如删除确认对话框。
- 引导用户进行某项操作，例如引导用户登录或注册。
- 显示列表供用户选择，例如选择语言或主题。
- 接收用户的输入，例如输入用户名和密码。

```xml
    <Button
            android:id="@+id/btn_common_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:text="@string/commonDialog"
            android:background="@color/white"
            android:textColor="#A52C2C"
            android:textSize="15sp"/>
```

```java
	Button processDialog = findViewById(R.id.btn_common_dialog);
	showProcessDialog(commonDialog);
	/**
     * 普通对话框
     *
     * @param button commonDialog
     */
    public void showCommonDialog(Button button) {
        button.setOnClickListener(v -> {
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(MainActivity.this);
            alertDialogBuilder
                    .setTitle("commonDialog")
                    .setIcon(R.drawable.ic_launcher_background)
                    .setMessage("恭喜您支付成功")
                    .setNegativeButton("取消", (dialog, which) -> Toast.makeText(MainActivity.this, "您单击了取消按钮", Toast.LENGTH_SHORT).show())
                    .setPositiveButton("确定", (dialog, which) -> Toast.makeText(MainActivity.this, "您单击了确定按钮", Toast.LENGTH_SHORT).show()).create().show();
        });
    }
```



### 单选对话框

```xml
    <Button
            android:id="@+id/btn_single_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:text="@string/singleDialog"
            android:background="@color/white"
            android:textColor="#9D25B1"
            android:textSize="15sp"/>
```

```java
	Button processDialog = findViewById(R.id.btn_single_dialog);
	showProcessDialog(singleDialog);
	/**
     * 单选对话框
     *
     * @param button singleDialog
     */
    public void showSingleDialog(Button button) {
        String[] items = {"男", "女"};
        boolean[] checkedItems = {true, false};

        button.setOnClickListener(v -> {
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(MainActivity.this);
            alertDialogBuilder
                    .setTitle("单选对话框")
                    .setSingleChoiceItems(items, 0, (dialog, which) -> {
                        for (int i = 0; i < checkedItems.length; i++) {
                            checkedItems[i] = false;
                        }
                        checkedItems[which] = true;
                    })
                    .setNegativeButton("取消", (dialog, which) -> dialog.dismiss())
                    .setPositiveButton("确定", (dialog, which) -> {
                        String str = "";
                        for (int i = 0; i < checkedItems.length; i++) {
                            if (checkedItems[i]) {
                                str = items[i];
                            }
                        }
                        Toast.makeText(MainActivity.this, "您选择了" + str, Toast.LENGTH_SHORT).show();
                    }).create().show();
        });
    }
```

### 复选对话框

```xml
    <Button
            android:id="@+id/btn_multiple_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:text="@string/multipleDialog"
            android:background="@color/white"
            android:textColor="#E3316D"
            android:textSize="15sp"/>
```

```java
	Button processDialog = findViewById(R.id.btn_multiple_dialog);
	showProcessDialog(multipleDialog);
	/**
     * 多选对话框
     *
     * @param button multipleDialog
     */
    public void showMultipleDialog(Button button) {
        String[] items = {"数学", "语文", "英语", "政治"};
        boolean[] checkedItems = {false, true, false, false};

        button.setOnClickListener(v -> {
            AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(MainActivity.this);
            alertDialogBuilder
                    .setTitle("多选对话框")
                    .setMultiChoiceItems(items, checkedItems, (dialog, which, isChecked) -> {
                        if (isChecked) {
                            checkedItems[which] = true;
                        } else {
                            checkedItems[which] = false;
                            Toast.makeText(MainActivity.this, "您取消了" + items[which], Toast.LENGTH_SHORT).show();
                        }
                    })
                    .setNegativeButton("取消", (dialog, which) -> dialog.dismiss())
                    .setPositiveButton("确定", (dialog, which) -> {
                        StringBuilder str = new StringBuilder();
                        for (int i = 0; i < checkedItems.length; i++) {
                            if (checkedItems[i]) {
                                str.append(items[i]);
                            }
                        }
                        Toast.makeText(MainActivity.this, "您选择了" + str, Toast.LENGTH_SHORT).show();
                    }).create().show();
        });
    }

```

### 2.2 进度对话框

ProgressDialog 是 Android 提供的一个对话框（Dialog）类，用于在应用程序中显示一个进度条对话框，用于表示正在进行的任务的进度。

ProgressDialog 提供了一个简单的方式来显示任务的进度，并向用户传达任务正在进行中的信息。它通常用于以下场景：

1. 后台任务加载：当应用程序需要加载大量数据或执行耗时的任务时，可以使用 ProgressDialog 显示一个进度条，以向用户展示任务的进度，让用户知道任务正在进行中。
2. 网络请求：在进行网络请求时，可以使用 ProgressDialog 显示一个进度条，以告知用户请求正在进行中，并提供一个视觉上的反馈，让用户知道任务的进度。
3. 文件下载/上传：在下载或上传文件时，可以使用 ProgressDialog 显示一个进度条，以显示文件的下载或上传进度，让用户了解任务的进度。

ProgressDialog 可以通过调用 `show()` 方法显示进度条对话框，并通过设置进度条的进度、标题、消息等属性来定制对话框的外观和行为。当任务完成或需要取消对话框时，可以调用 `dismiss()` 方法来隐藏进度条对话框。

### 进度环

```xml
    <Button
            android:id="@+id/btn_simple_process_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:text="@string/simpleProcessDialog"
            android:background="@color/white"
            android:textColor="#6CBAF8"
            android:textSize="15sp"/>
```

```java
	Button processDialog = findViewById(R.id.btn_simple_process_dialog);
	showProcessDialog(simpleProcessDialog);
	/**
     * 不带进度条的对话框
     *
     * @param button simpleProcessDialog
     */
    public void showSimpleProcessDialog(Button button) {
        button.setOnClickListener(v -> {
            ProgressDialog progressDialog = new ProgressDialog(MainActivity.this);
            progressDialog.setTitle("不带进度条的对话框");
            progressDialog.setMessage("正在加载");
            progressDialog.show();
        });

    }
```

### 进度条


```xml
    <Button
            android:id="@+id/btn_process_dialog"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginTop="5dp"
            android:text="@string/processDialog"
            android:background="@color/white"
            android:textColor="#B69C4D"
            android:textSize="15sp"/>
```

```java
    
	Button processDialog = findViewById(R.id.btn_process_dialog);
	showProcessDialog(processDialog);
	/**
     * 带进度条的对话框
     *
     * @param button processDialog
     */
    public void showProcessDialog(Button button) {
        button.setOnClickListener(v -> {
            ProgressDialog dialog = new ProgressDialog(MainActivity.this);

            dialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
            dialog.setTitle("带进度条的对话框");
            dialog.setMessage("正在加载");
            dialog.setMax(200);
            dialog.show();
            new Thread(() -> {
                for (int i = 0; i <= 200; i++) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    dialog.setProgress(i);
                }
            }).start();
        });
    }
```
### 2.3 实战演练-支付对话框

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical"
              tools:context=".MainActivity">

    <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_marginVertical="15dp"
            android:layout_marginBottom="8dp"
            android:gravity="center"
            android:text="付款详情"
            android:textSize="30sp"/>

    <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="#A8A8A8"/>

    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginTop="10dp"
            android:layout_marginBottom="10dp"
            android:orientation="horizontal"
            android:paddingLeft="10dp">

        <ImageView
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:src="@drawable/ali_pay"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:gravity="center_vertical"
                android:paddingLeft="20dp"
                android:text="支付宝"
                android:textColor="#A6A6A6"
                android:textSize="25sp"/>

    </LinearLayout>

    <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="#A8A8A8"/>

    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginTop="10dp"
            android:layout_marginBottom="10dp"
            android:orientation="horizontal"
            android:paddingLeft="10dp">

        <ImageView
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:src="@drawable/wx_pay"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:gravity="center_vertical"
                android:paddingLeft="20dp"
                android:text="微信支付"
                android:textColor="#A6A6A6"
                android:textSize="25sp"/>

    </LinearLayout>


    <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="#A8A8A8"/>

    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="60dp"
            android:layout_marginTop="10dp"
            android:layout_marginBottom="10dp"
            android:orientation="horizontal"
            android:paddingLeft="10dp">

        <ImageView
                android:layout_width="60dp"
                android:layout_height="60dp"
                android:src="@drawable/card_pay"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="match_parent"
                android:gravity="center_vertical"
                android:paddingLeft="20dp"
                android:text="银行卡"
                android:textColor="#A6A6A6"
                android:textSize="25sp"/>
    </LinearLayout>

    <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="#A8A8A8"/>

    <TextView
            android:id="@+id/tv_sum"
            android:layout_width="match_parent"
            android:layout_height="40dp"
            android:gravity="center_vertical|right"
            android:text="需付款？50元"
            android:textColor="#A8A8A8"
            android:paddingRight="10dp"
            android:textSize="20sp"/>

    <View
            android:layout_width="match_parent"
            android:layout_height="0.5dp"
            android:background="#A8A8A8"/>

    <Button
            android:id="@+id/btn_submit"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="确认支付"
            android:textSize="20sp"/>

</LinearLayout>
```

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button submit = findViewById(R.id.btn_submit);


        submit.setOnClickListener(v -> {
            AlertDialog.Builder payBbuilder = new AlertDialog.Builder(MainActivity.this);

            TextView textV = findViewById(R.id.tv_sum);
            textV.setText("需付款？ 100 元");

            payBbuilder
                    .setTitle("Ask")
                    .setIcon(R.drawable.manner)
                    .setMessage("是否支付")
                    .setPositiveButton("确认支付", (dialog, which) -> {
                        AlertDialog.Builder sucBuilder = new AlertDialog.Builder(MainActivity.this);
                        sucBuilder
                                .setTitle("恭喜您支付成功")
                                .setPositiveButton("确定", (dialog1, which1) -> {
                                    Toast.makeText(MainActivity.this, "欢迎下次光临", Toast.LENGTH_SHORT).show();
                                })
                                .create().show();
                    })
                    .setNegativeButton("取消支付", (dialog, which) -> Toast.makeText(MainActivity.this, "您取消了支付", Toast.LENGTH_SHORT).show())
                    .create().show();
        });
    }
}
```

## 三、事件监听

### 3.1 基于监听的事件处理

#### 匿名内部类方式

```xml
    <Button
            android:id="@+id/main_btn_eventV4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/v1"/>
```

```java
        Button v1 = findViewById(R.id.main_btn_eventV1);
        v1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(MainActivity.this, "匿名内部类 V1", Toast.LENGTH_SHORT).show();

            }
        });
```
#### 内部类方式

```xml
    <Button
            android:id="@+id/main_btn_eventV4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/v2"/>
```

```java
        Button v2 = findViewById(R.id.main_btn_eventV2);
 	 /**
     * 内部类
     */
    class InnerCustomListener implements View.OnClickListener{
        @Override
        public void onClick(View v) {
            Toast.makeText(MainActivity.this, "内部类 V2", Toast.LENGTH_SHORT).show();

        }
    }
		v2.setOnClickListener(new InnerCustomListener());
```
#### 外部类方式

```xml
    <Button
            android:id="@+id/main_btn_eventV4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/v3"/>
```

```java
public class OuterCustomListener implements View.OnClickListener {
    private Context context;

    public OuterCustomListener(Context context) {
        super();
        this.context = context;
    }

    @Override
    public void onClick(View v) {
        Toast.makeText(context, "外部类 V3", Toast.LENGTH_SHORT).show();
    }
}
```
```java
Button v3 = findViewById(R.id.main_btn_eventV3);
v3.setOnClickListener(new OuterCustomListener(MainActivity.this));
```



#### Lambda | 匿名内部类 方式

```xml
    <Button
            android:id="@+id/main_btn_eventV4"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/v4"/>
```

```java
        v4.setOnClickListener(v -> {
            Toast.makeText(MainActivity.this, "Lambda 方式 | 匿名内部类 V4", Toast.LENGTH_SHORT).show();

        });
```



### 3.2 直接绑定到标签

```xml
    <Button
            android:id="@+id/main_btn_eventV5"
            android:onClick="v5"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/v5"/>
```

```java
    /**
     * 直接绑定到标签
     * @param view view
     */
    public void v5(View view) {
        Toast.makeText(MainActivity.this, "直接绑定到标签 V5", Toast.LENGTH_SHORT).show();
    }
```



### 3.3 Handler 消息传递机制

TODO

### 3.4 实战-个人中心页面

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              xmlns:app="http://schemas.android.com/apk/res-auto"
              xmlns:tools="http://schemas.android.com/tools"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical"
              tools:context=".MainActivity">

    <LinearLayout
            android:id="@+id/ll_head"
            android:layout_width="match_parent"
            android:layout_height="200dp"
            android:background="#3F51B5"
            android:orientation="vertical">

        <ImageButton
                android:onClick="login"
                android:layout_width="70dp"
                android:layout_height="70dp"
                android:layout_gravity="center_horizontal"
                android:scaleType="centerCrop"
                android:layout_marginTop="40dp"
                android:background="#0000"
                android:src="@drawable/avata"/>

        <TextView
                android:id="@+id/tv_login"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center_horizontal"
                android:layout_marginTop="10dp"
                android:text="单击登录"
                android:textColor="@color/white"
                android:textSize="16sp"/>
    </LinearLayout>

    <RelativeLayout
            android:id="@+id/rl_order"
            android:layout_width="match_parent"
            android:layout_height="45dp"
            android:background="#F7F8F8"
            android:gravity="center_vertical"
            android:paddingLeft="10dp"
            android:paddingRight="10dp">

        <ImageView
                android:id="@+id/iv_order"
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:src="@drawable/password"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:layout_toRightOf="@+id/iv_order"
                android:text="我的订单"
                android:textColor="#A3A3A3"
                android:textSize="16sp"/>

        <ImageView
                android:layout_width="15dp"
                android:layout_height="15dp"
                android:layout_alignParentRight="true"
                android:layout_centerVertical="true"
                android:layout_marginRight="25dp"
                android:src="@drawable/username"/>

        <View
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:background="#E3E3E3"/>

    </RelativeLayout>
    <RelativeLayout
            android:id="@+id/rl_address"
            android:layout_width="match_parent"
            android:layout_height="45dp"
            android:background="#F7F8F8"
            android:gravity="center_vertical"
            android:paddingLeft="10dp"
            android:paddingRight="10dp">

        <ImageView
                android:id="@+id/iv_address"
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:src="@drawable/password"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:layout_toRightOf="@+id/iv_address"
                android:text="我的地址"
                android:textColor="#A3A3A3"
                android:textSize="16sp"/>

        <ImageView
                android:layout_width="15dp"
                android:layout_height="15dp"
                android:layout_alignParentRight="true"
                android:layout_centerVertical="true"
                android:layout_marginRight="25dp"
                android:src="@drawable/username"/>

        <View
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:background="#E3E3E3"/>

    </RelativeLayout>
    <RelativeLayout
            android:id="@+id/rl_logout"
            android:layout_width="match_parent"
            android:layout_height="45dp"
            android:background="#F7F8F8"
            android:gravity="center_vertical"
            android:paddingLeft="10dp"
            android:paddingRight="10dp">

        <ImageView
                android:id="@+id/iv_logout"
                android:layout_width="20dp"
                android:layout_height="20dp"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:src="@drawable/password"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_centerVertical="true"
                android:layout_marginLeft="25dp"
                android:layout_toRightOf="@+id/iv_logout"
                android:text="退出登录"
                android:textColor="#A3A3A3"
                android:textSize="16sp"/>

        <ImageView
                android:layout_width="15dp"
                android:layout_height="15dp"
                android:layout_alignParentRight="true"
                android:layout_centerVertical="true"
                android:layout_marginRight="25dp"
                android:src="@drawable/username"/>

        <View
                android:layout_width="match_parent"
                android:layout_height="1dp"
                android:background="#E3E3E3"/>

    </RelativeLayout>


</LinearLayout>
```

```java
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.Toast;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    private RelativeLayout rlOrder, rlAddress, rlLogout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        rlOrder = findViewById(R.id.rl_order);
        rlAddress = findViewById(R.id.rl_address);
        rlLogout = findViewById(R.id.rl_logout);

        rlOrder.setOnClickListener(view -> {
            dialog("下一步将查询个人订单");
        });
        rlAddress.setOnClickListener(view -> {
            dialog("下一步将编辑个人地址");
        });
        rlLogout.setOnClickListener(view -> {
            dialog("下一步将退出登录");
        });
    }

    public void login(View view) {
        dialog("下一步将跳转到登陆页面");
    }


    private void dialog(String msg) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder
                .setMessage(msg)
                .setPositiveButton("确定", (dialogInterface, i) -> {
                    Toast.makeText(this, msg, Toast.LENGTH_SHORT).show();
                }).create().show();
    }
}
```



