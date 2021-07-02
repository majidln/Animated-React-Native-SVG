import React, {ReactElement, useEffect} from "react";
import {View, StyleSheet, SafeAreaView, Dimensions} from 'react-native'
import Svg from 'react-native-svg';
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";
import AnimatedStroke from "../components/AnimatedStroke";

const MARGIN = 10
const vWidth = 607 + MARGIN;
const vHeight = 391 + MARGIN;

const width = Dimensions.get('window').width - 64;
const height = width * vWidth / vHeight;

const paths = [
"M10.4 147C9.06667 147 7.93333 146.533 7 145.6C6.06667 144.667 5.6 143.533 5.6 142.2V12C5.6 10.5333 6 9.33333 6.8 8.4C7.73333 7.46666 8.93333 6.99999 10.4 6.99999H62.2C78.4667 6.99999 91.2 10.8 100.4 18.4C109.733 26 114.4 36.8 114.4 50.8C114.4 60.5333 112 68.7333 107.2 75.4C102.533 81.9333 96 86.6667 87.6 89.6L116.8 140.6C117.2 141.4 117.4 142.133 117.4 142.8C117.4 144 116.933 145 116 145.8C115.2 146.6 114.267 147 113.2 147H95C92.8667 147 91.2 146.533 90 145.6C88.9333 144.667 87.9333 143.333 87 141.6L61.2 94.2H33.4V142.2C33.4 143.533 32.9333 144.667 32 145.6C31.2 146.533 30.0667 147 28.6 147H10.4ZM61.6 71.6C69.6 71.6 75.6 69.8 79.6 66.2C83.7333 62.6 85.8 57.4 85.8 50.6C85.8 43.8 83.7333 38.5333 79.6 34.8C75.6 31.0667 69.6 29.2 61.6 29.2H33.4V71.6H61.6Z",
"M181.398 149C166.598 149 154.798 144.733 145.998 136.2C137.332 127.533 132.732 115.4 132.198 99.8L131.998 94.8L132.198 89.8C132.865 74.6 137.532 62.6667 146.198 54C154.998 45.3333 166.732 41 181.398 41C197.132 41 209.265 45.8 217.798 55.4C226.465 65 230.798 77.8 230.798 93.8V98C230.798 99.3333 230.332 100.467 229.398 101.4C228.465 102.333 227.265 102.8 225.798 102.8H159.398V104.4C159.665 111.733 161.665 117.933 165.398 123C169.265 127.933 174.532 130.4 181.198 130.4C189.065 130.4 195.398 127.333 200.198 121.2C201.398 119.733 202.332 118.8 202.998 118.4C203.798 118 204.932 117.8 206.398 117.8H223.598C224.798 117.8 225.798 118.2 226.598 119C227.532 119.667 227.998 120.533 227.998 121.6C227.998 124.8 226.065 128.6 222.198 133C218.465 137.267 213.065 141 205.998 144.2C198.932 147.4 190.732 149 181.398 149ZM203.598 86V85.4C203.598 77.5333 201.598 71.2 197.598 66.4C193.732 61.6 188.332 59.2 181.398 59.2C174.465 59.2 169.065 61.6 165.198 66.4C161.332 71.2 159.398 77.5333 159.398 85.4V86H203.598Z",
"M282.228 149C275.428 149 269.161 147.667 263.428 145C257.828 142.2 253.361 138.467 250.028 133.8C246.828 129.133 245.228 124 245.228 118.4C245.228 109.333 248.895 102 256.228 96.4C263.561 90.8 273.628 87 286.428 85L313.828 81V76.8C313.828 70.9333 312.361 66.5333 309.428 63.6C306.495 60.6667 301.761 59.2 295.228 59.2C290.828 59.2 287.228 60.0667 284.428 61.8C281.761 63.4 279.628 65 278.028 66.6C276.428 68.3333 275.361 69.4667 274.828 70C274.295 71.6 273.295 72.4 271.828 72.4H256.428C255.228 72.4 254.161 72 253.228 71.2C252.428 70.4 252.028 69.3333 252.028 68C252.161 64.6667 253.761 60.8667 256.828 56.6C260.028 52.3333 264.895 48.6667 271.428 45.6C277.961 42.5333 285.961 41 295.428 41C311.161 41 322.628 44.5333 329.828 51.6C337.028 58.6667 340.628 67.9333 340.628 79.4V142.2C340.628 143.533 340.161 144.667 339.228 145.6C338.428 146.533 337.295 147 335.828 147H319.628C318.295 147 317.161 146.533 316.228 145.6C315.295 144.667 314.828 143.533 314.828 142.2V134.4C311.895 138.667 307.695 142.2 302.228 145C296.895 147.667 290.228 149 282.228 149ZM289.028 130C296.361 130 302.361 127.6 307.028 122.8C311.695 118 314.028 111 314.028 101.8V97.6L294.028 100.8C286.295 102 280.428 103.933 276.428 106.6C272.561 109.267 270.628 112.533 270.628 116.4C270.628 120.667 272.428 124 276.028 126.4C279.628 128.8 283.961 130 289.028 130Z",
"M411.286 149C396.619 149 384.886 144.933 376.086 136.8C367.419 128.667 362.819 117.4 362.286 103L362.086 95L362.286 87C362.819 72.6 367.419 61.3333 376.086 53.2C384.886 45.0667 396.619 41 411.286 41C421.686 41 430.486 42.8667 437.686 46.6C445.019 50.3333 450.419 54.9333 453.886 60.4C457.486 65.7333 459.419 70.8 459.686 75.6C459.819 76.9333 459.353 78.0667 458.286 79C457.353 79.9333 456.219 80.4 454.886 80.4H437.286C435.953 80.4 434.886 80.1333 434.086 79.6C433.419 78.9333 432.753 77.8667 432.086 76.4C430.086 71.2 427.419 67.4667 424.086 65.2C420.886 62.9333 416.753 61.8 411.686 61.8C404.886 61.8 399.553 64 395.686 68.4C391.819 72.6667 389.753 79.2 389.486 88L389.286 95.4L389.486 102C390.019 119.467 397.419 128.2 411.686 128.2C416.886 128.2 421.086 127.067 424.286 124.8C427.486 122.533 430.086 118.8 432.086 113.6C432.753 112.133 433.419 111.133 434.086 110.6C434.886 109.933 435.953 109.6 437.286 109.6H454.886C456.219 109.6 457.353 110.067 458.286 111C459.353 111.933 459.819 113.067 459.686 114.4C459.419 119.067 457.553 124.067 454.086 129.4C450.619 134.733 445.286 139.333 438.086 143.2C430.886 147.067 421.953 149 411.286 149Z",
"M527.544 147C515.41 147 506.277 143.867 500.144 137.6C494.144 131.2 491.144 121.867 491.144 109.6V64.2H475.344C474.01 64.2 472.877 63.7333 471.944 62.8C471.01 61.7333 470.544 60.5333 470.544 59.2V47.8C470.544 46.4667 471.01 45.3333 471.944 44.4C472.877 43.4667 474.01 43 475.344 43H491.144V9.79999C491.144 8.33333 491.61 7.2 492.544 6.4C493.477 5.46666 494.61 4.99999 495.944 4.99999H512.144C513.61 4.99999 514.744 5.46666 515.544 6.4C516.477 7.2 516.944 8.33333 516.944 9.79999V43H541.944C543.41 43 544.544 43.4667 545.344 44.4C546.277 45.2 546.744 46.3333 546.744 47.8V59.2C546.744 60.6667 546.277 61.8667 545.344 62.8C544.41 63.7333 543.277 64.2 541.944 64.2H516.944V107.6C516.944 113.333 517.944 117.667 519.944 120.6C521.944 123.533 525.277 125 529.944 125H543.744C545.077 125 546.21 125.467 547.144 126.4C548.077 127.333 548.544 128.467 548.544 129.8V142.2C548.544 143.533 548.077 144.667 547.144 145.6C546.344 146.533 545.21 147 543.744 147H527.544Z",
"M10.4 384C9.06667 384 7.93333 383.533 7 382.6C6.06667 381.667 5.6 380.533 5.6 379.2V249C5.6 247.533 6 246.333 6.8 245.4C7.73333 244.467 8.93333 244 10.4 244H25.8C27.4 244 28.6 244.333 29.4 245C30.2 245.533 30.9333 246.267 31.6 247.2L89.2 336.8V249C89.2 247.533 89.6 246.333 90.4 245.4C91.3333 244.467 92.5333 244 94 244H110.8C112.267 244 113.467 244.467 114.4 245.4C115.333 246.333 115.8 247.533 115.8 249V379C115.8 380.467 115.333 381.667 114.4 382.6C113.467 383.533 112.333 384 111 384H95.4C93.1333 384 91.2 382.933 89.6 380.8L32.2 293.2V379.2C32.2 380.667 31.7333 381.867 30.8 382.8C29.8667 383.6 28.6667 384 27.2 384H10.4Z",
"M174.806 386C168.006 386 161.74 384.667 156.006 382C150.406 379.2 145.94 375.467 142.606 370.8C139.406 366.133 137.806 361 137.806 355.4C137.806 346.333 141.473 339 148.806 333.4C156.14 327.8 166.206 324 179.006 322L206.406 318V313.8C206.406 307.933 204.94 303.533 202.006 300.6C199.073 297.667 194.34 296.2 187.806 296.2C183.406 296.2 179.806 297.067 177.006 298.8C174.34 300.4 172.206 302 170.606 303.6C169.006 305.333 167.94 306.467 167.406 307C166.873 308.6 165.873 309.4 164.406 309.4H149.006C147.806 309.4 146.74 309 145.806 308.2C145.006 307.4 144.606 306.333 144.606 305C144.74 301.667 146.34 297.867 149.406 293.6C152.606 289.333 157.473 285.667 164.006 282.6C170.54 279.533 178.54 278 188.006 278C203.74 278 215.206 281.533 222.406 288.6C229.606 295.667 233.206 304.933 233.206 316.4V379.2C233.206 380.533 232.74 381.667 231.806 382.6C231.006 383.533 229.873 384 228.406 384H212.206C210.873 384 209.74 383.533 208.806 382.6C207.873 381.667 207.406 380.533 207.406 379.2V371.4C204.473 375.667 200.273 379.2 194.806 382C189.473 384.667 182.806 386 174.806 386ZM181.606 367C188.94 367 194.94 364.6 199.606 359.8C204.273 355 206.606 348 206.606 338.8V334.6L186.606 337.8C178.873 339 173.006 340.933 169.006 343.6C165.14 346.267 163.206 349.533 163.206 353.4C163.206 357.667 165.006 361 168.606 363.4C172.206 365.8 176.54 367 181.606 367Z",
"M304.888 384C292.754 384 283.621 380.867 277.488 374.6C271.488 368.2 268.488 358.867 268.488 346.6V301.2H252.687C251.354 301.2 250.221 300.733 249.287 299.8C248.354 298.733 247.888 297.533 247.888 296.2V284.8C247.888 283.467 248.354 282.333 249.287 281.4C250.221 280.467 251.354 280 252.687 280H268.488V246.8C268.488 245.333 268.954 244.2 269.888 243.4C270.821 242.467 271.954 242 273.287 242H289.488C290.954 242 292.088 242.467 292.888 243.4C293.821 244.2 294.287 245.333 294.287 246.8V280H319.287C320.754 280 321.887 280.467 322.687 281.4C323.621 282.2 324.087 283.333 324.087 284.8V296.2C324.087 297.667 323.621 298.867 322.687 299.8C321.754 300.733 320.621 301.2 319.287 301.2H294.287V344.6C294.287 350.333 295.287 354.667 297.287 357.6C299.288 360.533 302.621 362 307.287 362H321.088C322.421 362 323.554 362.467 324.488 363.4C325.421 364.333 325.888 365.467 325.888 366.8V379.2C325.888 380.533 325.421 381.667 324.488 382.6C323.688 383.533 322.554 384 321.088 384H304.888Z",
"M347.63 262.8C346.296 262.8 345.163 262.333 344.23 261.4C343.296 260.467 342.83 259.333 342.83 258V243.6C342.83 242.267 343.296 241.133 344.23 240.2C345.163 239.267 346.296 238.8 347.63 238.8H365.83C367.163 238.8 368.296 239.267 369.23 240.2C370.296 241.133 370.83 242.267 370.83 243.6V258C370.83 259.333 370.363 260.467 369.43 261.4C368.496 262.333 367.296 262.8 365.83 262.8H347.63ZM348.43 384C347.096 384 345.963 383.533 345.03 382.6C344.096 381.667 343.63 380.533 343.63 379.2V284.8C343.63 283.467 344.096 282.333 345.03 281.4C345.963 280.467 347.096 280 348.43 280H365.03C366.496 280 367.63 280.467 368.43 281.4C369.363 282.2 369.83 283.333 369.83 284.8V379.2C369.83 380.533 369.363 381.667 368.43 382.6C367.63 383.533 366.496 384 365.03 384H348.43Z",
"M433.164 384C431.164 384 429.631 383.6 428.564 382.8C427.497 381.867 426.631 380.6 425.964 379L388.564 286.2L388.164 284.4C388.164 283.2 388.564 282.2 389.364 281.4C390.297 280.467 391.364 280 392.564 280H408.764C411.297 280 413.031 281.267 413.964 283.8L440.564 354L467.164 283.8C467.564 282.867 468.164 282 468.964 281.2C469.897 280.4 471.031 280 472.364 280H488.764C489.831 280 490.764 280.467 491.564 281.4C492.497 282.2 492.964 283.2 492.964 284.4C492.964 285.2 492.897 285.8 492.764 286.2L455.164 379C454.497 380.6 453.631 381.867 452.564 382.8C451.497 383.6 449.964 384 447.964 384H433.164Z",
"M552.297 386C537.497 386 525.697 381.733 516.897 373.2C508.23 364.533 503.63 352.4 503.097 336.8L502.897 331.8L503.097 326.8C503.764 311.6 508.43 299.667 517.097 291C525.897 282.333 537.63 278 552.297 278C568.03 278 580.164 282.8 588.697 292.4C597.364 302 601.697 314.8 601.697 330.8V335C601.697 336.333 601.23 337.467 600.297 338.4C599.364 339.333 598.164 339.8 596.697 339.8H530.297V341.4C530.564 348.733 532.564 354.933 536.297 360C540.164 364.933 545.43 367.4 552.097 367.4C559.964 367.4 566.297 364.333 571.097 358.2C572.297 356.733 573.23 355.8 573.897 355.4C574.697 355 575.83 354.8 577.297 354.8H594.497C595.697 354.8 596.697 355.2 597.497 356C598.43 356.667 598.897 357.533 598.897 358.6C598.897 361.8 596.964 365.6 593.097 370C589.364 374.267 583.964 378 576.897 381.2C569.83 384.4 561.63 386 552.297 386ZM574.497 323V322.4C574.497 314.533 572.497 308.2 568.497 303.4C564.63 298.6 559.23 296.2 552.297 296.2C545.364 296.2 539.964 298.6 536.097 303.4C532.23 308.2 530.297 314.533 530.297 322.4V323H574.497Z",
]

const HomeScreen = (): ReactElement => {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(1, {duration: 4000, easing: Easing.linear})

    }, [progress])

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.layer}>
                <Svg width={width} height={height} viewBox={[-MARGIN / 2, -MARGIN / 2, vWidth + MARGIN / 2, vHeight + MARGIN / 2].join(' ')}>
                    {paths.map((path, key) => <AnimatedStroke d={path} progress={progress} key={key} />)}
                </Svg>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    layer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default HomeScreen;
