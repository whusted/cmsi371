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
        
    });

});