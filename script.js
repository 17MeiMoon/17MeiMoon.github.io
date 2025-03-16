document.addEventListener("DOMContentLoaded", () => {
	const e = document.body,
		t = document.getElementById("dark-mode-button"),
		n = document.getElementById("dark-mode-icon"),
		o = document.getElementById("dark-mode-text"),
		a = localStorage.getItem("theme");
	"dark" === a
		? (e.classList.add("dark-mode"),
		  n.classList.replace("fa-moon", "fa-sun"),
		  (o.textContent = "Tryb jasny"))
		: localStorage.setItem("theme", "light"),
		t.addEventListener("click", () => {
			e.classList.toggle("dark-mode"),
				e.classList.contains("dark-mode")
					? (localStorage.setItem("theme", "dark"),
					  n.classList.replace("fa-moon", "fa-sun"),
					  (o.textContent = "Tryb jasny"))
					: (localStorage.setItem("theme", "light"),
					  n.classList.replace("fa-sun", "fa-moon"),
					  (o.textContent = "Tryb ciemny"));
		});
	const c = document.getElementById("current-year");
	c && (c.textContent = new Date().getFullYear());
	const r = document.getElementById("reservation-form");
	if (r) {
		const e = document.getElementById("start-date"),
			t = document.getElementById("end-date"),
			n = document.getElementById("date-feedback"),
			o = document.getElementById("days-count"),
			a = r.querySelector("button[type='submit']"),
			c = new Date().toISOString().split("T")[0];
		e && (e.min = c);
		function i() {
			if (!e || !t) return;
			const r = e.value,
				c = t.value;
			if (!r || !c)
				return (
					(n.textContent = ""), (o.textContent = ""), void (a.disabled = !0)
				);
			(t.min = r),
				c < r
					? ((n.textContent =
							"Data wyjazdu nie może być wcześniejsza niż data przyjazdu."),
					  (o.textContent = ""),
					  (a.disabled = !0))
					: ((n.textContent = ""),
					  (o.textContent =
							"Liczba noclegów: " +
							Math.round((new Date(c) - new Date(r)) / 864e5)),
					  (a.disabled = !1));
		}
		e.addEventListener("change", i),
			t.addEventListener("change", i),
			r.addEventListener("submit", (r) => {
				r.preventDefault();
				const c =
						"https://docs.google.com/forms/d/e/1FAIpQLScAtUmm8EZX9dqNX0KWl1UdSoW1pZOB1Gf9SfK_BtmpbTvGMg/viewform?usp=pp_url",
					i = `${c}&entry.804956421=${encodeURIComponent(
						e.value
					)}&entry.1257348320=${encodeURIComponent(t.value)}`;
				window.open(i, "_blank");
			});
	}
	fetch("images.json")
		.then((e) => e.json())
		.then((e) => {
			!(function (e) {
				const t = document.querySelector(".carousel"),
					n = document.querySelector("#prev"),
					o = document.querySelector("#next");
				if (!t || !n || !o || 0 === e.length)
					return void console.warn(
						"Brak elementów karuzeli lub pusta lista obrazów."
					);
				e.forEach((n, o) => {
					const a = document.createElement("div");
					a.classList.add("slide");
					const c = document.createElement("img");
					(c.src = `imagines/${n}`),
						(c.alt = n),
						o > 0 && (c.loading = "lazy"),
						a.appendChild(c),
						t.appendChild(a);
				});
				const a = document.querySelectorAll(".slide");
				let c = 0;
				let r;
				function i() {
					a.forEach((e) => {
						e.classList.remove("prev", "current", "next"),
							(e.style.opacity = 0);
					}),
						a[c].classList.add("current"),
						(a[c].style.opacity = 1);
					const e = (c - 1 + a.length) % a.length;
					a[e].classList.add("prev"), (a[e].style.opacity = 0.3);
					const t = (c + 1) % a.length;
					a[t].classList.add("next"), (a[t].style.opacity = 0.3);
				}
				function l() {
					clearInterval(r), s();
				}
				function s() {
					r = setInterval(() => {
						(c = (c + 1) % a.length), i();
					}, 3e3);
				}
				n.addEventListener("click", () => {
					(c = (c - 1 + a.length) % a.length), i(), l();
				}),
					o.addEventListener("click", () => {
						(c = (c + 1) % a.length), i(), l();
					}),
					i(),
					s();
			})(e);
		})
		.catch((e) => {
			console.error("Błąd podczas wczytywania listy obrazów:", e);
		});
});
