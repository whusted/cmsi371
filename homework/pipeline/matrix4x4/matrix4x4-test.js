/*
 * Unit tests for our matrix object.
 */

$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m = new Matrix4x4();

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], 1, "First element by index");
        equal(m.elements[1], 0, "Second element by index");
        equal(m.elements[2], 0, "Third element by index");
        equal(m.elements[3], 0, "Fourth element by index");
        equal(m.elements[4], 0, "Fifth element by index");
        equal(m.elements[5], 1, "Sixth element by index");
        equal(m.elements[6], 0, "Seventh element by index");
        equal(m.elements[7], 0, "Eighth element by index");
        equal(m.elements[8], 0, "Ninth element by index");
        equal(m.elements[9], 0, "Tenth element by index");
        equal(m.elements[10], 1, "Eleventh element by index");
        equal(m.elements[11], 0, "Twelfth element by index");
        equal(m.elements[12], 0, "Thirteenth element by index");
        equal(m.elements[13], 0, "Fourteenth element by index");
        equal(m.elements[14], 0, "Fifteenth element by index");
        equal(m.elements[15], 1, "Sixteenth element by index");

        m = new Matrix4x4(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], 3, "First element by index");
        equal(m.elements[1], 1, "Second element by index");
        equal(m.elements[2], 4, "Third element by index");
        equal(m.elements[3], 1, "Fourth element by index");
        equal(m.elements[4], 5, "Fifth element by index");
        equal(m.elements[5], 9, "Sixth element by index");
        equal(m.elements[6], 2, "Seventh element by index");
        equal(m.elements[7], 6, "Eighth element by index");
        equal(m.elements[8], 5, "Ninth element by index");
        equal(m.elements[9], 3, "Tenth element by index");
        equal(m.elements[10], 5, "Eleventh element by index");
        equal(m.elements[11], 8, "Twelfth element by index");
        equal(m.elements[12], 9, "Thirteenth element by index");
        equal(m.elements[13], 7, "Fourteenth element by index");
        equal(m.elements[14], 9, "Fifteenth element by index");
        equal(m.elements[15], 3, "Sixteenth element by index");
        
    });

    test("Multiplication", function () {
        var m1 = new Matrix4x4(),
            m2 = new Matrix4x4(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3),
            m3 = m1.multiply(m2);
        
        equal(m3.dimensions(), 16, "Matrix size");
        equal(m3.elements[0], 3, "First element by index");
        equal(m3.elements[1], 1, "Second element by index");
        equal(m3.elements[2], 4, "Third element by index");
        equal(m3.elements[3], 1, "Fourth element by index");
        equal(m3.elements[4], 5, "Fifth element by index");
        equal(m3.elements[5], 9, "Sixth element by index");
        equal(m3.elements[6], 2, "Seventh element by index");
        equal(m3.elements[7], 6, "Eighth element by index");
        equal(m3.elements[8], 5, "Ninth element by index");
        equal(m3.elements[9], 3, "Tenth element by index");
        equal(m3.elements[10], 5, "Eleventh element by index");
        equal(m3.elements[11], 8, "Twelfth element by index");
        equal(m3.elements[12], 9, "Thirteenth element by index");
        equal(m3.elements[13], 7, "Fourteenth element by index");
        equal(m3.elements[14], 9, "Fifteenth element by index");
        equal(m3.elements[15], 3, "Sixteenth element by index");

        m1 = new Matrix4x4(3, 0, 3, 4, 4, 7, 9, 1, 0, 1, 9, 7, 4, 8, 2, 4);
        m3 = m1.multiply(m2);

        equal(m3.dimensions(), 16, "Matrix size");
        equal(m3.elements[0], 60, "First element by index");
        equal(m3.elements[1], 40, "Second element by index");
        equal(m3.elements[2], 63, "Third element by index");
        equal(m3.elements[3], 39, "Fourth element by index");
        equal(m3.elements[4], 101, "Fifth element by index");
        equal(m3.elements[5], 101, "Sixth element by index");
        equal(m3.elements[6], 84, "Seventh element by index");
        equal(m3.elements[7], 121, "Eighth element by index");
        equal(m3.elements[8], 113, "Ninth element by index");
        equal(m3.elements[9], 85, "Tenth element by index");
        equal(m3.elements[10], 110, "Eleventh element by index");
        equal(m3.elements[11], 99, "Twelfth element by index");
        equal(m3.elements[12], 98, "Thirteenth element by index");
        equal(m3.elements[13], 110, "Fourteenth element by index");
        equal(m3.elements[14], 78, "Fifteenth element by index");
        equal(m3.elements[15], 80, "Sixteenth element by index");

        m2 = new Matrix4x4(0, 2, 2, 2, 7, 3, 2, 9, 0, 3, 8, 5, 1, 6, 3, 1);
        m3 = m1.multiply(m2);

        equal(m3.dimensions(), 16, "Matrix size");
        equal(m3.elements[0], 4, "First element by index");
        equal(m3.elements[1], 39, "Second element by index");
        equal(m3.elements[2], 42, "Third element by index");
        equal(m3.elements[3], 25, "Fourth element by index");
        equal(m3.elements[4], 50, "Fifth element by index");
        equal(m3.elements[5], 62, "Sixth element by index");
        equal(m3.elements[6], 97, "Seventh element by index");
        equal(m3.elements[7], 117, "Eighth element by index");
        equal(m3.elements[8], 14, "Ninth element by index");
        equal(m3.elements[9], 72, "Tenth element by index");
        equal(m3.elements[10], 95, "Eleventh element by index");
        equal(m3.elements[11], 61, "Twelfth element by index");
        equal(m3.elements[12], 60, "Thirteenth element by index");
        equal(m3.elements[13], 62, "Fourteenth element by index");
        equal(m3.elements[14], 52, "Fifteenth element by index");
        equal(m3.elements[15], 94, "Sixteenth element by index");



        m2 = new Matrix4x4(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 0, 0, 0, 1);

        throws(
            function () {
                return m1.multiply(m2);
            },
            "Check for wrong-dimensioned matrices"
        );

    });

    test("Transformations", function() {

        var m = Matrix4x4.getTranslationMatrix(3,3,3);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], 1, "First element by index");
        equal(m.elements[1], 0, "Second element by index");
        equal(m.elements[2], 0, "Third element by index");
        equal(m.elements[3], 3, "Fourth element by index");
        equal(m.elements[4], 0, "Fifth element by index");
        equal(m.elements[5], 1, "Sixth element by index");
        equal(m.elements[6], 0, "Seventh element by index");
        equal(m.elements[7], 3, "Eighth element by index");
        equal(m.elements[8], 0, "Ninth element by index");
        equal(m.elements[9], 0, "Tenth element by index");
        equal(m.elements[10], 1, "Eleventh element by index");
        equal(m.elements[11], 3, "Twelfth element by index");
        equal(m.elements[12], 0, "Thirteenth element by index");
        equal(m.elements[13], 0, "Fourteenth element by index");
        equal(m.elements[14], 0, "Fifteenth element by index");
        equal(m.elements[15], 1, "Sixteenth element by index");


        m = Matrix4x4.getScaleMatrix(3, 1, 4);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], 3, "First element by index");
        equal(m.elements[1], 0, "Second element by index");
        equal(m.elements[2], 0, "Third element by index");
        equal(m.elements[3], 0, "Fourth element by index");
        equal(m.elements[4], 0, "Fifth element by index");
        equal(m.elements[5], 1, "Sixth element by index");
        equal(m.elements[6], 0, "Seventh element by index");
        equal(m.elements[7], 0, "Eighth element by index");
        equal(m.elements[8], 0, "Ninth element by index");
        equal(m.elements[9], 0, "Tenth element by index");
        equal(m.elements[10], 4, "Eleventh element by index");
        equal(m.elements[11], 0, "Twelfth element by index");
        equal(m.elements[12], 0, "Thirteenth element by index");
        equal(m.elements[13], 0, "Fourteenth element by index");
        equal(m.elements[14], 0, "Fifteenth element by index");
        equal(m.elements[15], 1, "Sixteenth element by index");

        m = Matrix4x4.getRotationMatrix(180, .5, -.5, .5);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], -0.33333333333333315, "First element by index");
        equal(m.elements[1], -0.666666666666667, "Second element by index");
        equal(m.elements[2], 0.6666666666666667, "Third element by index");
        equal(m.elements[3], 0, "Fourth element by index");
        equal(m.elements[4], -0.6666666666666667, "Fifth element by index");
        equal(m.elements[5], -0.33333333333333315, "Sixth element by index");
        equal(m.elements[6], -0.666666666666667, "Seventh element by index");
        equal(m.elements[7], 0, "Eighth element by index");
        equal(m.elements[8], 0.666666666666667, "Ninth element by index");
        equal(m.elements[9], -0.6666666666666667, "Tenth element by index");
        equal(m.elements[10], -0.33333333333333315, "Eleventh element by index");
        equal(m.elements[11], 0, "Twelfth element by index");
        equal(m.elements[12], 0, "Thirteenth element by index");
        equal(m.elements[13], 0, "Fourteenth element by index");
        equal(m.elements[14], 0, "Fifteenth element by index");
        equal(m.elements[15], 1, "Sixteenth element by index");



    });

    test("Projections", function() {
        var m = Matrix4x4.getFrustumMatrix(2, -2, 2, -2, -2, 2);
        console.log(m.elements);

        equal(m.dimensions(), 16, "Matrix size");
        equal(m.elements[0], -1, "First element by index");
        equal(m.elements[1], 0, "Second element by index");
        equal(m.elements[2], 0, "Third element by index");
        equal(m.elements[3], 0, "Fourth element by index");
        equal(m.elements[4], 0, "Fifth element by index");
        equal(m.elements[5], -1, "Sixth element by index");
        equal(m.elements[6], 0, "Seventh element by index");
        equal(m.elements[7], 0, "Eighth element by index");
        equal(m.elements[8], 0, "Ninth element by index");
        equal(m.elements[9], 0, "Tenth element by index");
        equal(m.elements[10], 0, "Eleventh element by index");
        equal(m.elements[11], 2, "Twelfth element by index");
        equal(m.elements[12], 0, "Thirteenth element by index");
        equal(m.elements[13], 0, "Fourteenth element by index");
        equal(m.elements[14], -1, "Fifteenth element by index");
        equal(m.elements[15], 0, "Sixteenth element by index");


    });
    

});