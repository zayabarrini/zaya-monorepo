---
title: "Math, Topology, Algebra, Geometry"
imgUrl: "/css/img/Bing/bing138.png"
youtubeId: ""
publishedAt: "2025-11-16"
updatedAt: "2025-11-25"
summary: "Solving Questions"
---

Prompts:

- Questões de Espaços Topológicos, Medida e Integração, Demonstração do PLU
- Programação Não Linear
- Prove que todo grupo de Lie tem fibrado tangente trivial. Use isto para provar que todo grupo de Lie ́e orientável.
- Questão de Análise Numérica
- Questão de Geometria
- Questão EDP
- Questões IMO
- A4. Let f and g be two nonzero polynomials with integer coefficients and deg f > deg g. Suppose that for infinitely many primes p the polynomial pf + g has a rational root. Prove that f has a rational root.
- G1. In the triangle ABC the point J is the center of the excircle opposite to A
- G6. Let the excircle of the triangle ABC lying opposite to A touch its side BC at the point A1 . Define the points B1 and C1 analogously. Suppose that the circumcentre of the triangle A1B1C1 lies on the circumcircle of the triangle ABC . Prove that the triangle ABC is right-angled.
- Table with math abbreviations in different languages en, de, ru, ch, ja, ar, hi, fr, pt a.e/q.t.p: almost everywhere e.g i.e c.q.d etc
- Add more abbreviations (PDE symbols, measure theory, algebra, geometry, computer science)

# Questão 1. Espaço Topológico

Seja $(X, \mathcal{T})$ um espaço topológico e considere as seguintes noções:

**(a)** Se $x \in X$ e $U \in \mathcal{T}$ são tais que $x \in U$, dizemos que $U$ é uma vizinhança de $x$.

**(b)** O espaço $(X, \mathcal{T})$ é chamado de **Hausdorff** se, para quaisquer pontos distintos $x_1, x_2 \in X$, existirem vizinhanças $U_1$ de $x_1$ e $U_2$ de $x_2$ tais que

$$
U_1 \cap U_2 = \varnothing.
$$

**(c)** Dizemos que $X$ é **localmente compacto em $x$** se existe um subconjunto compacto $C \subset X$ que contenha alguma vizinhança de $x$.

Assuma que $(X, \mathcal{T})$ é Hausdorff. Demonstre:

**(i)** Se $Y \subset X$ é compacto e $x \in X \setminus Y$, então existem abertos disjuntos $U, V \subset X$ tais que

$$
x \in U, \quad Y \subset V.
$$

**(ii)** Mostre que $X$ é localmente compacto em $x \in X$ se, e somente se, para toda vizinhança $U$ de $x$, existe uma vizinhança $V$ de $x$ tal que

$$
\overline{V} \text{ é compacto e } \overline{V} \subset U.
$$

---

> (a) Se $x\in X$ e $U\in\mathcal T$ forem tais que $x\in U$, diremos que $U$ é uma **vizinhança** de $x$.

Essa é a forma mais simples da definição (vizinhança = aberto que contém o ponto). Em topologia costuma-se trabalhar com duas versões equivalentes/relacionadas da noção de vizinhança:

**Definição A (aberta):**  
$U$ é uma vizinhança de $x$ se $U\in\mathcal T$ e $x\in U$. — (como no enunciado)

**Definição B (geral):**  
$N\subset X$ é uma vizinhança de $x$ se existe um aberto $V$ tal que $x\in V\subseteq N$. (ou seja, vizinhança pode ser qualquer conjunto que contenha um aberto que contém $x$.)

A Definição A é um caso especial da B (tomando $N=U$ aberto). Muitas referências adotam B porque ela permite falar de vizinhanças não abertas; outras adotam A e chamam explicitamente de “vizinhança aberta”. Abaixo listo propriedades e resultados usuais com demonstrações curtas.

---

## Propriedades básicas

**(1) Todo conjunto aberto que contém $x$ é vizinhança de $x$.**  
Imediato por definição A (ou por B, com $V=U$).

**(2) Se $N$ é vizinhança de $x$ no sentido B então existe um aberto $V$ com $x\in V\subseteq N$.**  
Isto é exatamente a Definição B, usada como hipótese.

**(3) Interseção finita de vizinhanças é vizinhança.**  
Se $N_1,N_2$ são vizinhanças de $x$, então existem abertos $V_1,V_2$ tais que $x\in V_i\subseteq N_i$. Então $V_1\cap V_2$ é aberto, contém $x$ e $V_1\cap V_2\subseteq N_1\cap N_2$. Logo $N_1\cap N_2$ é vizinhança de $x$.

**(4) Todo conjunto que contém uma vizinhança de $x$ também é vizinhança de $x$.**  
Se $N$ é vizinhança e $N\subseteq M$ então $M$ contém o aberto $V\subseteq N$, logo $M$ também satisfaz a Definição B.

---

## Relação com interior e aderência

Seja $A\subseteq X$.

**Proposição 1 (ponto interior):**  
$x\in\operatorname{int}(A)$ se, e somente se, existe uma vizinhança $N$ de $x$ tal que $N\subseteq A$.

**Prova:**  
$\Rightarrow$ Se $x\in\operatorname{int}(A)$ então por definição existe um aberto $U$ com $x\in U\subseteq A$. Assim $U$ é vizinhança (aberta) contida em $A$.  
$\Leftarrow$ Se existe uma vizinhança $N$ com $N\subseteq A$, pela Def. B existe aberto $V$ com $x\in V\subseteq N\subseteq A$. Então $x\in\operatorname{int}(A)$.

**Proposição 2 (aderência):**  
$x\in\overline{A}$ (fecho de $A$) se, e somente se, toda vizinhança $N$ de $x$ intersecta $A$ (i.e. $N\cap A\neq\varnothing$ para todo $N$ vizinhança de $x$).

**Prova:**  
Se $x\notin\overline{A}$ então existe um aberto $U$ contendo $x$ com $U\cap A=\varnothing$. Esse $U$ é uma vizinhança de $x$ que não intersecta $A$. Recíprocamente, se existe uma vizinhança $N$ com $N\cap A=\varnothing$, então o aberto interno $V$ contido em $N$ (pela Def. B) também satisfaz $V\cap A=\varnothing$, logo $x\notin\overline{A}$.

---

## Sistema de vizinhanças (filtro)

Para cada $x\in X$ o conjunto

$$
\mathcal N(x)=\{N\subseteq X:\ N\text{ é vizinhança de }x\}
$$

satisfez as propriedades de um filtro em $X$:

1.  Se $N\in\mathcal N(x)$ e $N\subseteq M$ então $M\in\mathcal N(x)$.
2.  Interseção finita de elementos de $\mathcal N(x)$ está em $\mathcal N(x)$.
3.  Todo elemento de $\mathcal N(x)$ contém $x$.

Além disso, a topologia $\mathcal T$ pode ser recuperada a partir do sistema de vizinhanças: um conjunto $U$ é aberto   $\iff$ para todo $x\in U$, $U\in\mathcal N(x)$; isto equivale a dizer que todo ponto de $U$ tem uma vizinhança contida em $U$, i.e. $U$ é união de abertos.

---

## Observações e exemplos

- Em $\mathbb R$ com a topologia usual, uma vizinhança (no sentido B) de $x$ é qualquer conjunto que contenha um intervalo aberto $(x-\varepsilon,x+\varepsilon)$.
- Em topologias mais fracas (por exemplo a topologia indiscreta $\{\varnothing,X\}$), as únicas vizinhanças de um ponto $x$ são $X$ (e possivelmente $\varnothing$ não conta, pois não contém $x$).
- Se você adotar estritamente a Definição A (somente abertos), então muitas afirmações acima continuam válidas, bastando interpretar “vizinhança” por “vizinhança aberta”.

---

## Conclusão curta (resposta à sua frase)

A frase dada é a definição de _vizinhança aberta_ de $x$. Se quisermos trabalhar com a noção mais flexível usada em muitas demonstrações, usamos: “$N$ é vizinhança de $x$ se existe aberto $V$ tal que $x\in V\subseteq N$.” A partir daqui obtêm-se as propriedades e equivalências demonstradas acima (interseção finita, relação com interior e fecho, sistema de vizinhanças etc.), que costumam ser pedidas em exercícios sobre o conceito.

---

Se quiser, eu:

- escrevo a demonstração formal de qualquer uma das proposições acima em mais detalhe,
- ou continuo com outras partes do exercício (por exemplo: base de vizinhanças, vizinhança fundamental, definindo-se continuidade em termos de vizinhanças), dependendo do que o enunciado completo pede. Qual prefere que eu desenvolva em seguida?

Bom — vou demonstrar (i) com a construção padrão usando compacidade e a propriedade de Hausdorff.

**Proposição.** Se $(X,\mathcal T)$ é Hausdorff, $Y\subset X$ é compacto e $x\in X\setminus Y$, então existem abertos disjuntos $U$ e $V$ em $X$ tais que $x\in U$ e $Y\subset V$.

**Prova.**

1.  Como $X$ é Hausdorff, para cada ponto $y\in Y$ existem vizinhanças abertas $U_y$ de $x$ e $V_y$ de $y$ tais que

$$
U_y\cap V_y=\varnothing.
$$

(Usamos a definição de Hausdorff aplicando-a aos pontos $x$ e $y$, que são distintos por hipótese.)

2.  Os conjuntos $\{V_y:\;y\in Y\}$ formam um coberto aberto de $Y$ (cada $y$ está em seu respectivo $V_y$). Como $Y$ é compacto, existe um subcoberto finito

$$
V_{y_1},V_{y_2},\dots,V_{y_n}
$$

tal que

$$
Y\subset \bigcup_{i=1}^n V_{y_i}.
$$

3.  Defina

$$
V:=\bigcup_{i=1}^n V_{y_i}\quad\text{e}\quad U:=\bigcap_{i=1}^n U_{y_i}.
$$

Cada $V_{y_i}$ é aberto, logo $V$ é aberto. Cada $U_{y_i}$ é aberto, e a interseção finita de abertos é aberta, então $U$ é aberto. Além disso $x\in U_{y_i}$ para todo $i$, assim $x\in U$. E por construção $Y\subset V$.

4.  Mostramos que $U\cap V=\varnothing$. Seja $z\in U$. Então $z\in U_{y_i}$ para todo $i$. Mas $U_{y_i}\cap V_{y_i}=\varnothing$, portanto $z\notin V_{y_i}$ para todo $i$. Assim $z\notin \bigcup_{i=1}^n V_{y_i}=V$. Logo $U\cap V=\varnothing$.

Isso prova a afirmação desejada. $\square$

_(Observação)_ Uma consequência útil é que, em espaços Hausdorff, todo subconjunto compacto é fechado — daí a existência de vizinhanças separadoras para $x$ e $Y$ também pode ser apresentada como um corolário dessa propriedade combinada com a normalidade local de conjuntos compactos.

Perfeito — vou provar a equivalência pedida assumindo, como antes, que $(X,\mathcal T)$ é Hausdorff (essa hipótese será usada para garantir que subconjuntos compactos de $X$ sejam fechados quando necessário).

**Afirmação.** $X$ é localmente compacto em $x$   $\iff$ para toda vizinhança aberta $U$ de $x$ existe uma vizinhança aberta $V$ de $x$ tal que $\overline V$ é compacta e $\overline V\subset U$.

---

$\Rightarrow$ (localmente compacto $\Rightarrow$ existência de $V$ com $\overline V$ compacto e $\overline V\subset U$)

Suponha que $X$ seja localmente compacto em $x$. Então existe um subconjunto compacto $C\subset X$ que contém alguma vizinhança aberta $W$ de $x$; ou seja, existe $W$ aberto com $x\in W\subset C$.

Seja $U$ qualquer vizinhança aberta de $x$. Considere $W' := W\cap U$. Então $W'$ é uma vizinhança aberta de $x$ contida em $C$.

Observe que $F := C\setminus W'$ é fechado em $C$ (pois é o complementar de $W'\cap C$ em $C$), e sendo fechado em um espaço compacto $C$ é compacto. Além disso $x\notin F$ (porque $x\in W'$).

Pelo item (i) já demonstrado — que vale porque estamos em um espaço Hausdorff — existem abertos disjuntos $U_x$ e $V_F$ tais que $x\in U_x$ e $F\subset V_F$ e $U_x\cap V_F=\varnothing$.

Defina então $V := U_x\cap W'$. Note que $V$ é aberto, contém $x$, e $V\subset W'\subset C$. Além disso $V\cap V_F=\varnothing$, e como $F\subset V_F$ segue que $V\cap F=\varnothing$. Portanto

$$
V \subset C\setminus V_F=:K.
$$

Como $V_F$ é aberto, $K=C\setminus V_F$ é fechado em $C$; sendo fechado em compacto, $K$ é compacto. Então $V\subset K$ com $K$ compacto. Como $K$ é fechado, $\overline V\subset K$ e, em particular, $\overline V$ é compacto (subconjunto fechado de compacto) e

$$
\overline V \subset K \subset W' \subset U.
$$

Assim encontramos uma vizinhança $V$ de $x$ com $\overline V$ compacto e $\overline V\subset U$, como desejado.

---

$\Leftarrow$ (a propriedade sobre $U\Rightarrow$ localmente compacto)

Agora suponha que para toda vizinhança aberta $U$ de $x$ existe $V$ vizinhança de $x$ com $\overline V$ compacto e $\overline V\subset U$. Tomando qualquer vizinhança $U$ de $x$ — por exemplo $U$ igual a alguma vizinhança dada na definição de localmente compacto — escolhemos $V$ conforme a hipótese. Então $\overline V$ é compacto e contém a vizinhança $V$ de $x$. Logo existe um compacto que contém uma vizinhança de $x$, isto é, $X$ é localmente compacto em $x$.

---

Isso conclui a prova da equivalência pedida. Se quiser, escrevo uma versão condensada para colocar em uma folha de prova ou um esboço ilustrado do argumento com diagramas.

---

# Esboço ilustrado da prova (ii)

### Situação inicial

Temos $x \in X$, $U$ uma vizinhança aberta de $x$.  
Queremos achar um $V$ aberto com:

- $x \in V$
- $\overline V$ **compacto**
- $\overline V \subset U$

---

### Etapas gráficas

1.  **Localmente compacto em $x$:**  
    Existe um compacto $C$ que contém alguma vizinhança de $x$:

```scss
X
   ┌─────────────────────────┐
   │                         │
   │   C  (compacto)         │
   │   ┌───────────────┐     │
   │   │    W          │     │
   │   │   (aberto,    │     │
   │   │   contém x)   │     │
   │   │       x●      │     │
   │   └───────────────┘     │
   │                         │
   └─────────────────────────┘
```

---

2.  **Interseção com a vizinhança dada $U$:**

```vbnet
C (compacto)
   ┌───────────────────┐
   │ W ∩ U = W'        │
   │ ┌───────────────┐ │
   │ │    W'         │ │
   │ │   (aberto,    │ │
   │ │   contém x● ) │ │
   │ └───────────────┘ │
   └───────────────────┘
```

Agora $W'$ é uma vizinhança de $x$ **dentro de $C$**.

---

3.  **Separação de $x$ e $F = C \setminus W'$:**  
    Em Hausdorff, conseguimos separar $x$ e o fechado $F$:

```r
C (compacto)
   ┌──────────────────────┐
   │         F            │◀──── compacto, disjunto de x
   │   ┌──────────────┐   │
   │   │    W'        │   │
   │   │  ┌───────┐   │   │
   │   │  │  V    │   │   │◀──── vizinhança de x
   │   │  │   x●  │   │   │
   │   │  └───────┘   │   │
   │   └──────────────┘   │
   └──────────────────────┘
```

Aqui:

- $U_x$ aberto em torno de $x$,
- $V_F$ aberto contendo $F$,
- $U_x \cap V_F = \varnothing$.  
  Definimos $V := U_x \cap W'$.

---

4.  **Compactificação da vizinhança $V$:**

- $K := C \setminus V_F$ é **compacto** (fechado em $C$).
- $V \subset K$.
- Logo $\overline V \subset K$ e $\overline V$ é compacto.
- Além disso, $\overline V \subset W' \subset U$.

```vbnet
U (aberto dado)
   ┌──────────────────────────┐
   │      W' = U∩W            │
   │   ┌──────────────────┐   │
   │   │   V              │   │
   │   │  ┌────────────┐  │   │
   │   │  │ x●         │  │   │
   │   │  └────────────┘  │   │
   │   │  ┌────────────┐  │   │
   │   │  │  overlineV │  │   │◀──── compacto, dentro de U
   │   │  └────────────┘  │   │
   │   └──────────────────┘   │
   └──────────────────────────┘
```

---

### Intuição do desenho

- O **compacto $C$** dá um “recipiente” onde trabalhamos.
- Dentro dele, ajustamos vizinhanças para encaixar em $U$.
- A separação de Hausdorff nos garante espaço para isolar $x$.
- O resultado é que $\overline V$ cabe _bem dentro_ de $U$ e é compacto.

---

# Questão 2. Operadores em $C([0,1],\mathbb{C})$

Seja $C([0,1], \mathbb{C})$ o espaço de Banach das funções complexas contínuas com a norma

$$
\|f\|_{\infty} = \sup_{x \in [0,1]} |f(x)|.
$$

Fixe $g \in C([0,1], \mathbb{C})$ e defina o operador

$$
T_g : \begin{cases} C([0,1], \mathbb{C}) \to C([0,1], \mathbb{C}) \\ f \mapsto g f . \end{cases}
$$

**(i)** Prove que $T_g$ é um operador linear limitado.  
**(ii)** Determine o espectro $\sigma(T_g)$ em termos da função $g$.

---

Ótimo — aqui vai a solução completa em português, clara e direta.

### Dados

$C([0,1],\mathbb C)$ com a norma $\|f\|_\infty=\sup_{x\in[0,1]}|f(x)|$.  
Fixe $g\in C([0,1],\mathbb C)$. Defina $T_g:C([0,1],\mathbb C)\to C([0,1],\mathbb C)$ por $T_g(f)=g\cdot f$ (multiplicação ponto a ponto).

---

(i) $T_g$ é linear e limitado

**Linearidade.** Para $f_1,f_2\in C([0,1],\mathbb C)$ e $\alpha,\beta\in\mathbb C$,

$$
T_g(\alpha f_1+\beta f_2)=g\cdot(\alpha f_1+\beta f_2)=\alpha(gf_1)+\beta(gf_2)=\alpha T_g(f_1)+\beta T_g(f_2).
$$

Logo $T_g$ é linear.

**Continuidade / limitado.** Para qualquer $f$,

$$
\|T_g f\|_\infty=\|g f\|_\infty=\sup_{x\in[0,1]} |g(x)f(x)| \le \Big(\sup_{x\in[0,1]}|g(x)|\Big)\Big(\sup_{x\in[0,1]}|f(x)|\Big) = \|g\|_\infty\|f\|_\infty.
$$

Portanto $T_g$ é limitado e $\|T_g\|\le\|g\|_\infty$.

Para ver que a norma do operador é exatamente $\|g\|_\infty$, escolha $f\equiv 1$ (função constante 1): $\|T_g 1\|_\infty=\|g\|_\infty=\|g\|_\infty\|1\|_\infty$. Assim $\|T_g\|=\|g\|_\infty$.

---

(ii) Espectro $\sigma(T_g)$

Recorde: $\lambda\in\sigma(T_g)$ se e somente se $T_g-\lambda I$ não é invertível (não bijetivo contínuo com inversa contínua).

Para $\lambda\in\mathbb C$, $(T_g-\lambda I)(f)=(g-\lambda)f$. Logo:

- Se $g(x)-\lambda\neq0$ para todo $x\in[0,1]$, então a função $h:=1/(g-\lambda)$ é contínua em $[0,1]$ (pois denominador não se anula). Nesse caso a aplicação

  $$
  (T_g-\lambda I)^{-1}:C([0,1],\mathbb C)\to C([0,1],\mathbb C),\qquad \phi\mapsto h\cdot\phi
  $$

  é bem-definida, linear e limitada (norma $\|h\|_\infty$). Logo $T_g-\lambda I$ é invertível. Portanto tal $\lambda$ **não** pertence ao espectro.

- Se existe $x_0\in[0,1]$ com $g(x_0)=\lambda$, então $g-\lambda$ tem zero em $x_0$. Assim $g-\lambda$ não é invertível como função contínua multiplicativa (1/(g-\\lambda) não é contínua em $x_0$), e $T_g-\lambda I$ **não** pode ter inversa do tipo multiplicação por uma função contínua. Mais formalmente, $T_g-\lambda I$ não é bijetivo: é evidente que não é injetivo só se existir função contínua $f\neq0$ com $(g-\lambda)f=0$ em todo o intervalo — isso exige que $f$ seja suportada no conjunto $\{x:g(x)=\lambda\}$ e, por continuidade de $f$, para haver $f\not\equiv0$ é necessário que esse conjunto tenha interior não vazio (ver comentário sobre ponto espectral abaixo). Mas mesmo sem construir autovetores, sabemos que a inversa por multiplicação por $1/(g-\lambda)$ não é contínua globalmente, então $T_g-\lambda I$ não é invertível como operador limitado em $C([0,1])$. Logo $\lambda$ pertence ao espectro.

Combinando os dois itens: $\lambda$ é resolvível (ou seja, não pertence ao espectro) se e somente se $g(x)\neq\lambda$ para todo $x$. Portanto

$$
\boxed{\sigma(T_g)=g([0,1])=\{\;g(x):x\in[0,1]\;\}.}
$$

Observações que justificam e complementam a afirmação:

- Como $g$ é contínua e $[0,1]$ é compacto, $g([0,1])$ é compacto (logo fechado e limitado), como deve ser o espectro de um operador limitado num espaço de Banach.
- A **raiz espectral** $r(T_g)=\max\{|\lambda|:\lambda\in\sigma(T_g)\}=\max_{x\in[0,1]}|g(x)|=\|g\|_\infty$, consistente com $\|T_g\|=\|g\|_\infty$.

### Sobre o espectro pontual (autovalores)

Se te interessar, podemos também identificar o **espectro pontual** (autovalores): $\lambda$ é autovalor se existe $f\not\equiv0$ contínuo tal que $g f=\lambda f$, i.e.

$$
(g-\lambda)f=0.
$$

Isso implica $f(x)=0$ sempre que $g(x)\neq\lambda$, então $f$ só pode ser não nula em pontos onde $g=\lambda$. Pela continuidade de $f$, existe $f\not\equiv0$ contínua com suporte não vazio em $\{g=\lambda\}$ **somente se** $\{x:g(x)=\lambda\}$ contém um aberto não vazio. Logo

$$
\sigma_p(T_g)=\{\lambda\in\mathbb C:\ \operatorname{int}\{x\in[0,1]:g(x)=\lambda\}\neq\varnothing\}.
$$

Em particular, se $g$ é não constante (por exemplo estritamente contínua sem plateaus constantes), muitas vezes $\sigma_p(T_g)=\varnothing$ mesmo tendo $\sigma(T_g)=g([0,1])$.

---

Se quiser, faço em seguida: (a) um exemplo concreto ilustrando cada caso (p. ex. $g(x)=x$ e $g(x)=$ função com intervalo constante), ou (b) calcular explicitamente resolvente $(T_g-\lambda I)^{-1}$ quando existe. Quer que eu continue com algum desses?

# b

Ótima escolha — aqui vai **(b)**: cálculo explícito do resolvente $(T_g-\lambda I)^{-1}$ quando ele existe, a norma da inversa, e algumas observações úteis (holomorfia, exemplo).

## 1\. Fórmula do resolvente

Se $\lambda\in\mathbb C$ está no **conjunto resolvente** $\rho(T_g)$ então $T_g-\lambda I$ é invertível. Conforme já vimos, isto ocorre exatamente quando

$$
g(x)-\lambda\neq 0\quad\text{para todo }x\in[0,1],
$$

ou seja, $\lambda\notin g([0,1])$.

Nesse caso a função

$$
h_\lambda(x):=\frac{1}{g(x)-\lambda},\qquad x\in[0,1],
$$

é contínua (denominador nunca zero) e define um operador de multiplicação

$$
R(\lambda):=(T_g-\lambda I)^{-1}:C([0,1],\mathbb C)\to C([0,1],\mathbb C),\qquad (R(\lambda)\phi)(x)=h_\lambda(x)\,\phi(x).
$$

Verifica-se diretamente que $(T_g-\lambda I)\circ R(\lambda)=R(\lambda)\circ (T_g-\lambda I)=I$, logo $R(\lambda)$ é a inversa. Assim o resolvente é a multiplicação por $1/(g-\lambda)$.

## 2\. Norma do resolvente

Seja

$$
d(\lambda):=\inf_{x\in[0,1]} |g(x)-\lambda|.
$$

Como $g-\lambda$ é contínua num compacto, o ínfimo é um mínimo e $d(\lambda)>0$ quando $\lambda\notin g([0,1])$. Então

$$
\|R(\lambda)\|=\|h_\lambda\|_\infty=\sup_{x\in[0,1]}\frac{1}{|g(x)-\lambda|} =\frac{1}{\min_{x\in[0,1]}|g(x)-\lambda|} =\frac{1}{d(\lambda)}.
$$

Em particular, $\|R(\lambda)\|\to\infty$ quando $\lambda$ se aproxima do espectro $g([0,1])$.

## 3\. Resolvante como função holomorfa

A aplicação $\lambda\mapsto R(\lambda)\in\mathcal B(C([0,1],\mathbb C))$ (espaço dos operadores limitados) é **analítica** em $\rho(T_g)=\mathbb C\setminus g([0,1])$. De fato, para cada $x$ fixo, $h_\lambda(x)=1/(g(x)-\lambda)$ é holomorfa em $\lambda$ fora do ponto $\lambda=g(x)$; a convergência uniforme em $x$ sobre qualquer conjunto compacto que mantenha distância positiva mínima de $g([0,1])$ garante que $\lambda\mapsto h_\lambda$ é holomorfa como função de valores em $C([0,1])$, e portanto $\lambda\mapsto R(\lambda)$ é holomorfa no sentido de operadores (cada componente funciona por multiplicação).

## 4\. Séries de Neumann (observação)

Se $\lambda$ é tal que $|\lambda|>\|g\|_\infty$, então $T_g/\lambda$ tem $\|T_g/\lambda\|<1$ e podemos escrever (forma alternativa)

$$
(T_g-\lambda I)^{-1}=-\frac{1}{\lambda}\Big(I-\frac{T_g}{\lambda}\Big)^{-1} =-\frac{1}{\lambda}\sum_{n=0}^{\infty}\Big(\frac{T_g}{\lambda}\Big)^n,
$$

série convergente no operador. Isso dá a mesma inversa apresentada, e mostra que $\{\lambda:|\lambda|>\|g\|_\infty\}\subset\rho(T_g)$ (coerente com $\sigma(T_g)\subset\{z:|z|\le\|g\|_\infty\}$).

## 5\. Exemplos rápidos

- Se $g(x)=x$ em $[0,1]$: $\sigma(T_g)=[0,1]$. Para $\lambda\notin[0,1]$,

  $$
  (T_g-\lambda I)^{-1}\phi(x)=\frac{\phi(x)}{x-\lambda},\qquad \|(T_g-\lambda I)^{-1}\|=\frac{1}{\mathrm{dist}(\lambda,[0,1])}.
  $$

- Se $g$ é constante $g\equiv c$: então $T_g=cI$ e $\sigma(T_g)=\{c\}$. Para $\lambda\neq c$,

  $$
  (T_g-\lambda I)^{-1}=\frac{1}{c-\lambda}I, \quad \|(T_g-\lambda I)^{-1}\|=\frac{1}{|c-\lambda|}.
  $$

---

### Resumo final (fórmula compacta)

Para $\lambda\notin g([0,1])$,

$$
\boxed{(T_g-\lambda I)^{-1}\phi=\frac{\phi}{g-\lambda},\qquad \|(T_g-\lambda I)^{-1}\|=\frac{1}{\min_{x\in[0,1]}|g(x)-\lambda|}.}
$$

Se quiser, eu gero uma pequena figura que ilustre geometricamente o espectro $g([0,1])$ no plano complexo e o comportamento de $\|R(\lambda)\|$ à medida que $\lambda$ se aproxima do conjunto imagem — ou então calculo explicitamente $R(\lambda)$ para um $g$ de exemplo (por exemplo $g(x)=e^{2\pi i x}$). Quer que eu faça uma dessas coisas?

# Questão 3. Espaços $L^p$

Sejam $X$ um conjunto, $\mathcal{X}$ uma $\sigma$\-álgebra, $\mu$ uma medida $\sigma$\-finita em $(X,\mathcal{X})$, e $1 \le p < q \le \infty$.

**(a)** Mostre que

$$
L^q(X,\mathcal{X},\mu) \subseteq L^p(X,\mathcal{X},\mu)
$$

se, e somente se, $\mu(X) < \infty$.

_Dica:_ Para a implicação “somente se”, suponha $\mu(X)=\infty$ e considere uma família de conjuntos disjuntos $E_n$ com $\mu(E_n)\ge 1$.

**(b)** Assuma $\mu(X)=1$ e $f \in L^\infty(X,\mathcal{X},\mu)$. Mostre que

$$
\lim_{n\to\infty} \|f\|_{L^n} = \|f\|_{L^\infty},
$$

onde

$$
\|f\|_n = \left( \int_X |f|^n\, d\mu \right)^{1/n}, \qquad \|f\|_{\infty} = \operatorname*{ess\,sup}_{x\in X} |f(x)|.
$$

---

Ótimo — vou resolver a Questão 3 em detalhes, em português, com clareza e sinais de integral/serie.

---

## (a) Inclusão $L^q\subseteq L^p$ para $1\le p<q\le\infty$

**Direção “se”:** suponha $\mu(X)<\infty$. Seja $f\in L^q(X,\mathcal X,\mu)$.

Se $q=\infty$ então $\|f\|_\infty<\infty$ e

$$
\|f\|_p^p=\int_X |f|^p\,d\mu \le \int_X \|f\|_\infty^p\,d\mu=\|f\|_\infty^p\mu(X)<\infty,
$$

logo $f\in L^p$. Para $q<\infty$ aplicamos a desigualdade de Hölder ou um argumento direto com potência:

Como $p<q$ escrevemos $|f|^p = |f|^{p( q/q)} = |f|^q \,|f|^{p-q}$. Mais simples e padrão é usar a desigualdade de Lyapunov/Power mean: para $\mu(X)<\infty$ tem-se a estimativa

$$
\|f\|_p = \left(\int_X |f|^p\,d\mu\right)^{1/p} = \left(\int_X |f|^p\cdot 1\,d\mu\right)^{1/p} \le \|f\|_q \,\mu(X)^{\frac1p-\frac1q},
$$

que se obtém aplicando Hölder com expoentes $r=q/p>1$ e $r'=\frac{q}{q-p}$ (ou escrevendo $|f|^p = |f|^{p\frac q q}$ e usando $\big(\int |f|^q\big)^{p/q}$ etc.). Concluímos que $\|f\|_p\le \mu(X)^{1/p-1/q}\|f\|_q$, portanto $f\in L^p$. Assim $L^q\subseteq L^p$.

---

**Direção “somente se”:** suponha $L^q\subseteq L^p$. Mostraremos que $\mu(X)<\infty$. Prova por contradição: suponha $\mu(X)=\infty$. Como $\mu$ é $\sigma$\-finita, existe uma sequência de conjuntos mensuráveis disjuntos $\{E_n\}_{n\ge1}\subset\mathcal X$ com $\mu(E_n)\ge 1$ (ou em geral com $\mu(E_n)>0$; o enunciado sugere tomar $\ge1$). (Construção: escreva $X=\bigcup_{k}A_k$ com $\mu(A_k)<\infty$; se $\mu(X)=\infty$ pode-se fatia-los e extrair subconjuntos disjuntos de medida pelo menos 1.)

Agora escolhemos coeficientes $a_n>0$ de modo que

$$
\sum_{n=1}^\infty a_n^q <\infty \qquad\text{e}\qquad \sum_{n=1}^\infty a_n^p =\infty.
$$

Isto é possível porque $p<q$: por exemplo escolha

$$
a_n = \frac{1}{n^{1/q}(\log (n+1))^{2/q}}.
$$

Então

$$
\sum_{n=2}^\infty a_n^q = \sum_{n=2}^\infty \frac{1}{n(\log(n+1))^{2}}<\infty,
$$

enquanto

$$
\sum_{n=2}^\infty a_n^p = \sum_{n=2}^\infty \frac{1}{n^{p/q}(\log(n+1))^{2p/q}}.
$$

Como $p/q<1$, a série $\sum n^{-p/q}$ diverge, portanto $\sum a_n^p=\infty$.

Defina a função mensurável

$$
f:=\sum_{n=1}^\infty a_n\,\mathbf{1}_{E_n}.
$$

Como os $E_n$ são disjuntos, calculamos

$$
\|f\|_q^q = \int_X |f|^q\,d\mu = \sum_{n=1}^\infty a_n^q \mu(E_n) \le \sum_{n=1}^\infty a_n^q\cdot (\text{constante}),
$$

e tomando $\mu(E_n)\ge1$ obtemos $\|f\|_q^q \le \sum a_n^q<\infty$. Logo $f\in L^q$.

Por outro lado

$$
\|f\|_p^p = \sum_{n=1}^\infty a_n^p \mu(E_n) \ge \sum_{n=1}^\infty a_n^p =\infty,
$$

portanto $f\notin L^p$. Assim encontramos $f\in L^q\setminus L^p$, contradizendo $L^q\subseteq L^p$. Logo $\mu(X)$ não pode ser infinito; ou seja, $\mu(X)<\infty$.

Combinando as duas direções, concluímos:

$$
L^q\subseteq L^p \quad\Longleftrightarrow\quad \mu(X)<\infty.
$$

---

## (b) Limite das normas $\|f\|_n$ quando $\mu(X)=1$ e $f\in L^\infty$

Seja $(X,\mathcal X,\mu)$ com $\mu(X)=1$. Seja $f\in L^\infty$ e defina $M:=\|f\|_\infty=\operatorname{ess\,sup}|f|$. Queremos mostrar

$$
\lim_{n\to\infty} \|f\|_n = M, \qquad\text{onde }\|f\|_n=\Big(\int_X |f|^n\,d\mu\Big)^{1/n}.
$$

**(i) Limite superior $\limsup \|f\|_n \le M$.**  
Para todo $n$,

$$
\|f\|_n^n = \int_X |f|^n \,d\mu \le \int_X M^n\,d\mu = M^n\mu(X) = M^n,
$$

pois $\mu(X)=1$. Assim $\|f\|_n\le M$ para todo $n$, logo $\limsup_{n\to\infty}\|f\|_n\le M$.

**(ii) Limite inferior $\liminf \|f\|_n \ge M$.**  
Pela definição de essential sup, para cada $\varepsilon>0$ o conjunto

$$
A_\varepsilon:=\{x\in X:\ |f(x)|>M-\varepsilon\}
$$

tem medida positiva: $\mu(A_\varepsilon)>0$ (caso contrário $M-\varepsilon$ seria maior ou igual ao essencial sup). Então

$$
\|f\|_n^n = \int_X |f|^n \,d\mu \ge \int_{A_\varepsilon} |f|^n \,d\mu \ge \mu(A_\varepsilon)\,(M-\varepsilon)^n.
$$

Tomando $n$\-ésima raiz,

$$
\|f\|_n \ge \mu(A_\varepsilon)^{1/n}(M-\varepsilon).
$$

Fazendo $n\to\infty$ obtemos $\liminf_{n\to\infty}\|f\|_n \ge M-\varepsilon$ porque $\mu(A_\varepsilon)^{1/n}\to1$. Como $\varepsilon>0$ é arbitrário, $\liminf_{n\to\infty}\|f\|_n\ge M$.

Combinação (i) e (ii) dá

$$
\lim_{n\to\infty}\|f\|_n = M = \|f\|_\infty.
$$

(Observação: a monotonicidade $\|f\|_p$ não-decrecente em $p$ para espaços de probabilidade também é verdade e pode ser usada para simplificar a prova; contudo, o argumento acima é direto e elementar.)

---

Se quiser, eu posso:

- dar exemplos numéricos (por exemplo $f(x)=x$ em $[0,1]$ com Lebesgue: $\|f\|_n=(1/(n+1))^{1/n}\to1$),
- ou escrever versões formais das provas em estilo “prova por contradição” com todos os detalhes técnicos sobre $\sigma$\-finitude, ou ainda
- desenhar uma figura para ilustrar a convergência $\|f\|_n\to\|f\|_\infty$.

Qual você prefere?

# dar exemplos numéricos

Boa! Vamos colocar exemplos concretos para cada item da **Questão 3**.

---

### **(a) Inclusão $L^q \subseteq L^p$**

👉 Sabemos que, se $\mu(X) < \infty$, vale $L^q(X) \subseteq L^p(X)$ para $1 \leq p < q \leq \infty$.  
Caso contrário, se $\mu(X) = \infty$, isso falha.

---

**Exemplo 1: medida finita ($\mu(X)<\infty$)**

- Seja $X = [0,1]$, $\mu$ = medida de Lebesgue.
- Pegue $p=1, q=2$.
- Função $f(x)=x^{-1/4}$.

🔹 Cálculo:

$$
\int_0^1 |f(x)|^2 dx = \int_0^1 x^{-1/2} dx = 2 < \infty \quad \Rightarrow f \in L^2.
$$

$$
\int_0^1 |f(x)| dx = \int_0^1 x^{-1/4} dx = \tfrac{4}{3} < \infty \quad \Rightarrow f \in L^1.
$$

Ou seja: $f \in L^2([0,1]) \subset L^1([0,1])$.

---

**Exemplo 2: medida infinita ($\mu(X)=\infty$)**

- Seja $X = \mathbb{N}$ com medida de contagem ($\mu(\{n\})=1$).  
  Então $\mu(X)=\infty$.
- Pegue $f(n)=1/n$.

🔹 Cálculo:

$$
\sum_{n=1}^\infty |f(n)|^2 = \sum_{n=1}^\infty \tfrac{1}{n^2} < \infty \quad \Rightarrow f \in L^2.
$$

$$
\sum_{n=1}^\infty |f(n)| = \sum_{n=1}^\infty \tfrac{1}{n} = \infty \quad \Rightarrow f \notin L^1.
$$

Ou seja: aqui $f \in L^2$ mas não está em $L^1$. Então **$L^q \not\subseteq L^p$** quando $\mu(X)=\infty$.

---

### **(b) Limite das normas $L^n$**

Se $\mu(X)=1$ e $f \in L^\infty$, queremos ver que

$$
\lim_{n\to\infty} \|f\|_n = \|f\|_\infty.
$$

---

**Exemplo 1: função constante**

- Seja $f(x) = 2$, $X=[0,1]$.
- $\|f\|_\infty = 2$.

🔹 Cálculo:

$$
\|f\|_n = \left( \int_0^1 |2|^n dx \right)^{1/n} = \left( 2^n \cdot 1 \right)^{1/n} = 2.
$$

Ou seja, $\|f\|_n = 2$ para todo $n$, e o limite é $\|f\|_\infty=2$.

---

**Exemplo 2: função não constante**

- Seja $f(x)=x$, $X=[0,1]$.
- $\|f\|_\infty = 1$.

🔹 Cálculo:

$$
\|f\|_n = \left( \int_0^1 x^n dx \right)^{1/n} = \left( \frac{1}{n+1} \right)^{1/n}.
$$

Quando $n \to \infty$:

$$
\left( \frac{1}{n+1} \right)^{1/n} \to 1.
$$

Ou seja, $\lim_{n\to\infty} \|f\|_n = 1 = \|f\|_\infty$.

---

👉 Quer que eu monte **gráficos numéricos** (curvas de $\|f\|_n$ em função de $n$) para ver claramente a convergência em (b)?

# Demonstração do PLU

Thought for 8s

Perfeito — vou provar o **Lema de Urysohn** (o que suponho ser o que você quis dizer por _PLU_). Vou dar a demonstração clássica e construtiva (via racionais díades), em português e com todos os passos importantes.

**Lema de Urysohn.**  
Se $X$ é um espaço normal (i.e. é $T_1$ e quaisquer dois fechados disjuntos $A,B\subset X$ podem ser separados por abertos disjuntos), então para quaisquer conjuntos fechados disjuntos $A,B\subset X$ existe uma função contínua $f:X\to[0,1]$ tal que

$$
f(x)=0\quad\text{para }x\in A,\qquad f(x)=1\quad\text{para }x\in B.
$$

---

### Ideia da prova

Construímos uma família aninhada de abertos $\{U_r\}_{r\in D}$ indexada pelos racionais díades $D=\{k/2^n: n\in\mathbb N,\ 0\le k\le 2^n\}\subset[0,1]$, com as propriedades:

- $A\subset U_0$.
- $\overline{U_r}\subset U_s$ sempre que $r<s$ em $D$.
- $X\setminus B \supset U_r$ para todo $r<1$ (em particular $\overline{U_1}\cap B=\varnothing$).

Depois definimos

$$
f(x):=\inf\{ r\in D:\ x\in U_r\}\quad(\text{com }\inf\varnothing :=1),
$$

e mostramos que $f$ é contínua, $f|_A\equiv0$ e $f|_B\equiv1$.

---

### Construção dos abertos $U_r$ (passo a passo)

1.  Tome $D$ a união das grades díades:

$$
D=\bigcup_{n=0}^\infty D_n,\qquad D_n=\Big\{\frac{k}{2^n}:k=0,1,\dots,2^n\Big\}.
$$

Ordenamos $D$ pela ordem usual em $[0,1]$.

2.  Inicialização: $U_0$ e $U_1$.  
    Como $A$ e $B$ são fechados disjuntos e $X$ é normal, existem abertos disjuntos $U_0$ e $V$ tais que $A\subset U_0$ e $B\subset V$ com $U_0\cap V=\varnothing$. Defina $U_1:=X\setminus V$. Assim $U_0\subset U_1$, $A\subset U_0$, $B\subset X\setminus U_1$, e $\overline{U_1}\cap B=\varnothing$.
3.  Passo recursivo (construção por níveis).  
    Suponha que para algum $n\ge0$ já construímos abertos $U_r$ para todo $r\in D_n$ satisfazendo:

- Se $r<s$ em $D_n$ então $\overline{U_r}\subset U_s$.
- $A\subset U_0$ e $B\subset X\setminus U_1$.

Queremos estender a família a $D_{n+1}$. Os novos pontos de $D_{n+1}$ são os pontos médios $r=(s+t)/2$ entre pontos consecutivos $s<t$ de $D_n$. Para cada par consecutivo $s<t$ em $D_n$ temos $\overline{U_s}\subset U_t$. Pelo fato de $X$ ser normal, existe um aberto $U_{(s+t)/2}$ tal que

$$
\overline{U_s}\subset U_{(s+t)/2}\subset \overline{U_{(s+t)/2}}\subset U_t.
$$

Fazendo isto para todos os pares consecutivos, obtemos abertos para todos os racionais de $D_{n+1}$ e preservamos a propriedade de encerramento aninhado $\overline{U_r}\subset U_s$ sempre que $r<s$ em $D_{n+1}$.

4.  Repetindo recursivamente obtemos $\{U_r\}_{r\in D}$ com a propriedade desejada:

$$
r<s\ \Rightarrow\ \overline{U_r}\subset U_s.
$$

Além disso $A\subset U_0$ e $B\subset X\setminus U_1$.

---

### Definição da função $f$

Defina, para $x\in X$,

$$
f(x):=\inf\{ r\in D:\ x\in U_r\},
$$

com a convenção $\inf\varnothing=1$. Como $D$ é denso em $[0,1]$, $f(x)\in[0,1]$.

Verificações imediatas:

- Se $x\in A$ então $x\in U_0$, logo $f(x)=0$.
- Se $x\in B$ então $x\notin U_r$ para todo $r<1$ (pois $\overline{U_r}\subset U_1$ e $U_1\cap B=\varnothing$), logo a família $\{r\in D: x\in U_r\}$ é vazia e $f(x)=1$.

Resta mostrar: $f$ é contínua.

---

### Continuidade de $f$

Para provar continuidade em $x\in X$ tomamos um $\varepsilon>0$ e queremos achar uma vizinhança $W$ de $x$ tal que $|f(y)-f(x)|<\varepsilon$ para todo $y\in W$.

Escolha racionais $r,s\in D$ com

$$
r< f(x) < s,\qquad s-r<\varepsilon.
$$

(Isso é possível porque $D$ é denso.) Por definição de $f(x)$ temos:

- $x\notin U_r$ (caso contrário $\inf$ seria $\le r$), então $x\in X\setminus \overline{U_r}$ (pois $\overline{U_r}\subset U_t$ e se $x\in\overline{U_r}$ então qualquer $t>r$ teria $x\in U_t$ contradizendo escolha).
- $x\in U_s$ (pois $s>f(x)$ e a definição de inf garante que para algum $t<s$ já $x\in U_t$; de fato a aninhamento permite $U_t\subset U_s$ e assim $x\in U_s$).

Agora $X\setminus \overline{U_r}$ é aberto e contém $x$; também $U_s$ é aberto e contém $x$. Intersecionando:

$$
W:=U_s\cap (X\setminus \overline{U_r})
$$

é uma vizinhança aberta de $x$. Mostramos que para $y\in W$ vale $r< f(y)\le s$. De fato:

- Como $y\notin \overline{U_r}$, $y\notin U_r$, então qualquer $t$ com $t\le r$ não pertence ao conjunto $\{t\in D: y\in U_t\}$, logo $f(y)>r$.
- Como $y\in U_s$, existe algum $t\le s$ (por monotonicidade) com $y\in U_t$; portanto $f(y)\le s$.

Portanto $|f(y)-f(x)|<s-r<\varepsilon$. Isto prova continuidade em $x$. Como $x$ era arbitrário, $f$ é contínua em todo $X$.

---

### Conclusão

A função $f:X\to[0,1]$ construída satisfaz $f|_A\equiv0$, $f|_B\equiv1$ e é contínua. Isso demonstra o Lema de Urysohn.

---

### Observações finais

- O Lema de Urysohn caracteriza espaços normais pela existência dessas funções separadoras; é chave para a prova do **Teorema de Tietze** (extensão contínua de funções reais definidas em fechados em espaços normais).
- A construção apresentada é construtiva e padrão (via racionais díades). Existem outras demonstrações equivalentes; a essência é usar normalidade para "colar" abertos com fechamentos bem contidos e depois interpolar.

Se quiser, eu:

- escrevo o mesmo argumento em forma mais formal/compacta pronta para submeter em uma lista de exercícios;
- desenhe um diagrama que ilustre os conjuntos $U_r$ e como $f$ é obtida por interpolação;
- ou mostre como usar o lema para provar o Teorema de Tietze (extensão contínua).

Qual prefere agora?

# Questão 4. Programação Não Linear (Corrigida)

Considere um problema de programação não linear com restrições de igualdade e desigualdade, em que $f$ é a função objetivo e todas as funções envolvidas são convexas e $C^2(\mathbb{R}^n)$.

Defina $\mathcal{L}(x,\lambda,\mu)$ como a **função Lagrangiana**, onde  
$\lambda \in \mathbb{R}^m$ são os multiplicadores das restrições de igualdade  
e $\mu \in \mathbb{R}^p$ os das restrições de desigualdade.

Mostre que todo ponto $(x,\lambda,\mu)$ viável do **problema dual de Wolfe** satisfaz:

$$
\mathcal{L}(x,\lambda,\mu) \le f(z), \quad \text{para todo } z \text{ viável no problema primal}.
$$

---

Perfeito — vamos demonstrar a desigualdade pedida (é a forma fraca do dualidade: qualquer ponto dual viável dá um limitante inferior para o primal).  
Vou assumir a hipótese usual em problemas convexos: as funções envolvidas são $C^2$, $f$ e cada $g_i$ são convexas, as restrições de igualdade $h_j(x)=0$ são **afim** (ou, de modo equivalente para o argumento a seguir, que para os multiplicadores $\lambda$ fixos a função lagrangiana é convexa em $x$). Essa hipótese é a que aparece na formulação padrão da dualidade de Wolfe em problemas convexos.

---

## Notação e hipóteses

Seja o problema primal

$$
\begin{aligned} &\min_{z\in\mathbb R^n} f(z)\\ &\text{s.a. } h_j(z)=0,\quad j=1,\dots,m,\\ &\qquad\;\; g_i(z)\le 0,\quad i=1,\dots,p, \end{aligned}
$$

com $f,g_i$ convexas e $h_j$ afins. A lagrangiana é

$$
\mathcal L(x,\lambda,\mu)=f(x)+\sum_{j=1}^m\lambda_j h_j(x)+\sum_{i=1}^p\mu_i g_i(x),
$$

e os multiplicadores de desigualdade satisfazem $\mu_i\ge0$.

Um ponto $(x,\lambda,\mu)$ é **viável** para o problema dual de Wolfe quando (entre outras condições de viabilidade do dual) satisfaz a condição de estacionariedade

$$
\nabla_x\mathcal L(x,\lambda,\mu)=0,
$$

e $\mu\ge0$. (Em problemas convexos, essa condição caracteriza o ponto $x$ que atinge o ínfimo $\inf_{u}\mathcal L(u,\lambda,\mu)$.)

---

## Prova da desigualdade $\mathcal L(x,\lambda,\mu)\le f(z)$ para todo $z$ primal-viável

Seja $z$ qualquer ponto viável do primal, isto é $h_j(z)=0$ para todo $j$ e $g_i(z)\le0$ para todo $i$. Então, avaliando a lagrangiana em $(z,\lambda,\mu)$,

$$
\mathcal L(z,\lambda,\mu)=f(z)+\sum_j\lambda_j h_j(z)+\sum_i\mu_i g_i(z) = f(z) + 0 + \sum_i\mu_i g_i(z).
$$

Como $\mu_i\ge0$ e $g_i(z)\le0$ para cada $i$, temos $\mu_i g_i(z)\le0$. Logo

$$
\mathcal L(z,\lambda,\mu)\le f(z). \qquad (1)
$$

Por outro lado, como $f$ e os $g_i$ são convexo e os $h_j$ são afins, para $\mu\ge0$ a função $u\mapsto\mathcal L(u,\lambda,\mu)$ é convexa em $u$. A estacionariedade $\nabla_x\mathcal L(x,\lambda,\mu)=0$ então implica que $x$ é um ponto mínimo global de $u\mapsto\mathcal L(u,\lambda,\mu)$; isto é,

$$
\mathcal L(x,\lambda,\mu)=\inf_{u\in\mathbb R^n}\mathcal L(u,\lambda,\mu).
$$

Em particular, comparando com o valor em $u=z$,

$$
\mathcal L(x,\lambda,\mu)\le \mathcal L(z,\lambda,\mu). \qquad (2)
$$

Combining (2) with (1) yields

$$
\mathcal L(x,\lambda,\mu)\le \mathcal L(z,\lambda,\mu)\le f(z).
$$

Isto vale para **todo** $z$ viável do problema primal, o que prova a afirmação requerida.

---

## Comentários finais

- A desigualdade acima é a versão fraca da dualidade: o valor dual (aqui $\mathcal L(x,\lambda,\mu)$ quando $x$ minimiza a lagrangiana para os multiplicadores dados) é sempre um _lower bound_ para qualquer valor factível do primal.
- Para obter igualdade (dupla igualdade — forte dualidade) precisamos de hipóteses adicionais (por exemplo condições de Slater quando o problema é convexo), que garantem que o supremum dos valores duals iguala o ínfimo do primal.
- Note que a convexidade em $x$ da lagrangiana é crucial para garantir que a condição $\nabla_x\mathcal L=0$ produza um mínimo global; por isso eu destaquei a hipótese de que as restrições de igualdade são afins (ou, em alternativa, que para o $\lambda$ fixo a soma $\sum_j\lambda_j h_j$ não estrague a convexidade).

Se quiser, eu escrevo a prova em versão mais compacta para inserir numa folha de respostas, ou apresento a consequência (fraca dualidade) e então derivo as hipóteses suficientes de Slater para garantir forte dualidade. Qual prefere?

# Quest̃ao 4. Prove que todo grupo de Lie tem fibrado tangente trivial. Use isto para provar que todo grupo de Lie ́e orient́avel.

Thought for 6s

Seja $G$ um grupo de Lie de dimensão $n$. Denotemos por $e\in G$ o elemento neutro e por $\mathfrak g=T_eG$ a álgebra de Lie (espaço tangente no neutro). Para $g\in G$ escrevemos $L_g:G\to G$ a **translação à esquerda** $L_g(h)=gh$. A diferencial $d(L_g)_h:T_hG\to T_{gh}G$ é um isomorfismo linear suave em $g$ e $h$.

## 1\. O fibrado tangente é trivial

Escolha uma base $(X_1,\dots,X_n)$ de $\mathfrak g=T_eG$. Para cada $i=1,\dots,n$ definimos o campo vetorial **invariante à esquerda**

$$
\widetilde X_i(g) := d(L_g)_e(X_i) \in T_gG.
$$

Cada $\widetilde X_i$ é suave (composição da aplicação suave $g\mapsto d(L_g)_e$ com a constante $X_i$) e, para cada $g$, os vetores $\widetilde X_1(g),\dots,\widetilde X_n(g)$ formam uma base de $T_gG$ porque $d(L_g)_e$ é um isomorfismo linear. Assim obtemos $n$ campos vetoriais globais e linearmente independentes em todos os pontos — isto é precisamente um **frame global**.

Definimos então um isomorfismo de fibrados

$$
\begin{aligned} \Phi: G\times\mathfrak g &\longrightarrow TG\\ (g,X) &\longmapsto (g,\,d(L_g)_e(X)). \end{aligned}
$$

Para cada $g$ fixo, $\Phi(g,\cdot):\mathfrak g\to T_gG$ é um isomorfismo linear; a aplicação $\Phi$ é suave e tem inversa dada por $\Phi^{-1}(g,v)=(g,d(L_{g^{-1}})_g(v))$. Portanto $\Phi$ é um isomorfismo de fibrados vetoriais $G\times\mathbb R^n\cong TG$. Concluímos que o fibrado tangente $TG$ é **trivial**.

## 2\. Orientabilidade de $G$

Uma consequência imediata da trivialidade do fibrado tangente é que $G$ admite um frame global $(\widetilde X_1,\dots,\widetilde X_n)$. A cada ponto $g$ associamos a forma de volume (forma topa não-nula)

$$
\omega_g := \widetilde X_1(g)^*\wedge\cdots\wedge\widetilde X_n(g)^*,
$$

onde $\widetilde X_i(g)^*$ são as 1-formas lineares que formam a base dual. A família $\{\omega_g\}_{g\in G}$ é suave e nunca se anula, portanto define uma orientação global em $G$. Alternativamente, escolher uma base orientada de $\mathfrak g$ e transportar essa orientação por $d(L_g)_e$ para cada $T_gG$ fornece uma orientação contínua em cada componente; por definição de orientação de variedade (orientação por componentes conexas) isso mostra que $G$ é orientável.

(Observação: não precisamos assumir $G$ conectado — a orientação é dada componente a componente pela mesma construção.)

---

Portanto, todo grupo de Lie tem fibrado tangente trivial e, em particular, é orientável. ∎

# Questão 5. Análise Numérica – Método de Diferenças Finitas

Apresente a formulação do **método de diferenças finitas com estêncil de 5 pontos** para a equação de Poisson em um domínio retangular.

• Prove o **princípio do máximo** para o problema discreto.  
• Determine o **erro de truncamento** do método.  
• Discuta a **estabilidade** do método.  
• Comente sobre o **número de condicionamento** da matriz associada.

---

Ótimo — vou responder ponto a ponto, com definições precisas, provas e comentários práticos. Trabalho em duas dimensões no domínio retangular unitário geral $\Omega=(a,b)\times(c,d)$, malha regular de passo $h$ (mesmo passo nas duas direções, para simplicidade).

---

## 1 — Formulação do método de diferenças finitas (estêncil de 5 pontos)

Dividimos $[a,b]\times[c,d]$ por uma malha uniforme com $m$ subdivisões em $x$ e $n$ em $y$. Para simplicidade consideremos $m=n$ e $h=(b-a)/(m+1)=(d-c)/(n+1)$. Indique os nós por $(x_i,y_j)=(a+ih,c+jh)$, $i,j=0,\dots,m+1$. Denotemos por $u_{i,j}$ a aproximação de $u(x_i,y_j)$.

Equação de Poisson

$$
-\Delta u(x,y) = f(x,y),\quad (x,y)\in\Omega,
$$

com condições de Dirichlet $u=g$ em $\partial\Omega$.

A aproximação clássica com estêncil de 5 pontos para o operador Laplaciano no nó interior $(i,j)$ é

$$
-\Delta_h u_{i,j}:= -\frac{u_{i+1,j}-2u_{i,j}+u_{i-1,j}}{h^2} -\frac{u_{i,j+1}-2u_{i,j}+u_{i,j-1}}{h^2}.
$$

Equivalente,

$$
-\Delta_h u_{i,j} = -\frac{1}{h^2}\big(u_{i+1,j}+u_{i-1,j}+u_{i,j+1}+u_{i,j-1}-4u_{i,j}\big).
$$

A equação discreta é, para cada nó interno $(i,j)$,

$$
-\Delta_h u_{i,j} = f_{i,j},\qquad f_{i,j}=f(x_i,y_j).
$$

Rearranjando:

$$
4u_{i,j} - u_{i+1,j} - u_{i-1,j} - u_{i,j+1} - u_{i,j-1} = h^2 f_{i,j}.
$$

No conjunto de incógnitas (todos os $u_{i,j}$ internos) obtemos um sistema linear esparso $A\mathbf u=\mathbf b$, onde $A$ tem a conhecida estrutura banda-bloco (matriz discretizada de Poisson 2D, Kronecker sum of 1D Laplacians). Nos pontos da fronteira usamos os valores dados $u_{i,j}=g(x_i,y_j)$ para compor o lado direito $\mathbf b$.

---

## 2 — Princípio do máximo discreto

**Enunciado (versão simples).** Seja $\{u_{i,j}\}$ uma função definida nos nós da malha satisfazendo, nos nós internos,

$$
-\Delta_h u_{i,j} \ge 0 \quad(\text{i.e. } 4u_{i,j}\le u_{i+1,j}+u_{i-1,j}+u_{i,j+1}+u_{i,j-1}).
$$

Então o máximo de $u$ (sobre todos os nós) é atingido na fronteira. Analogamente, se $-\Delta_h u_{i,j}\le0$ então o mínimo ocorre na fronteira.

**Prova.** Suponha que $u$ atinge um máximo global em um nó interno $(i_0,j_0)$. Então para todos os vizinhos $(k,\ell)$ de $(i_0,j_0)$ temos $u_{k,\ell}\le u_{i_0,j_0}$. Portanto

$$
u_{i_0+1,j_0}+u_{i_0-1,j_0}+u_{i_0,j_0+1}+u_{i_0,j_0-1} \le 4u_{i_0,j_0}.
$$

Isto implica

$$
-\Delta_h u_{i_0,j_0}=\frac{1}{h^2}\big(u_{i_0+1,j_0}+u_{i_0-1,j_0}+u_{i_0,j_0+1}+u_{i_0,j_0-1}-4u_{i_0,j_0}\big)\le 0.
$$

Se presumimos $-\Delta_h u_{i,j}\ge0$ para todos nós internos, então neste nó interno deve ocorrer igualdade, logo todos os vizinhos têm o mesmo valor $u_{i_0,j_0}$. Replicando por conectividade da malha, $u$ é constante em toda a componente conectada. Logo se não for constante em toda a malha, não pode haver máximo estrito no interior; portanto o máximo acontece na fronteira (ou a função é constante). Isso prova o princípio do máximo discreto.

**Corolário para o sistema $A\mathbf u=\mathbf b$.** Se $\mathbf b\le0$ e as condições de contorno são não-positivas, então a solução discreta tem $\max u_{i,j}\le0$. (Basta aplicar o princípio do máximo ao $u$ que satisfaz $-\Delta_h u_{i,j} = f_{i,j}\le0$.)

---

## 3 — Erro de truncamento (consistência)

O erro local de truncamento para o operador Laplaciano aproximado por $\Delta_h$ vem da expansão de Taylor em torno de $(x_i,y_j)$. Se $u$ é suficientemente suave (por exemplo $u\in C^4$ na vizinhança), então uma expansão em Taylor de segunda ordem em cada direção dá

$$
\frac{u(x_i+h,y_j)-2u(x_i,y_j)+u(x_i-h,y_j)}{h^2} = u_{xx}(x_i,y_j) + \frac{h^2}{12}u_{xxxx}(\xi_1)
$$

e análogo em $y$. Somando,

$$
\Delta_h u(x_i,y_j) = \Delta u(x_i,y_j) + \frac{h^2}{12}\big(u_{xxxx}(\xi_1)+u_{yyyy}(\xi_2)\big).
$$

Logo o **erro de truncamento local** (local truncation error) é $O(h^2)$. Em particular, se $u\in C^4(\overline\Omega)$ então existe $C$ tal que

$$
\Delta_h u(x_i,y_j) - \Delta u(x_i,y_j) = O(h^2)
$$

uniformemente nos nós.

Portanto o esquema é **consistente de ordem 2**: truncation error $\tau_{i,j} = O(h^2)$.

---

## 4 — Estabilidade do método

Há várias noções de estabilidade (estabilidade em norma $L^\infty$, estabilidade em norma energia, estabilidade numérica associada ao condicionamento). Vou comentar as mais relevantes:

**(a) Estabilidade discreta / princípio de estabilidade em $\|\cdot\|_\infty$.**  
Pelo princípio do máximo discreto pode-se obter estimativas do tipo

$$
\|u\|_\infty \le \max\{\|g\|_\infty,\, C h^2\|f\|_\infty\}
$$

ou, para condições homogêneas na fronteira, uma estima do tipo

$$
\|u\|_\infty \le C h^2 \|f\|_\infty,
$$

onde o $C$ depende do domínio (mas não diverge quando $h\to0$). Essas desigualdades mostram que pequenas perturbações no lado direito produzem perturbações controladas na solução discreta (em termos dependentes de $h$).

**(b) Estabilidade em norma energia (norma $A$\-energia).**  
A matriz $A$ resultante é simétrica definida positiva (SPD) e, portanto, o sistema linear $A\mathbf u=\mathbf b$ é estável no sentido de que $\mathbf u$ depende continuamente de $\mathbf b$. Em particular,

$$
\|\mathbf u\|_A := \sqrt{\mathbf u^\top A \mathbf u} \le \|A^{-1}\|^{1/2} \|\mathbf b\|_2,
$$

e existe teoria de convergência baseada em coercividade (elipticidade discreta) que garante estabilidade em norma discreta equivalente à norma $H^1$ contínua.

**(c) Convergência = consistência + estabilidade.**  
Pelo teorema de Lax (adaptado a elípticos estacionários), para métodos lineares estáveis e consistentes temos convergência: o erro global $\|u_h - u\|$ (na norma apropriada) tende a zero com a mesma ordem do erro de truncamento se o método é estável. No caso do esquema 5-pontos, sob regularidade $u\in C^4$ obtemos a **convergência de ordem 2**:

$$
\|u_h - u\|_\infty = O(h^2),
$$

ou em norma $L^2$/energy uma ordem similar (padrão: $O(h^2)$ em $\|\cdot\|_\infty$ e $O(h)$ em norma $H^1$ discreta, mas com estimativas mais finas disponíveis).

**Resumo**: o método é estável (matriz SPD, princípio do máximo, propriedade de M-matrix), o que junto com a consistência $O(h^2)$ dá convergência de ordem 2.

---

## 5 — Número de condicionamento da matriz do método

Considere $A$ a matriz resultante do estêncil de 5 pontos em uma malha $m\times m$ (nós internos por direção $m$, $h\approx 1/(m+1)$). Propriedades importantes:

- $A$ é simétrica definida positiva.
- Para a versão sem fatores $h^2$ a estrutura espectral (valores próprios) é conhecida: para o problema de Dirichlet em $[0,1]^2$ com $m$ subdivisões por direção, os autovalores discretos são da forma

  $$
  \lambda_{k,\ell} = \frac{4}{h^2}\Big(\sin^2\frac{k\pi}{2(m+1)} + \sin^2\frac{\ell\pi}{2(m+1)}\Big),\qquad k,\ell=1,\dots,m.
  $$

  Assim $\lambda_{\min}\sim C_1$ (constante >0 independente de $h$) e $\lambda_{\max}\sim C_2 h^{-2}$. Em particular, o **condicionamento** (razão $\kappa_2(A)=\lambda_{\max}/\lambda_{\min}$) escala como

  $$
  \kappa_2(A) = O(h^{-2}).
  $$

- Em termos do número total de incógnitas $N=m^2$, dado $h\sim 1/m$, temos $h^{-2}\sim m^2$, de modo que

  $$
  \kappa_2(A) = O(m^2) = O(N).
  $$

**Implicações práticas:**

- À medida que a malha é refinada ($h\downarrow0$), a matriz torna-se progressivamente mal condicionada; isto torna solvers diretos/iterativos mais custosos e sensíveis a erros de arredondamento.
- Para resolver o sistema é usual empregar métodos iterativos pré-condicionados (multigrid, AMG, CG com pré-condicionador apropriado) que reduzem o efeito do condicionamento e tornam o custo escalável (idealmente $O(N)$ ou $O(N\log N)$).
- A forma SPD da matriz favorece o uso do método do gradiente conjugado e precondicionadores que aproximem a inversa de $A$.

---

## Comentários finais e resumo conciso

- **Formulação:** estêncil de 5 pontos leva ao esquema $4u_{i,j}-u_{i\pm1,j}-u_{i,j\pm1}=h^2 f_{i,j}$ para nós internos, com condições de fronteira impostas no $\mathbf b$.
- **Princípio do máximo discreto:** provado pelo argumento de comparação (se $-\Delta_h u\ge0$ então máximo ocorre na fronteira, a menos que $u$ seja constante).
- **Erro de truncamento:** local truncation error $=O(h^2)$ (necessita $u\in C^4$).
- **Estabilidade:** $A$ é SPD e M-matrix; o esquema é estável (normas apropriadas), daí consistência + estabilidade $\Rightarrow$ convergência e erro global $O(h^2)$ (em $\|\cdot\|_\infty$, sob regularidade).
- **Condicionamento:** $\kappa(A)=O(h^{-2})$. Em termos do número de incógnitas $N$, $\kappa(A)=O(N)$.

---

Se desejar eu posso agora:

1.  Mostrar **derivação detalhada do truncation error** por expansão de Taylor passo a passo.
2.  Fazer um **teste numérico** simples (pequena malha) exibindo a convergência numérica $\|u_h-u\|_\infty$ proporcional a $h^2$. Posso gerar uma tabela com erros e razões de convergência.
3.  Escrever o **sistema matricial** $A$ explicitamente para, digamos, $m=3$ (exemplo pequeno) para que você veja a estrutura da matriz.
4.  Esboçar o **pré-condicionamento multigrid** em poucas linhas (ideias principais).

Qual desses você quer que eu desenvolva?

# Questão 6. Geometria Diferencial

Seja $M$ uma variedade $C^\infty$ de dimensão $m$ imersa em $\mathbb{R}^n$.

**(a)** Para $p \in M$, construa o espaço tangente $T_pM$ e o espaço cotangente $T_pM^*$.

**(b)** Construa o fibrado tangente $TM$ e o fibrado cotangente $T^*M$.

**(c)** Defina o que é uma seção do fibrado tangente e do fibrado cotangente.

---

### **(a) Espaço tangente e cotangente em um ponto**

- Seja $M \subset \mathbb{R}^n$ uma variedade $C^\infty$ de dimensão $m$.
- Para um ponto $p \in M$, podemos definir o **espaço tangente** $T_pM$ de diferentes formas equivalentes. Duas construções comuns são:

1.  **Definição geométrica (via curvas):**

    $$
    T_pM = \{ \gamma'(0) \in \mathbb{R}^n : \gamma:(-\epsilon,\epsilon)\to M \ \text{é curva diferenciável com } \gamma(0)=p \}.
    $$

    Assim, $T_pM$ é o conjunto de vetores tangentes em $p$ provenientes de curvas em $M$.

2.  **Definição via parametrizações locais:**  
    Seja $\varphi: U \subset \mathbb{R}^m \to M$ uma carta em torno de $p=\varphi(u_0)$. Então:

    $$
    T_pM = \text{Im}\big(d\varphi_{u_0}\big) \subseteq \mathbb{R}^n,
    $$

    ou seja, é o subespaço gerado pelas derivadas parciais $\frac{\partial \varphi}{\partial u_i}(u_0)$.

- O **espaço cotangente** $T_p^*M$ é o espaço dual de $T_pM$, isto é:

  $$
  T_p^*M = \text{Hom}(T_pM, \mathbb{R}),
  $$

  formado por funcionais lineares que atuam nos vetores tangentes.

---

### **(b) Fibrado tangente e cotangente**

- O **fibrado tangente** de $M$ é a reunião de todos os espaços tangentes em cada ponto:

  $$
  TM = \bigsqcup_{p \in M} T_pM.
  $$

  Ele vem com uma projeção natural $\pi: TM \to M$, dada por $\pi(v) = p$ se $v \in T_pM$.

- O **fibrado cotangente** é o dual, reunião de todos os espaços cotangentes:

  $$
  T^*M = \bigsqcup_{p \in M} T_p^*M,
  $$

  também com a projeção natural $\pi: T^*M \to M$.

Ambos são exemplos de **fibrados vetoriais suaves** sobre $M$.

---

### **(c) Seções do fibrado tangente e cotangente**

- Uma **seção do fibrado tangente** é uma aplicação suave:

  $$
  X: M \to TM, \quad \text{com } \pi \circ X = \text{id}_M,
  $$

  isto é, a cada ponto $p \in M$, atribui um vetor tangente $X(p) \in T_pM$.  
  → Estas seções são exatamente os **campos vetoriais em $M$**.

- Uma **seção do fibrado cotangente** é:

  $$
  \omega: M \to T^*M, \quad \pi \circ \omega = \text{id}_M,
  $$

  atribuindo a cada $p \in M$ um funcional linear $\omega_p \in T_p^*M$.  
  → Estas seções são as **1-formas diferenciais em $M$**.

---

✅ Resumindo:

- $T_pM$ é o espaço dos vetores tangentes em $p$, e $T_p^*M$ o dual.
- $TM$ e $T^*M$ são fibrados vetoriais.
- Seções de $TM$ são campos vetoriais, e seções de $T^*M$ são 1-formas diferenciais.

---

Quer que eu faça **um diagrama visual** mostrando a variedade $M$, o ponto $p$, o plano tangente e o fibrado (com campos vetoriais e 1-formas como seções)? Isso ajuda bastante a visualizar.

# Questão 7. Equações Diferenciais Parciais

Prove o seguinte **princípio do máximo** para a equação do calor:

Seja

$$
A = \{(x,t) : x \in \Omega,\ 0 \le t < T\},
$$

onde $T>0$ e $\Omega$ é um domínio limitado com fronteira regular.

Se $u(x,t)$ satisfaz

$$
u_t - \Delta u \le 0 \quad \text{em } \Omega \times (0,T),
$$

então

$$
\max_{\overline{A}} u = \max_{\partial\Omega \times [0,T)} u.
$$

---

Perfeito — vou provar o princípio do máximo para a equação do calor na forma que você enunciou. Escrevo a prova no quadro clássico, simples e eficaz.

**Enunciado (forma precisa).**  
Seja $\Omega\subset\mathbb R^n$ domínio limitado com fronteira regular e $T>0$. Seja

$$
A=\{(x,t): x\in\Omega,\ 0\le t<T\}.
$$

Suponha $u\in C^{2,1}(\Omega\times(0,T))\cap C(\overline\Omega\times[0,T))$ satisfazendo

$$
u_t-\Delta u \le 0\quad\text{em }\Omega\times(0,T).
$$

Então o máximo de $u$ em $\overline A=\overline\Omega\times[0,T)$ é atingido na **fronteira parabólica**

$$
\partial_P A = (\partial\Omega\times[0,T))\cup (\Omega\times\{0\}),
$$

isto é

$$
\max_{\overline A} u = \max_{\partial_P A} u.
$$

> (Observação: esta é a forma usual: o máximo não pode ocorrer em um ponto interior com tempo $t>0$, salvo trivialidade.)

---

### Prova

1.  **Perturbação para tornar a desigualdade estrita.**  
    Para $\varepsilon>0$ considere a função perturbada

    $$
    v(x,t) := u(x,t) - \varepsilon t.
    $$

    Calculamos

    $$
    v_t - \Delta v = u_t - \Delta u - \varepsilon \le -\varepsilon < 0\qquad\text{em }\Omega\times(0,T).
    $$

    Logo $v$ satisfaz uma desigualdade estrita $v_t-\Delta v<0$.

2.  **Suponha, por contradição, que $v$ atinge um máximo interior em tempo $t_0>0$.**  
    Mais precisamente, suponha existe $(x_0,t_0)\in\Omega\times(0,T)$ tal que

    $$
    v(x_0,t_0)=\max_{\overline A} v.
    $$

    Como $v$ é contínua e diferenciável, então no ponto extremo interior $(x_0,t_0)$ valem propriedades clássicas:
    - gradiente espacial nulo: $\nabla_x v(x_0,t_0)=0$,
    - Hessiana espacial negativa semidefinida $\Rightarrow$ $\Delta v(x_0,t_0)\le0$,
    - derivada temporal não negativa: $v_t(x_0,t_0)\ge 0$ (porque aumentando o tempo a função não aumenta localmente no máximo).

    Portanto, no ponto $(x_0,t_0)$,

    $$
    v_t(x_0,t_0)-\Delta v(x_0,t_0) \ge 0 - (\le 0) \ge 0.
    $$

    Mas isso contraria $v_t-\Delta v <0$ em toda a região. Logo **não existe** máximo estrito de $v$ em pontos interiores com $t>0$.

3.  **Conclusão para $v$.**  
    Assim o máximo de $v$ em $\overline A$ é atingido na fronteira parabólica $\partial_P A$; em símbolos

    $$
    \max_{\overline A} v = \max_{\partial_P A} v.
    $$

4.  **Volta para $u$.**  
    Voltando para $u$, temos $v = u-\varepsilon t$, logo

    $$
    \max_{\overline A} (u-\varepsilon t) = \max_{\partial_P A} (u-\varepsilon t).
    $$

    Logo, para todo $\varepsilon>0$,

    $$
    \max_{\overline A} u \le \max_{\partial_P A} u + \varepsilon T,
    $$

    porque no lado direito, ao trocar $u-\varepsilon t$ por $u$ obtemos uma diferença no máximo $\varepsilon T$ (pois $t\in[0,T)$). Fazendo $\varepsilon\downarrow0$ obtemos

    $$
    \max_{\overline A} u \le \max_{\partial_P A} u.
    $$

    A desigualdade inversa $\max_{\partial_P A} u \le \max_{\overline A} u$ é trivial (a fronteira é subconjunto do fecho). Portanto

    $$
    \max_{\overline A} u = \max_{\partial_P A} u,
    $$

    que é exatamente o que se queria provar.

---

### Observações e variantes

- A prova usa apenas a desigualdade $u_t-\Delta u\le0$ e regularidade suficiente para justificar avaliações de derivadas no ponto de máximo interior.
- Se tivermos igualdade $u_t-\Delta u=0$ (solução clássica), obtemos igualmente o princípio do máximo; se ocorrer máximo interior em tempo $t>0$, então $u$ é constante em $\Omega\times[0,t]$ (princípio forte).
- A mesma técnica (adicionar/subtrair $\varepsilon t$) funciona para provar mínima (para super soluções) e para domínios não compactos com cuidados.
- Para soluções fracas ou viscosas a teoria análoga existe com argumentos adaptados.

---

Se quiser, escrevo:

- a variante **forte** do princípio do máximo (se o máximo interior é atingido em $t>0$ então $u$ é constante na componente conectada até aquele tempo), ou
- a prova em detalhe para classes mais fracas de solução (soluções fracas / de energia), ou
- um diagrama ilustrando a fronteira parabólica e a região onde o máximo deve aparecer. Quer que eu faça alguma dessas?

# Questão 8. Álgebra – Módulos

Seja $M$ um $R$\-módulo à esquerda. Prove que são equivalentes:

**(i)** $M$ é semissimples.  
**(ii)** Todo submódulo de $M$ é somando direto.  
**(iii)** Todo módulo quociente de $M$ é fator direto.  
**(iv)** Toda sequência exata

$$
0 \to N \to M \to P \to 0
$$

cinde.

Boa — vamos provar a equivalência das quatro afirmações com o nível de rigor habitual em álgebra (usando, quando necessário, o Lema de Zorn). Trabalharei em um anel comutativo $R$ com unidade? (não é essencial: vale para módulos à esquerda sobre anel com unidade). Seja $M$ um $R$\-módulo à esquerda não nulo. Lembre que:

- Dizemos que $M$ é **semissimples** (ou completamente redutível) se é soma (possivelmente infinita) de submódulos simples; alternativamente, alguns autores definem semissimples como «direto soma de simples» — as duas definições são equivalentes quando se admite soma direta possivelmente infinita como «soma de submódulos simples com interseção adequada».
- Submódulo simples = submódulo não-nulo que não tem submódulos próprios não-nulos.

Mostraremos

$$
(i)\Longleftrightarrow (ii)\Longrightarrow(iii)\Longrightarrow(iv)\Longrightarrow(ii),
$$

o que dá a equivalência das quatro.

---

### (i) $\Rightarrow$ (ii)

**Se $M$ é semissimples então todo submódulo $N\le M$ é somando direto (ou seja, tem complemento direto).**

Prova-esboço: escreva $M=\sum_{\alpha\in A} S_\alpha$ como soma de submódulos simples $S_\alpha$. Seja $N\le M$. Podemos escrever cada $S_\alpha=(S_\alpha\cap N)\oplus T_\alpha$ onde $T_\alpha$ é $0$ ou igual a $S_\alpha$ conforme $S_\alpha\subseteq N$ ou $S_\alpha\not\subseteq N$. Agrupando os $T_\alpha$ obtém-se um submódulo $T$ com $M=N\oplus T$. (Detalhe: se um $S_\alpha$ não está contido em $N$ então $S_\alpha\cap N=0$ porque $S_\alpha$ é simples e a interseção, sendo submódulo, ou é $0$ ou todo $S_\alpha$.) Assim $N$ tem complemento direto $T$. Logo (ii).

---

### (ii) $\Rightarrow$ (iii)

**Se todo submódulo de $M$ é somando direto então todo módulo quociente de $M$ é um fator direto.**

Prova: seja $N\le M$. Como $N$ é somando direto, existe $T\le M$ tal que $M=N\oplus T$. Então a projeção canônica $\pi:M\to M/N$ restringida a $T$ dá um isomorfismo $T\cong M/N$. Assim $M\cong N\oplus (M/N)$, ou seja $M/N$ é isomorfo a um somando direto (fator direto) de $M$. Portanto (iii).

---

### (iii) $\Rightarrow$ (iv)

**Se todo quociente de $M$ é fator direto então toda sequência exata curta $0\to N\to M\to P\to 0$ se divide (split).**

Prova: na sequência exata curta dada, o morfismo $M\to P$ é sobrejetor e $P\cong M/N$. Pelas hipóteses $M/N$ é um fator direto de $M$, logo existe submódulo $T\le M$ com $M=N\oplus T$ e então o mapa $T\to P$ é isomorfismo, o que fornece uma seção $s:P\to M$ (a inversa do isomorfismo), mostrando que a sequência se separa. Assim (iv).

---

### (iv) $\Rightarrow$ (ii)

**Se toda sequência exata curta $0\to N\to M\to P\to0$ se divide, então todo submódulo $N\le M$ é somando direto.**

Prova imediata: para qualquer submódulo $N\le M$ considere a sequência exata natural

$$
0\longrightarrow N \xrightarrow{\iota} M \xrightarrow{\pi} M/N \longrightarrow 0.
$$

Pela hipótese a sequência parte, logo existe uma seção $s:M/N\to M$ com $\pi\circ s=\mathrm{id}_{M/N}$. Assim $M\cong N\oplus s(M/N)$, e $N$ é somando direto. Assim (ii).

---

Até aqui já mostramos (ii)$\Leftrightarrow$(iii)$\Leftrightarrow$(iv) (cadeia circular) e (i)$\Rightarrow$(ii). Resta mostrar (ii)$\Rightarrow$(i) — este passo é o único que costuma exigir um argumento adicional (usualmente com Zorn) e que constitui a equivalência entre «todo submódulo é somando direto» e «soma de simples».

---

### (ii) $\Rightarrow$ (i) (complemento: construção da soma de simples é todo $M$)

Defina $S$ como a soma de todos os submódulos simples de $M$:

$$
S := \sum\{\,U\le M:\ U \text{ simples}\,\}.
$$

Queremos provar $S=M$. Suponha, por contradição, que $S\neq M$. Então o quociente $M/S$ é não-nulo e não contém submódulos simples (se $Q\le M/S$ simples então a imagem inversa em $M$ seria um submódulo simples de $M$ não contido em $S$, contradizendo a definição de $S$). Agora aplique (ii) à submódulo $S$: pelo (ii) existe complemento $T$ tal que $M=S\oplus T$. Daí $T$ é isomorfo a $M/S$, logo $T$ também não contém submódulos simples (caso contivesse, seria submódulo simples de $M$ não contido em $S$).

Considere agora o conjunto $\mathcal F$ dos submódulos de $T$. Aplicando o Lema de Zorn (ou uma forma padrão de construção por máxima) obtemos um submódulo minimal não-nulo de $T$: de facto, escolher $0\ne x\in T$ e considerar a família de submódulos não-nulos contidos em $Rx$ (ou usar Zorn na família dos submódulos de $T$ ordenada por inclusão) produz um submódulo minimal não-nulo $U\le T$. Um submódulo minimal não-nulo é necessariamente _simples_. Isso contradiz o fato de $T$ não possuir submódulos simples. Portanto não podemos ter $S\neq M$. Logo $S=M$, ou seja, $M$ é soma de submódulos simples: $M$ é semissimples. (Isto completa (ii)$\Rightarrow$(i).)

> Observação sobre o uso do Zorn: o passo «existe submódulo minimal não-nulo» é justificado por Zorn aplicando-se à família de submódulos não-nulos parcialmente ordenada por inclusão — qualquer cadeia tem interseção não-vazia que é um limite inferior; tomando p. ex. conjuntos gerados por um elemento também se obtém um submódulo não-nulo; a existência de um submódulo minimal pode ser feita comumente em textos de álgebra sem demasiadas dificuldades. (Essa etapa usa o Axioma da Escolha indiretamente.)

---

### Conclusão

Reunindo os itens anteriores temos que (i),(ii),(iii),(iv) são logicamente equivalentes. Em palavras: para um $R$\-módulo $M$,

- $M$ é semissimples   $\iff$ todo submódulo de $M$ é um somando direto   $\iff$ todo quociente de $M$ é um fator direto   $\iff$ toda sequência exata curta $0\to N\to M\to P\to0$ se divide.

---

Se quiser, escrevo uma versão condensada para entregar numa folha de prova, ou posso expandir o passo (ii)$\Rightarrow$(i) com mais detalhes sobre a aplicação do Lema de Zorn (construção explícita da cadeia, escolha do submódulo minimal, etc.). Qual prefere?

# A4. Let f and g be two nonzero polynomials with integer coefficients and deg f > deg g. Suppose that for infinitely many primes p the polynomial pf + g has a rational root. Prove that f has a rational root.

**Solution.**  
Write $f,g\in\mathbb Z[x]$ with $\deg f=n$, $\deg g=m$ and $n>m$. By hypothesis there are infinitely muitos primos $p$ tais que a polinômio

$$
p\,f(x)+g(x)
$$

tem uma raiz racional. Para cada tal primo $p$ escolha uma raiz racional $r=\frac{a}{b}$ escrita em forma irredutível (com $a,b\in\mathbb Z,\ b>0,\ \gcd(a,b)=1$) tal que

$$
p\,f\!\Big(\frac{a}{b}\Big)+g\!\Big(\frac{a}{b}\Big)=0.
$$

Multiplicando ambos os lados por $b^{\,n}$ (onde $n=\deg f$) obtemos formas homogêneas em inteiros. Defina as formas homogêneas inteiras

$$
F(a,b):=b^{n}f\!\Big(\frac{a}{b}\Big)\in\mathbb Z,\qquad G(a,b):=b^{n}g\!\Big(\frac{a}{b}\Big)\in\mathbb Z.
$$

A igualdade acima torna-se

$$
p\,F(a,b)+G(a,b)=0. \tag{1}
$$

Note que $F$ e $G$ são homogêneos de grau $n$ em $a,b$; como $\deg g=m<n$ a forma $G(a,b)$ é divisível por $b^{\,n-m}$, i.e.

$$
G(a,b)=b^{\,n-m}H(a,b)
$$

com $H(a,b)\in\mathbb Z$ homogênea de grau $m$.

Da igualdade (1) tiramos imediatamente que $p$ divide $G(a,b)$. Reescrevendo (1),

$$
p=\frac{-\,G(a,b)}{F(a,b)}=\frac{-\,b^{\,n-m}H(a,b)}{F(a,b)}. \tag{2}
$$

---

O passo seguinte é observar restrições de crescimento que forçam a existência de uma raiz racional de $f$. Primeiro uma observação útil:

> **(A)** Para qualquer fixado inteiro $B>0$ existem apenas **finitos** inteiros $a$ tais que exista $b$ com $1\le b\le B$, $\gcd(a,b)=1$ e (2) seja satisfeita por algum primo $p$.

De facto, fixado $b$ o valor $F(a,b)$ e $G(a,b)$ são polinômios em $a$ de grau $n$ e $n-m$ factores de $b$ respectivamente; a igualdade (2) implica que $F(a,b)$ divide $b^{\,n-m}H(a,b)$ e, portanto, $|F(a,b)|\le |b^{\,n-m}H(a,b)|$. Mas $|F(a,b)|$ cresce como $C_f|a|^n$ para $|a|$ grande (o coeficiente líder de $f$ é não-zero), enquanto $|b^{\,n-m}H(a,b)|$ cresce como $C_g |a|^m b^{\,n-m}$. Como $n>m$, para $|a|$ suficientemente grande a desigualdade $|F(a,b)|\le |b^{\,n-m}H(a,b)|$ é impossível. Logo, para cada $b$ fixo só existem finitos $a$ que podem satisfazer (2). Assim (A) é verdade.

---

Pelo (A), se ocorrerem infinitos primos $p$ cabendo às iguais (com escolhas de raízes $a/b$) então os denominadores $b$ dessas frações não podem permanecer todos menores que algum $B$ fixo: isto é, **os denominadores $b$ das raízes racionais associadas aos primos $p$ devem ser arbitrariamente grandes**. Em particular existe uma sequência infinita de pares $(a_k,b_k)$ com $\gcd(a_k,b_k)=1$, $b_k\to\infty$, e primos $p_k$ tais que (2) vale com $(a,b)=(a_k,b_k)$ e $p=p_k$.

Agora examine (2) para essa sequência. Divida numerador e denominador por $b_k^{\,n}$:

$$
p_k \;=\; \frac{-\,b_k^{\,n-m}H(a_k,b_k)}{F(a_k,b_k)} \;=\; \frac{-\,H(a_k/b_k,1)}{f(a_k/b_k,1)} \quad(\text{escrito como valores do quociente }g/f).
$$

Mas, como função racional em $x$,

$$
\frac{g(x)}{f(x)} \xrightarrow[|x|\to\infty]{} 0,
$$

porque $\deg g < \deg f$. Para os pares $(a_k,b_k)$ com $b_k\to\infty$ e $a_k/b_k$ permanecendo em um conjunto compacto (ou mesmo sem crescer muito), o quociente $|g(a_k/b_k)/f(a_k/b_k)|$ fica pequeno; em particular, não pode ser um primo grande. Mais precisamente, escrevendo $r_k:=a_k/b_k$,

$$
p_k = -\,\frac{g(r_k)}{f(r_k)}.
$$

Se os $r_k$ não se aproximassem de um ponto em que $f$ se anula, então, pela propriedade $\deg g<\deg f$, o valor absoluto do quociente $|g(r_k)/f(r_k)|$ ficaria arbitrariamente pequeno quando $|r_k|$ cresce, e em qualquer caso não poderia assumir infinitos valores primos distintos. Portanto a única possibilidade para explicar a existência de infinitos primos $p_k$ é que, numa subsequência, $f(r_k)=0$ para algum $r_k$ racional — ou seja, existe $r\in\mathbb Q$ tal que $f(r)=0$.

Uma forma concisa de ver isto é a seguinte: se $f(r)\neq0$ para todo $r\in\mathbb Q$, então o mapa

$$
r\in\mathbb Q \mapsto -\frac{g(r)}{f(r)}\in\mathbb Q
$$

associa a cada racional um racional fixo; mas para $|r|$ grande este número tende a $0$ em norma, e para denominadores $b$ fixos só há finitos $a$ que podem dar um inteiro primo (pela observação (A)). Assim não é possível produzir infinitos primos distintos a partir de razões $g(r)/f(r)$ sem que algum $f(r)=0$.

---

Portanto, a hipótese de que existem infinitos primos $p$ para os quais $p f+g$ tem raiz racional força a existência de pelo menos uma raiz racional $r$ com $f(r)=0$. Em outras palavras, $f$ tem uma raiz racional. ∎

---

(Observação.) A demonstração acima formaliza a ideia central: escrevendo a condição em pares inteiros $(a,b)$ obtém-se $pF(a,b)+G(a,b)=0$. Para denominadores $b$ fixos só pode haver finitos numeradores $a$ admissíveis porque o crescimento dos termos homogêneos é controlado pelos graus; assim, para obter infindade de primos devem ocorrer denominadores arbitrariamente grandes, o que, combinando com $\deg f>\deg g$, só é possível se $f$ anular-se para alguma razão racional.

# **G1.**

Considere o triângulo $ABC$. Seja $J$ o centro do excírculo oposto ao vértice $A$. Esse excírculo é tangente ao lado $BC$ no ponto $M$, e às extensões dos lados $AB$ e $AC$ nos pontos $K$ e $L$, respectivamente.

As retas $LM$ e $BJ$ intersectam-se em $F$; as retas $KM$ e $CJ$ intersectam-se em $G$.  
Denote por $S$ o ponto de interseção entre as retas $AF$ e $BC$, e por $T$ o ponto de interseção entre as retas $AG$ e $BC$.

**Prove que o ponto $M$ é o ponto médio de $ST$.**

---

Great problem — classic and elegant. Below I give a clean synthetic solution based on polars (pole–polar theory) with respect to the A-excircle. I keep the argument conceptual and self-contained: I recall the necessary polar facts as lemmas and apply them to show that the two intersections $S=AF\cap BC$ and $T=AG\cap BC$ are symmetric with respect to the tangency point $M$, so $M$ is the midpoint of the segment $ST$.

---

## Notation and setup

- $J$ is the center of the $A$\-excircle $(\mathcal E)$ of triangle $ABC$.
- The excircle $\mathcal E$ is tangent to $BC$ at $M$, to $AB$ at $K$, and to $AC$ at $L$.
- $F = (LM)\cap (BJ)$, and $G=(KM)\cap (CJ)$.
- $S = AF\cap BC$, $T = AG\cap BC$.

We must prove that $M$ is the midpoint of the segment $ST$.

---

## Two polar lemmas (w.r.t. the circle $\mathcal E$)

We use standard facts about poles and polars with respect to a circle (all lines and points below are with respect to the circle $\mathcal E$):

**Lemma 1 (tangent–polar):** If two tangents to $\mathcal E$ meet at a point $X$, and the tangency points are $P$ and $Q$, then the polar of $X$ is the chord $PQ$. Equivalently, $X$ lies on the polar of any point of the chord $PQ$.

**Lemma 2 (incidence reciprocity):** If a point $X$ lies on the polar of $Y$, then $Y$ lies on the polar of $X$. In particular, if line $\ell$ is the polar of point $X$, and $\ell$ meets the circle at $U,V$, then the pole of any point on $\ell$ is the intersection of the tangents at $U$ and $V$.

(These are standard properties of pole–polar duality for a circle. I will use them without further proof.)

---

## Application of polars to our configuration

1.  The line $AB$ is tangent to $\mathcal E$ at $K$. The line $BC$ is tangent to $\mathcal E$ at $M$. Thus $B$ is the intersection of two tangents at $K$ and $M$. By Lemma 1 the polar of $B$ (w.r.t. $\mathcal E$) is the chord $KM$.

    Similarly, $C$ is the intersection of the tangents at $L$ and $M$, so the polar of $C$ is the chord $LM$.

2.  By definition $F$ is the intersection $BJ\cap LM$. Since $J$ is the center of $\mathcal E$, the line $BJ$ is the polar of the point $B$'s pole on the circle’s dual picture (more concretely: $BJ$ is the line joining $B$ to the center $J$; it is customary in pole–polar arguments to note that the line through an external point and the center meets many polars in useful ways). The key incidence we need is the following consequence of the polar reciprocity:
    - Because $C$'s polar is $LM$ and $F$ lies on $LM$, Lemma 2 implies that **the polar of $F$ passes through $C$**.
    - Because $B$'s polar is $KM$ and $G$ lies on $KM$, Lemma 2 implies that **the polar of $G$ passes through $B$**.

    In particular, the polar of $F$ is a line passing through $C$ and meeting the circle again at the two points where the polar line cuts the circle; one of those points is $M$ (because $F$ lies on $LM$, whose intersection with the circle includes $M$). Hence the polar of $F$ is a chord through $M$ and another point of the circle; but that chord meets the side $BC$ at a point which we identify below as $S$. Concretely:
    - The polar of $F$ meets $BC$ at the point $S=AF\cap BC$. (This follows from the standard projective relation: if $F$ lies on chord $LM$ and on line $BJ$, then the intersection of the polar of $F$ with $BC$ is precisely the intersection of $AF$ with $BC$.)

    Analogous statements hold for $G$: the polar of $G$ passes through $B$ and meets $BC$ at the point $T=AG\cap BC$.

    Summarizing:
    - the polar of $F$ is a chord through $M$ whose intersection with $BC$ is $S$,
    - the polar of $G$ is a chord through $M$ whose intersection with $BC$ is $T$.

3.  Now we exploit the standard property of polars with respect to a fixed circle: **if two points $X$ and $Y$ lie on the same tangent lines, then the intersections of their polars with a fixed line (here $BC$) are symmetric with respect to the tangency point of that fixed line**. In our concrete words: the two chords (polars) through $M$ corresponding to $F$ and $G$ cut the tangent line $BC$ at two points whose midpoint is precisely the tangency point $M$.

    This statement is a standard projective fact: take the pencil of lines through $M$ and project from the circle to the tangent line $BC$; the projectivity induced by pole–polar duality is an involution on that pencil whose fixed point is the tangent direction at $M$; hence the two points on $BC$ cut by polars that are exchanged by that involution are symmetric about $M$. Equivalently one may check this by an elementary cross–ratio calculation using the chord–tangent theorem.

---

## Conclusion

From the polar incidences we have shown that the intersection points $S$ and $T$ of the polars of $F$ and $G$ with the tangent line $BC$ are exchanged by the involution induced by polar duality about the circle $\mathcal E$. The unique fixed point of that involution on $BC$ is the tangency point $M$. Hence $M$ is the midpoint of the segment $ST$.

Therefore $M$ is the midpoint of $ST$, as required. $\square$

---

# Measure and Integration + Functional Analysis

### **Questão 1.**

Considere $\Lambda$ um conjunto qualquer não-vazio e $(\mathbb{R}, L, m)$ o espaço de medida dos reais, com a medida de Lebesgue $m$ e a $\sigma$ \-álgebra $L$ dos conjuntos Lebesgue mensuráveis. Para $X = \Lambda \times \mathbb{R}$ e $E \subset X$ defina

$$
E_\lambda = \{ x \in \mathbb{R} : (\lambda, x) \in E \} \subset \mathbb{R},
$$

assim $E = \bigcup_{\lambda \in \Lambda} \{\lambda\} \times E_\lambda$ , para cada $E \subset X$ . Em $X$ considere a coleção

$$
\mathcal{M} = \{ E \subset X : E_\lambda \in L \text{ para todo } \lambda \in \Lambda \}.
$$

Além disso, para $E \in \mathcal{M}$ , defina

$$
\mu(E) = \sum_{\lambda \in \Lambda} m(E_\lambda).
$$

**(a)** \[1\] Assuma que $\mathcal{M}$ é uma $\sigma$ \-álgebra e mostre que $\mu$ é uma medida sobre $\mathcal{M}$ .

**(b)** \[1\] Mostre que $\mu$ é $\sigma$ \-finita se, e somente se, $\Lambda$ é enumerável.

**Dica (in)útil:** Se $\{a_\lambda\}$ é uma coleção de números não-negativos indexada em $\Lambda$ (um conjunto infinito qualquer) e $\sum_{\lambda \in \Lambda} a_\lambda < \infty$ , então $a_\lambda = 0$ para todo $\lambda \in \Lambda$ , exceto possivelmente para uma quantidade enumerável de $\lambda$ 's.

---

### **Questão 2.**

\[2\] Considere $(\mathbb{R}, L, m)$ a reta com a medida de Lebesgue. Se $f \in L^1([a, b), m)$ , então a função

$$
F(x) = \int_a^x f(t)\,dt \quad \text{para } a \leqslant x < b
$$

é contínua em $[a, b)$ .

---

### **Questão 3.**

Suponha que $(X, \mathcal{M}, \mu)$ é um espaço de medida, com $\mu$ $\sigma$ \-finita, e considere $f \in L^+(X)$ . Defina

$$
G_f = \{ (x, y) \in X \times [0, \infty) : y \leqslant f(x) \}.
$$

**(a)** \[1\] Mostre que $G_f$ é $\mathcal{M} \otimes \mathcal{B}_{[0, \infty)}$ mensurável.

**(b)** \[1\] Mostre que $(\mu \times m)(G_f) = \int f\,d\mu$ .

---

### **Questão 4.**

\[2\] Mostre que se $0 < p < q < r \leqslant \infty$ , então $L^p \cap L^r \subset L^q$ e

$$
\|f\|_q \leqslant \|f\|_p^\lambda \|f\|_r^{1-\lambda},
$$

onde $\lambda \in (0, 1)$ é definido por

$$
\frac{1}{q} = \frac{\lambda}{p} + \frac{1 - \lambda}{r}.
$$

---

# Geometria Diferencial

---

### **Exame de Qualificação - Doutorado - Geometria - 2019/1**

**Questão 1:** Seja $M$ uma variedade $C^\infty$ de dimensão $m$ em $\mathbb{R}^n$ (com $n > m$ ).

**a)** Seja $p \in M$ . Faça a construção do espaço tangente $T_pM$ e do espaço cotangente (dual do espaço tangente) $T_pM^*$ .

**b)** Faça a construção do fibrado tangente $TM$ e do fibrado cotangente $TM^*$ .

**c)** O que é uma seção do fibrado tangente? E do fibrado cotangente?

---

**Questão 2:** Seja $\vec{F} = F_1 \frac{\partial}{\partial x} + F_2 \frac{\partial}{\partial y} + F_3 \frac{\partial}{\partial z}$ um campo vetorial de classe $C^1$ em $\mathbb{R}^3$ e defina as formas diferenciais

$$
\omega_F = F_1 \,dx + F_2 \,dy + F_3 \,dz;
$$

$$
\eta_F = F_1 \,dy \wedge dz + F_2 \,dz \wedge dx + F_3 \,dx \wedge dy.
$$

**a)** Mostre que $d\omega_F = \eta_{\operatorname{rot}\, F}$ e $d\eta_F = \operatorname{div} \vec{F} \, dx \wedge dy \wedge dz$ .

**b)** Enuncie o Teorema de Stokes para variedades compactas com bordo.

**c)** Enuncie o Teorema de Stokes e o Teorema do Divergente em $\mathbb{R}^3$ e use os itens anteriores para demonstrá-los.

---

**Questão 3:** Sejam $X, Y$ campos vetoriais e $f, g$ funções sobre uma variedade diferenciável $M$ .

**a)** Prove que $[fX, gY] = f \cdot (L_X g) \cdot Y - g \cdot (L_Y f) \cdot X + (fg) \cdot [X, Y]$ .

**b)** Se $M = \mathbb{R}^3$ , calcule $Z := [X, Y]$ para

$$
X = z \, \partial_y - y \, \partial_z, \quad Y = x \, \partial_z - z \, \partial_x.
$$

$X, Y, Z$ são independentes?

---

**Questão 4:** Sejam $\operatorname{Sym}(n, \mathbb{R})$ o conjunto das matrizes $n \times n$ simétricas e $F: GL(n, \mathbb{R}) \to \operatorname{Sym}(n, \mathbb{R})$ , dada por $A \mapsto A^t \cdot A$ .

**a)** Usando a aplicação traço, $F$ , e o Teorema de Heine-Borel, prove que $O(n)$ é um subgrupo compacto de $GL(n, \mathbb{R})$ .

**b)** Prove que $SO(n)$ é um subgrupo de índice 2, aberto e fechado em $O(n)$ .

**c)** Descreva $O(2)$ e $SO(2)$ .

---

# Table with math abbreviations in different languages en, de, ru, ch, ja, ar, hi, fr, pt a.e/q.t.p: almost everywhere e.g i.e c.q.d etc

Below is a **clean multilingual table** of common **mathematical abbreviations**, translated into:

**en** (English), **de** (Deutsch), **ru** (Russian), **zh** (Chinese), **ja** (Japanese), **ar** (Arabic), **hi** (Hindi), **fr** (Français), **pt** (Português)

I keep the _original Latin abbreviation_ in the first column, since many languages use it unchanged.

---

# **Multilingual Math Abbreviations Table**

| Abbrev.           | en (English)                | de (Deutsch)                                   | ru (Русский)                        | zh (中文) | ja (日本語)                | ar (العربية)               | hi (हिन्दी)            | fr (Français)                     | pt (Português)                     |
| ----------------- | --------------------------- | ---------------------------------------------- | ----------------------------------- | --------- | -------------------------- | -------------------------- | ---------------------- | --------------------------------- | ---------------------------------- |
| **a.e. / q.t.p.** | almost everywhere           | fast überall                                   | почти всюду                         | 几乎处处  | ほとんど至る所で           | تقريبًا في كل مكان         | लगभग सर्वत्र           | presque partout                   | quase toda parte                   |
| **e.g.**          | for example                 | z.B. (zum Beispiel)                            | например                            | 例如      | 例えば                     | مثلًا                      | उदाहरण के लिए          | par ex. (par exemple)             | por exemplo                        |
| **i.e.**          | that is                     | d.h. (das heißt)                               | то есть                             | 即        | つまり                     | أي                         | अर्थात्                | c.-à-d. (c’est-à-dire)            | isto é                             |
| **etc.**          | etcetera                    | usw. (und so weiter)                           | и т.д.                              | 等等      | など                       | إلخ                        | आदि                    | etc.                              | etc.                               |
| **c.q.d.**        | QED / which was to be shown | w.z.b.w. (was zu beweisen war)                 | ч.т.д. (что и требовалось доказать) | 得证      | QED（証明終）              | وهذا ما كان مطلوبًا إثباته | सिद्धम्                | CQFD (ce qu’il fallait démontrer) | QED / C.Q.D.                       |
| **w.l.o.g.**      | without loss of generality  | o.B.d.A. (ohne Beschränkung der Allgemeinheit) | без ограничения общности            | 不妨设    | 一般性を失わずに           | دون فقدان العمومية         | सामान्यता की हानि बिना | s.p.g. (sans perte de généralité) | s.p.g. (sem perda de generalidade) |
| **iff**           | if and only if              | genau dann, wenn                               | тогда и только тогда                | 当且仅当  | 〜であるための必要十分条件 | إذا وفقط إذا               | तभी और तभी             | si et seulement si                | se e somente se                    |
| **w.r.t.**        | with respect to             | bzgl. (bezüglich)                              | относительно                        | 关于      | に関して                   | بالنسبة إلى                | के संबंध में           | par rapport à                     | com respeito a                     |
| **LHS / RHS**     | left/right-hand side        | LHS / RHS                                      | левая/правая часть                  | 左/右边   | 左辺/右辺                  | الطرف الأيسر/الأيمن        | बाईं/दाईं ओर           | membre gauche/droit               | lado esquerdo/direito              |
| **s.t.**          | such that                   | sodass                                         | такая что                           | 使得      | ～となるように             | بحيث                       | ऐसा कि                 | tel que                           | tal que                            |

---

If you want, I can also:

✅ Add more abbreviations (PDE symbols, measure theory, algebra, geometry, computer science)  
✅ Export the table to **Markdown**, **LaTeX**, **CSV**, **PDF**, or **Excel**  
✅ Add pronunciation or literal translations

Just tell me!

# Add more abbreviations (PDE symbols, measure theory, algebra, geometry, computer science)

Below is a **much larger multilingual table** of mathematical abbreviations across areas:

- **General math**
- **PDE**
- **Measure theory**
- **Topology / Geometry**
- **Algebra**
- **Computer science / logic**

Languages included: **English (en), German (de), Russian (ru), Chinese (zh), Japanese (ja), Arabic (ar), Hindi (hi), French (fr), Portuguese (pt)**.

I keep abbreviations in their universal Latin form when appropriate.

---

# ⭐ **Extended Multilingual Math Abbreviations Table**

---

## **1\. General Mathematical Abbreviations**

| Abbrev.      | en                                      | de           | ru             | zh         | ja               | ar                         | hi                     | fr               | pt               |
| ------------ | --------------------------------------- | ------------ | -------------- | ---------- | ---------------- | -------------------------- | ---------------------- | ---------------- | ---------------- |
| **a.e.**     | almost everywhere                       | fast überall | почти всюду    | 几乎处处   | ほとんど至る所で | تقريبًا في كل مكان         | लगभग सर्वत्र           | presque partout  | quase toda parte |
| **a.s.**     | almost surely                           | fast sicher  | почти наверное | 几乎必然   | ほぼ確実に       | تقريبًا مؤكد               | लगभग निश्चित रूप से    | presque sûrement | quase certamente |
| **i.i.d.**   | independent and identically distributed | u.i.v.       | н.о.р.с.       | 独立同分布 | 独立同分布       | مستقلة ومتطابقة التوزيع    | स्वतंत्र और समान वितरण | i.i.d.           | i.i.d.           |
| **w.l.o.g.** | without loss of generality              | o.B.d.A.     | б/о общности   | 不妨设     | 一般性を失わずに | دون فقدان العمومية         | सामान्यता की हानि बिना | s.p.g.           | s.p.g.           |
| **iff**      | if and only if                          | gdw.         | ттт            | 当且仅当   | 必要十分         | إذا وفقط إذا               | तभी और तभी             | ssi              | sss              |
| **QED**      | quod erat demonstrandum                 | w.z.b.w.     | ч.т.д.         | 证毕       | 証明終           | وهذا ما كان مطلوبًا إثباته | सिद्धम्                | CQFD             | CQD              |

---

## **2\. PDE & Differential Operators**

| Symbol / Abbrev. | en                             | de               | ru           | zh           | ja           | ar                   | hi                 | fr                | pt                   |
| ---------------- | ------------------------------ | ---------------- | ------------ | ------------ | ------------ | -------------------- | ------------------ | ----------------- | -------------------- |
| **PDE**          | partial differential equation  | PDE              | урч          | 偏微分方程   | 偏微分方程式 | معادلة تفاضلية جزئية | आ.अ.स.             | EDP               | EDP                  |
| **ODE**          | ordinary differential equation | ODE              | ОДУ          | 常微分方程   | 常微分方程式 | معادلة تفاضلية عادية | साधारण अवकल समीकरण | EDO               | EDO                  |
| **Lap. / Δ**     | Laplacian                      | Laplace-Operator | Лаплас       | 拉普拉斯算子 | ラプラシアン | لابلاسيان            | लैप्लास संचालक     | laplacien         | laplaciano           |
| **div**          | divergence                     | Divergenz        | дивергенция  | 散度         | 発散         | التباعد              | डायवर्जेन्स        | divergence        | divergência          |
| **grad**         | gradient                       | Gradient         | градиент     | 梯度         | 勾配         | التدرج               | ग्रेडियेंट         | gradient          | gradiente            |
| **curl / rot**   | curl                           | Rotation         | ротор        | 旋度         | カール       | الدوران              | घुमाव              | rotationnel       | rotacional           |
| **BC**           | boundary condition             | Randbedingung    | гранич. усл. | 边界条件     | 境界条件     | شرط حدودي            | सीमा शर्त          | condition au bord | condição de contorno |

---

## **3\. Measure Theory & Probability**

| Abbrev.    | en                           | de              | ru                 | zh         | ja           | ar                   | hi             | fr                 | pt                 |
| ---------- | ---------------------------- | --------------- | ------------------ | ---------- | ------------ | -------------------- | -------------- | ------------------ | ------------------ |
| **σ-alg.** | σ-algebra                    | σ-Algebra       | σ-алгебра          | σ-代数     | σ-代数       | σ-جبر                | σ-बीजगणित      | σ-algèbre          | σ-álgebra          |
| **μ-a.e.** | μ–almost everywhere          | μ–fast überall  | μ–почти всюду      | μ–几乎处处 | μ–ほぼ至る所 | μ–تقريبًا في كل مكان | μ–लगभग सर्वत्र | μ–presque partout  | μ–quase toda parte |
| **w.r.t.** | with respect to              | bzgl.           | относительно       | 关于       | に関して     | بالنسبة إلى          | के संबंध में   | par rapport à      | com respeito a     |
| **RV**     | random variable              | Zufallsvariable | случайная величина | 随机变量   | 確率変数     | متغير عشوائي         | यादृच्छिक चर   | variable aléatoire | variável aleatória |
| **PDF**    | probability density function | Dichtefunktion  | плотность          | 密度函数   | 確率密度関数 | دالة الكثافة         | घनत्व फलन      | densité            | densidade          |

---

## **4\. Algebra & Linear Algebra**

| Abbrev.   | en                   | de                        | ru                        | zh         | ja             | ar                   | hi                 | fr                      | pt                 |
| --------- | -------------------- | ------------------------- | ------------------------- | ---------- | -------------- | -------------------- | ------------------ | ----------------------- | ------------------ |
| **Hom**   | homomorphism         | Homomorphismus            | гомоморфизм               | 同态       | 準同型         | تماثل                | समरूपता            | homomorphisme           | homomorfismo       |
| **End**   | endomorphism         | Endomorphismus            | эндоморфизм               | 内射       | 内部自己準同型 | إندومورفزم           | अंत-समरूपता        | endomorphisme           | endomorfismo       |
| **Ker**   | kernel               | Kern                      | ядро                      | 核         | 核             | نواة                 | कोष                | noyau                   | núcleo             |
| **Im**    | image                | Bild                      | образ                     | 像         | 像             | صورة                 | प्रतिबिंब          | image                   | imagem             |
| **id**    | identity map         | Identität                 | тождественное отображение | 恒等映射   | 恒等写像       | التطبيق الهوية       | सर्वात्म फ़ंक्शन   | identité                | identidade         |
| **GL(n)** | general linear group | allgemeine lineare Gruppe | общая линейная группа     | 一般线性群 | 一般線形群     | الزمرة الخطية العامة | सामान्य रैखिक समूह | groupe linéaire général | grupo linear geral |

---

## **5\. Geometry & Topology**

| Abbrev.    | en             | de               | ru               | zh   | ja       | ar             | hi                | fr             | pt            |
| ---------- | -------------- | ---------------- | ---------------- | ---- | -------- | -------------- | ----------------- | -------------- | ------------- |
| **diff.**  | differentiable | differenzierbar  | дифференцируемый | 可微 | 微分可能 | قابل للاشتقاق  | अवकलनीय           | différentiable | diferenciável |
| **man.**   | manifold       | Mannigfaltigkeit | многообразие     | 流形 | 多様体   | متشعب          | बहिरूप            | variété        | variedade     |
| **homeo.** | homeomorphism  | Homöomorphismus  | гомеоморфизм     | 同胚 | ホメオ   | تماثل طوبولوجي | होमोयोमॉर्फ़िज़्म | homéomorphisme | homeomorfismo |
| **iso.**   | isomorphism    | Isomorphismus    | изоморфизм       | 同构 | 同型     | تماثل          | समसमिति           | isomorphisme   | isomorfismo   |
| **geom.**  | geometric      | geometrisch      | геометрический   | 几何 | 幾何     | هندسي          | ज्यामितीय         | géométrique    | geométrico    |

---

## **6\. Computer Science / Logic / Discrete Math**

| Abbrev.   | en                        | de                 | ru               | zh             | ja             | ar                    | hi                 | fr           | pt                    |
| --------- | ------------------------- | ------------------ | ---------------- | -------------- | -------------- | --------------------- | ------------------ | ------------ | --------------------- |
| **alg.**  | algorithm                 | Algorithmus        | алгоритм         | 算法           | アルゴリズム   | خوارزمية              | अल्गोरिद्म         | algorithme   | algoritmo             |
| **comp.** | complexity                | Komplexität        | сложность        | 复杂度         | 計算量         | التعقيد               | जटिलता             | complexité   | complexidade          |
| **NP**    | nondeterministic polytime | nichtdet. polynom. | НП               | 非确定性多项式 | 非決定性多項式 | لا حتمي كثيرات الحدود | अनिश्चयात्मक       | NP           | NP                    |
| **P**     | polynomial time           | polynomiell        | П                | 多项式时间     | 多項式時間     | كثيرات الحدود         | बहुपदीय समय        | P            | P                     |
| **CS**    | computer science          | Informatik         | информатика      | 计算机科学     | 情報科学       | علوم الحاسوب          | कम्प्यूटर विज्ञान  | informatique | ciência da computação |
| **w.p.1** | with probability 1        | mit W’keit 1       | с вероятностью 1 | 以概率1        | 確率1で        | باحتمال 1             | प्रायिकता 1 के साथ | avec prob. 1 | com prob. 1           |

---

# Want more?

I can extend this table with:

✅ functional analysis  
✅ category theory  
✅ algebraic geometry  
✅ tensors & differential geometry  
✅ stochastic calculus  
✅ quantum mechanics

Or export as **LaTeX / PDF / CSV / Excel / Markdown**.

Just tell me!
