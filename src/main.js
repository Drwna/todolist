$(function () {
    load()
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作")
            } else {
                var local = getDate()
                local.push({
                    title: $(this).val(),
                    done: false
                })
                saveDate(local)
                load()
                $(this).val("")
            }
        }
    })
    $("ol, ul").on("click", "a", function () {
        var data = getDate()
        var index = $(this).attr("id")
        data.splice(index, 1)
        saveDate(data)
        load()
    })
    $("ol, ul").on("click", "input", function () {
        var data = getDate()
        var index = $(this).siblings("a").attr("id")
        data[index].done = $(this).prop("checked")
        saveDate(data)
        load()
    })

    function getDate() {
        var data = localStorage.getItem("todoList")
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }

    function saveDate(data) {
        localStorage.setItem("todoList", JSON.stringify(data))
    }

    function load() {
        var data = getDate()
        $("ol, ul").empty()
        var todoCount = 0
        var doneCount = 0
        $.each(data, function (i, data) {
            if (data.done) {
                $("ul").prepend(`
                  <li>
                    <input type="checkbox" checked >
                    <p>${data.title}</p>
                    <a href="javascript:;" id=${i}></a>
                  </li>`)
                doneCount++
            } else {
                $("ol").prepend(`
                    <li>
                      <input type="checkbox" >
                      <p>${data.title}</p>
                      <a href="javascript:;" id=${i}></a>
                    </li>`)
                todoCount++
            }
        });
        $("#todoCount").text(todoCount)
        $("#doneCount").text(doneCount)
    }
})