"""Ordena tres números enteros mediante comparaciones."""


def ordenar_tres(numero_1, numero_2, numero_3):
    if numero_1 > numero_2:
        auxiliar = numero_1
        numero_1 = numero_2
        numero_2 = auxiliar

    if numero_2 > numero_3:
        auxiliar = numero_2
        numero_2 = numero_3
        numero_3 = auxiliar

    if numero_1 > numero_2:
        auxiliar = numero_1
        numero_1 = numero_2
        numero_2 = auxiliar

    return numero_1, numero_2, numero_3


if __name__ == "__main__":
    numero_1 = int(input("Primer número: "))
    numero_2 = int(input("Segundo número: "))
    numero_3 = int(input("Tercer número: "))

    numeros_ordenados = ordenar_tres(numero_1, numero_2, numero_3)
    print("Ordenados de menor a mayor:", *numeros_ordenados)
