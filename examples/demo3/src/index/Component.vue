<template>
    <!-- className 属性用来测试 -->
    <div className="cnt2">
        <div class="group" v-for="item in list" :key="item">
            <div class="label">{{item}}</div>
            <view class="comp">
                <div v-if="item === 'normal'">
                    <div>
                        <div class="inline">hello </div>
                        <div class="inline">world!</div>
                    </div>
                    <div>
                        <a class="margin-left-10 block" href="javascript: void(0)">fake jump</a>
                    </div>
                </div>
                <!-- 可使用 html 标签替代的内置组件 -->
                <div v-else-if="item === 'img'">
                    <img src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg" width="50" height="50"
                        @load="onImgLoad" />
                    <img src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg" mode="top" width="50"
                        height="50" @load="onImgLoad" />
                </div>
                <div v-else-if="item === 'input'">
                    <input type="text" placeholder="请输入文本内容" @input="onInput" v-model="input.inputText"
                        @change="onInputChange" />
                    <input type="number" placeholder="请输入数字内容" @input="onInput" v-model="input.inputNumber"
                        data-is-number="yes" />
                    <input type="radio">
                    <label>
                        <input type="radio" name="radio" value="radio1" @input="onInput" v-model="input.inputRadio"  @change="onLabelChange"/>
                        aaaa
                    </label>
                    <label>
                        <input type="radio" name="radio" value="radio2" @input="onInput" v-model="input.inputRadio"  @change="onLabelChange"/>
                        bbbb
                    </label>
                    <input type="checkbox" @input="onInput" v-model="input.inputCheckbox" />
                    <input type="hidden" value="I am Hidden" />
                </div>
                <textarea v-else-if="item === 'textarea'" class="textarea-node" style="height: 30px;"
                    placeholder="请输入内容" maxlength="50" :auto-height="true" adjust-position="" value="我是 textarea"
                    @input="onTextareaInput" />

                <div v-else-if="item === 'label'">
                    <div>
                        <label>
                            <div>输入框1</div>
                            <input placeholder="输入框1" @change="onLabelChange"/>
                        </label>
                    </div>
                    <div style="display: flex;align-items: center;">
                        <label for="input2">
                        <div>输入框2</div>
                        </label>
                        <input id="input2" placeholder="输入框2" @change="onLabelChange"/>
                    </div>
                    <label>
                        <text>radio1</text>
                        <input name="label-radio" type="radio" checked="checked" @change="onLabelChange"/>
                    </label>
                    <label for="input3">
                        <text>radio2</text>
                    </label>
                    <input name="label-radio" type="radio" id="input3" @change="onLabelChange"/>
                    <label>
                        <text>checkbox1</text>
                        <input type="checkbox" @change="onLabelChange"/>
                    </label>
                    <label for="input4">
                        <text>checkbox2</text>
                    </label>
                    <input type="checkbox" id="input4" @change="onLabelChange"/>
                    <label>
                        <text>switch1</text>
                        <template>
                            <builtin-component v-if="!builtinPrefix" behavior="switch" @change="onLabelChange"></builtin-component>
                            <switch v-else class="switch-node" @change="onLabelChange"></switch>
                        </template>
                    </label>
                    <label for="switch2">
                        <text>switch2</text>
                    </label>
                    <template>
                        <builtin-component v-if="!builtinPrefix" behavior="switch" id="switch2" @change="onLabelChange"></builtin-component>
                        <switch v-else id="switch2" @change="onLabelChange"></switch>
                    </template>
                </div>

                <video v-else-if="item === 'video'" class="video" src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400" :muted="true" :show-mute-btn="true" :controls="true">
                </video>

                <canvas
                    v-else-if="item === 'canvas'"
                    class="canvas"
                    ref="canvas"
                    type="2d"
                    width="300"
                    height="200"
                    @touchstart="onCanvasTouchStart('normal', $event)"
                    @canvastouchstart="onCanvasTouchStart('canvas', $event)"
                    @longtap="onCanvasLongTap"
                ></canvas>

                <div v-else-if="item === 'select'">
                <select v-model="select.selected" @change="onSelectChange">
                    <option disabled value="">请选择</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                </select>
                <span>Selected: {{select.selected}}</span>
                </div>

                <!-- 使用 builtin-component 来创建内置组件 -->
                <template v-else-if="item === 'view'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item">我是视图</builtin-component>
                    <view v-else-if="builtinPrefix === 1">我是视图</view>
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :hidden="true">我是 hidden 视图</builtin-component>
                    <view v-else-if="builtinPrefix === 1" :hidden="true">我是 hidden 视图</view>
                </template>

                <template v-else-if="item === 'text'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :selectable="true">{{'this is first line\nthis is second line'}}</builtin-component>
                    <text v-else-if="builtinPrefix === 1" :selectable="true">{{'this is first line\nthis is second line'}}</text>
                </template>
                <template v-else-if="item === 'rich-text'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :nodes="richText.nodes"></builtin-component>
                    <rich-text v-else-if="builtinPrefix === 1" :nodes="richText.nodes"></rich-text>
                </template>

                <div v-else-if="item === 'swiper'" class="swiper">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="5000" :duration="500" @change="onSwiperChange">
                        <builtin-component behavior="swiper-item" class="swiper-item-1" item-id="1"><span>A</span></builtin-component>
                        <builtin-component behavior="swiper-item" class="swiper-item-2" item-id="2"><span>B</span></builtin-component>
                        <builtin-component behavior="swiper-item" class="swiper-item-3" item-id="3"><span>C</span></builtin-component>
                        <div>不会被渲染</div>
                    </builtin-component>
                    <swiper v-else-if="builtinPrefix === 1" :class="item" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="5000" :duration="500" @change="onSwiperChange">
                        <swiper-item class="swiper-item-1" item-id="1"><span>A</span></swiper-item>
                        <swiper-item class="swiper-item-2" item-id="2"><span>B</span></swiper-item>
                        <swiper-item class="swiper-item-3" item-id="3"><span>C</span></swiper-item>
                        <div>不会被渲染</div>
                    </swiper>
                    <div>
                        <switch name="switch-a" :checked="swiper.indicatorDots" @change="swiper.indicatorDots = !swiper.indicatorDots" /> 指示点
                    </div>
                    <div>
                        <switch name="switch-a" :checked="swiper.autoplay" @change="swiper.autoplay = !swiper.autoplay" /> 自动播放
                    </div>
                </div>

                <template v-else-if="item === 'movable'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" :scale-area="true">
                        <builtin-component ref="movable-view" class="movable-view" behavior="movable-view" direction="all" :inertia="true" :out-of-bounds="true" :x="movable.x" :y="movable.y" :scale-value="movable.scaleValue" :scale="true" @change="onMovableChange" @scale="onMovableScale"><span>text</span></builtin-component>
                        <builtin-component class="movable-view" behavior="movable-view" direction="all" :x="0" :y="0">plaintext</builtin-component>
                    </builtin-component>
                    <movable-area v-else-if="builtinPrefix === 1" :class="item" :scale-area="true">
                        <movable-view ref="movable-view" class="movable-view" direction="all" :inertia="true" :out-of-bounds="true" :x="movable.x" :y="movable.y" :scale-value="movable.scaleValue" :scale="true" @change="onMovableChange" @scale="onMovableScale"><span>text</span></movable-view>
                        <movable-view class="movable-view" direction="all" :x="0" :y="0">plaintext</movable-view>
                    </movable-area>
                    <button @click="onClickMovableMove">move to (30px, 30px)</button>
                    <button @click="onClickMovableScale">scale to 3.0</button>
                </template>
                <template v-else-if="item === 'form'">
                    <!-- form 组件 -->
                    <form :report-submit="true" @submit="onFormSubmit" @reset="onFormReset">
                        <div>
                            <div>form 组件</div>
                            <input type="text" name="text-a" value="text value" />
                            <input type="text" value="text value2" />
                            <input type="number" name="number-a" value="123" />
                            <textarea name="textare-a" value="textare value" />
                            <switch name="switch-a" :checked="true" />
                            <slider name="slider-a" min="50" max="200" :show-value="true" />
                            <picker name="picker-a" :value="1" :range="['美国', '中国', '巴西', '日本']">点击&nbsp;&nbsp;选择国家</picker>
                            <label><input type="radio" name="radio-a" value="radio1" :checked="true" />radio1</label>
                            <label><input type="radio" name="radio-a" value="radio2" />radio2</label>
                            <label><input type="checkbox" name="checkbox-a" value="checkbox1" :checked="true" />checkbox1</label>
                            <label><input type="checkbox" name="checkbox-a" value="checkbox2" :checked="true" />checkbox2</label>
                            <label><input type="checkbox" name="checkbox-a" value="checkbox3" />checkbox3</label>
                            <input type="hidden" name="hidden-a" value="hidden value" />
                            <button type="submit">submit（普通标签）</button>
                            <button type="reset">reset（普通标签）</button>
                            <button>什么也不做（普通标签）</button>
                            <button form-type="submit">submit（内置组件）</button>
                            <button form-type="reset">reset（内置组件）</button>
                            <button>什么也不做（内置组件）</button>
                        </div>
                    </form>
                    <!-- form 标签 -->
                    <form @submit="onFormSubmit" @reset="onFormReset">
                        <div>
                            <div>form 标签</div>
                            <input type="text" name="text-b" value="text value" />
                            <input type="text" value="text value2" />
                            <input type="number" name="number-b" value="123" />
                            <textarea name="textare-b" value="textare value" />
                            <switch name="switch-b" :checked="true" />
                            <slider name="slider-b" min="50" max="200" :show-value="true" />
                            <picker name="picker-a" :value="1" :range="['美国', '中国', '巴西', '日本']">点击&nbsp;&nbsp;选择国家</picker>
                            <label><input type="radio" name="radio-b" value="radio1" :checked="true" />radio1</label>
                            <label><input type="radio" name="radio-b" value="radio2" />radio2</label>
                            <label><input type="checkbox" name="checkbox-b" value="checkbox1" :checked="true" />checkbox1</label>
                            <label><input type="checkbox" name="checkbox-b" value="checkbox2" :checked="true" />checkbox2</label>
                            <label><input type="checkbox" name="checkbox-b" value="checkbox3" />checkbox3</label>
                            <input type="hidden" name="hidden-b" value="hidden value" />
                            <button type="submit">submit（普通标签）</button>
                            <button type="reset">reset（普通标签）</button>
                            <button>什么也不做（普通标签）</button>
                            <button form-type="submit">submit（内置组件）</button>
                            <button form-type="reset">reset（内置组件）</button>
                            <button>什么也不做（内置组件）</button>
                        </div>
                    </form>
                </template>
                <template v-else-if="item === 'button'">
                    <!-- className 属性用来测试 -->
                    <builtin-component v-if="!builtinPrefix" :behavior="item" className="button-custom" open-type="share">分享</builtin-component>
                    <button v-else-if="builtinPrefix === 1" className="button-custom" open-type="share">分享</button>

                    <builtin-component v-if="!builtinPrefix" :behavior="item" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号</builtin-component>
                    <button v-else-if="builtinPrefix === 1" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">获取手机号</button>

                    <builtin-component v-if="!builtinPrefix" :behavior="item">
                        <span>span1</span>
                        <input type="checkbox"/>
                        <span>span2</span>
                    </builtin-component>
                    <button v-else-if="builtinPrefix === 1">
                        <span>span1</span>
                        <input type="checkbox"/>
                        <span>span2</span>
                    </button>
                </template>
                <template v-else-if="item === 'image'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></builtin-component>
                    <image v-else-if="builtinPrefix === 1" src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></image>
                </template>
                <template v-else-if="item === 'icon'">
                    <div v-if="!builtinPrefix">
                        <div><builtin-component :behavior="item" v-for="subItem in icon.size" :key="subItem" type="success" :size="subItem"></builtin-component></div>
                        <div><builtin-component :behavior="item" v-for="subItem in icon.color" :key="subItem" type="success" size="40" :color="subItem"></builtin-component></div>
                        <div><builtin-component :behavior="item" v-for="subItem in icon.type" :key="subItem" :type="subItem" size="40"></builtin-component></div>
                    </div>
                    <div v-else-if="builtinPrefix === 1">
                        <div><icon v-for="subItem in icon.size" :key="subItem" type="success" :size="subItem"></icon></div>
                        <div><icon v-for="subItem in icon.color" :key="subItem" type="success" size="40" :color="subItem"></icon></div>
                        <div><icon v-for="subItem in icon.type" :key="subItem" :type="subItem" size="40"></icon></div>
                    </div>
                </template>
                <template v-else-if="item === 'progress'">
                    <div v-if="!builtinPrefix">
                        <builtin-component :behavior="item" percent="20" :show-info="true"></builtin-component>
                        <builtin-component :behavior="item" percent="40" stroke-width="12"></builtin-component>
                        <builtin-component :behavior="item" percent="60" color="pink"></builtin-component>
                        <builtin-component :behavior="item" percent="80" :active="true"></builtin-component>
                    </div>
                    <div v-else-if="builtinPrefix === 1">
                        <progress percent="20" :show-info="true"></progress>
                        <progress percent="40" stroke-width="12"></progress>
                        <progress percent="60" color="pink"></progress>
                        <progress percent="80" :active="true"></progress>
                    </div>
                </template>
                <template v-else-if="item === 'navigator'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" target="miniapp" open-type="exit">退出小程序</builtin-component>
                    <navigator v-else-if="builtinPrefix === 1" target="miniapp" open-type="exit">退出小程序</navigator>
                </template>
                <template v-else-if="item === 'picker'">
                    <div v-if="!builtinPrefix">
                        <builtin-component :behavior="item" :value="1" :range="['美国', '中国', '巴西', '日本']" @change="onPickerChange">点击&nbsp;&nbsp;选择国家</builtin-component>
                    </div>
                    <div v-else-if="builtinPrefix === 1">
                        <picker :value="1" :range="['美国', '中国', '巴西', '日本']" @change="onPickerChange">点击&nbsp;&nbsp;选择国家</picker>
                    </div>
                </template>

                <template v-else-if="item === 'picker-view'">
                    <div>{{pickerView.year}}年{{pickerView.month}}月{{pickerView.day}}日</div>
                    <div v-if="!builtinPrefix">
                        <builtin-component :behavior="item" indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="pickerView.value" @change="onPickerViewChange">
                        <builtin-component behavior="picker-view-column">
                            <div v-for="item in pickerView.years" :key="item">{{item}}年</div>
                        </builtin-component>
                        <builtin-component behavior="picker-view-column">
                            <div v-for="item in pickerView.months" :key="item">{{item}}月</div>
                        </builtin-component>
                        <builtin-component behavior="picker-view-column">
                            <div v-for="item in pickerView.days" :key="item">{{item}}日</div>
                        </builtin-component>
                        </builtin-component>
                    </div>
                    <div v-else-if="builtinPrefix === 1">
                        <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="pickerView.value" @change="onPickerViewChange">
                            <picker-view-column>
                                <view class="picker-view-item" v-for="item in pickerView.years" :key="item"><text>{{item}}年</text></view>
                            </picker-view-column>
                            <picker-view-column>
                                <view class="picker-view-item" v-for="item in pickerView.months" :key="item"><text>{{item}}月</text></view>
                            </picker-view-column>
                            <picker-view-column>
                                <view class="picker-view-item" v-for="item in pickerView.days" :key="item"><text>{{item}}日</text></view>
                            </picker-view-column>
                        </picker-view>
                    </div>
                </template>

                <template v-else-if="item === 'switch'">
                    <div v-if="!builtinPrefix">
                        <builtin-component :behavior="item" type="switch" :checked="true" @change="onSwitchChange"></builtin-component>
                        <builtin-component :behavior="item" type="checkbox" @change="onSwitchChange"></builtin-component>
                    </div>
                    <div v-else-if="builtinPrefix === 1">
                        <switch type="switch" :checked="true" @change="onSwitchChange"></switch>
                        <switch type="checkbox" @change="onSwitchChange"></switch>
                    </div>
                </template>

                <template v-else-if="item === 'slider'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" min="50" max="200" :show-value="true" @change="onSliderChange"></builtin-component>
                    <slider v-else-if="builtinPrefix === 1" min="50" max="200" :show-value="true" @change="onSliderChange"></slider>
                </template>

                <template v-else-if="item === 'map'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" :longitude="map.longitude" :latitude="map.latitude" :scale="map.scale" :controls="map.controls" :markers="map.markers" :polyline="map.polyline" :show-location="true" @markertap="onMapMarkerTap" @regionchange="onMapRegionChange" @controltap="onMapControlTap">
                    </builtin-component>

                    <map v-else-if="builtinPrefix === 1" :class="item" :longitude="map.longitude" :latitude="map.latitude" :scale="map.scale" :controls="map.controls" :markers="map.markers" :polyline="map.polyline" :show-location="true" @markertap="onMapMarkerTap" @regionchange="onMapRegionChange" @controltap="onMapControlTap">
                    </map>
                    <!-- 基础库暂未支持 regionchange 事件提供坐标和 scale，故注释 -->
                    <!-- <button @click="resetMap">reset</button> -->
                </template>

                <template v-else-if="item === 'cover-view'">
                    <compoennt v-if="!builtinPrefix" :behavior="item">测试 cover-view</compoennt>
                    <cover-view v-else-if="builtinPrefix === 1">测试 cover-view</cover-view>
                </template>
                <template v-else-if="item === 'cover-image'">
                    <builtin-component v-if="!builtinPrefix" behavior="cover-view">
                        <builtin-component :behavior="item" src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></builtin-component>
                    </builtin-component>
                    <cover-view v-else-if="builtinPrefix === 1">
                        <cover-image src="https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg"></cover-image>
                    </cover-view>
                </template>
                <!-- <template v-else-if="item === 'live-player'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" mode="live" :autoplay="true" src="rtmp://live.hkstv.hk.lxdns.com/live/hks" @statechange="onLivePlayerStateChange">
                        <Inner></Inner>
                    </builtin-component>
                    <live-player v-else-if="builtinPrefix === 1" :class="item" mode="live" :autoplay="true" src="rtmp://live.hkstv.hk.lxdns.com/live/hks" @statechange="onLivePlayerStateChange">
                        <Inner></Inner>
                    </live-player>
                </template> -->
                <!-- <template v-else-if="item === 'live-pusher'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" mode="RTC" :autopush="true" url="https://domain/push_stream" @statechange="onLivePusherStateChange">
                        <Inner></Inner>
                    </builtin-component>
                    <live-pusher v-else-if="builtinPrefix === 1" :class="item" mode="RTC" :autopush="true" url="https://domain/push_stream" @statechange="onLivePusherStateChange">
                        <Inner></Inner>
                    </live-pusher>
                </template> -->
                <template v-else-if="item === 'editor'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" placeholder="请输入内容" :show-img-size="true" :show-img-toolbar="true" :show-img-resize="true" @statuschange="onEditorStatusChange" @ready="onEditorReady"></builtin-component>
                    <editor v-else-if="builtinPrefix === 1" placeholder="请输入内容" :show-img-size="true" :show-img-toolbar="true" :show-img-resize="true" @statuschange="onEditorStatusChange" @ready="onEditorReady"></editor>
                </template>
                <template v-else-if="item === 'camera'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item">
                        <Inner></Inner>
                    </builtin-component>
                    <camera v-else-if="builtinPrefix === 1" :class="item">
                        <Inner></Inner>
                    </camera>
                </template>
                <template v-else-if="item === 'ad'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" unit-id="123" @error="onAdError"></builtin-component>
                    <ad v-else-if="builtinPrefix === 1" :class="item" unit-id="123" @error="onAdError"></ad>
                </template>
                <template v-else-if="item === 'official-account'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" @error="onOfficialAccountError"></builtin-component>
                    <official-account v-else-if="builtinPrefix === 1" :class="item" @error="onOfficialAccountError"></official-account>
                </template>

                <template v-else-if="item === 'web-view'">
                    <builtin-component v-if="!builtinPrefix" :behavior="item" :class="item" src="https://www.taobao.com/"></builtin-component>
                    <web-view v-else-if="builtinPrefix === 1" :class="item" src="https://www.taobao.com/"></web-view>
                </template>

                <template v-else-if="item === 'scroll-view'">
                    <div>
                        <builtin-component ref="scroll-view" v-if="!builtinPrefix" :behavior="item" :class="item + '-y'" :scroll-into-view="'y1' + scrollView.yDest" :scroll-top="scrollView.scrollTop" :scroll-y="true" :scroll-with-animation="scrollView.yAnimation" @scroll="onScrollViewScroll"><Inner2 type="y1"/></builtin-component>
                        <scroll-view ref="scroll-view" v-else-if="builtinPrefix === 1" :class="item + '-y'" :scroll-into-view="'y2' + scrollView.yDest" :scroll-top="scrollView.scrollTop" :scroll-y="true" :scroll-with-animation="scrollView.yAnimation" @scroll="onScrollViewScroll"><Inner2 type="y2"/></scroll-view>
                        <div class="scroll-view-btn" @click="onClickScrollViewYBtn">滚动到第三个滑块</div>
                        <div class="scroll-view-btn" @click="onClickScrollViewYTopBtn">滚动到 120px 处</div>
                        <div class="scroll-view-btn" @click="onClickScrollViewYAnimBtn">{{scrollView.yAnimation ? '关闭' : '打开'}}动画</div>
                    </div>
                    <div>
                        <builtin-component ref="scroll-view" v-if="!builtinPrefix" :behavior="item" :class="item + '-x'" :scroll-into-view="'x1' + scrollView.xDest" :scroll-x="true" :scroll-with-animation="true" @scroll="onScrollViewScroll"><Inner2 type="x1"/></builtin-component>
                        <scroll-view ref="scroll-view" v-else-if="builtinPrefix === 1" :class="item + '-x'" :scroll-into-view="'x2' + scrollView.xDest" :scroll-x="true" :scroll-with-animation="true" @scroll="onScrollViewScroll"><Inner2 type="x2"/></scroll-view>
                        <div class="scroll-view-btn" @click="onClickScrollViewXBtn">滚动到第二个滑块</div>
                    </div>
                </template>

                <!-- 不支持标签 -->
                <template v-else-if="item === 'xxxx'" >
                    <builtin-component v-if="!builtinPrefix" :behavior="item"></builtin-component>
                    <xxxx v-else-if="builtinPrefix === 1">不支持标签</xxxx>
                </template>

                <iframe v-else-if="item === 'iframe'"></iframe>
            </view>
        </div>
    </div>
</template>

<script>
import Inner from './Inner.vue'
import Inner2 from './Inner2.vue'

export default {
    name: 'Component',
    components: {
        Inner,
        Inner2,
    },
    props: {
        builtinPrefix: {
            type: Number,
            default: 1
        }
    },
    data() {
        const date = new Date()
        const years = []
        const months = []
        const days = []

        for (let i = 1990; i <= date.getFullYear(); i++) {
            years.push(i)
        }

        for (let i = 1; i <= 12; i++) {
            months.push(i)
        }

        for (let i = 1; i <= 31; i++) {
            days.push(i)
        }

        return {
            list: [
                'normal',
                'img',
                'input',
                'textarea',
                'select',
                'label',
                'video',
                'view',
                'text',
                'rich-text',
                'swiper',
                'movable',
                'canvas',
                'form',
                'button',
                'icon',
                'progress',
                'navigator',
                'picker',
                'picker-view',
                'switch',
                'slider',
                'image',
                'map',
                'cover-view',
                'cover-image',
                'live-player',
                'live-pusher',
                'camera',
                'editor',
                'ad',
                'official-account',
                'scroll-view',
                // 'web-view',
                'xxxx',
                // 'iframe',
            ],
            eventCount: 0,
            transition: false,
            icon: {
                size: [20, 30, 40, 50, 60, 70],
                color: ['red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple'],
                type: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear']
            },
            select: {
                selected: 'A',
            },
            input: {
                inputText: '',
                inputNumber: '',
                inputRadio: 'radio2',
                inputCheckbox: true,
            },
            map: {
                markers: [{
                    iconPath: 'https://i.loli.net/2019/07/27/5d3c141367f2784840.jpg',
                    id: 0,
                    latitude: 23.099994,
                    longitude: 113.324520,
                    width: 50,
                    height: 50,
                }],
                polyline: [{
                    points: [{
                        longitude: 113.3245211,
                        latitude: 23.10229,
                    }, {
                        longitude: 113.324520,
                        latitude: 23.21229,
                    }],
                    color: '#FF0000DD',
                    width: 2,
                    dottedLine: true,
                }],
                controls: [{
                    id: 1,
                    iconPath: 'https://i.loli.net/2019/07/27/5d3c143497e6d38917.jpg',
                    position: {
                        left: 0,
                        top: 300 - 50,
                        width: 50,
                        height: 50,
                    },
                    clickable: true,
                }],
            },
            scrollView: {
                yDest: '',
                xDest: '',
                scrollTop: 0,
                yAnimation: true,
            },
            pickerView: {
                years: years,
                year: date.getFullYear(),
                months: months,
                month: 2,
                days: days,
                day: 2,
                value: [9999, 1, 1],
            },
            movable: {
                x: 10,
                y: 10,
                scaleValue: 1.2,
            },
            swiper: {
                indicatorDots: true,
                autoplay: false,
            },
            richText: {
                nodes: [{
                    name: 'div',
                    attrs: {
                        class: 'rich-text-div',
                        style: 'line-height: 60px; color: red;',
                    },
                    children: [{
                        type: 'text',
                        text: 'Hello&nbsp;World!',
                    }],
                }],
            },
            map: {
                longitude: 113.324520,
                latitude: 23.099994,
                scale: 14,
            },
            point: {
                x: Math.random() * 590,
                y: Math.random() * 590,
                dx: Math.random() * 10,
                dy: Math.random() * 10,
                r: Math.round(Math.random() * 255 | 0),
                g: Math.round(Math.random() * 255 | 0),
                b: Math.round(Math.random() * 255 | 0),
            }
        }
    },
    computed: {
        eventCountComputed() {
            return `catch-inner3(${this.eventCount})`
        },
    },
    watch: {
        'input.inputText'(value) {
            console.log('input.inputText', value)
        },
        'input.inputNumber'(value) {
            console.log('input.inputNumber', value)
        },
        'input.inputRadio'(value) {
            console.log('input.inputRadio', value)
        },
        'input.inputCheckbox'(value) {
            console.log('input.inputCheckbox', value)
        },
    },
    created() {
        window.onDealWithNotSupportDom = dom => {
            dom.textContent = `标签 ${dom.tagName.toLowerCase()} 暂不支持`
        }
    },
    mounted() {
        this.ctx = my.createCanvasContext('canvas');
        // this.interval = setInterval(this.draw.bind(this), 17);
        this.draw()
    },
    methods: {
        draw() {
            const {
                ctx
            } = this;

            ctx.setFillStyle('#099');
            ctx.fillRect(0, 0, 610, 610);

            ctx.beginPath();
            ctx.arc(this.point.x, this.point.y, 20, 0, 2 * Math.PI);
            ctx.setFillStyle('rgb(' + this.point.r + ', ' + this.point.g + ', ' + this.point.b + ')');
            ctx.fill();
            ctx.draw();

            this.point.x += this.point.dx;
            this.point.y += this.point.dy;

            if (this.point.x <= 10 || this.point.x >= 590) {
                this.point.dx = -this.point.dx;
                this.point.r = Math.round(Math.random() * 255 | 0);
                this.point.g = Math.round(Math.random() * 255 | 0);
                this.point.b = Math.round(Math.random() * 255 | 0);
            }

            if (this.point.y <= 10 || this.point.y >= 590) {
                this.point.dy = -this.point.dy;
                this.point.r = Math.round(Math.random() * 255 | 0);
                this.point.g = Math.round(Math.random() * 255 | 0);
                this.point.b = Math.round(Math.random() * 255 | 0);
            }
        },
        onClick() {
            this.eventCount++
            console.log('click')
        },

        onParentTouchStart() {
            console.log('parent touchstart')
        },

        onParentTouchEnd() {
            console.log('parent touchend')
        },

        onParentClick() {
            console.log('parent click')
        },

        onRootClick() {
            console.log('root click')
        },

        onSelectChange(evt) {
            console.log('onSelectChange', evt)
        },

        startTranstion() {
            this.transition = !this.transition
        },

        onTransitionEnd() {
            console.log('transition end')
        },

        onAnimationStart() {
            console.log('animation start')
        },

        onAnimationIteration() {
            console.log('animation iteration')
        },

        onAnimationEnd() {
            console.log('animation end')
        },

        onInput(evt) {
            console.log('onInput', evt.target.value, evt)
        },

        onInputChange(evt) {
            console.log('onInputChange', evt.target.value, evt)
        },

        onTextareaInput(evt) {
            console.log('onTextareaInput', evt.target.value)
        },

        onImgLoad(evt) {
            console.log('onImgLoad')
        },

        onPickerChange(evt) {
            console.log('onPickerChange', evt.detail)
        },

        onMapMarkerTap(evt) {
            console.log('onMapMarkerTap', evt.detail)
        },

        onMapRegionChange(evt) {
            console.log('onMapRegionChange', evt)
        },

        onMapControlTap(evt) {
            console.log('onMapControlTap', evt.detail)
        },

        onLivePlayerStateChange(evt) {
            console.log('onLivePlayerStateChange', evt.detail)
        },

        onLivePusherStateChange(evt) {
            console.log('onLivePusherStateChange', evt.detail)
        },

        onSwitchChange(evt) {
            console.log('onSwitchChange', evt.detail)
        },

        onLabelChange(evt) {
            console.log('onLabelChange', evt.detail)
        },

        onSliderChange(evt) {
            console.log('onSliderChange', evt.detail)
        },

        onEditorStatusChange(evt) {
            console.log('onEditorStatusChange', evt.detail)
        },

        onEditorReady(evt) {
            console.log('onEditorReady', evt.detail)
        },

        onAdError(evt) {
            console.log('onAdError', evt.detail)
        },

        onScrollViewScroll(evt) {
            console.log('onScrollViewScroll', evt.detail)
        },

        onClickScrollViewYBtn() {
            const domNodes = this.$refs['scroll-view'] || []
            if (domNodes[0]) {
                const builtinPrefix = this.builtinPrefix
                const prefix = builtinPrefix === 1 ? 'y2' : 'y1'
                // 会被 vue 给 diff 掉，得走 setAttribute
                domNodes[0].setAttribute('scroll-into-view', prefix + 'block3')
            }
            this.scrollView.yDest = 'block3'
        },

        onClickScrollViewYTopBtn() {
            const domNodes = this.$refs['scroll-view'] || []
            if (domNodes[0]) {
                // 会被 vue 给 diff 掉，得走 setAttribute
                domNodes[0].setAttribute('scroll-top', 120)
            }
            this.scrollView.scrollTop = 120
        },

        onClickScrollViewYAnimBtn() {
            this.scrollView.yAnimation = !this.scrollView.yAnimation
        },

        onClickScrollViewXBtn() {
            const domNodes = this.$refs['scroll-view'] || []
            if (domNodes[1]) {
                const builtinPrefix = this.builtinPrefix
                const prefix = builtinPrefix === 1 ? 'x2' : 'x1'
                domNodes[1].setAttribute('scroll-into-view', prefix + 'block2')
            }
            this.scrollView.xDest = 'block2'
        },

        onOfficialAccountError(evt) {
            console.log('onOfficialAccountError', evt.detail)
        },

        onFormSubmit(evt) {
            console.log('form submit', evt.$$from, evt.detail)
        },

        onFormReset(evt) {
            console.log('form reset', evt.$$from)
        },

        onSwiperChange(evt) {
            console.log('onSwiperChange', evt.detail)
        },

        onPickerViewChange(evt) {
            this.pickerView.year = this.pickerView.years[evt.detail.value[0]]
            this.pickerView.month = this.pickerView.months[evt.detail.value[1]]
            this.pickerView.day = this.pickerView.days[evt.detail.value[2]]
            this.pickerView.value = evt.detail.value
            console.log('onPickerViewChange', evt.detail)
        },

        onMovableChange(evt) {
            console.log('onMovableChange', evt.detail)
        },

        onMovableScale(evt) {
            console.log('onMovableScale', evt.detail)
        },

        onGetPhoneNumber(evt) {
            console.log('onGetPhoneNumber', evt)
        },

        onClickMovableMove() {
            const domNodes = this.$refs['movable-view'] || []
            if (domNodes[0]) {
                domNodes[0].setAttribute('x', 30)
                domNodes[0].setAttribute('y', 30)
                console.log(domNodes[0]);
            }
            this.movable.x = this.movable.y = 30
        },

        onClickMovableScale() {
            const domNodes = this.$refs['movable-view'] || []
            if (domNodes[0]) {
                domNodes[0].setAttribute('scale-value', 3)
            }
            this.movable.scaleValue = 3
        },

        onCanvasTouchStart(type, evt) {
            console.log(`onCanvasTouchStart[${type}]`, evt)
        },

        onCanvasLongTap(evt) {
            console.log('onCanvasLongTap', evt)
        },

        resetMap() {
            this.map.longitude = 113.324520
            this.map.latitude = 23.099994
            this.map.scale = 14
        },
    }
}
</script>

<style>
.event-cnt {
    position: relative;
    height: 100px;
}

.event-t,
.event-a {
    left: 0;
    top: 60px;
    width: 50px;
    height: 50px;
    background-color: red;
    position: absolute;
    transition: all 0.5s;
}

.event-t-s {
    left: 50px;
}

.event-t-e {
    left: 0;
}

@keyframes event-aa {
    0% {
        left: 0;
    }

    50% {
        left: 50px
    }

    100% {
        left: 0;
    }
}

.event-a {
    animation: 1s ease 0s 8 event-aa;
}

.label {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background: rgba(7, 193, 96, 0.06);
}

textarea .comp-textarea {
    background-color: #ddd;
}

.inline {
    display: inline;
}

.block {
    display: block;
}

.margin-left-10 {
    margin-left: 10px;
}

.comp {
    padding: 10px 20px;
}

.comp radio-group,
.comp checkbox-group {
    display: inline-flex;
}

.video {
    position: relative;
    width: 300px;
    height: 225px;
}

.map {
    width: 300px;
    height: 200px;
}

.live-player,
.live-pusher,
.camera {
    width: 300px;
    height: 225px;
}

.scroll-view-y {
    width: 100%;
    height: 125px;
}

.scroll-view-x {
    width: 300px;
    height: 125px;
}

.scroll-view-btn {
    margin: 10px 20px;
    text-align: center;
    background: #07c160;
    color: #fff;
    line-height: 30px;
    height: 30px;
    font-size: 16px;
    border-radius: 5px;
}

.ipt-group {
    display: block;
    padding: 10px 0;
}

.swiper {
    display: block;
    height: 150px !important;
}

.swiper-item-1,
.swiper-item-2,
.swiper-item-3 {
    display: flex;
    height: 150px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 18px;
}

.swiper-item-1 {
    background-color: #1AAD19;
}

.swiper-item-2 {
    background-color: #2782D7;
}

.swiper-item-3 {
    background-color: #F1F1F1;
    color: #353535;
}

.movable {
    height: 250px;
    width: 250px;
    background: #ccc;
    overflow: hidden;
}

.movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    background: #1AAD19;
    color: #fff;
}

.rich-text-div {
    font-size: 30px;
}

.picker-view-item {
    background: #f2f2f2;
    color: #000000;
    font-size: 16px;
}
</style>